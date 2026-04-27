import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpenCheck, CheckCircle2, FileText, MessageSquareQuote, Target } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';

const ChildReportsPage: React.FC = () => {
    const { t } = useTranslation();
    const strengths = t('appPages.parent.reports.strengthItems', { returnObjects: true }) as string[];
    const supportAreas = t('appPages.parent.reports.supportItems', { returnObjects: true }) as string[];
    const vocabulary = t('appPages.parent.reports.vocabulary', { returnObjects: true }) as string[];
    const homeCards = t('appPages.parent.reports.homeCards', { returnObjects: true }) as Array<{
        title: string;
        description: string;
        tone: 'emerald' | 'amber';
    }>;

    return (
        <div className="space-y-8 pb-16" dir="rtl">
            <SectionHeader
                eyebrow={t('appPages.parent.reports.eyebrow')}
                title={t('appPages.parent.reports.title')}
                description={t('appPages.parent.reports.description')}
            />

            <section className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center gap-2 text-emerald-700"><CheckCircle2 size={18} /> <h3 className="text-xl font-black text-slate-900">{t('appPages.parent.reports.strengths')}</h3></div>
                    <div className="space-y-3">
                        {strengths.map((item, i) => (
                            <div key={i} className="rounded-xl bg-emerald-50 p-3 text-sm font-medium text-slate-700">{item}</div>
                        ))}
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center gap-2 text-rose-700"><Target size={18} /> <h3 className="text-xl font-black text-slate-900">{t('appPages.parent.reports.supportAreas')}</h3></div>
                    <div className="space-y-3">
                        {supportAreas.map((item, i) => (
                            <div key={i} className="rounded-xl bg-rose-50 p-3 text-sm font-medium text-slate-700">{item}</div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2"><BookOpenCheck size={18} className="text-indigo-600" /> <h3 className="text-xl font-black text-slate-900">{t('appPages.parent.reports.vocabTitle')}</h3></div>
                <div className="flex flex-wrap gap-2">
                    {vocabulary.map((word) => (
                        <span key={word} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-bold text-slate-700">{word}</span>
                    ))}
                </div>
            </section>

            <section className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
                <div className="mb-4 flex items-center gap-2"><FileText size={18} /> <h3 className="text-xl font-black">{t('appPages.parent.reports.homeCenter')}</h3></div>
                <div className="grid gap-4 lg:grid-cols-2">
                    {homeCards.map((card) => (
                        <div key={card.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className={`text-xs font-black uppercase tracking-wider ${card.tone === 'emerald' ? 'text-emerald-400' : 'text-amber-400'}`}>{card.title}</p>
                            <p className="mt-2 text-sm">{card.description}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-indigo-200"><MessageSquareQuote size={16} /> {t('appPages.parent.reports.contactNote')}</div>
            </section>
        </div>
    );
};

export default ChildReportsPage;
