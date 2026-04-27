import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionHeader from '../../components/platform/SectionHeader';
import { adminStudents } from '../../constants/platformData';

const AdminStudentsPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-8">
            <SectionHeader
                eyebrow={t('appPages.admin.students.eyebrow')}
                title={t('appPages.admin.students.title')}
                description={t('appPages.admin.students.description')}
            />

            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                <table className="min-w-full text-right">
                    <thead className="bg-slate-50 text-sm text-slate-500">
                        <tr>
                            <th className="px-6 py-4">{t('appPages.admin.students.student')}</th>
                            <th className="px-6 py-4">{t('appPages.admin.students.age')}</th>
                            <th className="px-6 py-4">{t('appPages.admin.students.grade')}</th>
                            <th className="px-6 py-4">{t('appPages.admin.students.level')}</th>
                            <th className="px-6 py-4">{t('appPages.admin.students.plan')}</th>
                            <th className="px-6 py-4">{t('appPages.admin.students.status')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminStudents.map((student) => (
                            <tr key={student.name} className="border-t border-slate-100">
                                <td className="px-6 py-4 font-bold text-slate-900">{student.name}</td>
                                <td className="px-6 py-4 text-slate-600">{student.age}</td>
                                <td className="px-6 py-4 text-slate-600">{student.grade}</td>
                                <td className="px-6 py-4 text-slate-600">{student.level}</td>
                                <td className="px-6 py-4 text-slate-600">{student.plan}</td>
                                <td className="px-6 py-4">
                                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${student.status === 'نشط' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                                        {student.status === 'نشط' ? t('appPages.admin.students.active') : student.status}
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

export default AdminStudentsPage;
