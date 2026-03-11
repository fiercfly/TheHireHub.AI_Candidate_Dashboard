// Settings Page — Profile, team, notifications, integrations

const teamMembers = [
    { name: 'Sarah Chen', avatar: 'SC', color: 'bg-blue-600', role: 'Admin · HR Lead', email: 'sarah@hirehub.ai', status: 'Active' },
    { name: 'Rahul Singh', avatar: 'RS', color: 'bg-violet-500', role: 'Recruiter', email: 'rahul@hirehub.ai', status: 'Active' },
    { name: 'Priti Mehta', avatar: 'PM', color: 'bg-emerald-500', role: 'Senior Recruiter', email: 'priti@hirehub.ai', status: 'Active' },
    { name: 'David Park', avatar: 'DP', color: 'bg-amber-500', role: 'Hiring Manager', email: 'dpark@hirehub.ai', status: 'Active' },
    { name: 'Vikram Joshi', avatar: 'VJ', color: 'bg-rose-500', role: 'Recruiter', email: 'vikram@hirehub.ai', status: 'Invited' },
];

const integrations = [
    { name: 'LinkedIn Recruiter', icon: '💼', desc: 'Source candidates directly from LinkedIn', connected: true, color: 'bg-blue-50 border-blue-200' },
    { name: 'Google Calendar', icon: '📅', desc: 'Sync interviews to Google Calendar', connected: true, color: 'bg-red-50 border-red-200' },
    { name: 'Slack', icon: '💬', desc: 'Get hiring notifications in Slack channels', connected: true, color: 'bg-purple-50 border-purple-200' },
    { name: 'Greenhouse', icon: '🌿', desc: 'Import jobs and candidates from Greenhouse', connected: false, color: 'bg-slate-50 border-slate-200' },
    { name: 'HackerRank', icon: '💻', desc: 'Send automated coding assessments', connected: false, color: 'bg-slate-50 border-slate-200' },
    { name: 'DocuSign', icon: '✍️', desc: 'E-sign offer letters automatically', connected: false, color: 'bg-slate-50 border-slate-200' },
];

export default function SettingsPage() {
    return (
        <main className="flex-1 overflow-y-auto px-4 md:px-6 py-5 space-y-5">
            <div className="grid lg:grid-cols-3 gap-5">
                {/* Profile Card */}
                <div className="card p-6 lg:col-span-1">
                    <h2 className="text-sm font-bold text-slate-800 mb-4">My Profile</h2>
                    <div className="text-center mb-5">
                        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold text-white mx-auto mb-3">SC</div>
                        <p className="text-base font-bold text-slate-900">Sarah Chen</p>
                        <p className="text-xs text-slate-500 mt-0.5">Admin · HR Lead</p>
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold px-2 py-0.5 rounded-full mt-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> Active
                        </span>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Full Name</label>
                            <input className="b2b-input w-full px-3 py-2 text-sm rounded-lg" defaultValue="Sarah Chen" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Email</label>
                            <input className="b2b-input w-full px-3 py-2 text-sm rounded-lg" defaultValue="sarah@hirehub.ai" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Title</label>
                            <input className="b2b-input w-full px-3 py-2 text-sm rounded-lg" defaultValue="HR Lead" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Timezone</label>
                            <div className="relative">
                                <select className="b2b-input w-full appearance-none pl-3 pr-8 py-2 text-sm rounded-lg">
                                    <option>Asia/Kolkata (IST, +5:30)</option>
                                    <option>America/New_York (EST)</option>
                                    <option>America/Los_Angeles (PST)</option>
                                </select>
                                <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                            </div>
                        </div>
                        <button className="btn-primary w-full py-2 text-sm mt-2">Save Changes</button>
                    </div>
                </div>

                <div className="space-y-5 lg:col-span-2">
                    {/* Notifications */}
                    <div className="card p-5">
                        <h2 className="text-sm font-bold text-slate-800 mb-4">Notification Preferences</h2>
                        <div className="divide-y divide-slate-100">
                            {[
                                { label: 'New candidate applied', sub: 'Get notified when a new application comes in', on: true },
                                { label: 'Interview scheduled', sub: 'Reminders before upcoming interviews', on: true },
                                { label: 'Stage changes', sub: 'When a candidate moves through the pipeline', on: true },
                                { label: 'Offer accepted / rejected', sub: 'Instantly know when an offer decision is made', on: true },
                                { label: 'Weekly hiring report', sub: 'Email digest every Monday morning', on: false },
                                { label: 'Team activity', sub: 'When teammates add notes or update candidates', on: false },
                            ].map(n => (
                                <div key={n.label} className="py-3 flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">{n.label}</p>
                                        <p className="text-xs text-slate-400 mt-0.5">{n.sub}</p>
                                    </div>
                                    <button className={`relative inline-flex h-5 w-9 rounded-full transition-colors shrink-0 ${n.on ? 'bg-blue-600' : 'bg-slate-200'}`}>
                                        <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform mt-0.5 ${n.on ? 'translate-x-4' : 'translate-x-0.5'}`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Team Members */}
                    <div className="card overflow-hidden">
                        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                            <h2 className="text-sm font-bold text-slate-800">Team Members</h2>
                            <button className="btn-primary px-3 py-1.5 text-xs">+ Invite Member</button>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {teamMembers.map(m => (
                                <div key={m.name} className="px-5 py-3.5 flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${m.color}`}>{m.avatar}</div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-slate-900">{m.name}</p>
                                        <p className="text-xs text-slate-400">{m.email}</p>
                                    </div>
                                    <span className="text-xs text-slate-500 hidden sm:block">{m.role}</span>
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${m.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>{m.status}</span>
                                    <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Integrations */}
            <div className="card p-5">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-sm font-bold text-slate-800">Integrations</h2>
                        <p className="text-xs text-slate-400 mt-0.5">Connect your hiring stack</p>
                    </div>
                    <span className="text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full">3 connected</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {integrations.map(intg => (
                        <div key={intg.name} className={`flex items-start gap-3 p-4 rounded-xl border ${intg.color}`}>
                            <span className="text-2xl shrink-0">{intg.icon}</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-800">{intg.name}</p>
                                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{intg.desc}</p>
                                <button className={`mt-2.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${intg.connected
                                    ? 'bg-white text-slate-600 border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                                    : 'btn-primary'}`}>
                                    {intg.connected ? 'Connected ✓' : 'Connect'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
