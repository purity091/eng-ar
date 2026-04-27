import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Users, Activity, Target, Zap, BrainCircuit, Sparkles } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';

const TeacherClassAnalyticsPage: React.FC = () => {
    const { t } = useTranslation();

    const topStats = t('appPages.teacher.classAnalyticsPage.topStats', { returnObjects: true }) as Array<{ title: string; value: string; icon: 'engagement'|'attendance'|'weakest'|'top'; tone: string; bg: string; border: string; trend: string }>;
    const insights = t('appPages.teacher.classAnalyticsPage.insights', { returnObjects: true }) as Array<{ label: string; content: string; type: 'optimization'|'alert'|'recommendation' }>;

    return (
        <div className="space-y-10 pb-16 font-outfit">
            <SectionHeader eyebrow={t('appPages.teacher.classAnalytics.eyebrow')} title={t('appPages.teacher.classAnalytics.title')} description={t('appPages.teacher.classAnalytics.description')} />

            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {topStats.map((item) => {
                    const Icon = item.icon === 'engagement' ? TrendingUp : item.icon === 'attendance' ? Users : item.icon === 'weakest' ? Target : Zap;
                    return (
                        <div key={item.title} className={`group relative overflow-hidden rounded-[2rem] border ${item.border} bg-white p-6 shadow-sm transition-shadow hover:shadow-md`}>
                            <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full ${item.bg} opacity-50 transition-transform group-hover:scale-110`} />
                            <div className="relative z-10 mb-4 flex items-start justify-between"><div className={`rounded-2xl p-3 ${item.bg} ${item.tone}`}><Icon size={22} /></div></div>
                            <div className="relative z-10 text-3xl font-black tracking-tight text-slate-900">{item.value}</div>
                            <div className="relative z-10 mt-1 text-sm font-bold text-slate-500">{item.title}</div>
                            <div className="relative z-10 mt-4 inline-block rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-400">{item.trend}</div>
                        </div>
                    );
                })}
            </section>

            <div className="grid gap-8 xl:grid-cols-[1.2fr,0.8fr]">
                <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="mb-6 flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-indigo-50 text-indigo-600"><BrainCircuit size={20} /></div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900">{t('appPages.teacher.classAnalyticsPage.insightsTitle')}</h2>
                            <p className="text-sm font-medium text-slate-500">{t('appPages.teacher.classAnalyticsPage.insightsDesc')}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {insights.map((note) => (
                            <div key={note.label} className="group rounded-2xl border border-slate-100 bg-slate-50/50 p-5 transition-colors hover:bg-white">
                                <div className="mb-2 flex items-center gap-2">
                                    <Sparkles size={14} className={note.type === 'alert' ? 'text-rose-500' : note.type === 'optimization' ? 'text-indigo-500' : 'text-emerald-500'} />
                                    <h4 className="text-sm font-black text-slate-900">{note.label}</h4>
                                </div>
                                <p className="text-sm font-medium leading-relaxed text-slate-600">{note.content}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="relative overflow-hidden rounded-[2.5rem] border border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-white p-8 shadow-sm">
                    <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-indigo-100/50 blur-3xl" />
                    <div className="relative z-10 mb-6 flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-indigo-600 text-white shadow-md shadow-indigo-200"><Activity size={20} /></div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900">{t('appPages.teacher.classAnalyticsPage.recommendedTitle')}</h2>
                            <p className="text-sm font-medium text-slate-500">{t('appPages.teacher.classAnalyticsPage.recommendedSub')}</p>
                        </div>
                    </div>

                    <div className="relative z-10 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                        <div className="mb-2 text-sm font-black text-indigo-600">{t('appPages.teacher.classAnalyticsPage.restructureTitle')}</div>
                        <p className="mb-6 text-sm font-medium leading-relaxed text-slate-700">{t('appPages.teacher.classAnalyticsPage.restructureDesc')}</p>
                        <button className="w-full rounded-xl bg-slate-950 py-4 text-sm font-black text-white shadow-lg shadow-slate-900/10 transition-colors hover:bg-slate-800">{t('appPages.teacher.classAnalyticsPage.autoAdjust')}</button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TeacherClassAnalyticsPage;
