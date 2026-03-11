// Reports Page — Analytics with CSS bar charts, funnel metrics, sourcing breakdown

const monthlyHires = [
    { month: 'Sep', value: 2 }, { month: 'Oct', value: 4 }, { month: 'Nov', value: 3 },
    { month: 'Dec', value: 1 }, { month: 'Jan', value: 5 }, { month: 'Feb', value: 6 }, { month: 'Mar', value: 3 },
];
const maxBar = Math.max(...monthlyHires.map(d => d.value));

const sourcingData = [
    { source: 'LinkedIn', count: 54, pct: 44, color: '#0A66C2' },
    { source: 'Referrals', count: 31, pct: 25, color: '#10B981' },
    { source: 'Job Boards', count: 22, pct: 18, color: '#F59E0B' },
    { source: 'Career Page', count: 12, pct: 10, color: '#8B5CF6' },
    { source: 'Others', count: 5, pct: 4, color: '#94A3B8' },
];

const roleMetrics = [
    { role: 'Senior Frontend Engineer', applied: 124, shortlisted: 34, interviews: 14, offers: 3, hires: 2, ttf: 22 },
    { role: 'Backend Engineer', applied: 97, shortlisted: 28, interviews: 10, offers: 2, hires: 1, ttf: 28 },
    { role: 'Product Designer', applied: 88, shortlisted: 22, interviews: 8, offers: 2, hires: 1, ttf: 18 },
    { role: 'Data Scientist', applied: 61, shortlisted: 15, interviews: 5, offers: 1, hires: 0, ttf: null },
];

const kpis = [
    { label: 'Offer Acceptance Rate', value: '83%', sub: '5 of 6 offers accepted', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { label: 'Avg. Time to Hire', value: '18d', sub: '↓ 2 days vs last month', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
    { label: 'Interview-to-Offer', value: '35%', sub: '12 offers from 34 interviews', color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200' },
    { label: 'Cost per Hire', value: '$4.2k', sub: '↓ 8% from last quarter', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
];

export default function ReportsPage() {
    return (
        <main className="flex-1 overflow-y-auto px-4 md:px-6 py-5 space-y-5">
            {/* KPI tiles */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map(k => (
                    <div key={k.label} className={`card p-4 border ${k.border} ${k.bg}`}>
                        <p className={`text-xs font-semibold ${k.color} uppercase tracking-wide mb-1`}>{k.label}</p>
                        <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
                        <p className="text-xs text-slate-500 mt-1">{k.sub}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Bar chart — Monthly Hires */}
                <div className="card p-5 lg:col-span-2">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-sm font-semibold text-slate-800">Hires per Month</h2>
                        <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-0.5">
                            {['3M', '6M', '1Y'].map((t, i) => (
                                <button key={t} className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${i === 1 ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-800'}`}>{t}</button>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-end gap-2 h-36">
                        {monthlyHires.map(d => (
                            <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                                <span className="text-xs font-bold text-blue-600">{d.value}</span>
                                <div className="w-full rounded-t-md bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer"
                                    style={{ height: `${(d.value / maxBar) * 100}%`, minHeight: 4 }} />
                                <span className="text-[10px] text-slate-400 font-medium">{d.month}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span>Total: <span className="font-bold text-slate-800">24 hires</span></span>
                        <span className="text-emerald-600 font-semibold">↑ 40% YoY</span>
                    </div>
                </div>

                {/* Sourcing Breakdown */}
                <div className="card p-5">
                    <h2 className="text-sm font-semibold text-slate-800 mb-4">Candidate Sources</h2>
                    <div className="space-y-3">
                        {sourcingData.map(s => (
                            <div key={s.source}>
                                <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="font-medium text-slate-700">{s.source}</span>
                                    <span className="text-slate-500">{s.count} · <span className="font-bold" style={{ color: s.color }}>{s.pct}%</span></span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full transition-all"
                                        style={{ width: `${s.pct}%`, background: s.color }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Role Metrics Table */}
            <div className="card overflow-hidden">
                <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <h2 className="text-sm font-semibold text-slate-800">Metrics by Role</h2>
                    <button className="text-xs text-blue-600 font-medium hover:underline">Export CSV</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead className="border-b border-slate-100">
                            <tr>
                                {['Role', 'Applied', 'Shortlisted', 'Interviews', 'Offers', 'Hires', 'Time to Fill'].map(h => (
                                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {roleMetrics.map(r => (
                                <tr key={r.role} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-3.5 text-sm font-semibold text-slate-800">{r.role}</td>
                                    <td className="px-4 py-3.5 text-sm text-slate-700">{r.applied}</td>
                                    <td className="px-4 py-3.5">
                                        <span className="text-sm text-slate-700">{r.shortlisted}</span>
                                        <span className="ml-1.5 text-xs text-slate-400">({Math.round(r.shortlisted/r.applied*100)}%)</span>
                                    </td>
                                    <td className="px-4 py-3.5 text-sm text-slate-700">{r.interviews}</td>
                                    <td className="px-4 py-3.5 text-sm text-slate-700">{r.offers}</td>
                                    <td className="px-4 py-3.5">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${r.hires > 0 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                                            {r.hires > 0 ? `${r.hires} hired` : 'In progress'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3.5 text-sm text-slate-700">{r.ttf ? `${r.ttf}d` : '—'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
