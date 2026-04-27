import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRightLeft, CalendarClock, ShieldAlert, Users } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';
import { adminScheduleDays, adminScheduleMoves } from '../../constants/adminConsoleData';
import { scheduleAlert } from '../../constants/platformData';

const AdminSchedulePage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-8">
            <SectionHeader
                eyebrow={t('appPages.admin.schedule.eyebrow')}
                title={t('appPages.admin.schedule.title')}
                description={t('appPages.admin.schedule.description')}
            />

            <section className="rounded-[2rem] border border-rose-200 bg-rose-50 p-6 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-black text-rose-700">
                            <ShieldAlert size={14} />
                            {t('appPages.admin.schedule.alertTitle')}
                        </div>
                        <h2 className="mt-4 text-2xl font-black text-slate-950">{scheduleAlert.teacher}</h2>
                        <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-700">{scheduleAlert.message}</p>
                    </div>
                    <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white">
                        <Users size={16} />
                        {t('appPages.admin.schedule.openTeacherBoard')}
                    </button>
                </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-950">{t('appPages.admin.schedule.weeklyLoad')}</h2>
                        <p className="mt-2 text-sm leading-7 text-slate-500">{t('appPages.admin.schedule.weeklyLoadDesc')}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-700">10 teachers / 5 days</div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                    {adminScheduleDays.map((day) => {
                        const utilization = Math.round((day.sessions / day.capacity) * 100);
                        return (
                            <article key={day.day} className={`rounded-[1.75rem] border p-5 shadow-sm ${day.status === 'overloaded' ? 'border-rose-200 bg-rose-50' : 'border-slate-200 bg-slate-50'}`}>
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <div className="text-lg font-black text-slate-950">{day.day}</div>
                                        <div className="mt-1 text-sm font-medium text-slate-500">{t('appPages.admin.schedule.peakWindow')}: {day.peak}</div>
                                    </div>
                                    <span className={`rounded-full px-3 py-1 text-xs font-black ${day.status === 'overloaded' ? 'bg-white text-rose-700' : 'bg-white text-emerald-700'}`}>
                                        {day.status === 'overloaded' ? t('appPages.admin.schedule.overloaded') : t('appPages.admin.schedule.healthy')}
                                    </span>
                                </div>

                                <div className="mt-6 text-4xl font-black text-slate-950">{day.sessions}</div>
                                <div className="mt-1 text-sm font-bold text-slate-500">{t('appPages.admin.schedule.sessions')}</div>

                                <div className="mt-5 rounded-2xl border border-white/70 bg-white p-4">
                                    <div className="flex items-center justify-between text-xs font-black text-slate-500">
                                        <span>{t('appPages.admin.schedule.capacity')}</span>
                                        <span>{day.capacity}</span>
                                    </div>
                                    <div className="mt-3 h-2.5 rounded-full bg-slate-100">
                                        <div className={`h-full rounded-full ${day.status === 'overloaded' ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${utilization}%` }} />
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-slate-950">{t('appPages.admin.schedule.recommendedMoves')}</h2>
                        <p className="mt-2 text-sm leading-7 text-slate-500">Recommended interventions to normalize the weekly load.</p>
                    </div>
                    <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                        <ArrowRightLeft size={18} />
                    </div>
                </div>

                <div className="mt-6 grid gap-4 xl:grid-cols-[1.1fr,0.9fr]">
                    <div className="space-y-3">
                        {adminScheduleMoves.map((move) => (
                            <div key={move} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-sm font-medium leading-7 text-slate-700">
                                {move}
                            </div>
                        ))}
                    </div>

                    <div className="grid gap-3">
                        <button className="rounded-[1.5rem] border border-slate-200 bg-sky-50 px-5 py-4 text-sm font-black text-sky-700 transition hover:bg-sky-100">
                            {t('appPages.admin.schedule.shiftGroupSession')}
                        </button>
                        <button className="rounded-[1.5rem] border border-slate-200 bg-violet-50 px-5 py-4 text-sm font-black text-violet-700 transition hover:bg-violet-100">
                            {t('appPages.admin.schedule.freezeBookings')}
                        </button>
                        <button className="rounded-[1.5rem] border border-slate-200 bg-slate-950 px-5 py-4 text-sm font-black text-white transition hover:bg-slate-800">
                            <span className="inline-flex items-center gap-2">
                                <CalendarClock size={16} />
                                {t('appPages.admin.schedule.openTeacherBoard')}
                            </span>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminSchedulePage;
