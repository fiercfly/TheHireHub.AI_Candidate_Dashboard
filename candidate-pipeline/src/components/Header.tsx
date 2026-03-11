import { Fragment } from 'react';

interface Crumb { label: string }
interface HeaderProps { title: string; breadcrumbs: Crumb[]; onMenuClick: () => void; onAddCandidate: () => void; }

export default function Header({ title, breadcrumbs, onMenuClick, onAddCandidate }: HeaderProps) {
    return (
        <header className="sticky top-0 z-30 bg-white/92 backdrop-blur-md border-b border-slate-200 px-4 md:px-6 h-16 flex items-center"
            style={{ background: 'rgba(255,255,255,0.96)', boxShadow: '0 1px 0 #E2E8F0' }}>
            <div className="flex items-center justify-between gap-3 w-full">
                <div className="flex items-center gap-3">
                    {/* Mobile hamburger */}
                    <button
                        onClick={onMenuClick}
                        className="md:hidden p-2 -ml-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
                        </svg>
                    </button>

                    <div>
                        {/* Breadcrumbs */}
                        <nav className="hidden sm:flex items-center gap-1 text-xs text-slate-400 mb-0.5">
                            {breadcrumbs.map((c, i) => (
                                <Fragment key={c.label}>
                                    {i > 0 && (
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="9 18 15 12 9 6"/>
                                        </svg>
                                    )}
                                    <span className={i === breadcrumbs.length - 1
                                        ? 'text-slate-600 font-medium'
                                        : 'hover:text-slate-700 cursor-pointer transition-colors'}>
                                        {c.label}
                                    </span>
                                </Fragment>
                            ))}
                        </nav>
                        <h1 className="text-base font-semibold text-slate-900 leading-tight tracking-tight">
                            {title}
                        </h1>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2">
                    {/* Search pill */}
                    <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 cursor-pointer border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all select-none">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        <span className="text-sm">Quick search...</span>
                        <kbd className="ml-1 text-[10px] bg-slate-100 text-slate-400 border border-slate-200 rounded px-1.5 py-0.5">⌘K</kbd>
                    </div>

                    {/* Notification bell */}
                    <button className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                        </svg>
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white" />
                    </button>

                    {/* Add Candidate */}
                    <button
                        onClick={onAddCandidate}
                        className="btn-primary flex items-center gap-2 px-4 py-2 text-sm"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        <span className="hidden sm:inline">Add Candidate</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
