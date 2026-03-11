import { useState } from 'react';
import { STAGES } from '../types';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (candidate: { name: string; role: string; company: string; email: string; stage: string }) => void;
}

export default function AddCandidateModal({ isOpen, onClose, onAdd }: Props) {
    const [form, setForm] = useState({ name: '', email: '', role: '', company: '', experience: '3', stage: 'Applied' });
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim() || !form.email.trim()) {
            setError('Name and email are required.');
            return;
        }
        onAdd({ name: form.name, role: form.role, company: form.company, email: form.email, stage: form.stage });
        setForm({ name: '', email: '', role: '', company: '', experience: '3', stage: 'Applied' });
        setError('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={onClose}>
                <div
                    className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md animate-fade-in"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                        <div>
                            <h2 className="text-base font-bold text-slate-900">Add Candidate</h2>
                            <p className="text-xs text-slate-500 mt-0.5">Add a new candidate to the pipeline</p>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                        {error && (
                            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-2">
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Full Name *</label>
                                <input type="text" placeholder="e.g. John Smith" value={form.name}
                                    onChange={e => setForm(s => ({ ...s, name: e.target.value }))}
                                    className="b2b-input w-full px-3 py-2 text-sm rounded-lg" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email *</label>
                                <input type="email" placeholder="john@company.com" value={form.email}
                                    onChange={e => setForm(s => ({ ...s, email: e.target.value }))}
                                    className="b2b-input w-full px-3 py-2 text-sm rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Current Role</label>
                                <input type="text" placeholder="e.g. Senior Dev" value={form.role}
                                    onChange={e => setForm(s => ({ ...s, role: e.target.value }))}
                                    className="b2b-input w-full px-3 py-2 text-sm rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Company</label>
                                <input type="text" placeholder="e.g. Google" value={form.company}
                                    onChange={e => setForm(s => ({ ...s, company: e.target.value }))}
                                    className="b2b-input w-full px-3 py-2 text-sm rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Experience (yrs)</label>
                                <input type="number" min={0} max={30} value={form.experience}
                                    onChange={e => setForm(s => ({ ...s, experience: e.target.value }))}
                                    className="b2b-input w-full px-3 py-2 text-sm rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Pipeline Stage</label>
                                <div className="relative">
                                    <select value={form.stage}
                                        onChange={e => setForm(s => ({ ...s, stage: e.target.value }))}
                                        className="b2b-input w-full appearance-none pl-3 pr-8 py-2 text-sm rounded-lg cursor-pointer">
                                        {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="6 9 12 15 18 9"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2.5 pt-2 border-t border-slate-100">
                            <button type="button" onClick={onClose} className="btn-secondary flex-1 py-2.5 text-sm">
                                Cancel
                            </button>
                            <button type="submit" className="btn-primary flex-1 py-2.5 text-sm">
                                Add Candidate
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
