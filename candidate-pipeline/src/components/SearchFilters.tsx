import { useState, useEffect } from 'react';
import { type FilterState } from '../types';

interface Props {
    filters: FilterState;
    onChange: (f: Partial<FilterState>) => void;
    resultCount: number;
}

export default function SearchFilters({ filters, onChange, resultCount }: Props) {
    // Local state for sliders to prevent global re-render lag
    const [localScore, setLocalScore] = useState({ min: filters.scoreMin, max: filters.scoreMax });

    // Sync local state when filters prop changes (e.g., on Reset)
    useEffect(() => {
        setLocalScore({ min: filters.scoreMin, max: filters.scoreMax });
    }, [filters.scoreMin, filters.scoreMax]);

    // Debounce the parent update
    useEffect(() => {
        const handler = setTimeout(() => {
            if (localScore.min !== filters.scoreMin || localScore.max !== filters.scoreMax) {
                onChange({ scoreMin: localScore.min, scoreMax: localScore.max });
            }
        }, 150); // 150ms delay for smoothness
        return () => clearTimeout(handler);
    }, [localScore, onChange, filters.scoreMin, filters.scoreMax]);

    return (
        <div className="glass-panel rounded-2xl p-5 border border-white/10 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-end gap-4 md:gap-6">
                {/* Search Input */}
                <div className="w-full lg:flex-1 lg:min-w-[240px]">
                    <label className="block text-[11px] font-bold text-white/30 uppercase tracking-widest mb-2">Search Candidates</label>
                    <div className="relative group">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-yellow-400 transition-colors" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Try 'Senior Engineer' or 'React'..."
                            value={filters.search}
                            onChange={e => onChange({ search: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 glass-input rounded-xl text-sm placeholder-white/20 text-white transition-all outline-none"
                        />
                    </div>
                </div>

                {/* Range Slider - Refined for zero-glitch */}
                <div className="w-full lg:min-w-[220px]">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-[11px] font-bold text-white/30 uppercase tracking-widest">Match Score</label>
                        <span className="text-xs font-bold neon-yellow-text bg-yellow-400/10 px-2 py-0.5 rounded-md">
                            {localScore.min}% – {localScore.max}%
                        </span>
                    </div>
                    <div className="relative h-6 flex items-center group">
                        {/* Custom Track Background */}
                        <div className="absolute w-full h-1.5 bg-white/10 rounded-full" />
                        <div
                            className="absolute h-1.5 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.4)]"
                            style={{
                                left: `${localScore.min}%`,
                                right: `${100 - localScore.max}%`
                            }}
                        />
                        {/* Invisible Overlapping Range Inputs */}
                        <input
                            type="range" min={0} max={100} step={1}
                            value={localScore.min}
                            onChange={e => {
                                const val = Math.min(Number(e.target.value), localScore.max - 5);
                                setLocalScore(prev => ({ ...prev, min: val }));
                            }}
                            className="absolute w-full appearance-none bg-transparent pointer-events-none z-10 touch-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
                        />
                        <input
                            type="range" min={0} max={100} step={1}
                            value={localScore.max}
                            onChange={e => {
                                const val = Math.max(Number(e.target.value), localScore.min + 5);
                                setLocalScore(prev => ({ ...prev, max: val }));
                            }}
                            className="absolute w-full appearance-none bg-transparent pointer-events-none z-10 touch-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
                        />
                    </div>
                </div>

                {/* Filter Actions */}
                <div className="flex items-center justify-between lg:justify-end gap-3 w-full lg:w-auto lg:ml-auto pb-1 mt-2 lg:mt-0">
                    <div className="text-right mr-2">
                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-tighter">Results</p>
                        <p className="text-sm font-bold text-white">{resultCount}</p>
                    </div>
                    <button
                        onClick={() => onChange({ search: '', stage: 'All', experience: 'Any', scoreMin: 0, scoreMax: 100 })}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white/40 hover:text-white hover:bg-white/10 transition-all border border-white/5 active:scale-95"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>
        </div>
    );
}
