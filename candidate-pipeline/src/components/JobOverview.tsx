import type { Job } from '../types';

interface Props { job: Job; loading?: boolean }

const StatCard = ({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string | number; accent: string }) => (
    <div className="card p-4 flex items-center gap-3.5 hover:shadow-md transition-shadow group">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 group-hover:scale-105 transition-transform"
            style={{ background: accent }}>
            {icon}
        </div>
        <div>
            <p className="text-xs text-slate-500 font-medium">{label}</p>
            <p className="text-lg font-bold text-slate-900 mt-0.5 leading-none">{value}</p>
        </div>
    </div>
);

export default function JobOverview({ job, loading = false }: Props) {
    const daysSincePosted = Math.floor((Date.now() - new Date(job.postedAt).getTime()) / 86400000);

    if (loading) {
        return (
            <div className="card overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex items-start gap-4 flex-wrap">
                    <div className="skeleton-light w-12 h-12 rounded-xl shrink-0" />
                    <div className="flex-1 space-y-3 mt-1 min-w-[200px]">
                        <div className="flex items-center gap-3">
                            <div className="skeleton-light h-6 w-52 rounded" />
                            <div className="skeleton-light h-5 w-20 rounded-full" />
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                            <div className="skeleton-light h-4 w-24 rounded" />
                            <div className="skeleton-light h-4 w-24 rounded" />
                            <div className="skeleton-light h-4 w-32 rounded" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-5">
                    {[1,2,3,4].map(k => (
                        <div key={k} className="card p-4 flex items-center gap-3">
                            <div className="skeleton-light w-10 h-10 rounded-xl shrink-0" />
                            <div className="flex-1 space-y-2">
                                <div className="skeleton-light h-3 w-20 rounded" />
                                <div className="skeleton-light h-5 w-12 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="card overflow-hidden animate-fade-in">
            {/* Banner */}
            <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3.5">
                        {/* Job icon */}
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-blue-600">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                <rect x="2" y="7" width="20" height="14" rx="2"/>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                            </svg>
                        </div>
                        <div>
                            <div className="flex items-center gap-2.5 flex-wrap">
                                <h2 className="text-base font-bold text-slate-900">{job.title}</h2>
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-widest">
                                    {job.type}
                                </span>
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-widest">
                                    Active
                                </span>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap mt-1.5">
                                <span className="flex items-center gap-1.5">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                                        <line x1="7" y1="7" x2="7.01" y2="7"/>
                                    </svg>
                                    {job.department}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/>
                                        <circle cx="12" cy="10" r="3"/>
                                    </svg>
                                    {job.location}
                                </span>
                                <span className="flex items-center gap-1.5 text-slate-400">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <polyline points="12 6 12 12 16 14"/>
                                    </svg>
                                    Posted {daysSincePosted} days ago
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* CTA buttons */}
                    <div className="flex items-center gap-2 sm:shrink-0">
                        <button className="btn-secondary px-3 py-1.5 text-xs">Edit Job</button>
                        <button className="btn-primary px-3 py-1.5 text-xs">View Details</button>
                    </div>
                </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-5">
                <StatCard
                    icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>}
                    label="Total Applicants" value={job.totalApplicants} accent="rgba(37,99,235,0.08)"
                />
                <StatCard
                    icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>}
                    label="Open Positions" value={job.openPositions} accent="rgba(16,185,129,0.08)"
                />
                <StatCard
                    icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>}
                    label="Hiring Manager" value={job.hiringManager} accent="rgba(245,158,11,0.08)"
                />
                <StatCard
                    icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>}
                    label="In Interviews" value={3} accent="rgba(124,58,237,0.08)"
                />
            </div>
        </div>
    );
}
