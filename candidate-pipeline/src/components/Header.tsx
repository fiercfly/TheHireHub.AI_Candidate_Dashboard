import { Fragment } from 'react';

interface Crumb { label: string }
interface HeaderProps { title: string; breadcrumbs: Crumb[]; onMenuClick: () => void; }

export default function Header({ title, breadcrumbs, onMenuClick }: HeaderProps) {
    return (
        <header className="sticky top-0 z-30 glass-panel border-x-0 border-t-0 border-b border-white/5 px-4 md:px-6 py-3 md:py-4">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onMenuClick}
                        className="md:hidden p-1.5 -ml-1 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>
                    <div>
                        <nav className="hidden sm:flex items-center gap-1 text-xs text-white/40 mb-1">
                            {breadcrumbs.map((c, i) => (
                                <Fragment key={c.label}>
                                    {i > 0 && (
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="9 18 15 12 9 6" />
                                        </svg>
                                    )}
                                    <span className={i === breadcrumbs.length - 1
                                        ? 'text-white/80 font-medium'
                                        : 'hover:text-white cursor-pointer transition-colors'}>
                                        {c.label}
                                    </span>
                                </Fragment>
                            ))}
                        </nav>
                        <h1 className="text-lg md:text-xl font-bold text-white tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                            {title}
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-2.5">
                    <div className="hidden md:flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-lg px-3 py-2 text-sm text-white/40 cursor-pointer transition-colors border border-transparent hover:border-white/10 select-none">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <span className="text-sm">Quick search...</span>
                        <kbd className="ml-1 text-[10px] bg-black/40 text-white/40 border border-white/10 rounded px-1.5 py-0.5">⌘K</kbd>
                    </div>

                    <button className="relative p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all">
                        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_8px_theme(colors.yellow.400)]" />
                    </button>

                    <button
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-black transition-all hover:brightness-110 active:scale-95 shadow-[0_0_15px_rgba(250,204,21,0.3)] bg-yellow-400"
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span className="hidden sm:inline">Add Candidate</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
