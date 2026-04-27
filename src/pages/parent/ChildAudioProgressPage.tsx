import React from 'react';
import { useTranslation } from 'react-i18next';
import { PlayCircle, Waves } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';
import { audioProgress } from '../../constants/platformData';

const ChildAudioProgressPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-8 pb-16">
            <SectionHeader
                eyebrow={t('appPages.parent.audioProgress.eyebrow')}
                title={t('appPages.parent.audioProgress.title')}
                description={t('appPages.parent.audioProgress.description')}
            />

            <div className="grid gap-6 lg:grid-cols-2">
                {audioProgress.map((item) => (
                    <div key={item.label} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900">{item.label}</h3>
                                <p className="text-slate-500">{item.date}</p>
                            </div>
                            <div className="rounded-2xl bg-slate-900 px-4 py-3 text-white">
                                <div className="text-sm text-white/70">{t('appPages.parent.audioProgress.score')}</div>
                                <div className="text-2xl font-bold">{item.score}%</div>
                            </div>
                        </div>
                        <div className="rounded-[1.5rem] bg-slate-50 p-5">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex items-center gap-2 font-bold text-slate-700">
                                    <Waves size={18} />
                                    {t('appPages.parent.audioProgress.sample')}
                                </div>
                                <button className="flex items-center gap-2 rounded-2xl bg-orange-500 px-4 py-2 font-bold text-white">
                                    <PlayCircle size={18} />
                                    {t('appPages.parent.audioProgress.play')}
                                </button>
                            </div>
                            <p className="leading-8 text-slate-600">{item.note}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="rounded-[2rem] border border-orange-200 bg-orange-50 p-6 shadow-sm">
                <p className="leading-8 text-slate-700">{t('appPages.parent.audioProgress.summary')}</p>
            </div>
        </div>
    );
};

export default ChildAudioProgressPage;
