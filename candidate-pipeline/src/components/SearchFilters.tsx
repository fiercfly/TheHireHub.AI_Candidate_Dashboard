import { useState, useEffect } from 'react';
import { type FilterState, STAGES } from '../types';

interface Props {
    filters: FilterState;
    onChange: (f: Partial<FilterState>) => void;
    resultCount: number;
}

const experienceOptions = ['Any', '0-2', '2-5', '5-10', '10+'] as const;

export default function SearchFilters({ filters, onChange, resultCount }: Props) {
    const [localScore, setLocalScore] = useState({ min: filters.scoreMin, max: filters.scoreMax });

    useEffect(() => {
        setLocalScore({ min: filters.scoreMin, max: filters.scoreMax });
    }, [filters.scoreMin, filters.scoreMax]);

    useEffect(() => {
        const h = setTimeout(() => {
            if (localScore.min !== filters.scoreMin || localScore.max !== filters.scoreMax) {
                onChange({ scoreMin: localScore.min, scoreMax: localScore.max });
            }
        }, 150);
        return () => clearTimeout(h);
    }, [localScore, onChange, filters.scoreMin, filters.scoreMax]);

    const hasActiveFilters = filters.search || filters.stage !== 'All' || filters.experience !== 'Any' || filters.scoreMin > 0 || filters.scoreMax < 100;

    return (
        <div className="card p-4 md:p-5">
            <div className="flex flex-col gap-4">
                {/* Top row: search + stage + experience */}
                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search */}
                    <div className="relative flex-1 sm:max-w-xs">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        <input
                            type="text"
                            placeholder="Search candidates..."
                            value={filters.search}
                            onChange={e => onChange({ search: e.target.value })}
                            className="b2b-input w-full pl-9 pr-4 py-2 text-sm rounded-lg"
                        />
                    </div>

                    {/* Stage filter */}
                    <div className="relative">
                        <select
                            value={filters.stage}
                            onChange={e => onChange({ stage: e.target.value as FilterState['stage'] })}
                            className="b2b-input appearance-none pl-3 pr-8 py-2 text-sm rounded-lg cursor-pointer min-w-[140px]"
                        >
                            <option value="All">All Stages</option>
                            {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="6 9 12 15 18 9"/>
                        </svg>
                    </div>

                    {/* Experience filter */}
                    <div className="relative">
                        <select
                            value={filters.experience}
                            onChange={e => onChange({ experience: e.target.value as FilterState['experience'] })}
                            className="b2b-input appearance-none pl-3 pr-8 py-2 text-sm rounded-lg cursor-pointer min-w-[140px]"
                        >
                            {experienceOptions.map(opt => (
                                <option key={opt} value={opt}>{opt === 'Any' ? 'Any Experience' : `${opt} years`}</option>
                            ))}
                        </select>
                        <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="6 9 12 15 18 9"/>
                        </svg>
                    </div>

                    {/* Reset + Count */}
                    <div className="flex items-center gap-3 sm:ml-auto">
                        <span className="text-sm text-slate-500 whitespace-nowrap">
                            <span className="font-semibold text-slate-900">{resultCount}</span> results
                        </span>
                        {hasActiveFilters && (
                            <button
                                onClick={() => onChange({ search: '', stage: 'All', experience: 'Any', scoreMin: 0, scoreMax: 100 })}
                                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all border border-slate-200 hover:border-red-200"
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                                </svg>
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* Score range */}
                <div className="border-t border-slate-100 pt-3">
                    <div className="flex items-center justify-between mb-2.5">
                        <label className="text-xs font-semibold text-slate-600">Match Score Range</label>
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                            {localScore.min}% – {localScore.max}%
                        </span>
                    </div>
                    <div className="relative h-5 flex items-center">
                        {/* Track */}
                        <div className="absolute w-full h-1.5 bg-slate-200 rounded-full" />
                        {/* Active track */}
                        <div
                            className="absolute h-1.5 bg-blue-500 rounded-full"
                            style={{ left: `${localScore.min}%`, right: `${100 - localScore.max}%` }}
                        />
                        {/* Min thumb */}
                        <input
                            type="range" min={0} max={100} step={1}
                            value={localScore.min}
                            onChange={e => {
                                const val = Math.min(Number(e.target.value), localScore.max - 5);
                                setLocalScore(prev => ({ ...prev, min: val }));
                            }}
                            className="absolute w-full bg-transparent pointer-events-none z-10 touch-none [&::-webkit-slider-thumb]:pointer-events-auto"
                        />
                        {/* Max thumb */}
                        <input
                            type="range" min={0} max={100} step={1}
                            value={localScore.max}
                            onChange={e => {
                                const val = Math.max(Number(e.target.value), localScore.min + 5);
                                setLocalScore(prev => ({ ...prev, max: val }));
                            }}
                            className="absolute w-full bg-transparent pointer-events-none z-10 touch-none [&::-webkit-slider-thumb]:pointer-events-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
