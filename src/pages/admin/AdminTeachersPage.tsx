import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionHeader from '../../components/platform/SectionHeader';
import { adminTeachers } from '../../constants/platformData';

const AdminTeachersPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-8">
            <SectionHeader
                eyebrow={t('appPages.admin.teachers.eyebrow')}
                title={t('appPages.admin.teachers.title')}
                description={t('appPages.admin.teachers.description')}
            />

            <div className="grid gap-6 xl:grid-cols-3">
                {adminTeachers.map((teacher) => (
                    <div key={teacher.name} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="mb-3 text-2xl font-bold text-slate-900">{teacher.name}</div>
                        <div className="text-slate-500">{teacher.speciality}</div>
                        <div className="mt-5 grid gap-3">
                            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{t('appPages.admin.teachers.accent')}: {teacher.accent}</div>
                            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{t('appPages.admin.teachers.dailyCapacity')}: {teacher.capacity} {t('appPages.admin.teachers.sessions')}</div>
                            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{t('appPages.admin.teachers.rating')}: {teacher.rating}</div>
                            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{t('appPages.admin.teachers.currentLoad')}: {teacher.load}%</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminTeachersPage;
