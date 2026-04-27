import React, { useMemo, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Bell, BookOpen, GraduationCap, Home, LogOut, Menu, Mic2, Users, Search, Settings, ChevronRight, Sparkles, BrainCircuit, ClipboardList, FileText, MessageSquareMore, ShieldAlert, BarChart3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../contexts/AppContext';
import { useNotifications } from '../contexts/NotificationContext';
import { sidebarSections } from '../constants/platformData';
import LanguageSwitcher from '../components/layout/LanguageSwitcher';

const MainLayout: React.FC = () => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === 'rtl';
    const location = useLocation();
    const navigate = useNavigate();
    const { userProfile, logout } = useApp();
    const { unreadCount } = useNotifications();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const teacherCommandLinks = useMemo(() => [
        { label: t('teacher.nav.dashboard'), path: '/teacher/dashboard', icon: BrainCircuit },
        { label: t('teacher.nav.students'), path: '/teacher/students', icon: Users },
        { label: t('teacher.nav.smartSessions', 'Smart Sessions'), path: '/teacher/session/sara-1/brief', icon: GraduationCap },
        { label: t('teacher.nav.plans'), path: '/teacher/ai-plans', icon: ClipboardList },
        { label: t('teacher.nav.homework'), path: '/teacher/homework', icon: BookOpen },
        { label: t('teacher.nav.reports', 'Reports'), path: '/teacher/session/sara-1/summary', icon: FileText },
        { label: t('teacher.nav.messages'), path: '/teacher/parent-messages', icon: MessageSquareMore },
        { label: t('teacher.nav.riskAlerts', 'Risk Alerts'), path: '/teacher/risk-alerts', icon: ShieldAlert },
        { label: t('teacher.nav.analytics'), path: '/teacher/class-analytics', icon: BarChart3 },
    ], [t]);

    const section = useMemo(() => {
        if (location.pathname.startsWith('/parent')) return 'parent';
        if (location.pathname.startsWith('/student')) return 'student';
        if (location.pathname.startsWith('/teacher')) return 'teacher';
        return 'student';
    }, [location.pathname]);

    const sectionConfig = {
        parent: {
            title: t('nav.parentPortal', 'Parent Portal'),
            subtitle: t('nav.parentSubtitle', 'Reports, progress, and subscription'),
            icon: Users,
            links: sidebarSections.parent.map((item) => ({ ...item, icon: Users })),
            logoClass: 'from-sky-600 to-blue-700',
            shellClass: 'bg-slate-50',
            sidebarClass: 'bg-white/70',
            activeItemClass: 'bg-sky-50 text-sky-700 shadow-sm border border-sky-100',
            activeIconClass: 'text-sky-500',
            activeDotClass: 'bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.45)]',
            headerClass: 'bg-white/85',
            searchFocusClass: 'focus:border-sky-200 focus:bg-white focus:ring-4 focus:ring-sky-50',
        },
        student: {
            title: t('nav.studentPlatform', 'Learning Platform'),
            subtitle: t('nav.studentSubtitle', 'Daily practice and live sessions'),
            icon: Sparkles,
            links: sidebarSections.student.map((item) => ({ ...item, icon: Sparkles })),
            logoClass: 'from-orange-500 to-amber-500',
            shellClass: 'bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.12),_transparent_30%),linear-gradient(to_bottom,_#fff7ed,_#f8fafc)]',
            sidebarClass: 'bg-white/80',
            activeItemClass: 'bg-orange-50 text-orange-700 shadow-sm border border-orange-100',
            activeIconClass: 'text-orange-500',
            activeDotClass: 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]',
            headerClass: 'bg-white/80',
            searchFocusClass: 'focus:border-orange-200 focus:bg-white focus:ring-4 focus:ring-orange-50',
        },
        teacher: {
            title: t('nav.teacherCenter', 'Teacher AI Command Center'),
            subtitle: t('nav.teacherSubtitle', 'Smart command center to reduce load and speed up decisions'),
            icon: GraduationCap,
            links: teacherCommandLinks,
            logoClass: 'from-indigo-700 to-slate-800',
            shellClass: 'bg-[linear-gradient(to_bottom,_#eef2ff,_#f8fafc_18rem)]',
            sidebarClass: 'bg-slate-950',
            activeItemClass: 'bg-indigo-500/15 text-indigo-100 shadow-sm border border-indigo-400/20',
            activeIconClass: 'text-indigo-300',
            activeDotClass: 'bg-indigo-300 shadow-[0_0_8px_rgba(165,180,252,0.6)]',
            headerClass: 'bg-white/90',
            searchFocusClass: 'focus:border-indigo-200 focus:bg-white focus:ring-4 focus:ring-indigo-50',
        },
    }[section];

    const isTeacher = section === 'teacher';
    const profilePath = isTeacher ? '/teacher/dashboard' : section === 'parent' ? '/parent/dashboard' : '/student/dashboard';

    const Sidebar = () => (
        <div className={`flex h-full flex-col backdrop-blur-xl ${sectionConfig.sidebarClass}`}>
            <div className="p-8">
                <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${sectionConfig.logoClass} text-xl font-bold text-white shadow-lg`}>R</div>
                    <div>
                        <div className={`text-xl font-black tracking-tight font-outfit ${isTeacher ? 'text-white' : 'text-slate-900'}`}>Readmint</div>
                        <div className={`text-[10px] font-bold tracking-widest ${isTeacher ? 'text-slate-300' : 'text-slate-500'}`}>{sectionConfig.title}</div>
                    </div>
                </div>
            </div>

            <nav className="flex-1 space-y-1.5 px-4 overflow-y-auto">
                <Link
                    to="/home"
                    onClick={() => setIsSidebarOpen(false)}
                    className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-bold transition-all ${location.pathname === '/home' ? isTeacher ? 'bg-white/10 text-white shadow-lg' : 'bg-slate-900 text-white shadow-lg shadow-slate-200' : isTeacher ? 'text-slate-300 hover:bg-white/5 hover:text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                >
                    <div className="flex items-center gap-3">
                        <Home size={20} className={location.pathname === '/home' ? isTeacher ? 'text-indigo-300' : 'text-orange-400' : isTeacher ? 'text-slate-400 group-hover:text-white' : 'text-slate-400 group-hover:text-slate-900'} />
                        {t('nav.home', 'Home')}
                    </div>
                    {location.pathname === '/home' && <ChevronRight size={16} className={`${isRtl ? 'rotate-180' : ''} text-white/50`} />}
                </Link>

                <div className="my-6 px-4">
                    <div className="mb-4 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">{isTeacher ? t('nav.teacherPanel', 'Teacher Panel') : t('nav.mainMenu', 'Main Menu')}</div>
                    <div className="space-y-1.5">
                        {sectionConfig.links.map((item) => {
                            const Icon = 'icon' in item && item.icon ? item.icon : sectionConfig.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-bold transition-all ${isActive ? sectionConfig.activeItemClass : isTeacher ? 'text-slate-300 hover:bg-white/5 hover:text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon size={18} className={isActive ? sectionConfig.activeIconClass : isTeacher ? 'text-slate-400 group-hover:text-white' : 'text-slate-400 group-hover:text-slate-900'} />
                                        {item.label}
                                    </div>
                                    {isActive && <div className={`h-1.5 w-1.5 rounded-full ${sectionConfig.activeDotClass}`} />}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="px-4">
                    <div className="mb-4 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">{t('nav.resources', 'Resources')}</div>
                    <div className="space-y-1.5">
                        <Link to="/pricing" onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all ${isTeacher ? 'text-slate-300 hover:bg-white/5 hover:text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                            <BookOpen size={18} className="text-slate-400" />
                            {t('nav.pricing', 'Pricing')}
                        </Link>
                        <Link to="/placement-test" onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all ${isTeacher ? 'text-slate-300 hover:bg-white/5 hover:text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                            <Mic2 size={18} className="text-slate-400" />
                            {t('nav.placementTest', 'Placement Test')}
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="p-4">
                <div className={`rounded-3xl p-4 shadow-sm ${isTeacher ? 'border border-white/10 bg-white/5' : 'border border-slate-100 bg-white'}`}>
                    <div className="mb-4 flex items-center gap-3">
                        <div className="relative">
                            <img src={userProfile?.avatarUrl || `https://ui-avatars.com/api/?name=${userProfile?.name || 'User'}&background=random`} alt={userProfile?.name} className="h-11 w-11 rounded-2xl object-cover shadow-sm" />
                            <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
                        </div>
                        <div className="min-w-0">
                            <div className={`truncate text-sm font-black ${isTeacher ? 'text-white' : 'text-slate-900'}`}>{userProfile?.name || t('common.student', 'Student')}</div>
                            <div className={`text-[10px] font-bold tracking-widest ${isTeacher ? 'text-slate-300' : 'text-slate-500'}`}>{isTeacher ? t('common.teacher', 'Teacher') : `${t('common.grade', 'Grade')} ${userProfile?.grade || 'N/A'}`}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <Link to={profilePath} className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-black transition-all ${isTeacher ? 'bg-white/10 text-white hover:bg-white/15' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                            <Settings size={14} />
                            {t('nav.profile', 'Profile')}
                        </Link>
                        <button
                            onClick={() => {
                                logout();
                                navigate('/login');
                            }}
                            className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-black transition-all ${isTeacher ? 'bg-red-500/10 text-red-200 hover:bg-red-500/20' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
                        >
                            <LogOut size={14} />
                            {t('nav.logout', 'Logout')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className={`flex h-screen font-outfit ${sectionConfig.shellClass}`} dir={i18n.dir()}>
            <aside className={`hidden w-80 border-r lg:block ${isTeacher ? 'border-slate-900 bg-slate-950' : 'border-slate-200/60 bg-white'}`}>
                <Sidebar />
            </aside>

            {isSidebarOpen && <div className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden" onClick={() => setIsSidebarOpen(false)} />}

            <aside className={`fixed ${isRtl ? 'right-0' : 'left-0'} top-0 z-50 h-full w-80 border-r shadow-2xl transition-transform duration-300 lg:hidden ${isTeacher ? 'border-slate-900 bg-slate-950' : 'border-slate-200/60 bg-white'} ${isSidebarOpen ? 'translate-x-0' : isRtl ? 'translate-x-full' : '-translate-x-full'}`}>
                <Sidebar />
            </aside>

            <div className="flex flex-1 flex-col overflow-hidden">
                <header className={`sticky top-0 z-30 border-b border-slate-200/60 px-6 py-4 backdrop-blur-xl ${sectionConfig.headerClass}`}>
                    <div className="mx-auto flex max-w-7xl items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setIsSidebarOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600 transition-all hover:bg-slate-100 lg:hidden">
                                <Menu size={20} />
                            </button>
                            <div className="hidden sm:block">
                                <h1 className="text-xl font-black tracking-tight text-slate-900">{sectionConfig.title}</h1>
                                <p className="text-xs font-bold text-slate-400">{sectionConfig.subtitle}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden lg:block">
                                <LanguageSwitcher />
                            </div>

                            <div className="relative hidden md:block">
                                <Search className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-slate-400`} size={16} />
                                <input
                                    type="text"
                                    placeholder={isTeacher ? t('nav.searchTeacher', 'Search students, alerts or plans...') : t('nav.searchStudent', 'Search curriculum...')}
                                    className={`h-11 w-72 rounded-2xl border border-slate-100 bg-slate-50 ${isRtl ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} text-sm font-medium transition-all outline-none ${sectionConfig.searchFocusClass}`}
                                />
                            </div>

                            <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-slate-600 transition-all hover:bg-slate-100">
                                <Bell size={18} />
                                {unreadCount > 0 && (
                                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-orange-500 px-1 text-[10px] font-black text-white shadow-sm">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto overflow-x-hidden animate-fade-in">
                    <div className="mx-auto max-w-7xl p-6 lg:p-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
