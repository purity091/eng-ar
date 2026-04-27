import React from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarClock, Gauge, GraduationCap, Star } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';
import { adminTeacherRecords } from '../../constants/adminConsoleData';

const statusToneMap = {
    full: 'bg-rose-50 text-rose-700 border-rose-100',
    balanced: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    light: 'bg-sky-50 text-sky-700 border-sky-100',
} as const;

const loadBarTone = (value: number) => value >= 85 ? 'bg-rose-500' : value >= 65 ? 'bg-amber-500' : 'bg-emerald-500';

const AdminTeachersPage: React.FC = () => {
    const { t } = useTranslation();

    const statusLabels = {
        full: t('appPages.admin.teachers.full'),
        balanced: t('appPages.admin.teachers.balanced'),
        light: t('appPages.admin.teachers.light'),
    } as const;

    return (
        <div className="space-y-8">
            <SectionHeader
                eyebrow={t('appPages.admin.teachers.eyebrow')}
                title={t('appPages.admin.teachers.title')}
                description={t('appPages.admin.teachers.description')}
            />

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-black text-slate-950">{t('appPages.admin.teachers.qualityTitle')}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-500">{t('appPages.admin.teachers.qualityDesc')}</p>

                <div className="mt-6 grid gap-5 xl:grid-cols-3">
                    {adminTeacherRecords.map((teacher) => (
                        <article key={teacher.id} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-xl font-black text-slate-950">{teacher.name}</h3>
                                    <p className="mt-1 text-sm font-medium text-slate-500">{teacher.specialty}</p>
                                </div>
                                <span className={`rounded-full border px-3 py-1 text-xs font-black ${statusToneMap[teacher.status]}`}>
                                    {statusLabels[teacher.status]}
                                </span>
                            </div>

                            <div className="mt-5 grid gap-3">
                                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                    <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                                        <GraduationCap size={16} />
                                        {t('appPages.admin.teachers.accent')}
                                    </div>
                                    <div className="mt-2 text-base font-black text-slate-900">{teacher.accent}</div>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                    <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                                        <Gauge size={16} />
                                        {t('appPages.admin.teachers.currentLoad')}
                                    </div>
                                    <div className="mt-3 flex items-center justify-between gap-3 text-sm font-black text-slate-800">
                                        <span>{teacher.booked}/{teacher.capacity} {t('appPages.admin.teachers.sessions')}</span>
                                        <span>{teacher.load}%</span>
                                    </div>
                                    <div className="mt-3 h-2.5 rounded-full bg-slate-100">
                                        <div className={`h-full rounded-full ${loadBarTone(teacher.load)}`} style={{ width: `${teacher.load}%` }} />
                                    </div>
                                </div>

                                <div className="grid gap-3 md:grid-cols-2">
                                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                        <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                                            <Star size={16} />
                                            {t('appPages.admin.teachers.qaScore')}
                                        </div>
                                        <div className="mt-2 text-base font-black text-slate-900">{teacher.qaScore}</div>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                        <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                                            <CalendarClock size={16} />
                                            {t('appPages.admin.teachers.nextReview')}
                                        </div>
                                        <div className="mt-2 text-base font-black text-slate-900">{teacher.nextReview}</div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                    <div className="text-sm font-bold text-slate-500">{t('appPages.admin.teachers.focus')}</div>
                                    <div className="mt-2 text-sm font-medium leading-7 text-slate-700">{teacher.focus}</div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AdminTeachersPage;
