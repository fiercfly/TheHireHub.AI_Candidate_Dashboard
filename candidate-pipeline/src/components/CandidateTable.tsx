import { useState } from 'react';
import { type Candidate, STAGE_META } from '../types';

interface Props {
    candidates: Candidate[];
    onCandidateClick: (c: Candidate) => void;
    loading?: boolean;
}

const timeAgo = (dateStr: string): string => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    return `${d}d ago`;
};

const ScoreBar = ({ score }: { score: number }) => {
    const color = score >= 85 ? '#10B981' : score >= 70 ? '#F59E0B' : '#94A3B8';
    return (
        <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-500 shadow-[0_0_8px_currentColor]"
                    style={{ width: `${score}%`, background: color }}
                />
            </div>
            <span className="text-xs font-bold" style={{ color, minWidth: 28 }}>{score}%</span>
        </div>
    );
};

const SkeletonRow = () => (
    <tr>
        {[200, 160, 80, 120, 80, 90, 80].map((w, i) => (
            <td key={i} className="px-4 py-3.5">
                <div className="skeleton-dark h-4 rounded" style={{ width: w }} />
            </td>
        ))}
    </tr>
);

type SortKey = 'name' | 'experience' | 'matchScore' | 'lastActivity';
type SortDir = 'asc' | 'desc';

export default function CandidateTable({ candidates, onCandidateClick, loading = false }: Props) {
    const [sortKey, setSortKey] = useState<SortKey>('matchScore');
    const [sortDir, setSortDir] = useState<SortDir>('desc');
    const [actionOpen, setActionOpen] = useState<string | null>(null);

    const handleSort = (key: SortKey) => {
        if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        else { setSortKey(key); setSortDir('desc'); }
    };

    const sorted = [...candidates].sort((a, b) => {
        const mult = sortDir === 'asc' ? 1 : -1;
        if (sortKey === 'name') return mult * a.name.localeCompare(b.name);
        if (sortKey === 'experience') return mult * (a.experience - b.experience);
        if (sortKey === 'matchScore') return mult * (a.matchScore - b.matchScore);
        if (sortKey === 'lastActivity') return mult * (new Date(a.lastActivity).getTime() - new Date(b.lastActivity).getTime());
        return 0;
    });

    const SortIcon = ({ col }: { col: SortKey }) => (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={`ml-1 transition-all ${sortKey === col ? 'opacity-100 neon-yellow-text' : 'opacity-30'}`}>
            {sortKey === col && sortDir === 'asc'
                ? <polyline points="18 15 12 9 6 15" />
                : <polyline points="6 9 12 15 18 9" />}
        </svg>
    );

    const ColHead = ({ col, label }: { col: SortKey; label: string }) => (
        <th
            className="px-4 py-3 text-left text-xs font-semibold text-white/50 cursor-pointer select-none hover:text-white transition-colors"
            onClick={() => handleSort(col)}
        >
            <div className="flex items-center">{label}<SortIcon col={col} /></div>
        </th>
    );

    return (
        <div className="glass-panel rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                <h2 className="text-base font-bold text-white tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    All Candidates
                </h2>
                <span className="text-xs text-white/40">{candidates.length} total</span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <thead className="border-b border-white/5 bg-white/5">
                        <tr>
                            <ColHead col="name" label="Candidate" />
                            <th className="px-4 py-3 text-left text-xs font-semibold text-white/50">Role / Company</th>
                            <ColHead col="experience" label="Experience" />
                            <ColHead col="matchScore" label="Match Score" />
                            <th className="px-4 py-3 text-left text-xs font-semibold text-white/50">Stage</th>
                            <ColHead col="lastActivity" label="Last Activity" />
                            <th className="px-4 py-3 text-left text-xs font-semibold text-white/50">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading
                            ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                            : sorted.length === 0
                                ? (
                                    <tr>
                                        <td colSpan={7} className="py-16 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/20" strokeWidth="1.5">
                                                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-white/60">No candidates found</p>
                                                    <p className="text-sm text-white/40 mt-0.5">Try adjusting your search or filters</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                                : sorted.map((c) => {
                                    const meta = STAGE_META[c.stage];
                                    return (

                                        <tr
                                            key={c.id}
                                            className="hover:bg-white/[0.04] cursor-pointer transition-all duration-200 border-b border-white/[0.02]"
                                            onClick={() => onCandidateClick(c)}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-black bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.3)] transition-transform group-hover:scale-110">
                                                        {c.avatar}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-white tracking-tight">{c.name}</p>
                                                        <p className="text-[11px] text-white/40 uppercase tracking-wider font-semibold">{c.location}</p>
                                                    </div>
                                                </div>
                                            </td>


                                            {/* Role */}
                                            <td className="px-4 py-3.5">
                                                <p className="text-sm text-white/80 font-medium">{c.currentRole}</p>
                                                <p className="text-xs text-white/40">{c.company}</p>
                                            </td>

                                            {/* Experience */}
                                            <td className="px-4 py-3.5">
                                                <span className="text-sm text-white/80 font-medium">{c.experience} yr{c.experience !== 1 ? 's' : ''}</span>
                                            </td>

                                            {/* Score */}
                                            <td className="px-4 py-3.5 min-w-[130px]">
                                                <ScoreBar score={c.matchScore} />
                                            </td>

                                            {/* Stage */}
                                            <td className="px-4 py-3.5">
                                                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${meta.bg} ${meta.text} border ${meta.border}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                                                    {c.stage}
                                                </span>
                                            </td>

                                            {/* Last Activity */}
                                            <td className="px-4 py-3.5">
                                                <span className="text-sm text-white/50">{timeAgo(c.lastActivity)}</span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                                                <div className="relative">
                                                    <button
                                                        onClick={() => setActionOpen(actionOpen === c.id ? null : c.id)}
                                                        className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10"
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                            <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
                                                        </svg>
                                                    </button>
                                                    {actionOpen === c.id && (
                                                        <div className="absolute right-0 top-8 z-20 bg-[#09090b]/90 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] py-1 min-w-[140px] animate-fade-in">
                                                            {['View Profile', 'Move to Next Stage', 'Schedule', 'Send Email', 'Add Note', 'Reject'].map(action => (
                                                                <button
                                                                    key={action}
                                                                    className={`w-full text-left px-3 py-1.5 text-[11px] font-semibold hover:bg-white/5 transition-colors ${action === 'Reject' ? 'text-red-400 hover:text-red-300' : 'text-white/80'}`}
                                                                    onClick={() => { if (action === 'View Profile') onCandidateClick(c); setActionOpen(null); }}
                                                                >
                                                                    {action}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
