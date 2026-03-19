import { useState } from 'react';
import { type Candidate, type Stage, STAGES, STAGE_META } from '../types';

interface Props {
    candidates: Candidate[];
    onCandidateClick: (c: Candidate) => void;
    onDragStart?: () => void;
    onDragEnd: (candidateId: string, newStage: Stage, destinationIndex: number) => void;
}

const avatarColors = ['bg-blue-500', 'bg-violet-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-sky-500'];
const getAvatarColor = (initials: string) => avatarColors[initials.charCodeAt(0) % avatarColors.length];

const ScoreBadge = ({ score }: { score: number }) => {
    const cls = score >= 85
        ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
        : score >= 70
            ? 'text-amber-700 bg-amber-50 border-amber-200'
            : 'text-slate-500 bg-slate-100 border-slate-200';
    return <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${cls}`}>{score}%</span>;
};

export default function PipelineBoard({ candidates, onCandidateClick, onDragStart, onDragEnd }: Props) {
    const byStage = (stage: Stage) => candidates.filter(c => c.stage === stage);

    const [draggedId, setDraggedId] = useState<string | null>(null);
    const [dragOverStage, setDragOverStage] = useState<Stage | null>(null);

    const handleDragStart = (e: React.DragEvent, id: string) => {
        e.dataTransfer.setData('candidateId', id);
        e.dataTransfer.effectAllowed = 'move';
        // setTimeout ensures the visual dragged "ghost" image is generated 
        // before we heavily lower the opacity on the actual element
        setTimeout(() => setDraggedId(id), 0);
        if (onDragStart) onDragStart();
    };

    const handleDragEndNative = () => {
        setDraggedId(null);
        setDragOverStage(null);
    };

    const handleDragOver = (e: React.DragEvent, stage: Stage) => {
        e.preventDefault(); // Necessary to indicate a valid drop target
        e.dataTransfer.dropEffect = 'move';
        if (dragOverStage !== stage) setDragOverStage(stage);
    };

    const handleDrop = (e: React.DragEvent, stage: Stage, dropIndex?: number) => {
        e.preventDefault();
        e.stopPropagation();
        
        const candidateId = e.dataTransfer.getData('candidateId');
        if (!candidateId) return;

        const stageCandidates = byStage(stage);
        // If dropIndex is missing, they dropped on the empty gap in the column -> append to end
        const finalIndex = dropIndex !== undefined ? dropIndex : stageCandidates.length;

        onDragEnd(candidateId, stage, finalIndex);
        setDraggedId(null);
        setDragOverStage(null);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-slate-800">Pipeline Overview</h2>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse inline-block" />
                    {candidates.length} total candidates
                </div>
            </div>

            <div className="flex gap-4 lg:gap-3 lg:min-w-[900px]" style={{ minHeight: 400 }}>
                {STAGES.map(stage => {
                    const meta = STAGE_META[stage];
                    const stageCandidates = byStage(stage);
                    const isOver = dragOverStage === stage;

                    return (
                        <div key={stage} className="flex flex-col min-w-[200px] flex-1">
                            {/* Column header */}
                            <div className={`flex items-center justify-between px-3 py-2.5 rounded-lg mb-2.5 ${meta.bg} border ${meta.border}`}>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-sm">{meta.icon}</span>
                                    <span className={`text-xs font-semibold ${meta.text}`}>{stage}</span>
                                </div>
                                <span className={`text-xs font-bold ${meta.text} ${meta.bg} rounded-full w-5 h-5 flex items-center justify-center border ${meta.border}`}>
                                    {stageCandidates.length}
                                </span>
                            </div>

                            {/* Droppable Area */}
                            <div
                                onDragOver={(e) => handleDragOver(e, stage)}
                                onDragLeave={(e) => {
                                    // Prevent flickering when leaving child elements
                                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                                        setDragOverStage(null);
                                    }
                                }}
                                onDrop={(e) => handleDrop(e, stage)}
                                className={`flex flex-col gap-2.5 flex-1 p-1 rounded-xl transition-colors duration-200 ${
                                    isOver ? 'bg-slate-100/50 ring-2 ring-slate-200 ring-inset' : ''
                                }`}
                                style={{ minHeight: 150 }}
                            >
                                {stageCandidates.length === 0 && !isOver ? (
                                    <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed border-slate-200 rounded-xl h-full bg-slate-50/60">
                                        <span className="text-2xl mb-1 opacity-30">{meta.icon}</span>
                                        <p className="text-xs text-slate-400">No candidates</p>
                                    </div>
                                ) : (
                                    stageCandidates.map((c, index) => {
                                        const isDragged = c.id === draggedId;
                                        return (
                                            <div
                                                key={c.id}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, c.id)}
                                                onDragEnd={handleDragEndNative}
                                                onDragOver={(e) => {
                                                    // This allows dropping ON a card to insert it directly at this index
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleDragOver(e, stage);
                                                }}
                                                onDrop={(e) => handleDrop(e, stage, index)}
                                                onClick={(e) => {
                                                    // Sometimes drag end can trigger a click, though native HTML5 is usually immune
                                                    if (draggedId) {
                                                        e.preventDefault();
                                                        return;
                                                    }
                                                    onCandidateClick(c);
                                                }}
                                                className={`bg-white rounded-xl p-3.5 cursor-grab active:cursor-grabbing border focus:outline-none hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5 group shadow-sm transition-all ${
                                                    isDragged ? 'opacity-40 border-dashed border-slate-400 ring-2 ring-slate-200 z-10' : 'border-slate-200'
                                                }`}
                                            >
                                                <div className="flex items-start justify-between mb-2.5">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${getAvatarColor(c.avatar)}`}>
                                                            {c.avatar}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-sm font-semibold text-slate-800 truncate leading-tight">{c.name}</p>
                                                            <p className="text-xs text-slate-400 truncate">{c.company}</p>
                                                        </div>
                                                    </div>
                                                    <ScoreBadge score={c.matchScore} />
                                                </div>
                                                <p className="text-xs text-slate-500 mb-2.5 line-clamp-1">{c.currentRole}</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {c.skills.slice(0, 2).map(s => {
                                                        let cls = 'bg-slate-100 text-slate-500 border-slate-200';
                                                        if (s.color.includes('blue')) cls = 'bg-blue-50 text-blue-600 border-blue-200';
                                                        else if (s.color.includes('emerald')) cls = 'bg-emerald-50 text-emerald-600 border-emerald-200';
                                                        else if (s.color.includes('indigo')) cls = 'bg-indigo-50 text-indigo-600 border-indigo-200';
                                                        else if (s.color.includes('rose')) cls = 'bg-rose-50 text-rose-600 border-rose-200';
                                                        return <span key={s.name} className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${cls}`}>{s.name}</span>;
                                                    })}
                                                    {c.skills.length > 2 && (
                                                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded border bg-slate-100 text-slate-400 border-slate-200">
                                                            +{c.skills.length - 2}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
