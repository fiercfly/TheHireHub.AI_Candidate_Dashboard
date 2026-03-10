
import type { Job } from '../types';

interface Props { job: Job; loading?: boolean }

const StatCard = ({ icon, label, value, accentColor }: { icon: React.ReactNode; label: string; value: string | number; accentColor: string }) => (
    <div className="flex items-center gap-4 p-4 glass-panel rounded-xl hover:border-white/20 transition-all group">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/5 group-hover:scale-105 transition-transform"
            style={{ background: `color-mix(in srgb, ${accentColor} 15%, transparent)`, boxShadow: `0 0 10px ${accentColor}` }}>
            {icon}
        </div>
        <div>
            <p className="text-xs text-white/50 font-medium">{label}</p>
            <p className="text-lg font-bold text-white mt-0.5">{value}</p>
        </div>
    </div>
);

export default function JobOverview({ job, loading = false }: Props) {
    const daysSincePosted = Math.floor((Date.now() - new Date(job.postedAt).getTime()) / 86400000);

    if (loading) {
        return (
            <div className="glass-panel overflow-hidden rounded-2xl">
                <div className="px-6 py-5 border-b border-white/5 bg-white/[0.02] flex items-start gap-4 flex-wrap">
                    <div className="skeleton-dark w-12 h-12 rounded-xl shrink-0" />
                    <div className="flex-1 space-y-3 mt-1 min-w-[200px]">
                        <div className="flex items-center gap-3">
                            <div className="skeleton-dark h-7 w-48 rounded-lg" />
                            <div className="skeleton-dark h-5 w-20 rounded-full" />
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                            <div className="skeleton-dark h-4 w-24 rounded" />
                            <div className="skeleton-dark h-4 w-24 rounded" />
                            <div className="skeleton-dark h-4 w-32 rounded" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-5">
                    {[1, 2, 3, 4].map(key => (
                        <div key={key} className="flex items-center gap-4 p-4 glass-panel rounded-xl">
                            <div className="skeleton-dark w-10 h-10 rounded-xl shrink-0" />
                            <div className="flex-1 space-y-2">
                                <div className="skeleton-dark h-3 w-20 rounded" />
                                <div className="skeleton-dark h-5 w-12 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="glass-panel overflow-hidden animate-fade-in rounded-2xl">
            {/* Banner */}
            <div className="px-4 md:px-6 py-4 md:py-5 border-b border-white/5 bg-white/[0.02]">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-4">
                    <div className="flex items-start gap-3 md:gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 bg-yellow-400/10 border border-yellow-400/20 shadow-[0_0_15px_rgba(250,204,21,0.15)]">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary-yellow)" strokeWidth="2">
                                <rect x="2" y="7" width="20" height="14" rx="2" />
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                            </svg>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h2 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                                    {job.title}
                                </h2>
                                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-yellow-400/20 text-yellow-500 border border-yellow-500/20 uppercase tracking-widest">
                                    {job.type}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-white/50 flex-wrap mt-2">
                                <span className="flex items-center gap-1.5">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                                        <line x1="7" y1="7" x2="7.01" y2="7" />
                                    </svg>
                                    {job.department}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    {job.location}
                                </span>
                                <span className="flex items-center gap-1.5 text-white/30">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                    Posted {daysSincePosted} days ago
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto pt-2 md:pt-0 border-t border-white/5 md:border-0 mt-2 md:mt-0">
                        <button className="flex-1 md:flex-none px-3 py-2 md:py-1.5 rounded-lg text-xs font-semibold text-white hover:bg-white/10 transition-colors border border-white/10 glass-panel">
                            Edit Job
                        </button>
                        <button className="flex-1 md:flex-none px-3 py-2 md:py-1.5 rounded-lg text-xs font-bold text-black bg-yellow-400 hover:brightness-110 shadow-[0_0_10px_rgba(250,204,21,0.2)] transition-all">
                            View Details
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-5">
                <StatCard
                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>}
                    label="Total Applicants"
                    value={job.totalApplicants}
                    accentColor="#38BDF8"
                />
                <StatCard
                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>}
                    label="Open Positions"
                    value={job.openPositions}
                    accentColor="#10B981"
                />
                <StatCard
                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>}
                    label="Hiring Manager"
                    value={job.hiringManager}
                    accentColor="#F59E0B"
                />
                <StatCard
                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>}
                    label="In Interviews"
                    value={3}
                    accentColor="#A78BFA"
                />
            </div>
        </div>
    );
}
