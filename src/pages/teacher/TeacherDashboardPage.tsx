import React from 'react';
import { Link } from 'react-router-dom';
import {
    AlertTriangle,
    ArrowRight,
    BarChart3,
    BrainCircuit,
    CalendarDays,
    CheckCircle2,
    ChevronRight,
    ClipboardList,
    Clock3,
    FileText,
    GraduationCap,
    MessageSquareMore,
    Send,
    ShieldAlert,
    Sparkles,
    TrendingUp,
    UserRound,
    Users,
    Zap,
    Target
} from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';
import { useTranslation } from 'react-i18next';

const summaryCards = [
    { title: 'Active Students', value: '48', note: '12 on fast-track paths', icon: Users, tone: 'bg-slate-950 text-white border-slate-800' },
    { title: 'AI Risk Alerts', value: '6', note: '3 require immediate action', icon: ShieldAlert, tone: 'bg-red-50 text-red-700 border-red-100' },
    { title: 'Sessions Today', value: '14', note: '5 1-on-1, 9 Group', icon: CalendarDays, tone: 'bg-blue-50 text-blue-700 border-blue-100' },
    { title: 'Avg. Improvement', value: '+11%', note: 'Highest in speaking & vocab', icon: TrendingUp, tone: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    { title: 'AI Reports Ready', value: '9', note: '4 corrective, 5 positive', icon: FileText, tone: 'bg-violet-50 text-violet-700 border-violet-100' },
    { title: 'Auto-Assignments', value: '22', note: 'Avg. completion: 6-9 mins', icon: Zap, tone: 'bg-amber-50 text-amber-700 border-amber-100' },
];

const priorities = [
    {
        id: 'sara-1',
        student: 'Sara Ahmed',
        age: 8,
        level: 'A1',
        alert: 'Verbal participation dropped by 35% over the last 2 sessions.',
        recommendation: 'Start with a 5-minute confidence-building exercise using visual prompts.',
        action: 'Apply Suggested Plan',
        tone: 'border-red-200 bg-red-50/80',
    },
    {
        id: 'omar-1',
        student: 'Omar Fahd',
        age: 7,
        level: 'Pre-A1',
        alert: 'Incomplete last assignment and low speaking duration.',
        recommendation: 'Shift first 6 minutes to guided repetition with ready-made short phrases.',
        action: 'Send Reminder & Alt Task',
        tone: 'border-amber-200 bg-amber-50/80',
    },
    {
        id: 'layan-1',
        student: 'Layan Ahmad',
        age: 6,
        level: 'A1',
        alert: 'Consistently high performance. Ready for broader activities.',
        recommendation: 'Incorporate short role-play and transition to open-ended questions.',
        action: 'Approve Level Up',
        tone: 'border-emerald-200 bg-emerald-50/80',
    },
    {
        id: 'zayn-1',
        student: 'Zayn Ali',
        age: 9,
        level: 'A2',
        alert: 'Medium churn risk due to declining engagement this week.',
        recommendation: 'Send progress update to parents and switch next activity to game-based.',
        action: 'Execute Retention Plan',
        tone: 'border-violet-200 bg-violet-50/80',
    },
];

const commandStudents = [
    { id: 'sara-1', name: 'Sara Ahmed', age: 8, country: 'Saudi Arabia', cefr: 'A1', performance: 71, engagement: 54, lastAttendance: 'Today', status: 'Needs Attention', nextAction: 'Audio Confidence Session' },
    { id: 'omar-1', name: 'Omar Fahd', age: 7, country: 'UAE', cefr: 'Pre-A1', performance: 66, engagement: 61, lastAttendance: 'Yesterday', status: 'At Risk', nextAction: 'Alt Task + Parent Reminder' },
    { id: 'layan-1', name: 'Layan Ahmad', age: 6, country: 'Saudi Arabia', cefr: 'A1', performance: 84, engagement: 88, lastAttendance: 'Today', status: 'Ready to Advance', nextAction: 'Upgrade Speaking Plan' },
    { id: 'zayn-1', name: 'Zayn Ali', age: 9, country: 'Qatar', cefr: 'A2', performance: 73, engagement: 57, lastAttendance: '2 days ago', status: 'Needs Attention', nextAction: 'Re-engage Interaction' },
];

const workloadCards = [
    { title: 'Auto-Generated Reports', value: '19', note: 'Replaces manual post-session writing', icon: FileText },
    { title: 'AI-Prepared Lessons', value: '14', note: 'Includes opener, main activity, and fallback', icon: GraduationCap },
    { title: 'Auto-Assigned Tasks', value: '22', note: 'Targeting each student\'s weakest skill', icon: ClipboardList },
    { title: 'Risks Auto-Detected', value: '6', note: 'Based on engagement, attendance, or tasks', icon: Target },
    { title: 'Time Saved This Week', value: '6.5 hrs', note: 'Reinvested in high-quality interventions', icon: Clock3 },
];

const actionCenter = [
    'Generate Weekly Plans',
    'Generate Parent Reports',
    'Identify At-Risk Students',
    'Prepare Today\'s Sessions',
    'Assign Bulk Homework',
    'Review Level Upgrades',
    'Create Speaking Activities',
];

const analytics = [
    { label: 'Weakest Cohort Skill', value: 'Speaking Confidence', hint: 'Needs lighter openers and more open questions' },
    { label: 'Average Engagement', value: '68%', hint: 'Best performance in the first 10 minutes' },
    { label: 'Average Attendance', value: '92%', hint: 'Dropped for 4 students in the last two weeks' },
    { label: 'Top Improver', value: 'Layan Ahmad', hint: 'Ready to transition to broader interactions' },
];

const TeacherDashboardPage: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="space-y-10 pb-16 font-outfit">
            <SectionHeader
                eyebrow={t('teacher.dashboard.eyebrow')}
                title={t('teacher.dashboard.title')}
                description={t('teacher.dashboard.description')}
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {summaryCards.map((card) => (
                    <div key={card.title} className={`rounded-[2rem] border p-6 shadow-sm transition-all hover:-translate-y-1 ${card.tone}`}>
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <div className="text-sm font-black opacity-80">{card.title}</div>
                                <div className="mt-3 text-4xl font-black tracking-tight">{card.value}</div>
                                <div className="mt-2 text-sm font-bold opacity-75">{card.note}</div>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/70 text-current shadow-sm backdrop-blur-sm">
                                <card.icon size={22} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 mb-3">
                            <Sparkles size={14} className="text-indigo-600" />
                            <span className="text-xs font-bold text-indigo-700">AI Suggested</span>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900">Today's AI Priorities</h2>
                        <p className="mt-1 text-sm font-medium text-slate-500">Each card ends with a clear, direct action instead of leaving you to search for details.</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 px-4 py-2 text-xs font-black text-slate-600">4 Immediate Priorities</div>
                </div>

                <div className="grid gap-5 xl:grid-cols-2">
                    {priorities.map((item) => (
                        <div key={item.id} className={`rounded-[2rem] border p-6 ${item.tone} transition-all hover:shadow-md`}>
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="text-xl font-black text-slate-900">{item.student}</div>
                                    <div className="mt-1 text-sm font-bold text-slate-500">Age {item.age} • Level {item.level}</div>
                                </div>
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm">
                                    <AlertTriangle size={18} />
                                </div>
                            </div>
                            <div className="mt-5 space-y-3">
                                <div className="rounded-2xl bg-white/90 p-4 backdrop-blur-sm">
                                    <div className="text-xs font-black text-slate-400 uppercase tracking-wider">Alert Trigger</div>
                                    <p className="mt-2 text-sm font-bold leading-7 text-slate-700">{item.alert}</p>
                                </div>
                                <div className="rounded-2xl bg-white/90 p-4 backdrop-blur-sm">
                                    <div className="text-xs font-black text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                                        <BrainCircuit size={12} /> AI Recommendation
                                    </div>
                                    <p className="mt-2 text-sm font-bold leading-7 text-slate-700">{item.recommendation}</p>
                                </div>
                            </div>
                            <div className="mt-5 flex flex-wrap gap-3">
                                <button className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20">
                                    {item.action}
                                </button>
                                <Link to={`/teacher/students/${item.id}`} className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-700 transition-all hover:bg-slate-50 shadow-sm">
                                    Review Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="grid gap-8 xl:grid-cols-[1.2fr,0.8fr]">
                <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900">Student Roster</h2>
                            <p className="mt-1 text-sm font-medium text-slate-500">Executive list driving the Next Best Action for each student.</p>
                        </div>
                        <Link to="/teacher/students" className="inline-flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-2 text-xs font-black text-slate-700 hover:bg-slate-100 transition-colors">
                            Full List <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="overflow-hidden rounded-[1.8rem] border border-slate-100">
                        <div className="grid grid-cols-[1.2fr,0.7fr,0.7fr,0.7fr,1fr] gap-4 bg-slate-50 px-5 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">
                            <div>Student</div>
                            <div>Level</div>
                            <div>Perf.</div>
                            <div>Engage.</div>
                            <div>Next Action</div>
                        </div>
                        {commandStudents.map((student) => (
                            <Link key={student.id} to={`/teacher/students/${student.id}`} className="group grid grid-cols-[1.2fr,0.7fr,0.7fr,0.7fr,1fr] gap-4 border-t border-slate-100 px-5 py-5 transition-all hover:bg-slate-50 items-center">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 group-hover:scale-105 transition-transform">
                                        <UserRound size={18} />
                                    </div>
                                    <div>
                                        <div className="font-black text-slate-900">{student.name}</div>
                                        <div className="text-xs font-bold text-slate-400">{student.country} • {student.age} yo • {student.lastAttendance}</div>
                                    </div>
                                </div>
                                <div className="font-black text-slate-700">{student.cefr}</div>
                                <div className="font-black text-slate-700">
                                    <span className="text-emerald-600">{student.performance}</span>/100
                                </div>
                                <div className="font-black text-slate-700">
                                    <span className={student.engagement < 60 ? 'text-amber-600' : 'text-emerald-600'}>{student.engagement}</span>/100
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-sm font-bold text-slate-700">{student.nextAction}</span>
                                    <ChevronRight size={16} className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                <div className="space-y-8">
                    <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                                <BarChart3 size={20} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Class Analytics</h2>
                                <p className="text-sm font-medium text-slate-500">Actionable, interpreted insights.</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {analytics.map((item) => (
                                <div key={item.label} className="rounded-2xl bg-slate-50 p-4 transition-all hover:bg-slate-100">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="text-sm font-black text-slate-900">{item.label}</div>
                                        <div className="text-sm font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">{item.value}</div>
                                    </div>
                                    <p className="mt-2 text-sm font-medium leading-7 text-slate-500">{item.hint}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm relative overflow-hidden">
                        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-50 opacity-50 blur-3xl"></div>
                        <div className="mb-5 flex items-center gap-3 relative">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                                <BrainCircuit size={20} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">AI Action Center</h2>
                                <p className="text-sm font-medium text-slate-500">Quick commands yielding instant results.</p>
                            </div>
                        </div>
                        <div className="grid gap-3 relative">
                            {actionCenter.map((item, index) => (
                                <button key={item} className={`flex items-center justify-between rounded-2xl px-5 py-4 text-left text-sm font-black transition-all ${index === 0 ? 'bg-slate-950 text-white hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}>
                                    <span className="flex items-center gap-2">
                                        {index === 0 && <Sparkles size={14} className="text-indigo-400" />}
                                        {item}
                                    </span>
                                    <ChevronRight size={16} className={index === 0 ? 'text-slate-400' : 'text-slate-400'} />
                                </button>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            <div className="grid gap-8 xl:grid-cols-[1fr,1fr]">
                <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent"></div>
                    <div className="mb-6 flex items-center gap-3 relative">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                            <CheckCircle2 size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900">Workload Reduction Panel</h2>
                            <p className="text-sm font-medium text-slate-500">Demonstrating operational value and time saved.</p>
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 relative">
                        {workloadCards.map((item) => (
                            <div key={item.title} className="rounded-2xl bg-white border border-emerald-100/50 p-5 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="text-sm font-black text-slate-900">{item.title}</div>
                                    <item.icon size={18} className="text-emerald-500" />
                                </div>
                                <div className="mt-3 text-3xl font-black text-slate-950">{item.value}</div>
                                <p className="mt-2 text-sm font-medium leading-7 text-slate-500">{item.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                            <MessageSquareMore size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900">Parent Comms Assistant</h2>
                            <p className="text-sm font-medium text-slate-500">Ready-made, customizable messages per objective.</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {[
                            { title: 'Progress Report', desc: 'Summarizes weekly improvements and next steps.' },
                            { title: 'Delay Alert', desc: 'Focuses gently on attendance, homework, or engagement drop.' },
                            { title: 'Positive Motivation', desc: 'Short, supportive message to parents to encourage persistence.' },
                            { title: 'Extra Plan Proposal', desc: 'Offers an additional option when intensive support is needed.' },
                        ].map((item) => (
                            <div key={item.title} className="rounded-2xl bg-slate-50 p-4 hover:bg-orange-50/30 transition-colors cursor-pointer group">
                                <div className="text-sm font-black text-slate-900 group-hover:text-orange-700 transition-colors">{item.title}</div>
                                <p className="mt-2 text-sm font-medium leading-7 text-slate-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5 flex gap-3">
                        <button className="flex-1 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20">
                            <span className="inline-flex items-center gap-2"><Send size={16} /> Generate Today's Messages</span>
                        </button>
                        <button className="rounded-2xl bg-slate-100 px-5 py-4 text-sm font-black text-slate-700 transition-all hover:bg-slate-200">
                            Review Drafts
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TeacherDashboardPage;

