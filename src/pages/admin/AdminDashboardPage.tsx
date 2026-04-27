import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users, BookOpen, TrendingUp, AlertCircle, MoreVertical } from 'lucide-react';

const AdminDashboardPage: React.FC = () => {
    const { t } = useTranslation();

    const stats = [
        { label: t('appPages.admin.dashboard.totalStudents'), value: '12,450', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: t('appPages.admin.dashboard.activeBooks'), value: '840', change: '+5%', icon: BookOpen, color: 'text-mint-600', bg: 'bg-mint-50' },
        { label: t('appPages.admin.dashboard.viewedLessons'), value: '45.2K', change: '+24%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: t('appPages.admin.dashboard.contentReports'), value: '3', change: '-2', icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800 font-cairo">{t('appPages.admin.dashboard.title')}</h1>
                <p className="text-slate-500 text-sm">{t('appPages.admin.dashboard.description')}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                            <div className="mb-4 flex items-start justify-between">
                                <div className={`rounded-lg p-3 ${stat.bg} ${stat.color}`}>
                                    <Icon size={24} />
                                </div>
                                <span className={`rounded-full px-2 py-1 text-xs font-bold ${stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="font-cairo text-3xl font-bold text-slate-800">{stat.value}</h3>
                            <p className="mt-1 text-sm font-medium text-slate-500">{stat.label}</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-800">{t('appPages.admin.dashboard.recentActivity')}</h3>
                        <button className="text-slate-400 hover:text-slate-600"><MoreVertical size={20} /></button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="cursor-pointer rounded-lg border-b border-slate-50 p-3 transition-colors last:border-0 hover:bg-slate-50">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-600">
                                        ST
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-slate-800">{t('appPages.admin.dashboard.newStudentJoined')}</h4>
                                        <p className="text-xs text-slate-500">{t('appPages.admin.dashboard.newStudentJoinedDesc')}</p>
                                    </div>
                                    <span className="text-xs font-medium text-slate-400">{t('appPages.admin.dashboard.twoMinutesAgo')}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
                    <h3 className="mb-6 text-lg font-bold text-slate-800">{t('appPages.admin.dashboard.quickActions')}</h3>
                    <div className="space-y-3">
                        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-mint-50 px-4 py-3 text-sm font-bold text-mint-700 transition-colors hover:bg-mint-100">
                            <BookOpen size={18} />
                            {t('appPages.admin.dashboard.addBook')}
                        </button>
                        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700 transition-colors hover:bg-blue-100">
                            <Users size={18} />
                            {t('appPages.admin.dashboard.inviteTeacher')}
                        </button>
                        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100">
                            <TrendingUp size={18} />
                            {t('appPages.admin.dashboard.exportReports')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
