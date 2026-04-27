import React, { useMemo, useState } from 'react';
import { CheckCircle2, FileText, Send, ShieldAlert, Sparkles, BrainCircuit, Target, MessageSquareQuote } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';

const quickMatrix = [
    { skill: 'Attendance', value: 'Present', tone: 'emerald' },
    { skill: 'Engagement', value: 'High', tone: 'emerald' },
    { skill: 'Pronunciation', value: 'Needs Review', tone: 'amber' },
    { skill: 'Vocabulary', value: 'Partial Mastery', tone: 'amber' },
    { skill: 'Speaking Confidence', value: 'Hesitant', tone: 'rose' },
];

const quickActions = [
    'Mastered today\'s words',
    'Needs P/B sound review',
    'Needs V/F sound drill',
    'Incomplete previous homework',
    'Clear improvement in confidence',
];

type SummaryReportTone = 'warning' | 'encouragement' | 'full';

const SessionSummaryPage: React.FC = () => {
    const [tone, setTone] = useState<SummaryReportTone>('full');

    const generatedSummary = useMemo(() => {
        if (tone === 'warning') {
            return 'Important Update: Sara attended today\'s session, but pronunciation requires targeted review, specifically for words like "fish" and "bird". The previous assignment was also incomplete. We strongly recommend a 5-minute daily listening activity before the next session.';
        }

        if (tone === 'encouragement') {
            return 'Great Progress: Sara showed wonderful engagement today! She demonstrated growing confidence when repeating sentences and successfully mastered the words "cat", "dog", and "bird". A quick daily review will help maintain this fantastic momentum.';
        }

        return 'Comprehensive Session Report: Sara was present and highly engaged. She mastered the target words "cat", "dog", and "bird", though "fish" requires further practice. Pronunciation is improving but still needs support with specific fricative sounds. Next Step: An automated 7-minute "Animals Listening" activity has been assigned to her dashboard.';
    }, [tone]);

    return (
        <div className="space-y-10 pb-16 font-outfit">
            <SectionHeader
                eyebrow="Post-Session Wrap-up"
                title="AI Assessment Synthesis"
                description="Finalize rubrics and dispatch auto-generated parent reports in under 60 seconds."
            />

            <div className="grid gap-8 xl:grid-cols-[1fr,1.1fr]">
                <div className="space-y-8">
                    <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-3 text-slate-900">
                                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
                                    <Target size={20} />
                                </div>
                                <h3 className="text-xl font-black">AI Captured Metrics</h3>
                            </div>
                            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">Auto-filled</span>
                        </div>
                        
                        <div className="space-y-3">
                            {quickMatrix.map((item) => (
                                <div key={item.skill} className="flex items-center justify-between rounded-2xl bg-slate-50/50 border border-slate-100 px-5 py-4 group hover:bg-white hover:shadow-sm transition-all">
                                    <span className="font-bold text-slate-700">{item.skill}</span>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                                            item.tone === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 
                                            item.tone === 'rose' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                                        }`}>
                                            {item.value}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full pointer-events-none"></div>
                        <div className="mb-6 flex items-center gap-3 text-slate-900 relative z-10">
                            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
                                <CheckCircle2 size={20} />
                            </div>
                            <h3 className="text-xl font-black">1-Click Observations</h3>
                        </div>
                        <div className="flex flex-wrap gap-3 relative z-10">
                            {quickActions.map((item) => (
                                <button key={item} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-indigo-200 hover:text-indigo-700 transition-all text-left">
                                    {item}
                                </button>
                            ))}
                            <button className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-500 hover:border-indigo-300 hover:text-indigo-600 transition-all text-left">
                                + Custom Note
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="mb-6 flex items-center gap-3 text-slate-900">
                            <div className="p-2 bg-slate-100 text-slate-700 rounded-xl">
                                <BrainCircuit size={20} />
                            </div>
                            <h3 className="text-xl font-black">AI Report Generation</h3>
                        </div>

                        <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-3">Select Communication Tone</label>
                        <div className="grid gap-3 sm:grid-cols-3 mb-8">
                            <button
                                onClick={() => setTone('warning')}
                                className={`rounded-xl px-4 py-4 text-sm font-black flex flex-col items-center gap-2 transition-all ${tone === 'warning' ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20' : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                            >
                                <ShieldAlert size={20} />
                                Action Required
                            </button>
                            <button
                                onClick={() => setTone('encouragement')}
                                className={`rounded-xl px-4 py-4 text-sm font-black flex flex-col items-center gap-2 transition-all ${tone === 'encouragement' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                            >
                                <Sparkles size={20} />
                                Encouraging
                            </button>
                            <button
                                onClick={() => setTone('full')}
                                className={`rounded-xl px-4 py-4 text-sm font-black flex flex-col items-center gap-2 transition-all ${tone === 'full' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                            >
                                <FileText size={20} />
                                Comprehensive
                            </button>
                        </div>

                        <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-white p-6 relative">
                            <div className="flex items-center gap-2 mb-3 text-xs font-black uppercase tracking-wider text-indigo-500">
                                <MessageSquareQuote size={14} />
                                Generated Output
                            </div>
                            <p className="leading-relaxed font-medium text-slate-700 min-h-[120px]">
                                {generatedSummary}
                            </p>
                        </div>

                        <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-4 text-sm font-black text-white hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
                            <Send size={18} />
                            Dispatch Report & Close Session
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionSummaryPage;
