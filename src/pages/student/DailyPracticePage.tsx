import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Headphones, Volume2 } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';
import { dailyChoices } from '../../constants/platformData';

const DailyPracticePage: React.FC = () => {
    const { t } = useTranslation();
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <div className="space-y-8 pb-16">
            <SectionHeader
                eyebrow={t('appPages.student.dailyPractice.eyebrow')}
                title={t('appPages.student.dailyPractice.title')}
                description={t('appPages.student.dailyPractice.description')}
            />

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">{t('appPages.student.dailyPractice.questionTitle')}</h2>
                        <p className="mt-2 text-slate-500">{t('appPages.student.dailyPractice.questionDescription')}</p>
                    </div>
                    <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white">
                        <Volume2 size={18} />
                        {t('appPages.student.dailyPractice.listen')}
                    </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {dailyChoices.map((choice) => (
                        <button
                            key={choice.id}
                            onClick={() => setSelected(choice.id)}
                            className={`rounded-[1.75rem] border p-6 text-center transition-all ${selected === choice.id ? 'border-orange-400 bg-orange-50 shadow-lg' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}
                        >
                            <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-white text-indigo-600 shadow-sm">
                                <choice.icon size={42} />
                            </div>
                            <div className="mt-4 text-xl font-bold text-slate-900">{choice.label}</div>
                        </button>
                    ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    <button className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 font-bold text-white">
                        <CheckCircle2 size={18} />
                        {t('appPages.student.dailyPractice.check')}
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-6 py-3 font-bold text-slate-700">
                        <Headphones size={18} />
                        {t('appPages.student.dailyPractice.listenAgain')}
                    </button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900">{t('appPages.student.dailyPractice.pronunciationTitle')}</h3>
                    <p className="mt-3 leading-8 text-slate-600">{t('appPages.student.dailyPractice.pronunciationDescription')}</p>
                </div>
                <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900">{t('appPages.student.dailyPractice.sortingTitle')}</h3>
                    <p className="mt-3 leading-8 text-slate-600">{t('appPages.student.dailyPractice.sortingDescription')}</p>
                </div>
            </div>
        </div>
    );
};

export default DailyPracticePage;
