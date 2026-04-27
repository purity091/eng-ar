import React from 'react';
import { useTranslation } from 'react-i18next';
import { Clock3, ClipboardCheck, AlarmClock, Sparkles, CheckCircle2, AlertCircle, ArrowRight, BellRing } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';

const TeacherHomeworkPage: React.FC = () => {
    const { t } = useTranslation();

    const stats = t('appPages.teacher.homeworkPage.stats', { returnObjects: true }) as Array<{ label: string; value: string; icon: 'done'|'overdue'|'avg'; tone: string; bg: string; border: string }>;
    const queue = t('appPages.teacher.homeworkPage.queue', { returnObjects: true }) as Array<{ student: string; task: string; status: string; time: string; tone: 'emerald'|'amber'|'rose' }>;

    return (
        <div className="space-y-10 pb-16 font-outfit">
            <SectionHeader eyebrow={t('appPages.teacher.homework.eyebrow')} title={t('appPages.teacher.homework.title')} description={t('appPages.teacher.homework.description')} />

            <section className="grid gap-5 md:grid-cols-3">
                {stats.map((item) => {
                    const Icon = item.icon === 'done' ? ClipboardCheck : item.icon === 'overdue' ? AlarmClock : Clock3;
                    return (
                        <div key={item.label} className={`flex items-center gap-4 rounded-[2rem] border ${item.border} bg-white p-6 shadow-sm`}>
                            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg} ${item.tone}`}><Icon size={24} /></div>
                            <div><div className="text-2xl font-black text-slate-900">{item.value}</div><div className="text-sm font-bold text-slate-500">{item.label}</div></div>
                        </div>
                    );
                })}
            </section>

            <div className="grid gap-8 xl:grid-cols-[1.2fr,0.8fr]">
                <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-indigo-50 text-indigo-600"><ClipboardCheck size={20} /></div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">{t('appPages.teacher.homeworkPage.queueTitle')}</h2>
                                <p className="text-sm font-medium text-slate-500">{t('appPages.teacher.homeworkPage.queueDesc')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {queue.map((row) => (
                            <div key={row.student} className="group flex flex-col justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-5 transition-all hover:bg-white hover:shadow-md sm:flex-row sm:items-center">
                                <div>
                                    <div className="mb-2 flex items-center gap-3">
                                        <div className="text-sm font-black text-slate-900">{row.student}</div>
                                        <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${row.tone === 'emerald' ? 'bg-emerald-100 text-emerald-700' : row.tone === 'rose' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {row.tone === 'emerald' ? <CheckCircle2 size={12} /> : row.tone === 'rose' ? <AlertCircle size={12} /> : <Clock3 size={12} />}
                                            {row.status}
                                        </div>
                                    </div>
                                    <div className="mb-2 text-sm font-bold text-slate-700">{row.task}</div>
                                    <div className="text-xs font-black text-slate-400">Est: {row.time}</div>
                                </div>
                                {row.tone === 'rose' && <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-700 transition-colors hover:bg-slate-50"><BellRing size={14} />{t('appPages.teacher.homeworkPage.remind')}</button>}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="space-y-8">
                    <div className="relative overflow-hidden rounded-[2.5rem] border border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-white p-8 shadow-sm">
                        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-indigo-100/50 blur-3xl" />
                        <div className="relative z-10 mb-6 flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-indigo-600 text-white shadow-md shadow-indigo-200"><Sparkles size={20} /></div>
                            <div><h2 className="text-2xl font-black text-slate-900">{t('appPages.teacher.homeworkPage.generatorTitle')}</h2><p className="text-sm font-medium text-slate-500">{t('appPages.teacher.homeworkPage.generatorSub')}</p></div>
                        </div>
                        <p className="relative z-10 mb-6 text-sm font-medium leading-relaxed text-slate-600">{t('appPages.teacher.homeworkPage.generatorDesc')}</p>
                        <div className="relative z-10 flex flex-col gap-3">
                            <button className="group flex items-center justify-between rounded-xl bg-slate-950 px-5 py-4 text-sm font-black text-white shadow-lg shadow-slate-900/10 transition-colors hover:bg-slate-800"><span className="flex items-center gap-2"><Sparkles size={18} className="text-indigo-400 transition-colors group-hover:text-indigo-300" />{t('appPages.teacher.homeworkPage.generate')}</span><ArrowRight size={16} className="text-slate-500 transition-all group-hover:translate-x-1 group-hover:text-white" /></button>
                            <button className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-black text-slate-700 transition-colors hover:bg-slate-50"><span className="flex items-center gap-2"><BellRing size={18} className="text-amber-500" />{t('appPages.teacher.homeworkPage.bulk')}</span><ArrowRight size={16} className="text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-slate-700" /></button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TeacherHomeworkPage;
