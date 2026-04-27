import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, FileText, Send, ShieldAlert, Sparkles, BrainCircuit, Target, MessageSquareQuote } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';

type SummaryReportTone = 'warning' | 'encouragement' | 'full';

const SessionSummaryPage: React.FC = () => {
    const { t } = useTranslation();
    const [tone, setTone] = useState<SummaryReportTone>('full');

    const quickMatrix = t('appPages.teacher.sessionSummary.quickMatrix', { returnObjects: true }) as Array<{ skill: string; value: string; tone: 'emerald' | 'amber' | 'rose' }>;
    const quickActions = t('appPages.teacher.sessionSummary.quickActions', { returnObjects: true }) as string[];

    const generatedSummary = useMemo(() => {
        if (tone === 'warning') return t('appPages.teacher.sessionSummary.generated.warning');
        if (tone === 'encouragement') return t('appPages.teacher.sessionSummary.generated.encouragement');
        return t('appPages.teacher.sessionSummary.generated.full');
    }, [tone, t]);

    return (
        <div className="space-y-10 pb-16 font-outfit">
            <SectionHeader
                eyebrow={t('appPages.teacher.sessionSummary.eyebrow')}
                title={t('appPages.teacher.sessionSummary.title')}
                description={t('appPages.teacher.sessionSummary.description')}
            />

            <div className="grid gap-8 xl:grid-cols-[1fr,1.1fr]">
                <div className="space-y-8">
                    <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-3 text-slate-900">
                                <div className="rounded-xl bg-indigo-100 p-2 text-indigo-600"><Target size={20} /></div>
                                <h3 className="text-xl font-black">{t('appPages.teacher.sessionSummary.capturedMetrics')}</h3>
                            </div>
                            <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-500">{t('appPages.teacher.sessionSummary.autofilled')}</span>
                        </div>

                        <div className="space-y-3">
                            {quickMatrix.map((item) => (
                                <div key={item.skill} className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 transition-all hover:bg-white hover:shadow-sm">
                                    <span className="font-bold text-slate-700">{item.skill}</span>
                                    <div className="flex items-center gap-2">
                                        <span className={`rounded-lg px-2.5 py-1 text-xs font-black uppercase tracking-wider ${
                                            item.tone === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                                            item.tone === 'rose' ? 'bg-rose-100 text-rose-700' :
                                            'bg-amber-100 text-amber-700'
                                        }`}>
                                            {item.value}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-indigo-50" />
                        <div className="relative z-10 mb-6 flex items-center gap-3 text-slate-900">
                            <div className="rounded-xl bg-indigo-100 p-2 text-indigo-600"><CheckCircle2 size={20} /></div>
                            <h3 className="text-xl font-black">{t('appPages.teacher.sessionSummary.observations')}</h3>
                        </div>
                        <div className="relative z-10 flex flex-wrap gap-3">
                            {quickActions.map((item) => (
                                <button key={item} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-left text-sm font-bold text-slate-700 transition-all hover:border-indigo-200 hover:bg-slate-50 hover:text-indigo-700">
                                    {item}
                                </button>
                            ))}
                            <button className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-2.5 text-left text-sm font-bold text-slate-500 transition-all hover:border-indigo-300 hover:text-indigo-600">
                                {t('appPages.teacher.sessionSummary.customNote')}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="mb-6 flex items-center gap-3 text-slate-900">
                            <div className="rounded-xl bg-slate-100 p-2 text-slate-700"><BrainCircuit size={20} /></div>
                            <h3 className="text-xl font-black">{t('appPages.teacher.sessionSummary.reportGeneration')}</h3>
                        </div>

                        <label className="mb-3 block text-xs font-black uppercase tracking-wider text-slate-500">{t('appPages.teacher.sessionSummary.communicationTone')}</label>
                        <div className="mb-8 grid gap-3 sm:grid-cols-3">
                            <button
                                onClick={() => setTone('warning')}
                                className={`flex flex-col items-center gap-2 rounded-xl px-4 py-4 text-sm font-black transition-all ${tone === 'warning' ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20' : 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                            >
                                <ShieldAlert size={20} />
                                {t('appPages.teacher.sessionSummary.actionRequired')}
                            </button>
                            <button
                                onClick={() => setTone('encouragement')}
                                className={`flex flex-col items-center gap-2 rounded-xl px-4 py-4 text-sm font-black transition-all ${tone === 'encouragement' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                            >
                                <Sparkles size={20} />
                                {t('appPages.teacher.sessionSummary.encouraging')}
                            </button>
                            <button
                                onClick={() => setTone('full')}
                                className={`flex flex-col items-center gap-2 rounded-xl px-4 py-4 text-sm font-black transition-all ${tone === 'full' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                            >
                                <FileText size={20} />
                                {t('appPages.teacher.sessionSummary.comprehensive')}
                            </button>
                        </div>

                        <div className="relative rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-white p-6">
                            <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-indigo-500">
                                <MessageSquareQuote size={14} />
                                {t('appPages.teacher.sessionSummary.generatedOutput')}
                            </div>
                            <p className="min-h-[120px] font-medium leading-relaxed text-slate-700">{generatedSummary}</p>
                        </div>

                        <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-4 text-sm font-black text-white shadow-lg shadow-slate-900/10 transition-colors hover:bg-slate-800">
                            <Send size={18} />
                            {t('appPages.teacher.sessionSummary.dispatch')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionSummaryPage;
