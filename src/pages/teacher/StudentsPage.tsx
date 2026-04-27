import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Filter, Globe2, Search, SlidersHorizontal, Sparkles, Users, Activity, TrendingUp, ShieldAlert, ArrowRight } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';

type StudentStatus = 'Stable' | 'Needs Attention' | 'At Risk' | 'Ready to Advance';

interface StudentRecord {
    id: string;
    name: string;
    age: number;
    country: string;
    cefr: string;
    performance: number;
    engagement: number;
    lastAttendance: string;
    weakestSkill: string;
    planType: string;
    status: StudentStatus;
    aiInsight: string;
}

const statusStyles: Record<StudentStatus, string> = {
    Stable: 'bg-slate-100 text-slate-700 border-slate-200',
    'Needs Attention': 'bg-amber-100 text-amber-700 border-amber-200',
    'At Risk': 'bg-red-100 text-red-700 border-red-200',
    'Ready to Advance': 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

const statusIcons: Record<StudentStatus, React.ElementType> = {
    Stable: Activity,
    'Needs Attention': AlertCircle,
    'At Risk': ShieldAlert,
    'Ready to Advance': TrendingUp,
};

const StudentsPage: React.FC = () => {
    const { t } = useTranslation();
    const [statusFilter, setStatusFilter] = useState<'All' | StudentStatus>('All');
    const [searchTerm, setSearchTerm] = useState('');

    const studentRecords = t('appPages.teacher.studentsPage.records', { returnObjects: true }) as StudentRecord[];
    const stats = t('appPages.teacher.studentsPage.stats', { returnObjects: true }) as Array<{ label: string; value: string; trend: string; tone: string; bg: string; icon: 'users'|'alert'|'check' }>;
    const statusLabels = t('appPages.teacher.studentsPage.statusLabels', { returnObjects: true }) as Record<string, string>;

    const filteredStudents = useMemo(() => {
        return studentRecords.filter((student) => {
            const matchesStatus = statusFilter === 'All' || student.status === statusFilter;
            const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.country.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    }, [searchTerm, statusFilter, studentRecords]);

    return (
        <div className="space-y-8 pb-16 font-outfit">
            <SectionHeader
                eyebrow={t('appPages.teacher.students.eyebrow')}
                title={t('appPages.teacher.students.title')}
                description={t('appPages.teacher.students.description')}
            />

            <div className="grid gap-4 md:grid-cols-3">
                {stats.map((item) => {
                    const icon = item.icon === 'users' ? Users : item.icon === 'alert' ? AlertCircle : CheckCircle2;
                    return (
                        <div key={item.label} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                            <div className="mb-4 flex items-start justify-between">
                                <div className={`rounded-2xl p-3 ${item.bg}`}><icon className={item.tone} size={24} /></div>
                                <span className="rounded-lg bg-slate-50 px-2 py-1 text-xs font-bold text-slate-400">{item.trend}</span>
                            </div>
                            <div className="text-4xl font-black tracking-tight text-slate-900">{item.value}</div>
                            <div className="mt-2 text-sm font-bold text-slate-500">{item.label}</div>
                        </div>
                    );
                })}
            </div>

            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">{t('appPages.teacher.studentsPage.smartFilters')}</h2>
                        <p className="mt-1 text-sm font-medium text-slate-500">{t('appPages.teacher.studentsPage.smartFiltersDesc')}</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <div className="group relative">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-500" />
                            <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder={t('appPages.teacher.studentsPage.searchPlaceholder')}
                                className="w-72 rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-bold text-slate-700 outline-none transition-all focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50"
                            />
                        </div>
                        <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-black text-slate-600 transition-colors hover:bg-slate-100">
                            <Filter size={16} />
                            {t('appPages.teacher.studentsPage.levelAll')}
                        </button>
                        <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-black text-slate-600 transition-colors hover:bg-slate-100">
                            <SlidersHorizontal size={16} />
                            {t('appPages.teacher.studentsPage.skillAll')}
                        </button>
                    </div>
                </div>

                <div className="mb-6 flex flex-wrap gap-2">
                    {(['All', 'Stable', 'Needs Attention', 'At Risk', 'Ready to Advance'] as const).map((item) => (
                        <button
                            key={item}
                            onClick={() => setStatusFilter(item)}
                            className={`rounded-full border px-5 py-2.5 text-xs font-black transition-all ${
                                statusFilter === item ? 'border-slate-900 bg-slate-950 text-white shadow-md' : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100'
                            }`}
                        >
                            {item === 'All' ? t('appPages.teacher.studentsPage.all') : statusLabels[item]}
                        </button>
                    ))}
                </div>

                <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white">
                    <div className="grid grid-cols-[1.5fr,0.8fr,0.8fr,1fr,1fr,0.8fr] gap-4 border-b border-slate-200 bg-slate-50/80 px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                        <div>{t('appPages.teacher.studentsPage.columns.profile')}</div>
                        <div>{t('appPages.teacher.studentsPage.columns.level')}</div>
                        <div>{t('appPages.teacher.studentsPage.columns.metrics')}</div>
                        <div>{t('appPages.teacher.studentsPage.columns.ai')}</div>
                        <div>{t('appPages.teacher.studentsPage.columns.status')}</div>
                        <div className="text-right">{t('appPages.teacher.studentsPage.columns.action')}</div>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {filteredStudents.map((student) => {
                            const StatusIcon = statusIcons[student.status];
                            return (
                                <div key={student.id} className="group grid grid-cols-[1.5fr,0.8fr,0.8fr,1fr,1fr,0.8fr] items-center gap-4 px-6 py-5 transition-colors hover:bg-slate-50/50">
                                    <div>
                                        <div className="text-base font-black text-slate-900">{student.name}</div>
                                        <div className="mt-1 inline-flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                            <Globe2 size={12} />
                                            {student.country} • {student.age} yo • {student.lastAttendance}
                                        </div>
                                        <div className="mt-2 inline-block rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-500">{t('appPages.teacher.studentsPage.weakest')}: {student.weakestSkill}</div>
                                    </div>
                                    <div className="font-black text-slate-700"><span className="rounded-xl bg-indigo-50 px-3 py-1.5 text-indigo-700">{student.cefr}</span></div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-black text-slate-600"><span>Perf.</span><span className="text-emerald-600">{student.performance}</span></div>
                                        <div className="flex justify-between text-xs font-black text-slate-600"><span>Eng.</span><span className={student.engagement < 60 ? 'text-amber-600' : 'text-emerald-600'}>{student.engagement}</span></div>
                                    </div>
                                    <div>
                                        <div className="line-clamp-2 text-xs font-bold leading-relaxed text-slate-500"><Sparkles size={10} className="mr-1 inline text-indigo-400" />{student.aiInsight}</div>
                                        <div className="mt-1 text-xs font-black text-indigo-600">{student.planType}</div>
                                    </div>
                                    <div>
                                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-black ${statusStyles[student.status]}`}>
                                            <StatusIcon size={12} />{statusLabels[student.status]}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <Link to={`/teacher/students/${student.id}`} className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition-all group-hover:shadow-md hover:bg-slate-950 hover:text-white">
                                            <ArrowRight size={18} />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentsPage;
