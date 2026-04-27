import React from 'react';
import { BarChart3, BrainCircuit, CheckCircle2, ChevronRight, ClipboardList, Clock3, FileText, Gamepad2, MessageSquareMore, Mic2, Radar, Send, ShieldAlert, Sparkles, Target, TimerReset, TrendingUp, UserRound, Waves, ArrowRight, Lightbulb, Activity } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';

const radarSkills = [
    { label: 'Listening', value: 74, delta: '+4', note: 'Grasps simple instructions quickly', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Speaking', value: 61, delta: '-2', note: 'Higher hesitation than usual before answering', color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Reading', value: 68, delta: '+1', note: 'Recognizes short sentences with visual support', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Writing', value: 52, delta: '+3', note: 'Requires ready-made templates before writing', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Vocabulary', value: 82, delta: '+6', note: 'Picks up new words very quickly', color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Pronunciation', value: 58, delta: '-1', note: 'P and B sounds are still unstable', color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Grammar', value: 63, delta: '+2', note: 'Constructs sentences with partial support', color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Confidence', value: 49, delta: '-3', note: 'Main weakness is confidence, not comprehension', color: 'text-red-600', bg: 'bg-red-50' },
];

const planSessions = [
    {
        title: 'Session 1',
        format: 'Warm up conversation',
        focus: 'Picture based questions',
        target: 'I like / I want / I can',
        difficulty: 'Low to Medium',
        status: 'completed',
    },
    {
        title: 'Session 2',
        format: 'Role play',
        focus: 'Ordering food',
        target: 'Quick response + pronunciation',
        difficulty: 'Medium',
        status: 'upcoming',
    },
    {
        title: 'Session 3',
        format: 'Guided speaking game',
        focus: 'Open questions with rewards',
        target: 'Longer answers',
        difficulty: 'Medium',
        status: 'planned',
    },
];

const liveAssistant = [
    { label: 'Student Talk Time', value: '42%', icon: Mic2, tone: 'text-indigo-600' },
    { label: 'Teacher Talk Time', value: '58%', icon: Waves, tone: 'text-slate-600' },
    { label: 'Engagement Level', value: '67%', icon: TrendingUp, tone: 'text-emerald-600' },
    { label: 'Detected Weakness', value: 'Confidence before speaking', icon: ShieldAlert, tone: 'text-amber-600' },
];

const TeacherStudentProfilePage: React.FC = () => {
    return (
        <div className="space-y-10 pb-16 font-outfit">
            <SectionHeader
                eyebrow="Student AI Profile"
                title="AI Student Intelligence"
                description="A comprehensive profile that synthesizes diagnostics, automated lesson plans, and auto-generated reports, eliminating manual prep work."
            />

            <div className="grid gap-8 xl:grid-cols-[0.95fr,1.05fr]">
                <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
                    <div className="mb-8 flex items-center gap-5 relative">
                        <div className="flex h-20 w-20 items-center justify-center rounded-[1.8rem] bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                            <UserRound size={32} />
                        </div>
                        <div>
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Sara Ahmed</h2>
                            <p className="mt-2 text-sm font-bold text-slate-500 flex items-center gap-2">
                                <span className="bg-slate-100 px-2 py-1 rounded-md">8 years old</span> • 
                                <span>Saudi Arabia</span> • 
                                <span className="text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md flex items-center gap-1"><Target size={14} /> Goal: Daily speaking confidence</span>
                            </p>
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 relative">
                        {[
                            { label: 'Overall Level', value: 'A1', icon: Activity },
                            { label: 'Completed Sessions', value: '26 Sessions', icon: CheckCircle2 },
                            { label: 'Commitment Rate', value: '91%', icon: TrendingUp },
                            { label: 'Last Session', value: 'Yesterday 4:00 PM', icon: Clock3 },
                            { label: 'Age Group', value: 'Primary Lower', icon: UserRound },
                            { label: 'In-Class Persona', value: 'Shy but responsive', icon: BrainCircuit },
                        ].map((item) => (
                            <div key={item.label} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 hover:bg-white hover:shadow-sm transition-all group">
                                <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                                    <item.icon size={14} className="group-hover:text-indigo-500 transition-colors" />
                                    {item.label}
                                </div>
                                <div className="text-lg font-black text-slate-900">{item.value}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                            <BrainCircuit size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900">AI Learning Diagnosis</h2>
                            <p className="text-sm font-medium text-slate-500">Clear diagnostics ending with causes and direct recommendations.</p>
                        </div>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                        {[
                            ['Current Level', 'A1', 'text-indigo-600'],
                            ['Strongest Skill', 'Vocabulary', 'text-emerald-600'],
                            ['Weakest Skill', 'Confidence + Speaking', 'text-rose-600'],
                            ['Root Cause', 'Hesitation, not comprehension', 'text-amber-600'],
                            ['Error Pattern', 'Waiting before producing sentences', 'text-slate-700'],
                            ['Speaking Confidence Index', '49/100', 'text-red-600'],
                            ['Comprehension Index', '76/100', 'text-emerald-600'],
                            ['Promotion Readiness', '64/100', 'text-amber-600'],
                        ].map(([label, value, colorClass]) => (
                            <div key={label} className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                                <div className="text-xs font-black text-slate-400 uppercase tracking-wide">{label}</div>
                                <div className={`mt-1.5 text-sm font-black ${colorClass}`}>{value}</div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5 rounded-2xl border border-violet-200 bg-violet-50/50 p-5 relative overflow-hidden group">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-violet-400"></div>
                        <div className="flex items-start gap-3">
                            <Lightbulb className="text-violet-600 mt-1 flex-shrink-0" size={20} />
                            <div>
                                <h4 className="text-sm font-black text-violet-900 mb-1">AI Synthesis</h4>
                                <p className="text-sm font-bold leading-relaxed text-violet-800/80">
                                    The student understands simple questions but hesitates before speaking. Main issue is confidence, not comprehension. <span className="text-violet-900 underline decoration-violet-300 underline-offset-4">Recommended focus this week: guided speaking with visual prompts.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="grid gap-8 xl:grid-cols-[1fr,1fr]">
                <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="mb-8 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                                <Radar size={20} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Skills Radar</h2>
                                <p className="text-sm font-medium text-slate-500">Visual breakdown with interpreted context per skill.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mb-8 relative flex justify-center items-center h-64">
                        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(99,102,241,0.05),_transparent_70%)] rounded-full"></div>
                        <svg viewBox="0 0 300 300" className="h-64 w-64 z-10 drop-shadow-md">
                            {/* Radar Web Background */}
                            <path d="M150 20 L262 85 L262 215 L150 280 L38 215 L38 85 Z" fill="none" stroke="#f1f5f9" strokeWidth="2" />
                            <path d="M150 60 L226 104 L226 196 L150 240 L74 196 L74 104 Z" fill="none" stroke="#f1f5f9" strokeWidth="2" />
                            <path d="M150 100 L188 122 L188 178 L150 200 L112 178 L112 122 Z" fill="none" stroke="#f1f5f9" strokeWidth="2" />
                            
                            {/* Axes */}
                            <line x1="150" y1="150" x2="150" y2="20" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
                            <line x1="150" y1="150" x2="262" y2="85" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
                            <line x1="150" y1="150" x2="262" y2="215" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
                            <line x1="150" y1="150" x2="150" y2="280" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
                            <line x1="150" y1="150" x2="38" y2="215" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
                            <line x1="150" y1="150" x2="38" y2="85" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />

                            {/* Data Polygon */}
                            <path d="M150 50 L210 100 L240 180 L150 230 L80 190 L90 120 Z" fill="rgba(99,102,241,0.2)" stroke="#6366f1" strokeWidth="3" strokeLinejoin="round" />
                            
                            {/* Data Points */}
                            <circle cx="150" cy="50" r="4" fill="#6366f1" />
                            <circle cx="210" cy="100" r="4" fill="#6366f1" />
                            <circle cx="240" cy="180" r="4" fill="#6366f1" />
                            <circle cx="150" cy="230" r="4" fill="#6366f1" />
                            <circle cx="80" cy="190" r="4" fill="#6366f1" />
                            <circle cx="90" cy="120" r="4" fill="#6366f1" />
                        </svg>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2 h-max">
                        {radarSkills.map((skill) => (
                            <div key={skill.label} className={`rounded-xl border border-slate-100 p-4 transition-all hover:shadow-md ${skill.bg}`}>
                                <div className="flex items-center justify-between gap-3 mb-2">
                                    <div className={`text-sm font-black ${skill.color}`}>{skill.label}</div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-sm font-black text-slate-900">{skill.value}</span>
                                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${skill.delta.startsWith('+') ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                            {skill.delta}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-xs font-bold leading-relaxed text-slate-600">{skill.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm flex flex-col">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
                                <ClipboardList size={20} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Auto Learning Plan</h2>
                                <p className="text-sm font-medium text-slate-500">Ready-to-use weekly plan for review or regeneration.</p>
                            </div>
                        </div>
                        <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Sparkles size={12} /> AI Generated
                        </div>
                    </div>

                    <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-6 shadow-sm mb-6">
                        <div className="text-xs font-black text-indigo-400 uppercase tracking-wider mb-2">Weekly Objective</div>
                        <div className="text-xl font-black text-slate-900 leading-tight">Increase speaking confidence in daily situations</div>
                        <div className="mt-3 flex items-center gap-3">
                            <span className="bg-white border border-indigo-100 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-lg">3 Proposed Sessions</span>
                            <span className="bg-white border border-indigo-100 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-lg">Gradual Difficulty</span>
                        </div>
                    </div>

                    <div className="space-y-4 flex-1">
                        {planSessions.map((session, index) => (
                            <div key={session.title} className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 hover:bg-white hover:shadow-md transition-all group relative overflow-hidden">
                                {session.status === 'completed' && <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-100 rounded-bl-3xl -z-0"></div>}
                                <div className="flex items-center justify-between gap-4 relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-black ${session.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'}`}>
                                            {index + 1}
                                        </div>
                                        <div className="text-lg font-black text-slate-900">{session.title}</div>
                                    </div>
                                    <span className="rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-bold text-slate-600 shadow-sm">{session.difficulty}</span>
                                </div>
                                <div className="mt-4 grid gap-3 md:grid-cols-3 relative z-10">
                                    <div className="rounded-xl bg-white border border-slate-100 p-3">
                                        <div className="text-[10px] font-black text-slate-400 uppercase">Format</div>
                                        <div className="mt-1 text-sm font-bold text-slate-800">{session.format}</div>
                                    </div>
                                    <div className="rounded-xl bg-white border border-slate-100 p-3">
                                        <div className="text-[10px] font-black text-slate-400 uppercase">Main Activity</div>
                                        <div className="mt-1 text-sm font-bold text-slate-800">{session.focus}</div>
                                    </div>
                                    <div className="rounded-xl bg-white border border-slate-100 p-3">
                                        <div className="text-[10px] font-black text-slate-400 uppercase">Target</div>
                                        <div className="mt-1 text-sm font-bold text-slate-800">{session.target}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3 pt-6 border-t border-slate-100">
                        <button className="flex-1 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white transition-all hover:bg-slate-800 shadow-md shadow-slate-900/10">Approve Plan</button>
                        <button className="rounded-2xl bg-white border border-slate-200 px-5 py-4 text-sm font-black text-slate-700 transition-all hover:bg-slate-50">Edit</button>
                        <button className="rounded-2xl bg-indigo-50 text-indigo-600 px-5 py-4 text-sm font-black transition-all hover:bg-indigo-100 flex items-center gap-2">
                            <Sparkles size={16} /> Regenerate
                        </button>
                    </div>
                </section>
            </div>

            <div className="grid gap-8 xl:grid-cols-[1.15fr,0.85fr]">
                <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="mb-8 flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-blue-100 text-blue-700">
                            <TimerReset size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900">Smart Session Mode</h2>
                            <p className="text-sm font-medium text-slate-500">The platform structures the session; you review and intervene as needed.</p>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {[
                            ['Opening script', 'Hi Sara, today we will talk about food you like and build longer answers.', 'border-l-4 border-indigo-400'],
                            ['Warm up questions', 'What do you like to eat after school? What is your favorite snack?', 'border-l-4 border-emerald-400'],
                            ['Main activity', 'Picture-based food choices + guided speaking', 'border-l-4 border-blue-400'],
                            ['Correction notes', 'Focus on eliminating hesitation before starting the sentence.', 'border-l-4 border-amber-400'],
                            ['Expected mistakes', 'Pausing before "I like" + P/B sound confusion in some words.', 'border-l-4 border-rose-400'],
                            ['Backup activity', 'Quick flashcard game if the student is too quiet.', 'border-l-4 border-slate-400'],
                            ['Reward phrase', 'Excellent try, your answer was much longer today!', 'border-l-4 border-violet-400'],
                        ].map(([label, value, borderClass]) => (
                            <div key={label} className={`rounded-xl bg-slate-50 p-5 ${borderClass} shadow-sm`}>
                                <div className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">{label}</div>
                                <div className="text-sm font-bold leading-relaxed text-slate-800">{value}</div>
                            </div>
                        ))}
                    </div>

                    <button className="mt-8 flex items-center justify-center gap-2 w-full rounded-2xl bg-indigo-600 px-5 py-4 text-base font-black text-white transition-all hover:bg-indigo-700 shadow-lg shadow-indigo-600/20">
                        <TimerReset size={20} />
                        Launch Smart Session
                    </button>
                </section>

                <section className="rounded-[2.5rem] border border-slate-200 bg-slate-950 p-8 shadow-xl text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div className="mb-8 flex items-center gap-4 relative z-10">
                        <div className="flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white">Live AI Assistant</h2>
                            <p className="text-sm font-medium text-indigo-200">Real-time side panel during active sessions.</p>
                        </div>
                    </div>
                    <div className="space-y-4 relative z-10">
                        {liveAssistant.map((item) => (
                            <div key={item.label} className="rounded-xl bg-white/5 border border-white/10 p-4 backdrop-blur-md">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="inline-flex items-center gap-3 text-sm font-bold text-slate-300">
                                        <div className={`p-1.5 rounded-lg bg-white/10 ${item.tone}`}>
                                            <item.icon size={16} />
                                        </div>
                                        {item.label}
                                    </div>
                                    <div className="text-sm font-black text-white">{item.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 relative z-10 backdrop-blur-md">
                        <div className="flex items-center gap-2 text-sm font-black text-amber-400 mb-2">
                            <Lightbulb size={16} /> Immediate AI Suggestion
                        </div>
                        <p className="text-sm font-medium leading-relaxed text-slate-300">
                            Ask an open question to increase speaking time. <br/>
                            <span className="text-white font-bold mt-1 block">Suggested Q: "What do you like to eat after school?"</span>
                        </p>
                    </div>
                </section>
            </div>

            <div className="grid gap-8 xl:grid-cols-[1fr,1fr]">
                <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="mb-6 flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-emerald-100 text-emerald-700">
                            <FileText size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900">Post-Session Auto Report</h2>
                            <p className="text-sm font-medium text-slate-500">Drafted automatically based on session data. Edit only if needed.</p>
                        </div>
                    </div>
                    <div className="space-y-3 mb-8">
                        {[
                            { label: 'Session Summary', content: 'Sara responded well to visual activities and started giving longer answers than usual.' },
                            { label: 'Improvements Noted', content: 'Answer length increased and engagement improved with short prompts.' },
                            { label: 'Requires Follow-up', content: 'Confidence before starting sentences and pronunciation of specific words.' },
                            { label: 'Recurring Errors', content: 'Hesitation before speaking + confusion in P/B sounds.' },
                            { label: 'Suggested Homework', content: 'Food picture speaking drill for 6 minutes.' },
                            { label: 'Draft Parent Message', content: 'Today we saw clear improvement in answer length! We recommend repeating the picture activity twice this week.', highlight: true },
                        ].map((item, i) => (
                            <div key={i} className={`rounded-xl p-4 text-sm leading-relaxed ${item.highlight ? 'bg-indigo-50 border border-indigo-100 text-indigo-900 font-medium' : 'bg-slate-50 text-slate-700'}`}>
                                <strong className={`block text-xs uppercase tracking-wider mb-1 ${item.highlight ? 'text-indigo-600' : 'text-slate-400'}`}>{item.label}</strong>
                                {item.content}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button className="flex-1 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white transition-all hover:bg-slate-800 flex items-center justify-center gap-2">
                            <Send size={16} /> Send to Parent
                        </button>
                        <button className="rounded-2xl bg-slate-100 px-5 py-4 text-sm font-black text-slate-700 transition-all hover:bg-slate-200">Edit Report</button>
                        <button className="rounded-2xl bg-white border border-slate-200 px-5 py-4 text-sm font-black text-slate-700 transition-all hover:bg-slate-50">Save Only</button>
                    </div>
                </section>

                <section className="space-y-8">
                    <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="mb-6 flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-amber-100 text-amber-700">
                                <ClipboardList size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Homework Automation</h2>
                                <p className="text-sm font-medium text-slate-500">Smart assignments with AI rationale.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                            {[
                                ['Completed', '14', 'text-emerald-600'],
                                ['Late', '5', 'text-rose-600'],
                                ['Completion Rate', '78%', 'text-indigo-600'],
                                ['Avg. Duration', '7 mins', 'text-slate-900'],
                            ].map(([label, value, tone]) => (
                                <div key={label} className="rounded-xl bg-slate-50 p-4 flex flex-col justify-center items-center text-center">
                                    <div className={`text-xl font-black ${tone} mb-1`}>{value}</div>
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{label}</div>
                                </div>
                            ))}
                        </div>
                        <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5 mb-6 relative">
                            <div className="absolute top-4 right-4 text-indigo-300"><Sparkles size={20}/></div>
                            <div className="text-xs font-black text-indigo-500 uppercase tracking-wider mb-1">Auto-Suggested Task</div>
                            <div className="text-base font-black text-slate-900 mb-2">Picture speaking drill</div>
                            <p className="text-sm font-medium leading-relaxed text-slate-600">Rationale: The system detected that current weakness is confidence, not comprehension. Speaking drills lower the cognitive load.</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <button className="flex-1 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white hover:bg-slate-800 transition-colors">Assign Automatically</button>
                            <button className="rounded-2xl bg-slate-100 px-5 py-4 text-sm font-black text-slate-700 hover:bg-slate-200 transition-colors">Regenerate</button>
                            <button className="rounded-2xl bg-amber-500 px-5 py-4 text-sm font-black text-white hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20">Send Reminder</button>
                        </div>
                    </div>

                    <div className="rounded-[2.5rem] border border-rose-200 bg-gradient-to-br from-rose-50 to-white p-8 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 text-rose-100"><ShieldAlert size={120} /></div>
                        <div className="mb-6 flex items-center gap-4 relative z-10">
                            <div className="flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-rose-100 text-rose-700 shadow-inner">
                                <ShieldAlert size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Risk & Retention Engine</h2>
                                <p className="text-sm font-medium text-slate-500">Predictive churn alerts with executable actions.</p>
                            </div>
                        </div>
                        <div className="rounded-2xl bg-white border border-rose-100 p-6 relative z-10 shadow-sm mb-6">
                            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold mb-4">
                                <Activity size={14} /> Risk Level: Medium
                            </div>
                            <p className="text-sm font-bold leading-relaxed text-slate-700">
                                <span className="text-rose-600 uppercase tracking-wider text-xs block mb-1">Trigger</span>
                                Engagement dropped for 2 consecutive sessions. 
                            </p>
                            <div className="h-px bg-slate-100 my-4"></div>
                            <p className="text-sm font-bold leading-relaxed text-slate-700">
                                <span className="text-emerald-600 uppercase tracking-wider text-xs block mb-1">AI Recommendation</span>
                                Send parent progress note focusing on small wins, and switch the next activity to a game-based format.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3 relative z-10">
                            <button className="flex-1 rounded-2xl bg-slate-900 px-5 py-4 text-sm font-black text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20">Apply Retention Playbook</button>
                            <button className="rounded-2xl bg-white border border-slate-200 px-5 py-4 text-sm font-black text-slate-700 hover:bg-slate-50">Send Parent Update</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TeacherStudentProfilePage;
