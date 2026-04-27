import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
    ArrowLeft,
    BarChart3,
    BookOpen,
    CalendarDays,
    CreditCard,
    GraduationCap,
    Shield,
    Sparkles,
    Users,
} from 'lucide-react';
import SectionHeader from '../components/platform/SectionHeader';

const HomePage: React.FC = () => {
    const { t } = useTranslation();

    const roleCardsText = t('appPages.home.roleCards', { returnObjects: true }) as Array<{ title: string; description: string; meta: string }>;
    const statsText = t('appPages.home.stats', { returnObjects: true }) as Array<{ label: string; hint: string }>;
    const quickActionsText = t('appPages.home.quickActions', { returnObjects: true }) as Array<{ title: string; description: string }>;

    const roleCards = [
        { ...roleCardsText[0], path: '/parent/dashboard', icon: Users, tone: 'bg-sky-50 text-sky-700 border-sky-100' },
        { ...roleCardsText[1], path: '/student/dashboard', icon: Sparkles, tone: 'bg-amber-50 text-amber-700 border-amber-100' },
        { ...roleCardsText[2], path: '/teacher/dashboard', icon: GraduationCap, tone: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
        { ...roleCardsText[3], path: '/admin/dashboard', icon: Shield, tone: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    ];

    const platformStats = [
        { ...statsText[0], value: '1,284', icon: Users },
        { ...statsText[1], value: '312', icon: CalendarDays },
        { ...statsText[2], value: '74/100', icon: BarChart3 },
        { ...statsText[3], value: '896', icon: CreditCard },
    ];

    const quickActions = [
        { ...quickActionsText[0], path: '/placement-test', icon: BookOpen },
        { ...quickActionsText[1], path: '/pricing', icon: CreditCard },
        { ...quickActionsText[2], path: '/curriculum', icon: GraduationCap },
    ];

    return (
        <div className="space-y-10 pb-16">
            <section className="rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-sm">
                <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
                    <div className="space-y-5">
                        <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-xs font-black tracking-[0.16em] text-sky-700">
                            {t('appPages.home.badge')}
                        </div>
                        <h1 className="text-4xl font-black text-slate-950 lg:text-5xl">{t('appPages.home.title')}</h1>
                        <p className="max-w-3xl text-base leading-8 text-slate-600">{t('appPages.home.description')}</p>
                        <div className="flex flex-wrap gap-3">
                            <Link to="/teacher/dashboard" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-black text-white transition-colors hover:bg-slate-800">
                                {t('appPages.home.openTeacher')} <ArrowLeft size={16} />
                            </Link>
                            <Link to="/parent/dashboard" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 transition-colors hover:bg-slate-50">
                                {t('appPages.home.openParent')}
                            </Link>
                        </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        {platformStats.map((stat) => (
                            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-700">
                                    <stat.icon size={16} />
                                </div>
                                <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                                <div className="mt-1 text-sm font-bold text-slate-700">{stat.label}</div>
                                <div className="mt-1 text-xs font-bold text-slate-500">{stat.hint}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <SectionHeader
                eyebrow={t('appPages.home.roleSection.eyebrow')}
                title={t('appPages.home.roleSection.title')}
                description={t('appPages.home.roleSection.description')}
            />

            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {roleCards.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
                    >
                        <div>
                            <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border ${item.tone}`}>
                                <item.icon size={20} />
                            </div>
                            <h2 className="text-xl font-black text-slate-900">{item.title}</h2>
                            <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                        </div>
                        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                            <span className="text-xs font-black tracking-wide text-slate-500">{item.meta}</span>
                            <span className="inline-flex items-center gap-1 text-sm font-black text-slate-700">
                                {t('appPages.home.enter')} <ArrowLeft size={14} />
                            </span>
                        </div>
                    </Link>
                ))}
            </section>

            <SectionHeader
                eyebrow={t('appPages.home.quickSection.eyebrow')}
                title={t('appPages.home.quickSection.title')}
                description={t('appPages.home.quickSection.description')}
            />

            <section className="grid gap-5 md:grid-cols-3">
                {quickActions.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
                    >
                        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                            <item.icon size={20} />
                        </div>
                        <h3 className="text-lg font-black text-slate-900">{item.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                        <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-slate-700">
                            {t('appPages.home.goNow')} <ArrowLeft size={14} />
                        </div>
                    </Link>
                ))}
            </section>
        </div>
    );
};

export default HomePage;
