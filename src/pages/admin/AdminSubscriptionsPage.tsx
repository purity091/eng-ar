import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, HeartHandshake, ShieldAlert, Wallet } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';
import { adminSubscriptionFunnel, adminSubscriptionRecords } from '../../constants/adminConsoleData';

const funnelToneMap = {
    emerald: 'bg-emerald-50 border-emerald-100 text-emerald-700',
    sky: 'bg-sky-50 border-sky-100 text-sky-700',
    amber: 'bg-amber-50 border-amber-100 text-amber-700',
} as const;

const statusToneMap = {
    healthy: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    watch: 'bg-amber-50 text-amber-700 border-amber-100',
    risk: 'bg-rose-50 text-rose-700 border-rose-100',
} as const;

const AdminSubscriptionsPage: React.FC = () => {
    const { t } = useTranslation();

    const funnelLabels = {
        active: t('appPages.admin.subscriptions.activePlans'),
        likelyRenew: t('appPages.admin.subscriptions.likelyRenew'),
        revenueRisk: t('appPages.admin.subscriptions.revenueRisk'),
    } as const;

    const statusLabels = {
        healthy: t('appPages.admin.subscriptions.healthy'),
        watch: t('appPages.admin.subscriptions.watch'),
        risk: t('appPages.admin.subscriptions.risk'),
    } as const;

    return (
        <div className="space-y-8">
            <SectionHeader
                eyebrow={t('appPages.admin.subscriptions.eyebrow')}
                title={t('appPages.admin.subscriptions.title')}
                description={t('appPages.admin.subscriptions.description')}
            />

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-950">{t('appPages.admin.subscriptions.healthTitle')}</h2>
                        <p className="mt-2 text-sm leading-7 text-slate-500">{t('appPages.admin.subscriptions.healthDesc')}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white">Retention cockpit</div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {adminSubscriptionFunnel.map((item) => (
                        <article key={item.id} className={`rounded-[1.5rem] border p-5 ${funnelToneMap[item.tone as keyof typeof funnelToneMap]}`}>
                            <div className="text-sm font-bold">{funnelLabels[item.id as keyof typeof funnelLabels]}</div>
                            <div className="mt-4 text-3xl font-black text-slate-950">{item.value}</div>
                            <div className="mt-2 text-sm font-black">{item.delta}</div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-[980px] w-full text-right">
                        <thead className="bg-slate-50 text-xs font-black uppercase tracking-wider text-slate-500">
                            <tr>
                                <th className="px-6 py-4">{t('appPages.admin.subscriptions.student')}</th>
                                <th className="px-6 py-4">{t('appPages.admin.subscriptions.package')}</th>
                                <th className="px-6 py-4">{t('appPages.admin.subscriptions.growthScore')}</th>
                                <th className="px-6 py-4">{t('appPages.admin.subscriptions.attendance')}</th>
                                <th className="px-6 py-4">{t('appPages.admin.subscriptions.renewalProbability')}</th>
                                <th className="px-6 py-4">{t('appPages.admin.subscriptions.nextBilling')}</th>
                                <th className="px-6 py-4">{t('appPages.admin.subscriptions.expectedStatus')}</th>
                                <th className="px-6 py-4">{t('appPages.admin.subscriptions.intervention')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminSubscriptionRecords.map((item) => (
                                <tr key={item.id} className="border-t border-slate-100">
                                    <td className="px-6 py-5 font-black text-slate-950">{item.student}</td>
                                    <td className="px-6 py-5 text-sm font-medium text-slate-600">{item.packageName}</td>
                                    <td className="px-6 py-5 text-sm font-black text-slate-800">{item.growthScore}</td>
                                    <td className="px-6 py-5 text-sm font-black text-slate-800">{item.attendance}</td>
                                    <td className="px-6 py-5 text-sm font-black text-slate-800">{item.renewalProbability}</td>
                                    <td className="px-6 py-5 text-sm font-medium text-slate-600">{item.nextBilling}</td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-black ${statusToneMap[item.status]}`}>
                                            {statusLabels[item.status]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-wrap gap-2">
                                            {item.status === 'risk' && (
                                                <>
                                                    <button className="rounded-xl bg-rose-600 px-3 py-2 text-xs font-black text-white">{t('appPages.admin.subscriptions.interveneNow')}</button>
                                                    <button className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-700">{t('appPages.admin.subscriptions.callFamily')}</button>
                                                </>
                                            )}
                                            {item.status === 'watch' && (
                                                <button className="rounded-xl bg-amber-100 px-3 py-2 text-xs font-black text-amber-800">{t('appPages.admin.subscriptions.sendOffer')}</button>
                                            )}
                                            {item.status === 'healthy' && (
                                                <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-100 px-3 py-2 text-xs font-black text-emerald-800">
                                                    <ArrowUpRight size={14} />
                                                    {t('appPages.admin.subscriptions.likelyRenew')}
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="grid gap-4 xl:grid-cols-3">
                <div className="rounded-[1.75rem] border border-slate-200 bg-sky-50 p-5 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sky-700 shadow-sm">
                        <HeartHandshake size={20} />
                    </div>
                    <h3 className="mt-5 text-lg font-black text-slate-950">{t('appPages.admin.subscriptions.likelyRenew')}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">Families with strong growth quality and stable attendance can be moved to auto-renew review.</p>
                </div>
                <div className="rounded-[1.75rem] border border-slate-200 bg-amber-50 p-5 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-amber-700 shadow-sm">
                        <ShieldAlert size={20} />
                    </div>
                    <h3 className="mt-5 text-lg font-black text-slate-950">{t('appPages.admin.subscriptions.revenueRisk')}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">Low attendance combined with weak growth should trigger a save-flow before next billing.</p>
                </div>
                <div className="rounded-[1.75rem] border border-slate-200 bg-emerald-50 p-5 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm">
                        <Wallet size={20} />
                    </div>
                    <h3 className="mt-5 text-lg font-black text-slate-950">{t('appPages.admin.subscriptions.activePlans')}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">A cleaner subscription picture helps ops, support, and finance teams act from the same retention signal.</p>
                </div>
            </section>
        </div>
    );
};

export default AdminSubscriptionsPage;
