import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionHeader from '../../components/platform/SectionHeader';
import {
    minimumSubscriptionTerms,
    termPackages,
    termSeasons,
} from '../../constants/termProgram';

const ParentBillingPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-8 pb-16">
            <SectionHeader
                eyebrow={t('appPages.parent.billing.eyebrow')}
                title={t('appPages.parent.billing.title')}
                description={t('appPages.parent.billing.description')}
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="text-sm text-slate-500">{t('appPages.parent.billing.minimumSubscription')}</div>
                    <div className="mt-2 text-xl font-bold text-slate-900">{minimumSubscriptionTerms} فصل دراسي</div>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="text-sm text-slate-500">{t('appPages.parent.billing.availableTerms')}</div>
                    <div className="mt-2 text-xl font-bold text-slate-900">3 فصول</div>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="text-sm text-slate-500">{t('appPages.parent.billing.annual')}</div>
                    <div className="mt-2 text-xl font-bold text-slate-900">3 فصول (صيفي/خريفي/ربيعي)</div>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="text-sm text-slate-500">{t('appPages.parent.billing.status')}</div>
                    <div className="mt-2 text-xl font-bold text-emerald-700">{t('appPages.parent.billing.active')}</div>
                </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900">{t('appPages.parent.billing.approvedTerms')}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                    {termSeasons.map((season) => (
                        <span key={season} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700">
                            {season}
                        </span>
                    ))}
                </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900">{t('appPages.parent.billing.packageOptions')}</h3>
                <div className="mt-5 grid gap-4 lg:grid-cols-3">
                    {termPackages.map((pkg) => (
                        <div key={pkg.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                            <div className="text-lg font-bold text-slate-900">{pkg.subtitle}</div>
                            <div className="mt-1 text-sm font-semibold text-slate-600">{pkg.duration}</div>
                            <div className="mt-3 font-bold text-indigo-700">{pkg.priceRange}</div>
                            <div className="mt-4 text-sm leading-7 text-slate-600">
                                {pkg.weeklyLiveSessions} • {pkg.automationLevel}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ParentBillingPage;
