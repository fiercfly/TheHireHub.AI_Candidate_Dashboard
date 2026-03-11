// Interviews Page — Scheduled interviews with upcoming calendar and list

const todayStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

const interviews = [
    {
        id: 'i1', candidate: 'Aisha Patel', avatar: 'AP', color: 'bg-blue-500',
        role: 'Senior Frontend Engineer', round: 'Technical Round 2',
        interviewer: 'Rahul Singh', time: '10:00 AM', date: 'Today', duration: '60 min',
        type: 'Video Call', status: 'Upcoming', link: 'meet.google.com/abc-def-ghi',
    },
    {
        id: 'i2', candidate: 'Lucas Brown', avatar: 'LB', color: 'bg-violet-500',
        role: 'Backend Engineer', round: 'System Design',
        interviewer: 'Priti Mehta', time: '12:30 PM', date: 'Today', duration: '90 min',
        type: 'Video Call', status: 'Upcoming', link: 'zoom.us/j/12345',
    },
    {
        id: 'i3', candidate: 'Emma Wilson', avatar: 'EW', color: 'bg-pink-500',
        role: 'Product Designer', round: 'Portfolio Review',
        interviewer: 'David Park', time: '2:00 PM', date: 'Today', duration: '45 min',
        type: 'In-Person', status: 'Upcoming', link: 'Room 3B, HQ',
    },
    {
        id: 'i4', candidate: 'Marcus Webb', avatar: 'MW', color: 'bg-amber-500',
        role: 'Product Designer', round: 'HR Screen',
        interviewer: 'Sarah Chen', time: '9:00 AM', date: 'Tomorrow', duration: '30 min',
        type: 'Phone', status: 'Scheduled', link: '+1-800-555-0199',
    },
    {
        id: 'i5', candidate: 'Sofia Reyes', avatar: 'SR', color: 'bg-sky-500',
        role: 'Senior Frontend Engineer', round: 'Coding Challenge',
        interviewer: 'Rahul Singh', time: '11:00 AM', date: 'Tomorrow', duration: '60 min',
        type: 'Video Call', status: 'Scheduled', link: 'meet.google.com/xyz-123',
    },
    {
        id: 'i6', candidate: 'Priya Sharma', avatar: 'PS', color: 'bg-emerald-500',
        role: 'Data Scientist', round: 'Case Study',
        interviewer: 'Vikram Joshi', time: '3:00 PM', date: 'Mar 14', duration: '75 min',
        type: 'Video Call', status: 'Scheduled', link: 'teams.microsoft.com/join/abc',
    },
    {
        id: 'i7', candidate: 'James Lee', avatar: 'JL', color: 'bg-teal-500',
        role: 'Backend Engineer', round: 'Final Interview',
        interviewer: 'Ishank Sharma', time: '4:00 PM', date: 'Mar 15', duration: '60 min',
        type: 'In-Person', status: 'Scheduled', link: 'Boardroom, Floor 5',
    },
];

const completed = [
    { candidate: 'Liam Nguyen', avatar: 'LN', color: 'bg-rose-500', round: 'Technical + Culture Fit', rating: 5, feedback: 'Excellent candidate — strong system design skills.' },
    { candidate: 'Fatima Al-Hassan', avatar: 'FA', color: 'bg-orange-500', round: 'All Rounds', rating: 5, feedback: 'Hired! Exceptional React expertise and communication.' },
    { candidate: 'David Kim', avatar: 'DK', color: 'bg-indigo-500', round: 'HR Screen', rating: 3, feedback: 'Good profile, needs stronger SQL skills.' },
];

const typeIcon: Record<string, string> = { 'Video Call': '📹', 'In-Person': '🏢', 'Phone': '📞' };

const stars = (n: number) => '★'.repeat(n) + '☆'.repeat(5 - n);

export default function InterviewsPage() {
    const today = interviews.filter(i => i.date === 'Today');
    const upcoming = interviews.filter(i => i.date !== 'Today');

    return (
        <main className="flex-1 overflow-y-auto px-4 md:px-6 py-5 space-y-5">
            {/* top stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Today', count: today.length, color: 'bg-blue-50 text-blue-700 border-blue-200' },
                    { label: 'This Week', count: 7, color: 'bg-violet-50 text-violet-700 border-violet-200' },
                    { label: 'Scheduled', count: interviews.length, color: 'bg-amber-50 text-amber-700 border-amber-200' },
                    { label: 'Completed (MTD)', count: 23, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                ].map(s => (
                    <div key={s.label} className={`card p-4 border ${s.color}`}>
                        <p className="text-xs font-semibold uppercase tracking-wide opacity-70">{s.label}</p>
                        <p className="text-2xl font-bold mt-1">{s.count}</p>
                    </div>
                ))}
            </div>

            {/* Today */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <h2 className="text-sm font-bold text-slate-800">Today — {todayStr}</h2>
                </div>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {today.map(iv => (
                        <div key={iv.id} className="card p-4 hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${iv.color}`}>{iv.avatar}</div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">{iv.candidate}</p>
                                        <p className="text-xs text-slate-400 truncate max-w-[150px]">{iv.role}</p>
                                    </div>
                                </div>
                                <span className="text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">{iv.status}</span>
                            </div>
                            <div className="space-y-1.5 text-xs text-slate-600">
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-400">🎯</span><span className="font-medium">{iv.round}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-400">⏰</span><span>{iv.time} · {iv.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-400">👤</span><span>{iv.interviewer}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-400">{typeIcon[iv.type]}</span>
                                    <span className="text-blue-600 truncate hover:underline cursor-pointer">{iv.link}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                                <button className="flex-1 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">Join Call</button>
                                <button className="flex-1 py-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">Reschedule</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Upcoming */}
            <div>
                <h2 className="text-sm font-bold text-slate-800 mb-3">Upcoming Interviews</h2>
                <div className="card overflow-hidden">
                    <div className="divide-y divide-slate-100">
                        {upcoming.map(iv => (
                            <div key={iv.id} className="px-5 py-3.5 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${iv.color}`}>{iv.avatar}</div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-slate-900">{iv.candidate} <span className="text-slate-400 font-normal">·</span> <span className="text-slate-600 font-medium text-xs">{iv.round}</span></p>
                                    <p className="text-xs text-slate-400 mt-0.5">{iv.role}</p>
                                </div>
                                <div className="text-right text-xs text-slate-500 min-w-[90px]">
                                    <p className="font-semibold text-slate-700">{iv.date}</p>
                                    <p>{iv.time}</p>
                                </div>
                                <span className="hidden md:inline text-xs text-slate-400">{typeIcon[iv.type]} {iv.type}</span>
                                <span className="text-xs text-slate-400 hidden lg:inline">{iv.interviewer}</span>
                                <button className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors shrink-0">Details</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Completed recently */}
            <div>
                <h2 className="text-sm font-bold text-slate-800 mb-3">Recently Completed</h2>
                <div className="grid gap-3 md:grid-cols-3">
                    {completed.map((c, i) => (
                        <div key={i} className="card p-4 bg-slate-50/60">
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${c.color}`}>{c.avatar}</div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">{c.candidate}</p>
                                    <p className="text-xs text-slate-400">{c.round}</p>
                                </div>
                            </div>
                            <p className="text-amber-500 text-sm font-bold mb-1">{stars(c.rating)}</p>
                            <p className="text-xs text-slate-600 italic">"{c.feedback}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
