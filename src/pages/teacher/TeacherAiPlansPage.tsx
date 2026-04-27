import React from 'react';
import { BrainCircuit, CalendarDays, CheckCircle2, ClipboardList, Sparkles, AlertCircle, ArrowRight, PlayCircle, Clock } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';

const TeacherAiPlansPage: React.FC = () => {
    return (
        <div className="space-y-10 pb-16 font-outfit">
            <SectionHeader
                eyebrow="AI Learning Paths"
                title="Adaptive Lesson Plans"
                description="Review, modify, and approve AI-generated weekly learning paths tailored to individual student performance data."
            />

            <div className="grid gap-8 xl:grid-cols-[1.2fr,0.8fr]">
                <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="mb-8 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="grid h-14 w-14 place-items-center rounded-[1.2rem] bg-indigo-50 text-indigo-700">
                                <BrainCircuit size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Current Week's Plans</h2>
                                <p className="text-sm font-medium text-slate-500">Auto-generated based on last week's diagnostics.</p>
                            </div>
                        </div>
                        <button className="hidden sm:flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-slate-800 transition-colors shadow-md shadow-slate-900/10">
                            Approve All Ready
                        </button>
                    </div>

                    <div className="space-y-4">
                        {[
                            { student: 'Sara Ahmed', plan: 'Speaking Confidence Plan', sessions: '3 Sessions', duration: '25 min/each', status: 'Ready for Approval', statusTone: 'emerald' },
                            { student: 'Omar Fahad', plan: 'Phonics Recovery Plan', sessions: '2 Sessions', duration: '30 min/each', status: 'Needs Review', statusTone: 'amber' },
                            { student: 'Layan Khalid', plan: 'Advanced Reading Comprehension', sessions: '3 Sessions', duration: '25 min/each', status: 'Ready for Approval', statusTone: 'emerald' },
                        ].map((item) => (
                            <div key={item.student} className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 hover:bg-white hover:shadow-md transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="text-lg font-black text-slate-900">{item.student}</div>
                                        <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                                            item.statusTone === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                        }`}>
                                            {item.statusTone === 'emerald' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                                            {item.status}
                                        </div>
                                    </div>
                                    <div className="text-sm font-bold text-indigo-600 mb-3">{item.plan}</div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <div className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-2.5 py-1 text-xs font-bold text-slate-600">
                                            <CalendarDays size={14} className="text-slate-400" />
                                            {item.sessions}
                                        </div>
                                        <div className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-2.5 py-1 text-xs font-bold text-slate-600">
                                            <Clock size={14} className="text-slate-400" />
                                            {item.duration}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex sm:flex-col gap-2">
                                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-slate-200 px-4 py-2.5 text-xs font-black text-slate-700 hover:bg-slate-300 transition-colors">
                                        Preview Plan
                                    </button>
                                    <button className={`flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition-colors ${
                                        item.statusTone === 'emerald' ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/20' : 'bg-slate-950 text-white hover:bg-slate-800'
                                    }`}>
                                        {item.statusTone === 'emerald' ? 'Approve' : 'Review & Edit'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="space-y-8">
                    <div className="rounded-[2.5rem] border border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-white p-8 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                        
                        <div className="mb-6 inline-flex items-center gap-2 text-sm font-black text-indigo-700 bg-indigo-100/50 px-3 py-1.5 rounded-lg relative z-10">
                            <Sparkles size={16} />
                            Smart Actions
                        </div>
                        
                        <h3 className="text-2xl font-black text-slate-900 mb-2 relative z-10">Automate your workflow</h3>
                        <p className="text-sm font-medium text-slate-600 mb-6 relative z-10 leading-relaxed">
                            Let the AI handle the heavy lifting. You can always review and override its decisions before they go live.
                        </p>
                        
                        <div className="flex flex-col gap-3 relative z-10">
                            <button className="flex items-center justify-between rounded-xl bg-slate-950 px-5 py-4 text-sm font-black text-white hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10 group">
                                <span className="flex items-center gap-2">
                                    <BrainCircuit size={18} className="text-slate-400 group-hover:text-indigo-400 transition-colors" />
                                    Regenerate All Pending Plans
                                </span>
                                <ArrowRight size={16} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </button>
                            <button className="flex items-center justify-between rounded-xl bg-white border border-slate-200 px-5 py-4 text-sm font-black text-slate-700 hover:bg-slate-50 transition-colors group">
                                <span className="flex items-center gap-2">
                                    <Sparkles size={18} className="text-amber-500" />
                                    Auto-Adjust Difficulty Matrix
                                </span>
                                <ArrowRight size={16} className="text-slate-400 group-hover:text-slate-700 group-hover:translate-x-1 transition-all" />
                            </button>
                            <button className="flex items-center justify-between rounded-xl bg-white border border-slate-200 px-5 py-4 text-sm font-black text-slate-700 hover:bg-slate-50 transition-colors group">
                                <span className="flex items-center gap-2">
                                    <PlayCircle size={18} className="text-emerald-500" />
                                    Launch Next Scheduled Session
                                </span>
                                <ArrowRight size={16} className="text-slate-400 group-hover:text-slate-700 group-hover:translate-x-1 transition-all" />
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TeacherAiPlansPage;
