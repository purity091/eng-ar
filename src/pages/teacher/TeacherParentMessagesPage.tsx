import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquareMore, Send, Sparkles, UserRound, Clock } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';

const TeacherParentMessagesPage: React.FC = () => {
    const { t } = useTranslation();

    const drafts = t('appPages.teacher.parentMessagesPage.drafts', { returnObjects: true }) as Array<{ type: string; student: string; content: string; tone: 'indigo' | 'amber' | 'emerald' }>;
    const goals = t('appPages.teacher.parentMessagesPage.goals', { returnObjects: true }) as string[];

    return (
        <div className="space-y-10 pb-16 font-outfit">
            <SectionHeader eyebrow={t('appPages.teacher.parentMessages.eyebrow')} title={t('appPages.teacher.parentMessages.title')} description={t('appPages.teacher.parentMessages.description')} />

            <div className="grid gap-8 xl:grid-cols-[1.1fr,0.9fr]">
                <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-indigo-50 text-indigo-600"><MessageSquareMore size={20} /></div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">{t('appPages.teacher.parentMessagesPage.pendingDrafts')}</h2>
                                <p className="text-sm font-medium text-slate-500">{t('appPages.teacher.parentMessagesPage.pendingDraftsDesc')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {drafts.map((msg, i) => (
                            <div key={i} className="group rounded-2xl border border-slate-100 bg-slate-50/50 p-5 transition-all hover:bg-white hover:shadow-md">
                                <div className="mb-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`rounded-lg p-1.5 ${msg.tone === 'indigo' ? 'bg-indigo-100 text-indigo-600' : msg.tone === 'amber' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}><Sparkles size={14} /></div>
                                        <span className="text-sm font-black text-slate-900">{msg.type}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600"><UserRound size={12} />{msg.student}</div>
                                </div>
                                <div className="mb-4 rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium leading-relaxed text-slate-700">"{msg.content}"</div>
                                <div className="flex gap-2">
                                    <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-black text-white transition-colors hover:bg-slate-800"><Send size={14} />{t('appPages.teacher.parentMessagesPage.sendNow')}</button>
                                    <button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-black text-slate-700 transition-colors hover:bg-slate-50">{t('appPages.teacher.parentMessagesPage.edit')}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="space-y-8">
                    <div className="relative overflow-hidden rounded-[2.5rem] border border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-white p-8 shadow-sm">
                        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-indigo-100/50 blur-3xl" />
                        <div className="relative z-10 mb-6 flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-indigo-600 text-white shadow-md shadow-indigo-200"><Sparkles size={20} /></div>
                            <div><h2 className="text-2xl font-black text-slate-900">{t('appPages.teacher.parentMessagesPage.composerTitle')}</h2><p className="text-sm font-medium text-slate-500">{t('appPages.teacher.parentMessagesPage.composerSub')}</p></div>
                        </div>
                        <div className="relative z-10 mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                            <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-400">{t('appPages.teacher.parentMessagesPage.goalLabel')}</label>
                            <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
                                {goals.map((g) => <option key={g}>{g}</option>)}
                            </select>
                        </div>
                        <div className="relative z-10 flex flex-col gap-3">
                            <button className="group flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-indigo-600/20 transition-colors hover:bg-indigo-700"><span className="flex items-center gap-2"><Sparkles size={18} />{t('appPages.teacher.parentMessagesPage.generateDraft')}</span></button>
                            <button className="group flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-black text-slate-700 transition-colors hover:bg-slate-50"><span className="flex items-center gap-2"><Clock size={18} className="text-slate-400" />{t('appPages.teacher.parentMessagesPage.history')}</span></button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TeacherParentMessagesPage;
