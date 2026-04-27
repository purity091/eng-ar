import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, ArrowUpRight, BookOpen, CheckCircle2, Clock3, ShieldAlert, TrendingUp, Users } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';
import { adminActionCards, adminActivityFeed, adminDashboardStats, adminPlatformHealth, adminReviewQueue } from '../../constants/adminConsoleData';

const toneMap = {
    sky: { card: 'bg-sky-50 border-sky-100', icon: 'bg-sky-600 text-white', text: 'text-sky-700' },
    emerald: { card: 'bg-emerald-50 border-emerald-100', icon: 'bg-emerald-600 text-white', text: 'text-emerald-700' },
    violet: { card: 'bg-violet-50 border-violet-100', icon: 'bg-violet-600 text-white', text: 'text-violet-700' },
    amber: { card: 'bg-amber-50 border-amber-100', icon: 'bg-amber-600 text-white', text: 'text-amber-700' },
    slate: { card: 'bg-slate-100 border-slate-200', icon: 'bg-slate-900 text-white', text: 'text-slate-700' },
} as const;

const statIconMap = {
    students: Users,
    books: BookOpen,
    views: TrendingUp,
    reports: AlertCircle,
} as const;

const healthIconMap = {
    attendance: CheckCircle2,
    utilization: TrendingUp,
    reviews: ShieldAlert,
    renewals: ArrowUpRight,
} as const;

const priorityToneMap = {
    urgent: 'bg-rose-50 border-rose-100 text-rose-700',
    monitor: 'bg-amber-50 border-amber-100 text-amber-700',
    healthy: 'bg-emerald-50 border-emerald-100 text-emerald-700',
} as const;

const AdminDashboardPage: React.FC = () => {
    const { t } = useTranslation();

    const statLabels = {
        students: t('appPages.admin.dashboard.totalStudents'),
        books: t('appPages.admin.dashboard.activeBooks'),
        views: t('appPages.admin.dashboard.viewedLessons'),
        reports: t('appPages.admin.dashboard.contentReports'),
    } as const;

    const healthLabels = {
        attendance: t('appPages.admin.dashboard.attendanceHealth'),
        utilization: t('appPages.admin.dashboard.slotsUtilization'),
        reviews: t('appPages.admin.dashboard.pendingReviews'),
        renewals: t('appPages.admin.dashboard.retentionForecast'),
    } as const;

    const actionLabels = {
        curriculum: t('appPages.admin.dashboard.addBook'),
        schedule: t('appPages.admin.dashboard.inviteTeacher'),
        subscriptions: t('appPages.admin.dashboard.exportReports'),
        snapshot: t('appPages.admin.dashboard.snapshot'),
    } as const;

    const priorityLabels = {
        urgent: t('appPages.admin.dashboard.urgent'),
        monitor: t('appPages.admin.dashboard.monitor'),
        healthy: t('appPages.admin.dashboard.healthy'),
    } as const;

    return (
        <div className="space-y-8">
            <SectionHeader
                eyebrow={t('appPages.admin.dashboard.eyebrow')}
                title={t('appPages.admin.dashboard.title')}
                description={t('appPages.admin.dashboard.description')}
            />

            <section className="grid gap-4 xl:grid-cols-4">
                {adminDashboardStats.map((stat) => {
                    const Icon = statIconMap[stat.id];
                    const tone = toneMap[stat.tone];
                    return (
                        <article key={stat.id} className={`rounded-[2rem] border p-6 shadow-sm ${tone.card}`}>
                            <div className="flex items-start justify-between">
                                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone.icon}`}>
                                    <Icon size={22} />
                                </div>
                                <span className={`rounded-full px-3 py-1 text-xs font-black ${stat.delta.startsWith('+') ? 'bg-white text-emerald-700' : 'bg-white text-rose-700'}`}>
                                    {stat.delta}
                                </span>
                            </div>
                            <div className="mt-8 text-4xl font-black text-slate-950">{stat.value}</div>
                            <div className={`mt-2 text-sm font-bold ${tone.text}`}>{statLabels[stat.id]}</div>
                        </article>
                    );
                })}
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.45fr,0.85fr]">
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-black text-slate-950">{t('appPages.admin.dashboard.commandCenter')}</h2>
                            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">{t('appPages.admin.dashboard.commandCenterDesc')}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white">MENA / Core Ops</div>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {adminPlatformHealth.map((item) => {
                            const Icon = healthIconMap[item.id];
                            const priority = priorityLabels[item.status as keyof typeof priorityLabels];
                            return (
                                <div key={item.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm">
                                                <Icon size={18} />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-500">{healthLabels[item.id as keyof typeof healthLabels]}</div>
                                                <div className="text-2xl font-black text-slate-950">{item.value}</div>
                                            </div>
                                        </div>
                                        <span className={`rounded-full px-3 py-1 text-xs font-black ${priorityToneMap[item.status as keyof typeof priorityToneMap]}`}>{priority}</span>
                                    </div>
                                    <div className="mt-4 text-sm font-bold text-slate-600">{item.trend}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <div>
                        <h2 className="text-2xl font-black text-slate-950">{t('appPages.admin.dashboard.queueTitle')}</h2>
                        <p className="mt-2 text-sm leading-7 text-slate-500">{t('appPages.admin.dashboard.queueDesc')}</p>
                    </div>
                    <div className="mt-6 space-y-3">
                        {adminReviewQueue.map((item) => (
                            <div key={item.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="text-sm font-black text-slate-900">{item.title}</div>
                                    <span className={`rounded-full px-3 py-1 text-[11px] font-black ${priorityToneMap[item.priority as keyof typeof priorityToneMap]}`}>{priorityLabels[item.priority as keyof typeof priorityLabels]}</span>
                                </div>
                                <p className="mt-2 text-sm leading-7 text-slate-600">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-black text-slate-950">{t('appPages.admin.dashboard.recentActivity')}</h2>
                            <p className="mt-2 text-sm text-slate-500">Live platform events worth scanning before the next operating cycle.</p>
                        </div>
                        <div className="rounded-2xl bg-slate-100 p-3 text-slate-600">
                            <Clock3 size={18} />
                        </div>
                    </div>
                    <div className="mt-6 space-y-4">
                        {adminActivityFeed.map((item) => (
                            <div key={item.id} className="flex items-start gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sm font-black text-slate-700 shadow-sm">R</div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-4">
                                        <h3 className="text-sm font-black text-slate-900">{item.title}</h3>
                                        <span className="text-xs font-bold text-slate-400">{item.time}</span>
                                    </div>
                                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <div>
                        <h2 className="text-2xl font-black text-slate-950">{t('appPages.admin.dashboard.quickActions')}</h2>
                        <p className="mt-2 text-sm leading-7 text-slate-500">{t('appPages.admin.dashboard.quickActionsDesc')}</p>
                    </div>
                    <div className="mt-6 grid gap-3">
                        {adminActionCards.map((card) => {
                            const tone = toneMap[card.tone];
                            return (
                                <button key={card.id} className={`flex items-center justify-between rounded-[1.5rem] border px-5 py-4 text-left transition-transform hover:-translate-y-0.5 ${tone.card}`}>
                                    <span className={`text-sm font-black ${tone.text}`}>{actionLabels[card.id as keyof typeof actionLabels]}</span>
                                    <ArrowUpRight size={18} className={tone.text} />
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminDashboardPage;
