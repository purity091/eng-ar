import React from 'react';
import { useTranslation } from 'react-i18next';
import { BrainCircuit, CalendarDays, CheckCircle2, Sparkles, AlertCircle, ArrowRight, PlayCircle, Clock } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';

const TeacherAiPlansPage: React.FC = () => {
    const { t } = useTranslation();

    const plans = t('appPages.teacher.aiPlansPage.plans', { returnObjects: true }) as Array<{ student: string; plan: string; sessions: string; duration: string; status: string; statusTone: 'emerald' | 'amber' }>;
    const actions = t('appPages.teacher.aiPlansPage.actions', { returnObjects: true }) as string[];

    return (
        <div className="space-y-10 pb-16 font-outfit">
            <SectionHeader eyebrow={t('appPages.teacher.aiPlans.eyebrow')} title={t('appPages.teacher.aiPlans.title')} description={t('appPages.teacher.aiPlans.description')} />

            <div className="grid gap-8 xl:grid-cols-[1.2fr,0.8fr]">
                <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="mb-8 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="grid h-14 w-14 place-items-center rounded-[1.2rem] bg-indigo-50 text-indigo-700"><BrainCircuit size={24} /></div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">{t('appPages.teacher.aiPlansPage.currentWeek')}</h2>
                                <p className="text-sm font-medium text-slate-500">{t('appPages.teacher.aiPlansPage.currentWeekDesc')}</p>
                            </div>
                        </div>
                        <button className="hidden items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-md shadow-slate-900/10 transition-colors hover:bg-slate-800 sm:flex">{t('appPages.teacher.aiPlansPage.approveAll')}</button>
                    </div>

                    <div className="space-y-4">
                        {plans.map((item) => (
                            <div key={item.student} className="group flex flex-col justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-5 transition-all hover:bg-white hover:shadow-md sm:flex-row sm:items-center">
                                <div>
                                    <div className="mb-2 flex items-center gap-3">
                                        <div className="text-lg font-black text-slate-900">{item.student}</div>
                                        <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${item.statusTone === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {item.statusTone === 'emerald' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                                            {item.status}
                                        </div>
                                    </div>
                                    <div className="mb-3 text-sm font-bold text-indigo-600">{item.plan}</div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-600"><CalendarDays size={14} className="text-slate-400" />{item.sessions}</div>
                                        <div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-600"><Clock size={14} className="text-slate-400" />{item.duration}</div>
                                    </div>
                                </div>
                                <div className="flex gap-2 sm:flex-col">
                                    <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-200 px-4 py-2.5 text-xs font-black text-slate-700 transition-colors hover:bg-slate-300 sm:flex-none">{t('appPages.teacher.aiPlansPage.preview')}</button>
                                    <button className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition-colors sm:flex-none ${item.statusTone === 'emerald' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700' : 'bg-slate-950 text-white hover:bg-slate-800'}`}>
                                        {item.statusTone === 'emerald' ? t('appPages.teacher.aiPlansPage.approve') : t('appPages.teacher.aiPlansPage.reviewEdit')}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="space-y-8">
                    <div className="relative overflow-hidden rounded-[2.5rem] border border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-white p-8 shadow-sm">
                        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-indigo-100/50 blur-3xl" />
                        <div className="relative z-10 mb-6 inline-flex items-center gap-2 rounded-lg bg-indigo-100/50 px-3 py-1.5 text-sm font-black text-indigo-700"><Sparkles size={16} />{t('appPages.teacher.aiPlansPage.smartActions')}</div>
                        <h3 className="relative z-10 mb-2 text-2xl font-black text-slate-900">{t('appPages.teacher.aiPlansPage.automateTitle')}</h3>
                        <p className="relative z-10 mb-6 text-sm font-medium leading-relaxed text-slate-600">{t('appPages.teacher.aiPlansPage.automateDesc')}</p>
                        <div className="relative z-10 flex flex-col gap-3">
                            <button className="group flex items-center justify-between rounded-xl bg-slate-950 px-5 py-4 text-sm font-black text-white shadow-lg shadow-slate-900/10 transition-colors hover:bg-slate-800"><span className="flex items-center gap-2"><BrainCircuit size={18} className="text-slate-400 transition-colors group-hover:text-indigo-400" />{actions[0]}</span><ArrowRight size={16} className="text-slate-500 transition-all group-hover:translate-x-1 group-hover:text-white" /></button>
                            <button className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-black text-slate-700 transition-colors hover:bg-slate-50"><span className="flex items-center gap-2"><Sparkles size={18} className="text-amber-500" />{actions[1]}</span><ArrowRight size={16} className="text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-slate-700" /></button>
                            <button className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-black text-slate-700 transition-colors hover:bg-slate-50"><span className="flex items-center gap-2"><PlayCircle size={18} className="text-emerald-500" />{actions[2]}</span><ArrowRight size={16} className="text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-slate-700" /></button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TeacherAiPlansPage;
