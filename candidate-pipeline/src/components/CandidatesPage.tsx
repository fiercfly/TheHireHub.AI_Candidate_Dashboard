// Candidates Page — Full directory of all candidates across all roles

const allCandidates = [
    { id: 'c1', name: 'Aisha Patel', avatar: 'AP', color: 'bg-blue-500', role: 'Lead Frontend Engineer', company: 'Stripe', exp: 7, score: 96, stage: 'Interview', status: 'Active', applied: 'Mar 1', job: 'Senior Frontend Engineer', location: 'San Francisco, CA' },
    { id: 'c2', name: 'Liam Nguyen', avatar: 'LN', color: 'bg-rose-500', role: 'Staff Engineer', company: 'Shopify', exp: 10, score: 92, stage: 'Offered', status: 'Active', applied: 'Feb 28', job: 'Senior Frontend Engineer', location: 'Vancouver, BC' },
    { id: 'c3', name: 'Lucas Brown', avatar: 'LB', color: 'bg-violet-500', role: 'Senior Engineer', company: 'Airbnb', exp: 6, score: 91, stage: 'Interview', status: 'Active', applied: 'Mar 2', job: 'Backend Engineer', location: 'New York, NY' },
    { id: 'c4', name: 'Priya Sharma', avatar: 'PS', color: 'bg-emerald-500', role: 'ML Engineer', company: 'DeepMind', exp: 4, score: 89, stage: 'Applied', status: 'Active', applied: 'Mar 5', job: 'Data Scientist', location: 'London, UK' },
    { id: 'c5', name: 'Marcus Webb', avatar: 'MW', color: 'bg-amber-500', role: 'Senior Designer', company: 'Figma', exp: 5, score: 87, stage: 'Shortlisted', status: 'Active', applied: 'Mar 3', job: 'Product Designer', location: 'Seattle, WA' },
    { id: 'c6', name: 'Sofia Reyes', avatar: 'SR', color: 'bg-sky-500', role: 'Full Stack Developer', company: 'Vercel', exp: 3, score: 85, stage: 'Shortlisted', status: 'Active', applied: 'Mar 4', job: 'Senior Frontend Engineer', location: 'Austin, TX' },
    { id: 'c7', name: 'David Kim', avatar: 'DK', color: 'bg-indigo-500', role: 'Data Analyst', company: 'Tableau', exp: 3, score: 82, stage: 'Applied', status: 'Active', applied: 'Mar 6', job: 'Data Scientist', location: 'Chicago, IL' },
    { id: 'c8', name: 'Emma Wilson', avatar: 'EW', color: 'bg-pink-500', role: 'UI/UX Designer', company: 'Adobe', exp: 6, score: 90, stage: 'Interview', status: 'Active', applied: 'Mar 1', job: 'Product Designer', location: 'San Jose, CA' },
    { id: 'c9', name: 'James Lee', avatar: 'JL', color: 'bg-teal-500', role: 'Backend Dev', company: 'Netflix', exp: 8, score: 88, stage: 'Offered', status: 'Active', applied: 'Feb 27', job: 'Backend Engineer', location: 'Los Angeles, CA' },
    { id: 'c10', name: 'Fatima Al-Hassan', avatar: 'FA', color: 'bg-orange-500', role: 'React Developer', company: 'Atlassian', exp: 4, score: 86, stage: 'Hired', status: 'Active', applied: 'Feb 20', job: 'Senior Frontend Engineer', location: 'Sydney, AU' },
];

const stageBadge: Record<string, string> = {
    Applied:     'bg-blue-50 text-blue-700 border-blue-200',
    Shortlisted: 'bg-violet-50 text-violet-700 border-violet-200',
    Interview:   'bg-amber-50 text-amber-700 border-amber-200',
    Offered:     'bg-emerald-50 text-emerald-700 border-emerald-200',
    Hired:       'bg-green-50 text-green-700 border-green-200',
};

const ScoreBar = ({ score }: { score: number }) => {
    const color = score >= 90 ? '#10B981' : score >= 80 ? '#3B82F6' : '#F59E0B';
    return (
        <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${score}%`, background: color }} />
            </div>
            <span className="text-xs font-bold min-w-[28px]" style={{ color }}>{score}%</span>
        </div>
    );
};

import { useState } from 'react';
import { useToast } from './ToastProvider';

export default function CandidatesPage() {
    const { showToast } = useToast();
    const [activeStage, setActiveStage] = useState('All');

    const stages = [
        { label: 'All', count: 10 },
        { label: 'Applied', count: 2 },
        { label: 'Shortlisted', count: 2 },
        { label: 'Interview', count: 3 },
        { label: 'Offered', count: 2 },
        { label: 'Hired', count: 1 },
    ];

    return (
        <main className="flex-1 overflow-y-auto px-4 md:px-6 py-5 space-y-4">
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h2 className="text-base font-bold text-slate-900">All Candidates</h2>
                    <p className="text-xs text-slate-500 mt-0.5">{allCandidates.length} candidates across all active roles</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        <input type="text" placeholder="Search candidates..." className="b2b-input pl-8 pr-4 py-2 text-sm rounded-lg w-52" />
                    </div>
                    <div className="relative">
                        <select className="b2b-input appearance-none pl-3 pr-8 py-2 text-sm rounded-lg cursor-pointer">
                            <option>All Roles</option>
                            <option>Senior Frontend Engineer</option>
                            <option>Backend Engineer</option>
                            <option>Data Scientist</option>
                            <option>Product Designer</option>
                        </select>
                        <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                </div>
            </div>

            {/* Stage summary chips */}
            <div className="flex flex-wrap gap-2">
                {stages.map(s => {
                    const isActive = s.label === activeStage;
                    return (
                        <button 
                            key={s.label} 
                            onClick={() => {
                                setActiveStage(s.label);
                                showToast(`Filtered candidates by stage: ${s.label}`, 'info');
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${isActive ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700'}`}
                        >
                            {s.label}
                            <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${isActive ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>{s.count}</span>
                        </button>
                    );
                })}
            </div>

            {/* Table */}
            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead className="border-b border-slate-100 bg-slate-50">
                            <tr>
                                {['Candidate', 'Applied For', 'Experience', 'Match Score', 'Stage', 'Applied', 'Actions'].map(h => (
                                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {allCandidates.map(c => (
                                <tr key={c.id} className="hover:bg-blue-50/40 cursor-pointer transition-colors">
                                    <td className="px-4 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${c.color}`}>{c.avatar}</div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-900">{c.name}</p>
                                                <p className="text-xs text-slate-400">{c.role} · {c.company}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3.5">
                                        <p className="text-sm text-slate-700 font-medium truncate max-w-[160px]">{c.job}</p>
                                        <p className="text-xs text-slate-400">{c.location}</p>
                                    </td>
                                    <td className="px-4 py-3.5">
                                        <span className="inline-flex px-2 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-600">{c.exp} yrs</span>
                                    </td>
                                    <td className="px-4 py-3.5 min-w-[120px]">
                                        <ScoreBar score={c.score} />
                                    </td>
                                    <td className="px-4 py-3.5">
                                        <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full border ${stageBadge[c.stage]}`}>{c.stage}</span>
                                    </td>
                                    <td className="px-4 py-3.5">
                                        <span className="text-xs text-slate-400">{c.applied}</span>
                                    </td>
                                    <td className="px-4 py-3.5">
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                showToast(`Opening drawer for ${c.name}`, 'success');
                                            }}
                                            className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                                        >View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
