import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Mic2, Save, Send, Sparkles, Wand2, Layers, AlertTriangle } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';

const ContentBuilderPage: React.FC = () => {
    const [title, setTitle] = useState('Speaking Through Play');
    const [objective, setObjective] = useState('Students will use 5 target vocabulary words in short, spontaneous sentences.');
    const [parentNote, setParentNote] = useState('Reinforce the target words at home using visual cues or gestures, keeping it stress-free and playful.');

    return (
        <div className="space-y-10 pb-16 font-outfit">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <SectionHeader
                    eyebrow="Content Studio"
                    title="AI Lesson Builder"
                    description="Structure goal-oriented lessons with automated pacing, assessment rubrics, and parent communications."
                />
                <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
                    <button className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 hover:bg-slate-50 transition-colors">
                        <Save size={16} />
                        Save Draft
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-600/20">
                        <Send size={16} />
                        Submit for Review
                    </button>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
                <div className="space-y-8">
                    <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                                <Layers size={20} className="text-indigo-600" />
                                Core Lesson Data
                            </h2>
                            <button className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-indigo-100 transition-colors">
                                <Wand2 size={12} /> Auto-fill with AI
                            </button>
                        </div>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">Lesson Title</label>
                                <input value={title} onChange={(event) => setTitle(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all" />
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">Linguistic Objective</label>
                                <textarea value={objective} onChange={(event) => setObjective(event.target.value)} rows={3} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium leading-relaxed text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all resize-none" />
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">Post-Session Parent Note Template</label>
                                <textarea value={parentNote} onChange={(event) => setParentNote(event.target.value)} rows={3} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium leading-relaxed text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all resize-none" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-black text-slate-900">AI Proposed Pacing</h2>
                            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">Total: 17 mins</span>
                        </div>
                        <div className="space-y-3">
                            {[
                                { title: 'Warm-up Chant', time: '3 mins', type: 'Engagement' },
                                { title: 'Native Pronunciation Modeling', time: '5 mins', type: 'Instruction' },
                                { title: 'Pair Speaking Prompt', time: '6 mins', type: 'Practice' },
                                { title: 'Quick Voice Check', time: '3 mins', type: 'Assessment' },
                            ].map((item, idx) => (
                                <div key={item.title} className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 hover:bg-white transition-colors flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900">{item.title}</div>
                                            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">{item.type}</div>
                                        </div>
                                    </div>
                                    <div className="text-sm font-black text-slate-500">{item.time}</div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 border border-dashed border-slate-300 rounded-xl py-3 text-sm font-bold text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
                            + Add Custom Block
                        </button>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="rounded-[2.5rem] border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-8 shadow-sm">
                        <div className="mb-5 flex items-center gap-2 font-black text-amber-700 text-lg">
                            <Sparkles size={20} />
                            Pre-Publish Checklist
                        </div>
                        <div className="space-y-4">
                            {[
                                'Is the objective measurable within the session timeframe?',
                                'Is the activity age-appropriate for lower primary levels?',
                                'Is the parent note simple, actionable, and encouraging?',
                            ].map((item) => (
                                <div key={item} className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-500" size={18} />
                                    <span className="text-sm font-bold leading-relaxed text-slate-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-0"></div>
                        <div className="mb-4 flex items-center gap-3 text-slate-900 relative z-10">
                            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
                                <Mic2 size={18} />
                            </div>
                            <h2 className="text-xl font-black">Assessment Strategy</h2>
                        </div>
                        <p className="text-sm font-medium leading-relaxed text-slate-600 relative z-10">
                            For this lesson, a short <strong className="text-slate-900">voice prompt</strong> is recommended. This allows teachers to evaluate quickly using a 3-tier rubric: <em>Needs Support, Proficient, Mastery.</em>
                        </p>
                    </div>

                    <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-0"></div>
                        <div className="mb-4 flex items-center gap-3 text-slate-900 relative z-10">
                            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                                <BookOpen size={18} />
                            </div>
                            <h2 className="text-xl font-black">Curriculum Linking</h2>
                        </div>
                        <p className="text-sm font-medium leading-relaxed text-slate-600 relative z-10">
                            Link this session to a <strong className="text-slate-900">single reading card</strong> or vocabulary list. Minimizing external resources increases completion rates and focus.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentBuilderPage;
