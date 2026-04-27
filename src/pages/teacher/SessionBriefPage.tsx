import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { BookOpen, MessageSquareQuote, UserCircle2, BrainCircuit, Target, Sparkles, Play } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';

const SessionBriefPage: React.FC = () => {
    const { t } = useTranslation();
    const { id } = useParams();

    const vocab = t('appPages.teacher.sessionBrief.vocab', { returnObjects: true }) as string[];
    const plan = t('appPages.teacher.sessionBrief.planSteps', { returnObjects: true }) as string[];

    return (
        <div className="space-y-10 pb-16 font-outfit">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <SectionHeader
                    eyebrow={t('appPages.teacher.sessionBrief.eyebrow')}
                    title={t('appPages.teacher.sessionBrief.title', { id: id || '001' })}
                    description={t('appPages.teacher.sessionBrief.description')}
                />
                <button className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-indigo-600/20 transition-colors hover:bg-indigo-700 md:mt-0">
                    <Play size={16} className="fill-white" />
                    {t('appPages.teacher.sessionBrief.launch')}
                </button>
            </div>

            <div className="grid gap-8 xl:grid-cols-[0.9fr,1.1fr]">
                <div className="h-fit rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="mb-8 flex items-center gap-5">
                        <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] border border-indigo-100 bg-indigo-50 text-indigo-600 shadow-inner">
                            <UserCircle2 size={40} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black tracking-tight text-slate-900">Sara Ahmed</h2>
                            <div className="mt-2 flex items-center gap-2">
                                <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">{t('appPages.teacher.sessionBrief.grade')}</span>
                                <span className="inline-flex items-center rounded-md border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">{t('appPages.teacher.sessionBrief.cefr')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="group rounded-2xl border border-slate-100 bg-slate-50/50 p-5 transition-all hover:bg-white hover:shadow-md">
                            <div className="mb-1 text-[10px] font-black uppercase tracking-wider text-slate-400">{t('appPages.teacher.sessionBrief.previousLesson')}</div>
                            <div className="font-bold text-slate-900 transition-colors group-hover:text-indigo-600">{t('appPages.teacher.sessionBrief.previousLessonValue')}</div>
                        </div>
                        <div className="group rounded-2xl border border-slate-100 bg-slate-50/50 p-5 transition-all hover:bg-white hover:shadow-md">
                            <div className="mb-1 text-[10px] font-black uppercase tracking-wider text-slate-400">{t('appPages.teacher.sessionBrief.identifiedGaps')}</div>
                            <div className="font-bold leading-tight text-slate-900">{t('appPages.teacher.sessionBrief.identifiedGapsValue')}</div>
                        </div>
                        <div className="group rounded-2xl border border-slate-100 bg-slate-50/50 p-5 transition-all hover:bg-white hover:shadow-md md:col-span-2">
                            <div className="mb-1 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-indigo-500">
                                <Target size={12} /> {t('appPages.teacher.sessionBrief.targetObjective')}
                            </div>
                            <div className="text-lg font-bold text-slate-900">{t('appPages.teacher.sessionBrief.targetObjectiveValue')}</div>
                        </div>
                        <div className="group rounded-2xl border border-slate-100 bg-slate-50/50 p-5 transition-all hover:bg-white hover:shadow-md md:col-span-2">
                            <div className="mb-2 text-[10px] font-black uppercase tracking-wider text-slate-400">{t('appPages.teacher.sessionBrief.targetVocabulary')}</div>
                            <div className="flex flex-wrap gap-2">
                                {vocab.map((word) => (
                                    <span key={word} className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm font-black text-slate-700 shadow-sm">{word}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-[2.5rem] border border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-white p-8 shadow-sm">
                        <div className="mb-4 flex items-center gap-3 text-indigo-700">
                            <div className="rounded-xl bg-indigo-100 p-2">
                                <BrainCircuit size={20} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900">{t('appPages.teacher.sessionBrief.strategyTitle')}</h3>
                        </div>
                        <p className="font-medium leading-relaxed text-slate-700">{t('appPages.teacher.sessionBrief.strategyBody')}</p>
                    </div>

                    <div className="rounded-[2.5rem] border border-amber-100 bg-amber-50/30 p-8 shadow-sm">
                        <div className="mb-4 flex items-center gap-3 text-amber-600">
                            <div className="rounded-xl bg-amber-100 p-2">
                                <MessageSquareQuote size={20} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900">{t('appPages.teacher.sessionBrief.behaviorTitle')}</h3>
                        </div>
                        <p className="border-l-4 border-amber-300 pl-4 font-medium italic leading-relaxed text-slate-700">{t('appPages.teacher.sessionBrief.behaviorBody')}</p>
                    </div>

                    <div className="relative overflow-hidden rounded-[2.5rem] border border-emerald-100 bg-emerald-50/30 p-8 shadow-sm">
                        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 opacity-10">
                            <Sparkles size={120} />
                        </div>
                        <div className="relative z-10 mb-4 flex items-center gap-3 text-emerald-600">
                            <div className="rounded-xl bg-emerald-100 p-2">
                                <BookOpen size={20} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900">{t('appPages.teacher.sessionBrief.executionTitle')}</h3>
                        </div>
                        <ul className="relative z-10 space-y-3 text-sm font-medium text-slate-700">
                            {plan.map((item, idx) => (
                                <li key={item} className="flex items-start gap-3">
                                    <span className="font-black text-emerald-600">{idx + 1}.</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionBriefPage;
