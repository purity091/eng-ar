import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionHeader from '../../components/platform/SectionHeader';
import { curriculumUnits } from '../../constants/platformData';

const AdminCurriculumPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-8">
            <SectionHeader
                eyebrow={t('appPages.admin.curriculum.eyebrow')}
                title={t('appPages.admin.curriculum.title')}
                description={t('appPages.admin.curriculum.description')}
            />

            <div className="space-y-5">
                {curriculumUnits.map((unit) => (
                    <div key={`${unit.level}-${unit.unit}`} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <div className="text-sm font-bold text-sky-600">{unit.level}</div>
                                <h2 className="text-2xl font-bold text-slate-900">{unit.unit} - {unit.lesson}</h2>
                            </div>
                            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">{unit.targetSentence}</div>
                        </div>
                        <div className="mt-5 grid gap-4 md:grid-cols-2">
                            <div className="rounded-2xl bg-slate-50 p-4">
                                <div className="text-sm text-slate-500">{t('appPages.admin.curriculum.targetWords')}</div>
                                <div className="mt-2 font-bold text-slate-900">{unit.targetWords.join(', ')}</div>
                            </div>
                            <div className="rounded-2xl bg-slate-50 p-4">
                                <div className="text-sm text-slate-500">{t('appPages.admin.curriculum.skills')}</div>
                                <div className="mt-2 font-bold text-slate-900">{unit.skills.join(' • ')}</div>
                            </div>
                        </div>
                        <div className="mt-4 rounded-2xl bg-orange-50 p-4 text-slate-700">{unit.homework}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminCurriculumPage;
