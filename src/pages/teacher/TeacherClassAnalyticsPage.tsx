import React from 'react';
import { BarChart3, TrendingUp, Users, Activity, Target, Zap, BrainCircuit, Sparkles } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';

const TeacherClassAnalyticsPage: React.FC = () => {
    return (
        <div className="space-y-10 pb-16 font-outfit">
            <SectionHeader
                eyebrow="Cohort Intelligence"
                title="AI Class Analytics"
                description="Deep-dive cohort analytics synthesizing engagement patterns, skill gaps, and AI-prescribed instructional adjustments."
            />

            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {[
                    { title: 'Avg Engagement', value: '68%', icon: TrendingUp, tone: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100', trend: '+5% this week' },
                    { title: 'Avg Attendance', value: '92%', icon: Users, tone: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', trend: 'Stable' },
                    { title: 'Weakest Cohort Skill', value: 'Speaking Confidence', icon: Target, tone: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100', trend: 'Action Required' },
                    { title: 'Top Performing Skill', value: 'Vocabulary', icon: Zap, tone: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', trend: 'Exceeding target' },
                ].map((item) => (
                    <div key={item.title} className={`rounded-[2rem] border ${item.border} bg-white p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group`}>
                        <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${item.bg} opacity-50 group-hover:scale-110 transition-transform`}></div>
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className={`p-3 rounded-2xl ${item.bg} ${item.tone}`}>
                                <item.icon size={22} />
                            </div>
                        </div>
                        <div className="text-3xl font-black text-slate-900 tracking-tight relative z-10">{item.value}</div>
                        <div className="mt-1 text-sm font-bold text-slate-500 relative z-10">{item.title}</div>
                        <div className="mt-4 text-xs font-black text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg inline-block relative z-10">{item.trend}</div>
                    </div>
                ))}
            </section>

            <div className="grid gap-8 xl:grid-cols-[1.2fr,0.8fr]">
                <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="mb-6 flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-indigo-50 text-indigo-600">
                            <BrainCircuit size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900">AI Diagnostic Insights</h2>
                            <p className="text-sm font-medium text-slate-500">Synthesized cohort observations from the last 7 days.</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        {[
                            {
                                label: 'Peak Engagement Window',
                                content: 'Student engagement peaks during the first 12 minutes. Transition to active speaking drills before minute 15 for optimal retention.',
                                type: 'optimization'
                            },
                            {
                                label: 'Critical Intervention Area',
                                content: 'The cohort struggles most with "Speaking Confidence". Reduce cognitive load by providing visual aids during conversational exercises.',
                                type: 'alert'
                            },
                            {
                                label: 'Schedule Adjustment',
                                content: 'Evening sessions show a 14% drop in active participation. We recommend integrating game-based activities to boost energy levels.',
                                type: 'recommendation'
                            },
                        ].map((note) => (
                            <div key={note.label} className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 hover:bg-white transition-colors group">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles size={14} className={
                                        note.type === 'alert' ? 'text-rose-500' : 
                                        note.type === 'optimization' ? 'text-indigo-500' : 'text-emerald-500'
                                    } />
                                    <h4 className="text-sm font-black text-slate-900">{note.label}</h4>
                                </div>
                                <p className="text-sm font-medium leading-relaxed text-slate-600">
                                    {note.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="rounded-[2.5rem] border border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-white p-8 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div className="mb-6 flex items-center gap-4 relative z-10">
                        <div className="flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-indigo-600 text-white shadow-md shadow-indigo-200">
                            <Activity size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900">Recommended Action</h2>
                            <p className="text-sm font-medium text-slate-500">Apply to upcoming sessions</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative z-10">
                        <div className="text-sm font-black text-indigo-600 mb-2">Cohort Restructuring</div>
                        <p className="text-sm font-medium leading-relaxed text-slate-700 mb-6">
                            Based on recent data, shifting the cohort focus from grammar accuracy to communicative fluency this week will prevent an estimated 12% drop in engagement.
                        </p>
                        <button className="w-full bg-slate-950 hover:bg-slate-800 text-white font-black text-sm py-4 rounded-xl transition-colors shadow-lg shadow-slate-900/10">
                            Auto-Adjust Lesson Plans
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TeacherClassAnalyticsPage;
