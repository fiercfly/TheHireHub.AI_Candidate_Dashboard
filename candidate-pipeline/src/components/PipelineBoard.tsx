import { type Candidate, type Stage, STAGES, STAGE_META } from '../types';

interface Props {
    candidates: Candidate[];
    onCandidateClick: (c: Candidate) => void;
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

const KanbanCard = ({ candidate, onClick }: { candidate: Candidate; onClick: () => void }) => (
    <div
        onClick={onClick}
        className="bg-white rounded-xl p-3.5 cursor-pointer border border-slate-200 hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5 transition-all group shadow-sm"
    >
        <div className="flex items-start justify-between mb-2.5">
            <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${getAvatarColor(candidate.avatar)}`}>
                    {candidate.avatar}
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate leading-tight">{candidate.name}</p>
                    <p className="text-xs text-slate-400 truncate">{candidate.company}</p>
                </div>
            </div>
            <ScoreBadge score={candidate.matchScore} />
        </div>
        <p className="text-xs text-slate-500 mb-2.5 line-clamp-1">{candidate.currentRole}</p>
        <div className="flex flex-wrap gap-1">
            {candidate.skills.slice(0, 2).map(s => {
                let cls = 'bg-slate-100 text-slate-500 border-slate-200';
                if (s.color.includes('blue'))    cls = 'bg-blue-50 text-blue-600 border-blue-200';
                else if (s.color.includes('emerald')) cls = 'bg-emerald-50 text-emerald-600 border-emerald-200';
                else if (s.color.includes('indigo'))  cls = 'bg-indigo-50 text-indigo-600 border-indigo-200';
                else if (s.color.includes('rose'))    cls = 'bg-rose-50 text-rose-600 border-rose-200';
                return <span key={s.name} className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${cls}`}>{s.name}</span>;
            })}
            {candidate.skills.length > 2 && (
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded border bg-slate-100 text-slate-400 border-slate-200">
                    +{candidate.skills.length - 2}
                </span>
            )}
        </div>
    </div>
);

export default function PipelineBoard({ candidates, onCandidateClick }: Props) {
    const byStage = (stage: Stage) => candidates.filter(c => c.stage === stage);

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-slate-800">Pipeline Overview</h2>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse inline-block" />
                    {candidates.length} total candidates
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-3 lg:min-w-[900px]" style={{ minHeight: 300 }}>
                {STAGES.map(stage => {
                    const meta = STAGE_META[stage];
                    const stageCandidates = byStage(stage);
                    return (
                        <div key={stage} className="flex flex-col min-w-0">
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

                            {/* Cards */}
                            <div className="flex flex-col gap-2.5 flex-1">
                                {stageCandidates.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed border-slate-200 rounded-xl h-full bg-slate-50/60">
                                        <span className="text-2xl mb-1 opacity-30">{meta.icon}</span>
                                        <p className="text-xs text-slate-400">No candidates</p>
                                    </div>
                                ) : (
                                    stageCandidates.map(c => (
                                        <KanbanCard key={c.id} candidate={c} onClick={() => onCandidateClick(c)} />
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
