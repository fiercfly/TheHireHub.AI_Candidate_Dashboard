import { useState } from 'react';

export type SidebarPage = 'dashboard' | 'jobs' | 'candidates' | 'interviews' | 'reports' | 'settings';

const navItems: { id: SidebarPage; icon: React.ReactNode; label: string; badge?: number }[] = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
    },
    {
        id: 'jobs',
        label: 'Jobs',
        badge: 5,
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
    },
    {
        id: 'candidates',
        label: 'Candidates',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
    },
    {
        id: 'interviews',
        label: 'Interviews',
        badge: 3,
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
    },
    {
        id: 'reports',
        label: 'Reports',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
            <line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
    },
];

interface SidebarProps {
    isOpenOnMobile: boolean;
    onCloseMobile: () => void;
    activePage: SidebarPage;
    onPageChange: (page: SidebarPage) => void;
}

export default function Sidebar({ isOpenOnMobile, onCloseMobile, activePage, onPageChange }: SidebarProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const collapsed = !isExpanded && !isOpenOnMobile;

    return (
        <>
            {/* Mobile overlay */}
            {isOpenOnMobile && (
                <div
                    className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
                    onClick={onCloseMobile}
                />
            )}

            <aside
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
                className={`
                    fixed md:sticky left-0 top-0 h-[100dvh] flex flex-col shrink-0 z-50
                    bg-white border-r border-slate-200
                    transition-all duration-300 ease-in-out overflow-hidden
                    ${isOpenOnMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    w-[240px] ${collapsed ? 'md:w-[64px]' : 'md:w-[240px]'}
                `}
                style={{ boxShadow: '1px 0 0 #E2E8F0' }}
            >
                {/* Logo */}
                <div className={`flex items-center border-b border-slate-200 h-16 shrink-0 ${collapsed ? 'justify-center px-4' : 'px-5 gap-3'}`}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-blue-600">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                    </div>
                    {!collapsed && (
                        <div className="leading-none animate-fade-in overflow-hidden">
                            <p className="text-sm font-bold text-slate-900 whitespace-nowrap">TheHireHub<span className="text-blue-600">.AI</span></p>
                            <p className="text-[10px] text-slate-400 mt-0.5 font-medium whitespace-nowrap">Recruitment Platform</p>
                        </div>
                    )}
                </div>

                {/* Nav */}
                <nav className="flex-1 py-4 px-2.5 space-y-0.5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {!collapsed && (
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 pb-2 pt-1 animate-fade-in">
                            Main Menu
                        </p>
                    )}
                    {navItems.map(item => {
                        const isActive = activePage === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => { onPageChange(item.id); onCloseMobile(); }}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative
                                    ${isActive
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }
                                    ${collapsed ? 'justify-center' : ''}
                                `}
                                title={collapsed ? item.label : ''}
                            >
                                {isActive && (
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-blue-600" />
                                )}
                                <span className={`shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'} transition-colors`}>
                                    {item.icon}
                                </span>
                                {!collapsed && (
                                    <>
                                        <span className="flex-1 text-left animate-fade-in tracking-tight">{item.label}</span>
                                        {item.badge && (
                                            <span className={`text-[10px] font-bold rounded-full px-1.5 py-0.5 leading-none animate-fade-in
                                                ${isActive ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                                                {item.badge}
                                            </span>
                                        )}
                                    </>
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Bottom: Settings + User */}
                <div className="px-2.5 pb-4 border-t border-slate-200 pt-3 space-y-0.5">
                    <button
                        onClick={() => onPageChange('settings')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                            ${activePage === 'settings' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                            ${collapsed ? 'justify-center' : ''}
                        `}
                        title={collapsed ? 'Settings' : ''}
                    >
                        <span className={`shrink-0 ${activePage === 'settings' ? 'text-blue-600' : 'text-slate-400'}`}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="3"/>
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                            </svg>
                        </span>
                        {!collapsed && <span className="animate-fade-in">Settings</span>}
                    </button>

                    {/* User */}
                    <div className={`flex items-center mt-2 px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all group ${collapsed ? 'justify-center' : 'gap-3'}`}>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white bg-blue-600">
                            SC
                        </div>
                        {!collapsed && (
                            <div className="min-w-0 flex-1 animate-fade-in">
                                <p className="text-sm font-semibold text-slate-800 truncate leading-tight">Sarah Chen</p>
                                <p className="text-[11px] text-slate-400 truncate mt-0.5">Admin · HR Lead</p>
                            </div>
                        )}
                        {!collapsed && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400 group-hover:text-blue-500 shrink-0 transition-colors">
                                <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
                            </svg>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}