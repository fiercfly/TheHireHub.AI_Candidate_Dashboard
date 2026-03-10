import { useState } from 'react';

const Logo = () => (
    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 neon-yellow-border border transition-all duration-300"
        style={{
            background: 'linear-gradient(135deg, rgba(250,204,21,0.15) 0%, rgba(202,138,4,0.05) 100%)',
            boxShadow: '0 0 15px rgba(250, 204, 21, 0.1)'
        }}>
        <img
            src="https://www.thehirehub.ai/landing-page/ai.png"
            alt="TheHireHub Logo"
            className="w-6 h-6 object-contain"
        />
    </div>
);

interface NavItem { icon: React.ReactNode; label: string; active?: boolean; badge?: number; }

const navItems: NavItem[] = [
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>, label: 'Dashboard' },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>, label: 'Jobs', active: true, badge: 5 },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>, label: 'Candidates' },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>, label: 'Interviews', badge: 3 },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>, label: 'Reports' },
];

interface SidebarProps {
    isOpenOnMobile: boolean;
    onCloseMobile: () => void;
}

export default function Sidebar({ isOpenOnMobile, onCloseMobile }: SidebarProps) {
    const [isHovered, setIsHovered] = useState(false);
    const collapsed = !isHovered && !isOpenOnMobile;

    return (
        <>
            {isOpenOnMobile && (
                <div
                    className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
                    onClick={onCloseMobile}
                />
            )}
            <aside
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`
                    fixed md:sticky left-0 top-0 h-[100dvh] flex flex-col shrink-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] 
                    overflow-hidden border-r border-white/5 bg-[#09090b]/95 md:bg-black/40 backdrop-blur-3xl z-50
                    ${isOpenOnMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    w-[260px] ${collapsed ? 'md:w-[80px]' : 'md:w-[260px]'}
                `}
            >
                <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start px-6'} py-8 border-b border-white/5`}>
                    <div className="flex items-center gap-3.5">
                        <Logo />
                        {!collapsed && (
                            <span className="text-white font-extrabold text-lg tracking-tight whitespace-nowrap neon-yellow-text animate-fade-in"
                                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                                TheHireHub.AI
                            </span>
                        )}
                    </div>
                </div>

                {/* Nav - Scrollbar hidden cross-browser */}
                <nav className={`flex-1 py-6 px-3 space-y-1.5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}>
                    {!collapsed && (
                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] px-4 mb-3 mt-2 animate-fade-in">
                            Main Menu
                        </p>
                    )}
                    {navItems.map(item => (
                        <button
                            key={item.label}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all group relative
              ${item.active ? 'text-yellow-400 bg-white/5' : 'text-white/40 hover:text-white hover:bg-white/[0.03]'}
              ${collapsed ? 'justify-center' : ''}`}
                            title={collapsed ? item.label : ''}
                        >
                            {item.active && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-yellow-400 shadow-[0_0_12px_#facc15]" />
                            )}
                            <span className={`${item.active ? 'neon-yellow-text' : 'group-hover:scale-110 transition-transform'}`}>{item.icon}</span>
                            {!collapsed && (
                                <>
                                    <span className="tracking-wide animate-fade-in">{item.label}</span>
                                    {item.badge && (
                                        <span className="ml-auto text-[10px] font-bold bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 rounded-full px-2 py-0.5 leading-none animate-fade-in">
                                            {item.badge}
                                        </span>
                                    )}
                                </>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="px-3 pb-6 space-y-2">
                    <button
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold text-white/40 hover:text-white hover:bg-white/[0.03] transition-all ${collapsed ? 'justify-center' : ''}`}
                        title={collapsed ? 'Settings' : ''}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                        {!collapsed && <span className="animate-fade-in">Settings</span>}
                    </button>

                    <div className={`flex items-center mt-4 px-3 py-3 rounded-2xl bg-white/[0.03] border border-white/5 cursor-pointer hover:bg-white/[0.06] transition-all ${collapsed ? 'justify-center' : 'gap-3'}`}>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-black bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.2)]">
                            SC
                        </div>
                        {!collapsed && (
                            <div className="min-w-0 animate-fade-in">
                                <p className="text-sm font-bold text-white truncate leading-tight">Sarah Chen</p>
                                <p className="text-[11px] text-white/30 truncate mt-0.5">Admin Account</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside >
        </>
    );
}