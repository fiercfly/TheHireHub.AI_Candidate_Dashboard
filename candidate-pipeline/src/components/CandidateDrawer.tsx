import { useState, useEffect } from 'react';
import { type Candidate, type Note, STAGE_META, STAGES } from '../types';

interface Props {
    candidate: Candidate | null;
    onClose: () => void;
    onUpdateCandidate: (candidate: Candidate) => void;
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

const avatarColors = ['bg-blue-500', 'bg-violet-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-sky-500'];
const getAvatarColor = (initials: string) => avatarColors[initials.charCodeAt(0) % avatarColors.length];

export default function CandidateDrawer({ candidate, onClose, onUpdateCandidate }: Props) {
    const [note, setNote] = useState('');
    const [activeTab, setActiveTab] = useState<'overview' | 'interviews' | 'notes'>('overview');
    const [visible, setVisible] = useState(false);
    const [savedNotes, setSavedNotes] = useState<{ id: string; text: string; author: string; createdAt: string }[]>([]);

    useEffect(() => {
        if (candidate) {
            setVisible(true);
            setActiveTab('overview');
            setNote('');
        }
    }, [candidate]);

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 280);
    };

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    const handleSaveNote = () => {
        if (!note.trim()) return;
        const newNote: Note = { 
            id: Date.now().toString(), 
            text: note.trim(), 
            author: 'Sarah Chen', 
            avatar: 'SC',
            createdAt: new Date().toISOString() 
        };
        setSavedNotes(prev => [...prev, newNote]);
        setNote('');
        
        if (candidate) {
            onUpdateCandidate({
                ...candidate,
                notes: [...(candidate.notes || []), newNote]
            });
        }
    };

    const handleStageChange = (newStage: string) => {
        if (candidate) {
            onUpdateCandidate({ ...candidate, stage: newStage as any });
        }
    };

    const handleStatusChange = (newStatus: string) => {
        if (candidate) {
            onUpdateCandidate({ ...candidate, status: newStatus as any });
        }
    };

    const handleMoveForward = () => {
        if (!candidate) return;
        const nextIdx = stageIdx + 1;
        if (nextIdx < STAGES.length) {
            handleStageChange(STAGES[nextIdx]);
        }
    };

    if (!candidate) return null;

    const meta = STAGE_META[candidate.stage];
    const stageIdx = STAGES.indexOf(candidate.stage);
    const allNotes = [...(candidate.notes || []), ...savedNotes];

    const stageColors: Record<string, string> = {
        Applied: '#3B82F6',
        Shortlisted: '#8B5CF6',
        Interview: '#F59E0B',
        Offered: '#10B981',
        Hired: '#16A34A',
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 transition-opacity duration-280"
                style={{ background: 'rgba(15,23,42,0.35)', backdropFilter: 'blur(2px)', opacity: visible ? 1 : 0 }}
                onClick={handleClose}
            />

            {/* Drawer */}
            <div
                className="fixed right-0 top-0 h-full z-50 flex flex-col bg-white shadow-2xl border-l border-slate-200 transition-transform duration-280 ease-out"
                style={{
                    width: 'min(520px, 96vw)',
                    transform: visible ? 'translateX(0)' : 'translateX(100%)',
                }}
            >
                {/* Header */}
                <div className="px-6 py-5 border-b border-slate-200 shrink-0 bg-slate-50/80">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3.5">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-base font-bold text-white shrink-0 ${getAvatarColor(candidate.avatar)}`}>
                                {candidate.avatar}
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-slate-900">{candidate.name}</h2>
                                <p className="text-sm text-slate-500">{candidate.currentRole} · {candidate.company}</p>
                                <div className="flex items-center gap-2 mt-1.5 font-sans">
                                    <div className="relative group/select">
                                        <select 
                                            value={candidate.stage}
                                            onChange={(e) => handleStageChange(e.target.value)}
                                            className={`appearance-none pl-2.5 pr-8 py-1 text-[11px] font-bold rounded-full border cursor-pointer outline-none transition-all ${meta.bg} ${meta.text} ${meta.border} hover:shadow-sm focus:ring-2 focus:ring-blue-100`}
                                        >
                                            {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                        <svg className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
                                    </div>
                                    <div className="relative">
                                        <select 
                                            value={candidate.status}
                                            onChange={(e) => handleStatusChange(e.target.value)}
                                            className={`appearance-none pl-2.5 pr-8 py-1 text-[11px] font-bold rounded-full border cursor-pointer outline-none transition-all ${candidate.status === 'Active'
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 focus:ring-emerald-100'
                                                : 'bg-slate-100 text-slate-600 border-slate-200 focus:ring-slate-100'} hover:shadow-sm`}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                            <option value="Withdrawn">Withdrawn</option>
                                        </select>
                                        <svg className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-all"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>

                    {/* Stats row */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex-1 bg-white border border-slate-200 rounded-lg p-3">
                            <p className="text-xs text-slate-500 mb-1.5">Match Score</p>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full transition-all duration-500"
                                        style={{
                                            width: `${candidate.matchScore}%`,
                                            background: candidate.matchScore >= 85 ? '#10B981' : candidate.matchScore >= 70 ? '#F59E0B' : '#94A3B8'
                                        }} />
                                </div>
                                <span className="text-sm font-bold text-slate-900">{candidate.matchScore}%</span>
                            </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-lg p-3 min-w-[80px] text-center">
                            <p className="text-xs text-slate-500 mb-0.5">Experience</p>
                            <p className="text-sm font-bold text-slate-900">{candidate.experience} yrs</p>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-lg p-3 min-w-[80px] text-center">
                            <p className="text-xs text-slate-500 mb-0.5">Applied</p>
                            <p className="text-sm font-bold text-slate-900">{timeAgo(candidate.appliedAt)}</p>
                        </div>
                    </div>

                    {/* Stage progress */}
                    <div>
                        <p className="text-xs text-slate-500 mb-2 font-medium">Hiring Stage Progress</p>
                        <div className="flex gap-1.5">
                            {STAGES.map((s, i) => (
                                <div key={s} className="flex-1 h-1.5 rounded-full transition-all"
                                    style={{ background: i <= stageIdx ? (stageColors[s] ?? '#94A3B8') : '#E2E8F0' }}
                                />
                            ))}
                        </div>
                        <div className="flex justify-between mt-1.5">
                            {STAGES.map(s => (
                                <span key={s} className={`text-[9px] font-semibold ${s === candidate.stage ? 'text-blue-600' : 'text-slate-400'}`}>
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-slate-200 shrink-0 px-2 bg-white">
                    {(['overview', 'interviews', 'notes'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-3 text-sm font-semibold transition-all border-b-2 capitalize ${activeTab === tab
                                ? 'border-blue-600 text-blue-700'
                                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                                }`}
                        >
                            {tab}
                            {tab === 'interviews' && candidate.interviewRounds.length > 0 && (
                                <span className={`ml-1.5 text-[10px] font-bold rounded-full px-1.5 py-0.5 ${activeTab === tab ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                                    {candidate.interviewRounds.length}
                                </span>
                            )}
                            {tab === 'notes' && allNotes.length > 0 && (
                                <span className={`ml-1.5 text-[10px] font-bold rounded-full px-1.5 py-0.5 ${activeTab === tab ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                                    {allNotes.length}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-5 bg-white">
                    {activeTab === 'overview' && (
                        <div className="space-y-5 animate-fade-in">
                            {/* Contact */}
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Contact Info</p>
                                <div className="space-y-2.5">
                                    {[
                                        { icon: '✉️', label: candidate.email, href: `mailto:${candidate.email}` },
                                        { icon: '📱', label: candidate.phone },
                                        { icon: '📍', label: candidate.location },
                                    ].map(({ icon, label, href }) => (
                                        <div key={label} className="flex items-center gap-3 text-sm">
                                            <span className="text-base">{icon}</span>
                                            {href
                                                ? <a href={href} className="text-blue-600 hover:underline">{label}</a>
                                                : <span className="text-slate-600">{label}</span>
                                            }
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Skills */}
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Skills & Technologies</p>
                                <div className="flex flex-wrap gap-2">
                                    {candidate.skills.map(s => {
                                        let cls = 'bg-slate-100 text-slate-600 border-slate-200';
                                        if (s.color.includes('blue'))    cls = 'bg-blue-50 text-blue-700 border-blue-200';
                                        else if (s.color.includes('emerald')) cls = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                                        else if (s.color.includes('indigo'))  cls = 'bg-indigo-50 text-indigo-700 border-indigo-200';
                                        else if (s.color.includes('rose'))    cls = 'bg-rose-50 text-rose-700 border-rose-200';
                                        return (
                                            <span key={s.name} className={`text-xs font-semibold px-3 py-1.5 rounded-lg border ${cls}`}>
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
                                    { label: 'Notes', value: allNotes.length },
                                    { label: 'Days in Pipeline', value: Math.floor((Date.now() - new Date(candidate.appliedAt).getTime()) / 86400000) },
                                ].map(({ label, value }) => (
                                    <div key={label} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-center">
                                        <p className="text-xl font-bold text-slate-900">{value}</p>
                                        <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'interviews' && (
                        <div className="space-y-3 animate-fade-in">
                            {candidate.interviewRounds.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-4xl mb-3 opacity-60">🗓️</div>
                                    <p className="font-semibold text-slate-600">No interviews scheduled</p>
                                    <p className="text-sm text-slate-400 mt-1">Schedule the first round below</p>
                                </div>
                            ) : (
                                candidate.interviewRounds.map((r, i) => {
                                    const statusCls: Record<string, string> = {
                                        Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                                        Scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
                                        Pending: 'bg-slate-100 text-slate-500 border-slate-200',
                                    };
                                    return (
                                        <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5
                                                ${r.status === 'Completed' ? 'bg-emerald-500 text-white' : r.status === 'Scheduled' ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                                {r.status === 'Completed' ? '✓' : i + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2 flex-wrap">
                                                    <p className="text-sm font-semibold text-slate-800">{r.round}</p>
                                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${statusCls[r.status]}`}>{r.status}</span>
                                                </div>
                                                {r.interviewer && <p className="text-xs text-slate-500 mt-0.5">Interviewer: {r.interviewer}</p>}
                                                {r.date && <p className="text-xs text-slate-400 mt-0.5">{formatDate(r.date)}</p>}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                            <button className="w-full py-2.5 rounded-xl text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200 mt-2">
                                + Schedule Interview Round
                            </button>
                        </div>
                    )}

                    {activeTab === 'notes' && (
                        <div className="space-y-4 animate-fade-in">
                            {allNotes.length === 0 && (
                                <div className="text-center py-8">
                                    <div className="text-3xl mb-2 opacity-60">📝</div>
                                    <p className="text-sm text-slate-500">No notes yet. Add the first one below.</p>
                                </div>
                            )}
                            {allNotes.map((n, i) => (
                                <div key={n.id ?? i} className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                                    <div className="flex items-center gap-2.5 mb-2">
                                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0 bg-blue-600">
                                            {'avatar' in n ? (n as { avatar: string }).avatar : 'SC'}
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-slate-800">{n.author}</p>
                                            <p className="text-[11px] text-slate-400">{formatDate(n.createdAt)}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-700 leading-relaxed">{n.text}</p>
                                </div>
                            ))}

                            {/* Add note */}
                            <div className="mt-4 border-t border-slate-100 pt-4">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Add Note</p>
                                <textarea
                                    value={note}
                                    onChange={e => setNote(e.target.value)}
                                    placeholder="Write your observation or feedback..."
                                    rows={3}
                                    className="b2b-input w-full px-4 py-3 rounded-xl text-sm text-slate-800 placeholder-slate-400 resize-none"
                                />
                                <button
                                    disabled={!note.trim()}
                                    onClick={handleSaveNote}
                                    className="btn-primary mt-2 px-4 py-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                                >
                                    Save Note
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 shrink-0 bg-slate-50">
                    <div className="flex items-center gap-2.5">
                        <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors">
                            Schedule Interview
                        </button>
                        <button 
                            onClick={handleMoveForward}
                            disabled={stageIdx === STAGES.length - 1}
                            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Move Forward →
                        </button>
                        <button 
                            onClick={() => handleStatusChange('Inactive')}
                            className="py-2.5 px-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors border border-red-200"
                        >
                            Reject
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
