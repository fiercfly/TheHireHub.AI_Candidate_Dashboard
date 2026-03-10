import { type Candidate, type Stage, STAGES, STAGE_META } from '../types';

interface Props {
    candidates: Candidate[];
    onCandidateClick: (c: Candidate) => void;
}

const ScoreBadge = ({ score }: { score: number }) => {
    const color = score >= 85 ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : score >= 70 ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20' : 'text-white/60 bg-white/5 border border-white/10';
    return (
        <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md ${color}`}>{score}%</span>
    );
};

const KanbanCard = ({ candidate, onClick }: { candidate: Candidate; onClick: () => void }) => (
    <div
        onClick={onClick}
        className="glass-panel rounded-xl p-3.5 cursor-pointer hover:border-yellow-400/50 hover:shadow-[0_4px_20px_rgba(250,204,21,0.1)] hover:-translate-y-0.5 transition-all group"
    >
        <div className="flex items-start justify-between mb-2.5">
            <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black shrink-0 bg-yellow-400">
                    {candidate.avatar}
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate leading-tight">{candidate.name}</p>
                    <p className="text-xs text-white/40 truncate">{candidate.company}</p>
                </div>
            </div>
            <ScoreBadge score={candidate.matchScore} />
        </div>
        <p className="text-xs text-white/50 mb-2.5 line-clamp-1">{candidate.currentRole}</p>
        <div className="flex flex-wrap gap-1">
            {candidate.skills.slice(0, 2).map(s => {
                // Map the old light utility colors to new dark variants
                let sbg = 'bg-white/5 text-white/60 border-white/10';
                if (s.color.includes('blue')) sbg = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
                else if (s.color.includes('emerald')) sbg = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
                else if (s.color.includes('indigo')) sbg = 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
                else if (s.color.includes('rose')) sbg = 'bg-rose-500/10 text-rose-400 border-rose-500/20';

                return <span key={s.name} className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md border ${sbg}`}>{s.name}</span>
            })}
            {candidate.skills.length > 2 && (
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-white/5 text-white/40 border border-white/10">
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
                <h2 className="text-base font-bold text-white tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    Pipeline Overview
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-white/40">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_8px_theme(colors.yellow.400)]" />
                    {candidates.length} total candidates
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-3 lg:min-w-[900px]" style={{ minHeight: 320 }}>
                {STAGES.map(stage => {
                    const meta = STAGE_META[stage];
                    const stageCandidates = byStage(stage);
                    return (
                        <div key={stage} className="flex flex-col min-w-0">
                            {/* Column header */}
                            <div className={`flex items-center justify-between px-3 py-2.5 rounded-xl mb-2 ${meta.bg} border ${meta.border}`}>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-sm">{meta.icon}</span>
                                    <span className={`text-xs font-semibold ${meta.text}`}>{stage}</span>
                                </div>
                                <span className={`text-xs font-bold ${meta.text} ${meta.bg} rounded-full w-5 h-5 flex items-center justify-center border ${meta.border}`}>
                                    {stageCandidates.length}
                                </span>
                            </div>

                            {/* Cards */}
                            <div className="flex flex-col gap-2 flex-1">
                                {stageCandidates.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed border-white/10 rounded-xl h-full bg-white/[0.01]">
                                        <span className="text-2xl mb-1 opacity-20">{meta.icon}</span>
                                        <p className="text-xs text-white/30">No candidates</p>
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
