// Dashboard Page — Overview with KPIs, pipeline funnel, recent activity

const stats = [
    { label: 'Total Candidates', value: '124', change: '+12%', up: true, color: 'blue', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
    ), bg: 'rgba(37,99,235,0.08)' },
    { label: 'Active Roles', value: '8', change: '+2', up: true, color: 'emerald', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
    ), bg: 'rgba(16,185,129,0.08)' },
    { label: 'Interviews This Week', value: '14', change: '+3', up: true, color: 'amber', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
    ), bg: 'rgba(245,158,11,0.08)' },
    { label: 'Avg. Time to Hire', value: '18d', change: '-2d', up: true, color: 'violet', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
    ), bg: 'rgba(124,58,237,0.08)' },
];

const pipelineData = [
    { stage: 'Applied', count: 124, pct: 100, color: '#3B82F6' },
    { stage: 'Shortlisted', count: 67, pct: 54, color: '#8B5CF6' },
    { stage: 'Interview', count: 34, pct: 27, color: '#F59E0B' },
    { stage: 'Offered', count: 12, pct: 10, color: '#10B981' },
    { stage: 'Hired', count: 6, pct: 5, color: '#16A34A' },
];

const recentActivity = [
    { name: 'Aisha Patel', action: 'moved to Interview stage', time: '2m ago', avatar: 'AP', color: 'bg-blue-500' },
    { name: 'Liam Nguyen', action: 'received an offer letter', time: '1h ago', avatar: 'LN', color: 'bg-rose-500' },
    { name: 'Lucas Brown', action: 'completed technical round', time: '3h ago', avatar: 'LB', color: 'bg-violet-500' },
    { name: 'Priya Sharma', action: 'applied for Senior Backend role', time: '5h ago', avatar: 'PS', color: 'bg-emerald-500' },
    { name: 'Marcus Webb', action: 'scheduled final interview', time: '1d ago', avatar: 'MW', color: 'bg-amber-500' },
    { name: 'Sofia Reyes', action: 'was shortlisted', time: '1d ago', avatar: 'SR', color: 'bg-sky-500' },
];

const topJobs = [
    { title: 'Senior Frontend Engineer', dept: 'Engineering', applicants: 124, open: 3, fill: 78 },
    { title: 'Product Designer', dept: 'Design', applicants: 88, open: 2, fill: 62 },
    { title: 'Data Scientist', dept: 'ML / AI', applicants: 61, open: 1, fill: 45 },
    { title: 'Backend Engineer', dept: 'Engineering', applicants: 97, open: 4, fill: 55 },
];

import { useToast } from './ToastProvider';

export default function DashboardPage() {
    const { showToast } = useToast();

    return (
        <main className="flex-1 overflow-y-auto px-4 md:px-6 py-5 space-y-5">
            {/* KPI Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map(s => (
                    <div key={s.label} className="card p-4 flex items-center gap-3.5 hover:shadow-md transition-shadow group">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 group-hover:scale-105 transition-transform"
                            style={{ background: s.bg }}>
                            {s.icon}
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                            <div className="flex items-baseline gap-2 mt-0.5">
                                <p className="text-xl font-bold text-slate-900">{s.value}</p>
                                <span className={`text-xs font-semibold ${s.up ? 'text-emerald-600' : 'text-red-500'}`}>{s.change}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Pipeline Funnel */}
                <div className="card p-5 lg:col-span-1">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-slate-800">Hiring Funnel</h2>
                        <span className="text-xs text-slate-400">This month</span>
                    </div>
                    <div className="space-y-2.5">
                        {pipelineData.map(d => (
                            <div key={d.stage}>
                                <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="font-medium text-slate-700">{d.stage}</span>
                                    <span className="font-bold text-slate-900">{d.count}</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full transition-all duration-700"
                                        style={{ width: `${d.pct}%`, background: d.color }} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs text-slate-500">Conversion rate</span>
                        <span className="text-xs font-bold text-blue-600">4.8%</span>
                    </div>
                </div>

                {/* Top Active Jobs */}
                <div className="card p-5 lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-slate-800">Active Job Openings</h2>
                        <button 
                            onClick={() => showToast('Navigating to All Jobs...', 'info')}
                            className="text-xs text-blue-600 font-medium hover:underline"
                        >View all</button>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {topJobs.map(j => (
                            <div key={j.title} className="py-3 flex items-center gap-4">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-slate-800 truncate">{j.title}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">{j.dept} · {j.open} open position{j.open > 1 ? 's' : ''}</p>
                                </div>
                                <div className="w-28 shrink-0">
                                    <div className="flex items-center justify-between text-xs mb-1">
                                        <span className="text-slate-400">{j.applicants} applicants</span>
                                    </div>
                                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full rounded-full bg-blue-500"
                                            style={{ width: `${j.fill}%` }} />
                                    </div>
                                </div>
                                <button 
                                    onClick={() => showToast(`Opening pipeline for ${j.title}`, 'success')}
                                    className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors"
                                >
                                    View
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="card p-5">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-slate-800">Recent Activity</h2>
                    <button 
                        onClick={() => showToast('Loading full activity log...', 'info')}
                        className="text-xs text-blue-600 font-medium hover:underline"
                    >View all</button>
                </div>
                <div className="divide-y divide-slate-100">
                    {recentActivity.map((a, i) => (
                        <div key={i} className="py-3 flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${a.color}`}>
                                {a.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-slate-700">
                                    <span className="font-semibold text-slate-900">{a.name}</span>
                                    {' '}{a.action}
                                </p>
                            </div>
                            <span className="text-xs text-slate-400 shrink-0 mt-0.5">{a.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
