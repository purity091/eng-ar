import React from 'react';
import { useTranslation } from 'react-i18next';
import CircularScore from '../../components/platform/CircularScore';
import ProgressRow from '../../components/platform/ProgressRow';
import SectionHeader from '../../components/platform/SectionHeader';
import TimelineRail from '../../components/platform/TimelineRail';

const ChildProgressPage: React.FC = () => {
    const { t } = useTranslation();
    const studentName = t('appPages.parent.childProgress.studentName');
    const skills = t('appPages.parent.childProgress.skills', { returnObjects: true }) as Array<{ label: string; value: number; tone: string }>;
    const timeline = t('appPages.parent.childProgress.timeline', { returnObjects: true }) as Array<{
        week: string;
        title: string;
        status: 'completed' | 'active' | 'upcoming';
        goal: string;
        task?: string;
    }>;
    const statusLabels = t('appPages.parent.childProgress.statusLabels', { returnObjects: true }) as Record<'completed' | 'active' | 'upcoming', string>;

    return (
        <div className="space-y-8 pb-16">
            <SectionHeader
                eyebrow={t('appPages.parent.childProgress.eyebrow')}
                title={t('appPages.parent.childProgress.title', { name: studentName })}
                description={t('appPages.parent.childProgress.description')}
            />

            <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
                <CircularScore
                    score={74}
                    label={t('appPages.parent.childProgress.scoreLabel')}
                    summary={t('appPages.parent.childProgress.scoreSummary')}
                    note={t('appPages.parent.childProgress.scoreNote')}
                />
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-2xl font-bold text-slate-900">{t('appPages.parent.childProgress.skillsTitle')}</h3>
                    <div className="mt-5 space-y-4">
                        {skills.map((item) => (
                            <ProgressRow key={item.label} label={item.label} value={item.value} tone={item.tone} />
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <SectionHeader title={t('appPages.parent.childProgress.planTitle')} description={t('appPages.parent.childProgress.planDescription')} />
                <div className="mt-6">
                    <TimelineRail items={timeline} statusLabels={statusLabels} />
                </div>
            </div>
        </div>
    );
};

export default ChildProgressPage;
