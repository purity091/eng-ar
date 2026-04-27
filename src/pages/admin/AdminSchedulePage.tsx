import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionHeader from '../../components/platform/SectionHeader';
import { scheduleAlert, scheduleWeek } from '../../constants/platformData';

const AdminSchedulePage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-8">
            <SectionHeader
                eyebrow={t('appPages.admin.schedule.eyebrow')}
                title={t('appPages.admin.schedule.title')}
                description={t('appPages.admin.schedule.description')}
            />

            <div className="rounded-[2rem] border border-orange-200 bg-orange-50 p-6 shadow-sm">
                <p className="font-bold text-slate-900">{scheduleAlert.teacher}</p>
                <p className="mt-2 leading-8 text-slate-700">{scheduleAlert.message}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-5">
                {scheduleWeek.map((day) => (
                    <div key={day.day} className={`rounded-[1.75rem] p-5 shadow-sm ${day.sessions > 8 ? 'border border-red-200 bg-red-50' : 'border border-slate-200 bg-white'}`}>
                        <div className="text-lg font-bold text-slate-900">{day.day}</div>
                        <div className="mt-4 text-4xl font-bold text-slate-900">{day.sessions}</div>
                        <div className="mt-1 text-sm text-slate-500">{t('appPages.admin.schedule.sessions')}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminSchedulePage;
