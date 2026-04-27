import React from 'react';
import { Link } from 'react-router-dom';
import {
    Activity,
    ArrowLeft,
    AudioLines,
    BookOpen,
    CalendarDays,
    CheckCircle2,
    Clock3,
    FileText,
    GraduationCap,
    Mic2,
    Sparkles,
    Target,
    TrendingUp,
    UserRound,
    Waves,
} from 'lucide-react';
import omarAvatar from '../../assets/omar.webp';
import { learningJourney, parentDashboardMock } from '../../constants/termProgram';

const ParentDashboardPage: React.FC = () => {
    const completedJourneyPhases = 2;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900" dir="rtl">
            <main className="mx-auto w-full max-w-7xl space-y-8 px-6 py-10">
                <header className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                            <img src={omarAvatar} alt="عمر فهد" className="h-20 w-20 rounded-2xl object-cover ring-2 ring-slate-200" />
                            <div>
                                <p className="text-sm font-black text-indigo-600">لوحة ولي الأمر</p>
                                <h1 className="text-3xl font-black text-slate-950">{parentDashboardMock.studentName}</h1>
                                <p className="text-sm font-semibold text-slate-500">
                                    {parentDashboardMock.grade} | {parentDashboardMock.currentTerm}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 md:w-[420px]">
                            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                                <p className="text-xs font-black text-slate-500">مستوى الدخول</p>
                                <p className="mt-1 text-lg font-black">{parentDashboardMock.entryLevel}</p>
                            </div>
                            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                                <p className="text-xs font-black text-slate-500">مستوى الخروج المستهدف</p>
                                <p className="mt-1 text-lg font-black">{parentDashboardMock.targetLevel}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-4">
                        <div className="rounded-2xl bg-indigo-600 p-4 text-white">
                            <p className="text-xs font-black text-indigo-100">درجة التقدم العامة</p>
                            <p className="mt-2 text-3xl font-black">{parentDashboardMock.progressScore}/100</p>
                        </div>
                        <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                            <p className="text-xs font-black text-slate-500">نسبة الحضور</p>
                            <p className="mt-2 text-2xl font-black">{parentDashboardMock.attendanceRate}%</p>
                        </div>
                        <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                            <p className="text-xs font-black text-slate-500">الحصص المكتملة</p>
                            <p className="mt-2 text-2xl font-black">
                                {parentDashboardMock.sessionsCompleted}/{parentDashboardMock.sessionsTotal}
                            </p>
                        </div>
                        <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                            <p className="text-xs font-black text-slate-500">الباقة الحالية</p>
                            <p className="mt-2 text-2xl font-black">{parentDashboardMock.packageName}</p>
                        </div>
                    </div>
                </header>

                <section className="grid gap-6 lg:grid-cols-3">
                    <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-black text-slate-950">مؤشرات الأداء الرئيسية (KPI)</h2>
                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">تحديث أسبوعي</span>
                        </div>

                        <div className="space-y-4">
                            {parentDashboardMock.kpis.map((kpi) => (
                                <div key={kpi.label} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                                    <div className="mb-2 flex items-center justify-between">
                                        <p className="text-sm font-black text-slate-800">{kpi.label}</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-black text-slate-900">{kpi.value}</span>
                                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-black text-emerald-700">
                                                {kpi.trend}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                                        <div className="h-full rounded-full bg-indigo-600" style={{ width: `${kpi.progress}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
                        <div className="flex items-center gap-2 text-indigo-200">
                            <Sparkles size={18} />
                            <p className="text-sm font-black">توصية ذكية للفصل القادم</p>
                        </div>
                        <p className="mt-4 text-lg font-bold leading-8 text-slate-100">{parentDashboardMock.recommendation}</p>

                        <div className="mt-6 space-y-3">
                            <Link to="/pricing" className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-sm font-black hover:bg-white/20">
                                عرض الباقات المقترحة
                                <ArrowLeft size={16} />
                            </Link>
                            <Link to="/parent/child/omar-01/reports" className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-sm font-black hover:bg-white/20">
                                عرض تقرير نهاية الفصل
                                <ArrowLeft size={16} />
                            </Link>
                            <Link to="/parent/sessions" className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-sm font-black hover:bg-white/20">
                                حجز جلسة متابعة
                                <ArrowLeft size={16} />
                            </Link>
                        </div>
                    </article>
                </section>

                <section className="grid gap-6 lg:grid-cols-3">
                    <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
                        <h2 className="text-2xl font-black text-slate-950">رحلة عمر داخل الفصل الدراسي</h2>
                        <p className="mt-2 text-sm font-semibold text-slate-600">كل مرحلة مرتبطة بقرار واضح وتقرير قابل للقياس.</p>

                        <div className="mt-6 space-y-4">
                            {learningJourney.map((phase, index) => {
                                const isDone = index < completedJourneyPhases;
                                const isCurrent = index === completedJourneyPhases;

                                return (
                                    <div
                                        key={phase.phase}
                                        className={`rounded-2xl p-4 ring-1 ${
                                            isDone
                                                ? 'bg-emerald-50 ring-emerald-200'
                                                : isCurrent
                                                    ? 'bg-indigo-50 ring-indigo-200'
                                                    : 'bg-slate-50 ring-slate-200'
                                        }`}
                                    >
                                        <div className="mb-2 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {isDone ? (
                                                    <CheckCircle2 size={16} className="text-emerald-600" />
                                                ) : isCurrent ? (
                                                    <Clock3 size={16} className="text-indigo-600" />
                                                ) : (
                                                    <CalendarDays size={16} className="text-slate-500" />
                                                )}
                                                <p className="text-xs font-black text-slate-600">{phase.phase}</p>
                                            </div>
                                            <span className="text-xs font-black text-slate-500">
                                                {isDone ? 'مكتملة' : isCurrent ? 'جارية الآن' : 'قادمة'}
                                            </span>
                                        </div>

                                        <p className="text-base font-black text-slate-900">{phase.title}</p>
                                        <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">{phase.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </article>

                    <article className="space-y-5">
                        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                            <h3 className="text-base font-black text-slate-900">ملخص هذا الأسبوع</h3>
                            <div className="mt-4 space-y-3">
                                {[
                                    { icon: BookOpen, label: 'كلمات جديدة', value: '18 كلمة' },
                                    { icon: Mic2, label: 'تمارين نطق', value: '4 تمارين' },
                                    { icon: Activity, label: 'متوسط التفاعل', value: '81%' },
                                    { icon: Waves, label: 'وقت الممارسة', value: '37 دقيقة' },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-slate-200">
                                        <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                            <item.icon size={16} className="text-indigo-600" />
                                            {item.label}
                                        </div>
                                        <span className="text-sm font-black text-slate-900">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                            <h3 className="text-base font-black text-slate-900">إجراءات سريعة</h3>
                            <div className="mt-4 space-y-2">
                                {[
                                    { to: '/parent/child/omar-01/progress', label: 'عرض صفحة التقدم التفصيلية', icon: TrendingUp },
                                    { to: '/parent/child/omar-01/audio-progress', label: 'مقارنة التسجيلات الصوتية', icon: AudioLines },
                                    { to: '/parent/child/omar-01/reports', label: 'تقرير قابل للمشاركة مع الأهل', icon: FileText },
                                    { to: '/parent/billing', label: 'تجديد الباقة للفصل القادم', icon: Target },
                                    { to: '/parent/dashboard', label: 'بيانات ولي الأمر', icon: UserRound },
                                    { to: '/placement-test', label: 'إعادة اختبار تحديد المستوى', icon: GraduationCap },
                                ].map((action) => (
                                    <Link
                                        key={action.label}
                                        to={action.to}
                                        className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
                                    >
                                        <div className="flex items-center gap-2">
                                            <action.icon size={16} className="text-slate-500" />
                                            {action.label}
                                        </div>
                                        <ArrowLeft size={14} className="text-slate-400" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </article>
                </section>
            </main>
        </div>
    );
};

export default ParentDashboardPage;

