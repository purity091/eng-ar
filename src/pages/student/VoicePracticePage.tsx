import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mic2, RotateCcw, Send, Volume2 } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';

const StudentVoicePracticePage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-8 pb-16">
            <SectionHeader
                eyebrow={t('appPages.student.voicePractice.eyebrow')}
                title={t('appPages.student.voicePractice.title')}
                description={t('appPages.student.voicePractice.description')}
            />

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="grid gap-6 lg:grid-cols-[1fr,0.8fr]">
                    <div className="rounded-[1.75rem] bg-slate-50 p-6">
                        <div className="text-sm font-bold text-sky-600">{t('appPages.student.voicePractice.targetSentence')}</div>
                        <h2 className="mt-2 text-3xl font-bold text-slate-900">I can see a cat</h2>
                        <p className="mt-3 leading-8 text-slate-600">{t('appPages.student.voicePractice.sentenceTip')}</p>
                    </div>

                    <div className="grid gap-3">
                        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 font-bold text-white">
                            <Volume2 size={18} />
                            {t('appPages.student.voicePractice.listen')}
                        </button>
                        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 font-bold text-white">
                            <Mic2 size={18} />
                            {t('appPages.student.voicePractice.record')}
                        </button>
                        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-6 py-4 font-bold text-slate-700">
                            <RotateCcw size={18} />
                            {t('appPages.student.voicePractice.retry')}
                        </button>
                        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-4 font-bold text-white">
                            <Send size={18} />
                            {t('appPages.student.voicePractice.send')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentVoicePracticePage;
