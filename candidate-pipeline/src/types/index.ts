
export type Stage = 'Applied' | 'Shortlisted' | 'Interview' | 'Offered' | 'Hired';
export type ExperienceRange = 'Any' | '0-2' | '2-5' | '5-10' | '10+';

export interface Skill {
    name: string;
    color: string;
}

export interface InterviewRound {
    round: string;
    status: 'Scheduled' | 'Completed' | 'Pending';
    date?: string;
    interviewer?: string;
}

export interface Note {
    id: string;
    author: string;
    text: string;
    createdAt: string;
    avatar: string;
}

export interface Candidate {
    id: string;
    name: string;
    avatar: string;
    currentRole: string;
    company: string;
    experience: number;
    matchScore: number;
    stage: Stage;
    status: 'Active' | 'Inactive' | 'Withdrawn';
    lastActivity: string;
    email: string;
    phone: string;
    location: string;
    skills: Skill[];
    interviewRounds: InterviewRound[];
    notes: Note[];
    appliedAt: string;
}

export interface Job {
    id: string;
    title: string;
    department: string;
    location: string;
    openPositions: number;
    hiringManager: string;
    totalApplicants: number;
    postedAt: string;
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
}

export interface FilterState {
    search: string;
    stage: Stage | 'All';
    experience: ExperienceRange;
    scoreMin: number;
    scoreMax: number;
}

export const STAGES: Stage[] = ['Applied', 'Shortlisted', 'Interview', 'Offered', 'Hired'];

export const STAGE_META: Record<Stage, {
    bg: string; text: string; border: string; dot: string; lightBg: string; icon: string;
}> = {
    Applied: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', dot: 'bg-blue-400', lightBg: 'rgba(59,130,246,0.1)', icon: '📥' },
    Shortlisted: { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20', dot: 'bg-violet-400', lightBg: 'rgba(139,92,246,0.1)', icon: '⭐' },
    Interview: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', dot: 'bg-amber-400', lightBg: 'rgba(245,158,11,0.1)', icon: '🎙️' },
    Offered: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', dot: 'bg-emerald-400', lightBg: 'rgba(16,185,129,0.1)', icon: '📄' },
    Hired: { bg: 'bg-yellow-400/10', text: 'text-yellow-400', border: 'border-yellow-400/20', dot: 'bg-yellow-400', lightBg: 'rgba(250,204,21,0.1)', icon: '🎉' },
};

