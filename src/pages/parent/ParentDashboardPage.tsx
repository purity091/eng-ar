import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, CalendarDays, FileText, TrendingUp, UserRound } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';

const ParentDashboardPage: React.FC = () => {
    const { t } = useTranslation();
    const profile = t('appPages.parent.dashboard.profile', { returnObjects: true }) as { name: string; gradeTerm: string };
    const kpis = t('appPages.parent.dashboard.kpis', { returnObjects: true }) as Array<{ label: string; value: string }>;
    const highlights = t('appPages.parent.dashboard.highlights', { returnObjects: true }) as string[];
    const journey = t('appPages.parent.dashboard.journey', { returnObjects: true }) as string[];
    const weeklySummaryItems = t('appPages.parent.dashboard.weeklySummaryItems', { returnObjects: true }) as Array<{ label: string; icon: 'trend' | 'calendar' | 'report' }>;
    const actions = t('appPages.parent.dashboard.actions', { returnObjects: true }) as Array<{ label: string; path: string }>;

    const iconMap = {
        trend: TrendingUp,
        calendar: CalendarDays,
        report: FileText,
    } as const;

    return (
        <div className="space-y-8 pb-16" dir="rtl">
            <SectionHeader
                eyebrow={t('appPages.parent.dashboard.eyebrow')}
                title={t('appPages.parent.dashboard.title')}
                description={t('appPages.parent.dashboard.description')}
            />

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                    <UserRound className="text-indigo-600" />
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">{profile.name}</h2>
                        <p className="text-sm text-slate-500">{profile.gradeTerm}</p>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-4">
                    {kpis.map((kpi) => (
                        <div key={kpi.label} className="rounded-2xl bg-slate-50 p-4">
                            <p className="text-xs font-black text-slate-500">{kpi.label}</p>
                            <p className="mt-2 text-xl font-black text-slate-900">{kpi.value}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-xl font-black text-slate-900">{t('appPages.parent.dashboard.kpiTitle')}</h3>
                    <div className="space-y-3 text-sm text-slate-700">
                        {highlights.map((item) => (
                            <div key={item} className="rounded-xl bg-slate-50 p-3">{item}</div>
                        ))}
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-xl font-black text-slate-900">{t('appPages.parent.dashboard.journeyTitle')}</h3>
                    <div className="space-y-3 text-sm text-slate-700">
                        {journey.map((item, index) => (
                            <div key={item} className={`rounded-xl p-3 ${index === 0 ? 'bg-emerald-50' : index === 1 ? 'bg-indigo-50' : 'bg-slate-50'}`}>{item}</div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-xl font-black text-slate-900">{t('appPages.parent.dashboard.weekSummary')}</h3>
                    <div className="space-y-2 text-sm text-slate-700">
                        {weeklySummaryItems.map((item) => {
                            const Icon = iconMap[item.icon];
                            return <div key={item.label} className="flex items-center gap-2"><Icon size={16} /> {item.label}</div>;
                        })}
                    </div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-xl font-black text-slate-900">{t('appPages.parent.dashboard.quickActions')}</h3>
                    <div className="space-y-2">
                        {actions.map((action) => (
                            <Link key={action.path} to={action.path} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700">{action.label} <ArrowLeft size={14} /></Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ParentDashboardPage;
