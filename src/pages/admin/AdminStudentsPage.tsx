import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Search, ShieldAlert, Sparkles, Users } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';
import { adminStudentRecords } from '../../constants/adminConsoleData';

const statusToneMap = {
    healthy: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    watch: 'bg-amber-50 text-amber-700 border-amber-100',
    growth: 'bg-sky-50 text-sky-700 border-sky-100',
    risk: 'bg-rose-50 text-rose-700 border-rose-100',
} as const;

const progressTone = (value: number) => value >= 85 ? 'bg-emerald-500' : value >= 70 ? 'bg-sky-500' : value >= 55 ? 'bg-amber-500' : 'bg-rose-500';

const AdminStudentsPage: React.FC = () => {
    const { t } = useTranslation();

    const statusLabels = {
        healthy: t('appPages.admin.students.healthy'),
        watch: t('appPages.admin.students.watch'),
        growth: t('appPages.admin.students.growth'),
        risk: t('appPages.admin.students.risk'),
    } as const;

    const stats = [
        { id: 'total', label: t('appPages.admin.students.totalLabel'), value: '48', icon: Users, tone: 'bg-slate-900 text-white' },
        { id: 'watch', label: t('appPages.admin.students.watchlistLabel'), value: '9', icon: ShieldAlert, tone: 'bg-amber-500 text-white' },
        { id: 'growth', label: t('appPages.admin.students.growthLabel'), value: '5', icon: Sparkles, tone: 'bg-sky-600 text-white' },
    ];

    return (
        <div className="space-y-8">
            <SectionHeader
                eyebrow={t('appPages.admin.students.eyebrow')}
                title={t('appPages.admin.students.title')}
                description={t('appPages.admin.students.description')}
            />

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-slate-950">{t('appPages.admin.students.overviewTitle')}</h2>
                        <p className="mt-2 text-sm leading-7 text-slate-500">{t('appPages.admin.students.overviewDesc')}</p>
                    </div>
                    <div className="relative w-full xl:max-w-md">
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder={t('appPages.admin.students.searchPlaceholder')}
                            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pr-11 pl-4 text-sm font-medium text-slate-700 outline-none transition focus:border-slate-300 focus:bg-white"
                        />
                    </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {stats.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.tone}`}>
                                    <Icon size={20} />
                                </div>
                                <div className="mt-5 text-3xl font-black text-slate-950">{item.value}</div>
                                <div className="mt-2 text-sm font-bold text-slate-500">{item.label}</div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-[1100px] w-full text-right">
                        <thead className="bg-slate-50 text-xs font-black uppercase tracking-wider text-slate-500">
                            <tr>
                                <th className="px-6 py-4">{t('appPages.admin.students.student')}</th>
                                <th className="px-6 py-4">{t('appPages.admin.students.country')}</th>
                                <th className="px-6 py-4">{t('appPages.admin.students.grade')}</th>
                                <th className="px-6 py-4">{t('appPages.admin.students.level')}</th>
                                <th className="px-6 py-4">{t('appPages.admin.students.plan')}</th>
                                <th className="px-6 py-4">{t('appPages.admin.students.engagement')}</th>
                                <th className="px-6 py-4">{t('appPages.admin.students.attendance')}</th>
                                <th className="px-6 py-4">{t('appPages.admin.students.renewal')}</th>
                                <th className="px-6 py-4">{t('appPages.admin.students.owner')}</th>
                                <th className="px-6 py-4">{t('appPages.admin.students.status')}</th>
                                <th className="px-6 py-4">{t('appPages.admin.students.action')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminStudentRecords.map((student) => (
                                <tr key={student.id} className="border-t border-slate-100 align-top">
                                    <td className="px-6 py-5">
                                        <div className="font-black text-slate-950">{student.name}</div>
                                        <div className="mt-1 text-xs font-bold text-slate-400">{t('appPages.admin.students.age')}: {student.age}</div>
                                    </td>
                                    <td className="px-6 py-5 text-sm font-medium text-slate-600">{student.country}</td>
                                    <td className="px-6 py-5 text-sm font-medium text-slate-600">{student.grade}</td>
                                    <td className="px-6 py-5 text-sm font-medium text-slate-600">{student.level}</td>
                                    <td className="px-6 py-5 text-sm font-medium text-slate-600">{student.plan}</td>
                                    <td className="px-6 py-5">
                                        <div className="min-w-28">
                                            <div className="mb-2 flex items-center justify-between text-xs font-bold text-slate-500">
                                                <span>{student.engagement}%</span>
                                            </div>
                                            <div className="h-2.5 rounded-full bg-slate-100">
                                                <div className={`h-full rounded-full ${progressTone(student.engagement)}`} style={{ width: `${student.engagement}%` }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-sm font-black text-slate-700">{student.attendance}%</td>
                                    <td className="px-6 py-5 text-sm font-black text-slate-700">{student.renewal}%</td>
                                    <td className="px-6 py-5 text-sm font-medium text-slate-600">{student.owner}</td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-black ${statusToneMap[student.status]}`}>
                                            {statusLabels[student.status]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <button className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2 text-xs font-black text-white transition hover:bg-slate-800">
                                            {t('appPages.admin.students.openProfile')}
                                            <ArrowUpRight size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default AdminStudentsPage;
