import React from 'react';
import { Clock3, Video, CalendarDays, BrainCircuit, CheckCircle2, ChevronRight, Activity, ArrowRight } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';

const SchedulePage: React.FC = () => {
    const sessions = [
        { time: '09:00 AM', duration: '45m', group: 'KG - Stars', focus: 'Letter sounds and rhythm', students: 12, tone: 'indigo', status: 'upcoming' },
        { time: '11:00 AM', duration: '45m', group: 'Grade 2 - A', focus: 'Speaking with classroom vocabulary', students: 15, tone: 'emerald', status: 'upcoming' },
        { time: '02:00 PM', duration: '60m', group: 'Grade 4 - B', focus: 'Reading fluency and short answers', students: 18, tone: 'amber', status: 'planned' },
    ];

    return (
        <div className="space-y-10 pb-16 font-outfit">
            <SectionHeader
                eyebrow="Schedule"
                title="AI Command Center"
                description="Your daily schedule augmented with automated lesson focus points and predictive insights for each cohort."
            />

            <div className="grid gap-5 md:grid-cols-3 mb-8">
                <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl flex items-center justify-center bg-indigo-50 text-indigo-600">
                        <Clock3 size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-slate-900">3</div>
                        <div className="text-sm font-bold text-slate-500">Sessions Today</div>
                    </div>
                </div>
                <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl flex items-center justify-center bg-emerald-50 text-emerald-600">
                        <Activity size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-slate-900">45</div>
                        <div className="text-sm font-bold text-slate-500">Total Students</div>
                    </div>
                </div>
                <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm flex items-center gap-4 relative overflow-hidden group hover:border-indigo-200 transition-colors cursor-pointer">
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-indigo-50 to-transparent"></div>
                    <div className="h-14 w-14 rounded-2xl flex items-center justify-center bg-amber-50 text-amber-600">
                        <BrainCircuit size={24} />
                    </div>
                    <div>
                        <div className="text-xl font-black text-slate-900">1 Prep Task</div>
                        <div className="text-sm font-bold text-indigo-600">Review AI Plan</div>
                    </div>
                    <ChevronRight size={20} className="absolute right-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                </div>
            </div>

            <div className="space-y-4 relative">
                {/* Timeline visual */}
                <div className="absolute left-8 top-8 bottom-8 w-px bg-slate-200 hidden md:block z-0"></div>

                {sessions.map((session, idx) => (
                    <div key={session.time + session.group} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow relative z-10 group">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div className="flex items-center gap-5 w-full md:w-auto">
                                <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-slate-950 text-white shadow-md">
                                    <Clock3 size={24} />
                                </div>
                                <div className="flex-1 md:flex-none">
                                    <div className="text-2xl font-black text-slate-900 tracking-tight">{session.time}</div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-sm font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">{session.duration}</span>
                                        <span className={`text-sm font-bold px-2 py-0.5 rounded-md ${
                                            session.tone === 'indigo' ? 'bg-indigo-50 text-indigo-700' :
                                            session.tone === 'emerald' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                                        }`}>{session.group}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 rounded-2xl bg-slate-50/50 border border-slate-100 p-4 w-full md:mx-4 group-hover:bg-white transition-colors">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">AI Suggested Focus</div>
                                    <div className="text-xs font-bold text-slate-500">{session.students} Students</div>
                                </div>
                                <div className="font-bold text-slate-800">{session.focus}</div>
                            </div>

                            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-black text-slate-700 hover:bg-slate-50 transition-colors">
                                    <BrainCircuit size={16} />
                                    Review Plan
                                </button>
                                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-black text-white hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20 group-hover:scale-105 duration-300">
                                    <Video size={16} />
                                    Start Session
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="mt-6 w-full rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-sm font-bold text-slate-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2">
                <CalendarDays size={18} />
                View Full Calendar
            </button>
        </div>
    );
};

export default SchedulePage;
