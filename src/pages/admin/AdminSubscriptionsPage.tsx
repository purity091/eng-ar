import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionHeader from '../../components/platform/SectionHeader';
import { reportsQueue } from '../../constants/platformData';

const AdminSubscriptionsPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-8">
            <SectionHeader
                eyebrow={t('appPages.admin.subscriptions.eyebrow')}
                title={t('appPages.admin.subscriptions.title')}
                description={t('appPages.admin.subscriptions.description')}
            />

            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                <table className="min-w-full text-right">
                    <thead className="bg-slate-50 text-sm text-slate-500">
                        <tr>
                            <th className="px-6 py-4">{t('appPages.admin.subscriptions.student')}</th>
                            <th className="px-6 py-4">{t('appPages.admin.subscriptions.growthScore')}</th>
                            <th className="px-6 py-4">{t('appPages.admin.subscriptions.attendance')}</th>
                            <th className="px-6 py-4">{t('appPages.admin.subscriptions.expectedStatus')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportsQueue.map((item) => (
                            <tr key={item.parent} className="border-t border-slate-100">
                                <td className="px-6 py-4 font-bold text-slate-900">{item.parent}</td>
                                <td className="px-6 py-4 text-slate-600">{item.score}</td>
                                <td className="px-6 py-4 text-slate-600">{item.attendance}</td>
                                <td className="px-6 py-4">
                                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.renewal.includes('تدخل') ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                        {item.renewal.includes('تدخل') ? t('appPages.admin.subscriptions.intervention') : item.renewal}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminSubscriptionsPage;
