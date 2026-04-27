import React from 'react';
import { GraduationCap, Mic2, MonitorPlay, TimerReset, UserRound, Video, MicOff, ScreenShare, MoreVertical, LayoutGrid, BrainCircuit, Target, Sparkles, Wand2 } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';

const SessionLivePage: React.FC = () => {
    return (
        <div className="space-y-10 pb-16 font-outfit">
            <SectionHeader
                eyebrow="Live Classroom"
                title="AI Assessment Studio"
                description="Integrated video environment with real-time AI behavioral tracking, instant rubric scoring, and dynamic pacing."
            />

            <div className="grid gap-8 xl:grid-cols-[1.1fr,0.9fr]">
                <div className="space-y-6">
                    <div className="rounded-[2.5rem] bg-slate-950 p-6 text-white shadow-xl shadow-slate-900/10 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                        <div className="grid gap-4 md:grid-cols-2 relative z-10">
                            <div className="rounded-[1.5rem] bg-slate-900/80 border border-slate-800 p-5 relative overflow-hidden group/view hover:border-slate-700 transition-colors">
                                <div className="absolute top-4 left-4 bg-slate-950/50 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-black z-20">
                                    <Video size={14} className="text-indigo-400" /> Instructor
                                </div>
                                <div className="grid h-64 place-items-center rounded-[1.2rem] bg-slate-800/50 text-slate-700 group-hover/view:bg-slate-800 transition-colors">
                                    <GraduationCap size={48} className="opacity-50" />
                                </div>
                            </div>
                            <div className="rounded-[1.5rem] bg-slate-900/80 border border-slate-800 p-5 relative overflow-hidden group/view hover:border-slate-700 transition-colors">
                                <div className="absolute top-4 left-4 bg-slate-950/50 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-black z-20">
                                    <Mic2 size={14} className="text-emerald-400" /> Sara Ahmed (Student)
                                </div>
                                <div className="absolute top-4 right-4 bg-emerald-500/20 text-emerald-400 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider z-20">
                                    <Sparkles size={12} /> High Engagement
                                </div>
                                <div className="grid h-64 place-items-center rounded-[1.2rem] bg-slate-800/50 text-slate-700 group-hover/view:bg-slate-800 transition-colors">
                                    <UserRound size={48} className="opacity-50" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 relative z-10 px-2">
                            <div className="flex items-center gap-3">
                                <button className="flex items-center justify-center h-12 w-12 rounded-xl bg-slate-800 hover:bg-rose-500 hover:text-white transition-colors text-slate-300">
                                    <MicOff size={20} />
                                </button>
                                <button className="flex items-center justify-center h-12 w-12 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors text-slate-300">
                                    <Video size={20} />
                                </button>
                                <button className="flex items-center justify-center gap-2 px-5 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-bold text-sm">
                                    <ScreenShare size={18} /> Share Screen
                                </button>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="flex items-center justify-center h-12 w-12 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors text-slate-300">
                                    <LayoutGrid size={20} />
                                </button>
                                <button className="flex items-center justify-center h-12 w-12 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors text-slate-300">
                                    <MoreVertical size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-50 rounded-bl-full pointer-events-none"></div>
                        <div className="mb-6 flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-3 text-slate-900">
                                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
                                    <Target size={20} />
                                </div>
                                <h3 className="text-xl font-black">1-Click Live Assessment</h3>
                            </div>
                            <button className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1 hover:text-indigo-600 transition-colors">
                                <Wand2 size={12} /> Edit Prompts
                            </button>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
                            {[
                                { text: 'Nailed it!', tone: 'emerald' },
                                { text: 'Needs minor help', tone: 'amber' },
                                { text: 'Struggled w/ word', tone: 'rose' },
                                { text: 'Great pronunciation', tone: 'emerald' },
                                { text: 'Lost focus', tone: 'amber' },
                                { text: 'Add to next plan', tone: 'indigo' },
                            ].map((item) => (
                                <button key={item.text} className={`rounded-xl px-4 py-3 text-sm font-bold border transition-all text-left flex items-center justify-between group ${
                                    item.tone === 'emerald' ? 'bg-emerald-50/50 border-emerald-100 text-emerald-700 hover:bg-emerald-100' :
                                    item.tone === 'amber' ? 'bg-amber-50/50 border-amber-100 text-amber-700 hover:bg-amber-100' :
                                    item.tone === 'rose' ? 'bg-rose-50/50 border-rose-100 text-rose-700 hover:bg-rose-100' :
                                    'bg-indigo-50/50 border-indigo-100 text-indigo-700 hover:bg-indigo-100'
                                }`}>
                                    {item.text}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-[2.5rem] border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-8 shadow-sm text-center relative overflow-hidden">
                        <div className="mb-4 inline-flex items-center justify-center gap-2 text-amber-700 bg-amber-100/50 px-4 py-2 rounded-xl text-sm font-black">
                            <TimerReset size={18} /> Session Timer
                        </div>
                        <div className="text-6xl font-black text-slate-900 tracking-tighter mb-2">12<span className="text-amber-500">:</span>32</div>
                        <div className="text-sm font-bold text-slate-500">Target Duration: 25:00</div>
                    </div>

                    <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="mb-6 flex items-center gap-3 text-slate-900">
                            <div className="p-2 bg-slate-100 text-slate-600 rounded-xl">
                                <MonitorPlay size={20} />
                            </div>
                            <h3 className="text-xl font-black">AI Pacing Guide</h3>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: 'Warm-up Chant', time: '03:00', status: 'completed' },
                                { label: 'Native Modeling', time: '05:00', status: 'active' },
                                { label: 'Pair Speaking Prompt', time: '10:00', status: 'pending' },
                                { label: 'Vocabulary Check', time: '07:00', status: 'pending' },
                            ].map((phase, index) => (
                                <div key={phase.label} className={`flex items-center justify-between rounded-2xl px-5 py-4 border ${
                                    phase.status === 'active' ? 'bg-indigo-50 border-indigo-200 shadow-sm' : 
                                    phase.status === 'completed' ? 'bg-slate-50/50 border-slate-100 opacity-60' : 'bg-white border-slate-100'
                                }`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${
                                            phase.status === 'active' ? 'bg-indigo-500 animate-pulse' : 
                                            phase.status === 'completed' ? 'bg-slate-400' : 'bg-slate-200'
                                        }`}></div>
                                        <span className={`font-bold text-sm ${phase.status === 'active' ? 'text-indigo-900' : 'text-slate-700'}`}>{phase.label}</span>
                                    </div>
                                    <span className={`text-xs font-black ${phase.status === 'active' ? 'text-indigo-600' : 'text-slate-400'}`}>{phase.time}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                            <BrainCircuit size={18} className="text-slate-400 shrink-0 mt-0.5" />
                            <p className="text-xs font-medium text-slate-600 leading-relaxed">
                                AI Suggestion: Student is highly engaged. Consider extending the current modeling phase by 2 minutes and compressing the final check.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionLivePage;

