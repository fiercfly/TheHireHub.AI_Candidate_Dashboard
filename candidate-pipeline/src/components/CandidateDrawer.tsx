import { useState, useEffect } from 'react';
import { type Candidate, STAGE_META, STAGES } from '../types';

interface Props {
    candidate: Candidate | null;
    onClose: () => void;
}

const timeAgo = (dateStr: string): string => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const d = Math.floor(diff / 86400000);
    return d === 0 ? 'Today' : `${d}d ago`;
};

const formatDate = (dateStr?: string) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export default function CandidateDrawer({ candidate, onClose }: Props) {
    const [note, setNote] = useState('');
    const [activeTab, setActiveTab] = useState<'overview' | 'interviews' | 'notes'>('overview');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (candidate) {
            setVisible(true);
            setActiveTab('overview');
            setNote('');
        }
    }, [candidate]);

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 250);
    };

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    if (!candidate) return null;
    const meta = STAGE_META[candidate.stage];
    const stageIdx = STAGES.indexOf(candidate.stage);

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 transition-opacity duration-250"
                style={{ background: 'rgba(0,0,0,0.6)', opacity: visible ? 1 : 0 }}
                onClick={handleClose}
            />

            {/* Drawer panel */}
            <div
                className="fixed right-0 top-0 h-full z-50 flex flex-col bg-[#09090b]/95 backdrop-blur-3xl shadow-2xl transition-transform duration-300 ease-out border-l border-white/10"
                style={{
                    width: 'min(520px, 92vw)',
                    transform: visible ? 'translateX(0)' : 'translateX(100%)',
                }}
            >
                {/* Header */}
                <div className="px-6 py-5 border-b border-white/10 shrink-0">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center text-base font-bold text-black shrink-0 shadow-[0_0_15px_rgba(250,204,21,0.2)] bg-yellow-400"
                            >
                                {candidate.avatar}
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                                    {candidate.name}
                                </h2>
                                <p className="text-sm text-white/50">{candidate.currentRole} · {candidate.company}</p>
                                <div className="flex items-center gap-2 mt-1.5">
                                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full ${meta.bg} ${meta.text} border ${meta.border}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                                        {candidate.stage}
                                    </span>
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${candidate.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-white/5 text-white/50 border border-white/10'}`}>
                                        {candidate.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {/* Match score + pipeline progress */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex-1 bg-white/5 border border-white/5 rounded-xl p-3">
                            <p className="text-xs text-white/50 mb-1">Match Score</p>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full shadow-[0_0_8px_currentColor]" style={{
                                        width: `${candidate.matchScore}%`,
                                        background: candidate.matchScore >= 85 ? '#10B981' : candidate.matchScore >= 70 ? '#F59E0B' : '#94A3B8'
                                    }} />
                                </div>
                                <span className="text-sm font-bold text-white">{candidate.matchScore}%</span>
                            </div>
                        </div>
                        <div className="bg-white/5 border border-white/5 rounded-xl p-3 min-w-[80px] text-center">
                            <p className="text-xs text-white/50 mb-0.5">Experience</p>
                            <p className="text-sm font-bold text-white">{candidate.experience} yrs</p>
                        </div>
                        <div className="bg-white/5 border border-white/5 rounded-xl p-3 min-w-[80px] text-center">
                            <p className="text-xs text-white/50 mb-0.5">Applied</p>
                            <p className="text-sm font-bold text-white">{timeAgo(candidate.appliedAt)}</p>
                        </div>
                    </div>

                    {/* Stage progress bar */}
                    <div>
                        <p className="text-xs text-white/40 mb-2">Hiring Stage Progress</p>
                        <div className="flex gap-1.5">
                            {STAGES.map((s, i) => (
                                <div
                                    key={s}
                                    className="flex-1 h-1.5 rounded-full transition-all"
                                    style={{
                                        background: i <= stageIdx ? STAGE_META[s].dot.replace('bg-', '') === 'blue-400' ? '#60A5FA'
                                            : STAGE_META[s].dot.replace('bg-', '') === 'violet-400' ? '#A78BFA'
                                                : STAGE_META[s].dot.replace('bg-', '') === 'amber-400' ? '#FBBF24'
                                                    : STAGE_META[s].dot.replace('bg-', '') === 'emerald-400' ? '#34D399' : '#FACC15'
                                            : 'rgba(255,255,255,0.1)'
                                    }}
                                />
                            ))}
                        </div>
                        <div className="flex justify-between mt-1">
                            {STAGES.map(s => (
                                <span key={s} className={`text-[9px] font-medium ${s === candidate.stage ? 'neon-yellow-text' : 'text-white/40'}`}>
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-white/10 shrink-0 px-2">
                    {(['overview', 'interviews', 'notes'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-3 text-sm font-semibold transition-all border-b-2 capitalize ${activeTab === tab
                                ? 'border-yellow-400 neon-yellow-text'
                                : 'border-transparent text-white/40 hover:text-white'
                                }`}
                        >
                            {tab}
                            {tab === 'interviews' && candidate.interviewRounds.length > 0 && (
                                <span className="ml-1.5 text-[10px] bg-yellow-400/20 neon-yellow-text rounded-full px-1.5 py-0.5">
                                    {candidate.interviewRounds.length}
                                </span>
                            )}
                            {tab === 'notes' && candidate.notes.length > 0 && (
                                <span className="ml-1.5 text-[10px] bg-yellow-400/20 neon-yellow-text rounded-full px-1.5 py-0.5">
                                    {candidate.notes.length}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-5">
                    {activeTab === 'overview' && (
                        <div className="space-y-5 animate-fade-in">
                            {/* Contact */}
                            <div>
                                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Contact Info</p>
                                <div className="space-y-2.5">
                                    {[
                                        { icon: '📧', label: candidate.email },
                                        { icon: '📱', label: candidate.phone },
                                        { icon: '📍', label: candidate.location },
                                    ].map(({ icon, label }) => (
                                        <div key={label} className="flex items-center gap-3 text-sm">
                                            <span className="text-base">{icon}</span>
                                            <span className="text-white/60">{label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Skills */}
                            <div>
                                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Skills & Technologies</p>
                                <div className="flex flex-wrap gap-2">
                                    {candidate.skills.map(s => {
                                        let sbg = 'bg-white/5 text-white/60 border-white/10';
                                        if (s.color.includes('blue')) sbg = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
                                        else if (s.color.includes('emerald')) sbg = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
                                        else if (s.color.includes('indigo')) sbg = 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
                                        else if (s.color.includes('rose')) sbg = 'bg-rose-500/10 text-rose-400 border-rose-500/20';
                                        return (
                                            <span key={s.name} className={`text-xs font-semibold px-3 py-1.5 rounded-lg border ${sbg}`}>
                                                {s.name}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Quick stats */}
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { label: 'Interviews Done', value: candidate.interviewRounds.filter(r => r.status === 'Completed').length },
                                    { label: 'Notes', value: candidate.notes.length },
                                    { label: 'Days in Pipeline', value: Math.floor((Date.now() - new Date(candidate.appliedAt).getTime()) / 86400000) },
                                ].map(({ label, value }) => (
                                    <div key={label} className="bg-white/5 border border-white/5 rounded-xl p-3.5 text-center">
                                        <p className="text-xl font-bold text-white">{value}</p>
                                        <p className="text-xs text-white/40 mt-0.5">{label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'interviews' && (
                        <div className="space-y-3 animate-fade-in">
                            {candidate.interviewRounds.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-4xl mb-3 opacity-80">🗓️</div>
                                    <p className="font-semibold text-white/60">No interviews scheduled</p>
                                    <p className="text-sm text-white/40 mt-1">Schedule the first round below</p>
                                </div>
                            ) : (
                                candidate.interviewRounds.map((r, i) => {
                                    const statusColors: Record<string, string> = {
                                        Completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                                        Scheduled: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                                        Pending: 'bg-white/5 text-white/50 border-white/10',
                                    };
                                    return (
                                        <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5
                        ${r.status === 'Completed' ? 'bg-emerald-500 text-white' : r.status === 'Scheduled' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/50'}`}>
                                                {r.status === 'Completed' ? '✓' : i + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2 flex-wrap">
                                                    <p className="text-sm font-semibold text-white">{r.round}</p>
                                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${statusColors[r.status]}`}>
                                                        {r.status}
                                                    </span>
                                                </div>
                                                {r.interviewer && <p className="text-xs text-white/50 mt-0.5">Interviewer: {r.interviewer}</p>}
                                                {r.date && <p className="text-xs text-white/40 mt-0.5">{formatDate(r.date)}</p>}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                            <button className="w-full py-2.5 rounded-xl text-sm font-semibold neon-yellow-text bg-yellow-400/10 hover:bg-yellow-400/20 transition-colors border border-yellow-400/20 mt-2">
                                + Schedule Interview Round
                            </button>
                        </div>
                    )}

                    {activeTab === 'notes' && (
                        <div className="space-y-4 animate-fade-in">
                            {candidate.notes.length === 0 && (
                                <div className="text-center py-8">
                                    <div className="text-3xl mb-2 opacity-80">📝</div>
                                    <p className="text-sm text-white/50">No notes yet. Add the first one below.</p>
                                </div>
                            )}
                            {candidate.notes.map(n => (
                                <div key={n.id} className="p-4 glass-panel border border-white/10 rounded-xl">
                                    <div className="flex items-center gap-2.5 mb-2">
                                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-black shrink-0 bg-yellow-400">
                                            {n.avatar}
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-white/80">{n.author}</p>
                                            <p className="text-[11px] text-white/40">{formatDate(n.createdAt)}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-white/80 leading-relaxed">{n.text}</p>
                                </div>
                            ))}

                            {/* Add note */}
                            <div className="mt-4">
                                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Add Note</p>
                                <textarea
                                    value={note}
                                    onChange={e => setNote(e.target.value)}
                                    placeholder="Write your observation or feedback..."
                                    rows={3}
                                    className="w-full px-4 py-3 border border-white/10 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 bg-black/20 resize-none transition-all"
                                />
                                <button
                                    disabled={!note.trim()}
                                    className="mt-2 px-4 py-2 rounded-lg text-sm font-semibold text-black bg-yellow-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 shadow-[0_0_15px_rgba(250,204,21,0.3)] disabled:shadow-none"
                                >
                                    Save Note
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer actions */}
                <div className="px-6 py-4 border-t border-white/10 shrink-0 glass-panel bg-[#09090b]/40 backdrop-blur-md">
                    <div className="flex items-center gap-2.5">
                        <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white/80 glass-panel border border-white/10 hover:bg-white/10 transition-colors">
                            Schedule Interview
                        </button>
                        <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-black transition-all hover:brightness-110 shadow-[0_0_15px_rgba(250,204,21,0.3)] bg-yellow-400">
                            Move to Next Stage →
                        </button>
                        <button className="py-2.5 px-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors border border-red-500/20">
                            Reject
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
