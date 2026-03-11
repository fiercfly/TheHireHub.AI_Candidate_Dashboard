import { useState, useEffect, useRef } from 'react';
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
    const bgColor = score >= 85 ? '#D1FAE5' : score >= 70 ? '#FEF3C7' : '#F1F5F9';
    return (
        <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: bgColor }}>
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${score}%`, background: color }} />
            </div>
            <span className="text-xs font-bold min-w-[34px] text-right" style={{ color }}>{score}%</span>
        </div>
    );
};

const AvatarBadge = ({ initials }: { initials: string }) => {
    const colors = ['bg-blue-500', 'bg-violet-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-sky-500'];
    const idx = initials.charCodeAt(0) % colors.length;
    return (
        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${colors[idx]}`}>
            {initials}
        </div>
    );
};

const SkeletonRow = () => (
    <tr className="border-b border-slate-100">
        {[200, 160, 80, 130, 90, 80, 60].map((w, i) => (
            <td key={i} className="px-4 py-3.5">
                <div className="skeleton-light h-4 rounded" style={{ width: w }} />
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
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setActionOpen(null);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

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
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={`ml-1 transition-all ${sortKey === col ? 'opacity-100 text-blue-600' : 'opacity-30'}`}>
            {sortKey === col && sortDir === 'asc'
                ? <polyline points="18 15 12 9 6 15" />
                : <polyline points="6 9 12 15 18 9" />}
        </svg>
    );

    const ColHead = ({ col, label }: { col: SortKey; label: string }) => (
        <th
            className="px-4 py-3 text-left text-xs font-semibold text-slate-500 cursor-pointer select-none hover:text-slate-800 whitespace-nowrap transition-colors"
            onClick={() => handleSort(col)}
        >
            <div className="flex items-center">{label}<SortIcon col={col} /></div>
        </th>
    );

    return (
        <div className="card overflow-hidden">
            {/* Table header */}
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
                <h2 className="text-sm font-semibold text-slate-800">All Candidates</h2>
                <span className="text-xs text-slate-400 font-medium">{candidates.length} total</span>
            </div>

            <div className={`overflow-x-auto transition-all ${actionOpen ? 'pb-44 -mb-44' : ''}`}>
                <table className="w-full whitespace-nowrap">
                    <thead className="border-b border-slate-100 bg-white">
                        <tr>
                            <ColHead col="name" label="Candidate" />
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 whitespace-nowrap">Role / Company</th>
                            <ColHead col="experience" label="Experience" />
                            <ColHead col="matchScore" label="Match Score" />
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 whitespace-nowrap">Stage</th>
                            <ColHead col="lastActivity" label="Last Activity" />
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading
                            ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                            : sorted.length === 0
                                ? (
                                    <tr>
                                        <td colSpan={7} className="py-16 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-slate-400" strokeWidth="1.5">
                                                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-700">No candidates found</p>
                                                    <p className="text-sm text-slate-400 mt-0.5">Try adjusting your search or filters</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                                : sorted.map((c) => {
                                    const meta = STAGE_META[c.stage];
                                    const isOpen = actionOpen === c.id;
                                    return (
                                        <tr
                                            key={c.id}
                                            className={`hover:bg-blue-50/40 cursor-pointer transition-colors ${isOpen ? 'relative z-50 bg-blue-50/40' : ''}`}
                                            onClick={() => onCandidateClick(c)}
                                        >
                                            {/* Candidate */}
                                            <td className="px-4 py-3.5">
                                                <div className="flex items-center gap-3">
                                                    <AvatarBadge initials={c.avatar} />
                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-900 leading-tight">{c.name}</p>
                                                        <p className="text-xs text-slate-400 mt-0.5">{c.location}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Role / Company */}
                                            <td className="px-4 py-3.5">
                                                <p className="text-sm text-slate-700 font-medium">{c.currentRole}</p>
                                                <p className="text-xs text-slate-400 mt-0.5">{c.company}</p>
                                            </td>

                                            {/* Experience */}
                                            <td className="px-4 py-3.5">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-600">
                                                    {c.experience} yr{c.experience !== 1 ? 's' : ''}
                                                </span>
                                            </td>

                                            {/* Match Score */}
                                            <td className="px-4 py-3.5 min-w-[140px]">
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
                                                <span className="text-xs text-slate-400">{timeAgo(c.lastActivity)}</span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                                                <div className="relative flex justify-end" ref={isOpen ? menuRef : null}>
                                                    <button
                                                        onClick={() => setActionOpen(isOpen ? null : c.id)}
                                                        className={`p-1.5 rounded-lg transition-all ${isOpen ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'}`}
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                            <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
                                                        </svg>
                                                    </button>

                                                    {isOpen && (
                                                        <div className="absolute right-0 top-full mt-1.5 z-[100] bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 w-max min-w-[170px] animate-fade-in">
                                                            <p className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-widest border-b border-slate-100 mb-1">Actions</p>
                                                            {[
                                                                { label: 'View Profile', icon: '👤' },
                                                                { label: 'Move to Next Stage', icon: '➜' },
                                                                { label: 'Schedule Interview', icon: '📅' },
                                                                { label: 'Send Email', icon: '✉️' },
                                                                { label: 'Add Note', icon: '📝' },
                                                            ].map(({ label, icon }) => (
                                                                <button
                                                                    key={label}
                                                                    className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-700 transition-colors flex items-center gap-2.5"
                                                                    onClick={() => { if (label === 'View Profile') onCandidateClick(c); setActionOpen(null); }}
                                                                >
                                                                    <span>{icon}</span>{label}
                                                                </button>
                                                            ))}
                                                            <div className="border-t border-slate-100 mt-1 pt-1">
                                                                <button className="w-full text-left px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2.5" onClick={() => setActionOpen(null)}>
                                                                    <span>🚫</span>Reject Candidate
                                                                </button>
                                                            </div>
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