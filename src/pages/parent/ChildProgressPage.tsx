import React from 'react';
import { useTranslation } from 'react-i18next';
import CircularScore from '../../components/platform/CircularScore';
import ProgressRow from '../../components/platform/ProgressRow';
import SectionHeader from '../../components/platform/SectionHeader';
import TimelineRail from '../../components/platform/TimelineRail';
import { childProfile, growthBreakdown, learningTimeline } from '../../constants/platformData';

const ChildProgressPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-8 pb-16">
            <SectionHeader
                eyebrow={t('appPages.parent.childProgress.eyebrow')}
                title={t('appPages.parent.childProgress.title', { name: childProfile.name })}
                description={t('appPages.parent.childProgress.description')}
            />

            <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
                <CircularScore score={74} label={t('appPages.parent.childProgress.scoreLabel')} note={t('appPages.parent.childProgress.scoreNote')} />
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-2xl font-bold text-slate-900">{t('appPages.parent.childProgress.skillsTitle')}</h3>
                    <div className="mt-5 space-y-4">
                        {growthBreakdown.map((item) => (
                            <ProgressRow key={item.label} label={item.label} value={item.value} tone={item.tone} />
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <SectionHeader title={t('appPages.parent.childProgress.planTitle')} description={t('appPages.parent.childProgress.planDescription')} />
                <div className="mt-6">
                    <TimelineRail items={learningTimeline} />
                </div>
            </div>
        </div>
    );
};

export default ChildProgressPage;
