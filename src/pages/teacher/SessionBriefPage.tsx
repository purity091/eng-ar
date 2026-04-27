import React from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, MessageSquareQuote, Mic2, UserCircle2, BrainCircuit, Target, Sparkles, Play } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';

const SessionBriefPage: React.FC = () => {
    const { id } = useParams();

    return (
        <div className="space-y-10 pb-16 font-outfit">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <SectionHeader
                    eyebrow="Pre-Session Intelligence"
                    title={`AI Session Brief: ${id || '001'}`}
                    description="Instant, AI-synthesized context for your upcoming session. Focus on the student, not the preparation."
                />
                <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-black text-white hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20 mt-4 md:mt-0">
                    <Play size={16} className="fill-white" />
                    Launch Session
                </button>
            </div>

            <div className="grid gap-8 xl:grid-cols-[0.9fr,1.1fr]">
                <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm h-fit">
                    <div className="mb-8 flex items-center gap-5">
                        <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-inner">
                            <UserCircle2 size={40} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Sara Ahmed</h2>
                            <div className="mt-2 flex items-center gap-2">
                                <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">Grade 2</span>
                                <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-100">CEFR: Pre-A1</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 group hover:bg-white hover:shadow-md transition-all">
                            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Previous Lesson</div>
                            <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">My School Bag</div>
                        </div>
                        <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 group hover:bg-white hover:shadow-md transition-all">
                            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Identified Gaps</div>
                            <div className="font-bold text-slate-900 leading-tight">Short vowels & speaking confidence</div>
                        </div>
                        <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 group hover:bg-white hover:shadow-md transition-all md:col-span-2">
                            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-indigo-500 mb-1">
                                <Target size={12} /> Target Objective
                            </div>
                            <div className="font-bold text-slate-900 text-lg">Animals + "I can see..." structure</div>
                        </div>
                        <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 group hover:bg-white hover:shadow-md transition-all md:col-span-2">
                            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Target Vocabulary</div>
                            <div className="flex flex-wrap gap-2">
                                {['cat', 'dog', 'bird', 'fish'].map(word => (
                                    <span key={word} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-black text-slate-700 shadow-sm">{word}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-[2.5rem] border border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-white p-8 shadow-sm">
                        <div className="mb-4 flex items-center gap-3 text-indigo-700">
                            <div className="p-2 bg-indigo-100 rounded-xl">
                                <BrainCircuit size={20} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900">AI Pedagogical Strategy</h3>
                        </div>
                        <p className="leading-relaxed font-medium text-slate-700">
                            The primary goal today is to build <strong className="text-indigo-600">vocal confidence</strong>. Maintain minimal corrective feedback to avoid lowering the student's affective filter and willingness to try. Praise effort over accuracy.
                        </p>
                    </div>

                    <div className="rounded-[2.5rem] border border-amber-100 bg-amber-50/30 p-8 shadow-sm">
                        <div className="mb-4 flex items-center gap-3 text-amber-600">
                            <div className="p-2 bg-amber-100 rounded-xl">
                                <MessageSquareQuote size={20} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900">Historical Behavior</h3>
                        </div>
                        <p className="leading-relaxed font-medium text-slate-700 italic border-l-4 border-amber-300 pl-4">
                            "Sara tends to be shy at the beginning of sessions, but opens up significantly when presented with visual-based interactive games."
                        </p>
                    </div>

                    <div className="rounded-[2.5rem] border border-emerald-100 bg-emerald-50/30 p-8 shadow-sm relative overflow-hidden">
                        <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
                            <Sparkles size={120} />
                        </div>
                        <div className="mb-4 flex items-center gap-3 text-emerald-600 relative z-10">
                            <div className="p-2 bg-emerald-100 rounded-xl">
                                <BookOpen size={20} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900">Execution Plan</h3>
                        </div>
                        <ul className="space-y-3 relative z-10 text-sm font-medium text-slate-700">
                            <li className="flex items-start gap-3">
                                <span className="font-black text-emerald-600">1.</span>
                                <span>Start with a warm-up visual prompt related to pets.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="font-black text-emerald-600">2.</span>
                                <span>Provide short, clear native modeling for the target words.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="font-black text-emerald-600">3.</span>
                                <span>Guide the student to form one complete sentence before expanding the activity scope.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionBriefPage;
