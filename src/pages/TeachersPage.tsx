import React, { useMemo, useState } from 'react';
import { Award, Flag, Search, ShieldCheck, Sparkles, Star, Users, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface TeacherCard {
    id: number;
    name: string;
    origin: string;
    accent: string;
    specialty: string;
    experience: string;
    rating: number;
    reviewCount: number;
    bio: string;
    tags: string[];
    image: string;
    available: boolean;
    filter: string;
}

const TeachersPage: React.FC = () => {
    const { t } = useTranslation();
    const [filter, setFilter] = useState('All');
    const teachers = t('pages.teachers.teachers', { returnObjects: true }) as TeacherCard[];
    const filters = t('pages.teachers.filters', { returnObjects: true }) as string[];
    const qualityItems = t('pages.teachers.qualityItems', { returnObjects: true }) as Array<{ title: string; desc: string }>;

    const visibleTeachers = useMemo(() => {
        if (filter === 'All') return teachers;
        return teachers.filter((teacher) => teacher.filter === filter);
    }, [filter, teachers]);

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900" dir="rtl">
            <header className="relative overflow-hidden bg-indigo-600 px-6 py-24 text-white">
                <div className="absolute inset-0">
                    <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-indigo-500 opacity-50 blur-[100px]" />
                    <div className="absolute bottom-0 right-0 h-full w-1/3 bg-gradient-to-l from-indigo-700/50 to-transparent" />
                </div>
                <div className="relative mx-auto max-w-5xl space-y-8 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black tracking-widest text-indigo-100">
                        <Users size={16} />
                        <span>{t('pages.teachers.heroBadge')}</span>
                    </div>
                    <h1 className="text-5xl font-black md:text-7xl">{t('pages.teachers.heroTitle')}</h1>
                    <p className="mx-auto max-w-2xl text-lg font-bold text-indigo-100">{t('pages.teachers.heroDescription')}</p>
                </div>
            </header>

            <section className="relative z-10 -mt-10 px-6">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 rounded-[2.5rem] border border-slate-100 bg-white p-4 shadow-2xl md:flex-row">
                    <div className="relative w-full flex-1">
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input type="text" placeholder={t('pages.teachers.searchPlaceholder')} className="w-full rounded-2xl bg-slate-50 py-4 pl-4 pr-12 font-bold text-slate-700 outline-none ring-indigo-500 transition-all focus:ring-2" />
                    </div>
                    <div className="flex w-full gap-2 rounded-2xl bg-slate-50 p-1 md:w-auto">
                        {filters.map((item) => (
                            <button key={item} onClick={() => setFilter(item)} className={`flex-1 rounded-xl px-6 py-3 text-sm font-black transition-all md:flex-none ${filter === item ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>
                                {item === 'All' ? t('pages.teachers.allFilterLabel') : item}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-8 md:grid-cols-2">
                        {visibleTeachers.map((teacher) => (
                            <div key={teacher.id} className="group relative flex flex-col gap-8 rounded-[3rem] border border-slate-100 bg-white p-8 transition-all hover:border-indigo-100 hover:shadow-premium md:flex-row">
                                <div className="relative shrink-0">
                                    <img src={teacher.image} alt={teacher.name} className="h-40 w-40 rounded-[2.5rem] object-cover shadow-lg grayscale transition-all duration-500 group-hover:grayscale-0" />
                                    {teacher.available && <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-2xl border-4 border-white bg-emerald-500 text-white"><Video size={18} /></div>}
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900">{teacher.name}</h3>
                                            <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                                                <Flag size={14} className="text-indigo-600" />
                                                {teacher.origin} • <span className="text-indigo-600">{teacher.accent}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 rounded-xl bg-amber-50 px-3 py-1 text-sm font-black text-amber-600">
                                            <Star size={14} fill="currentColor" />
                                            {teacher.rating}
                                        </div>
                                    </div>
                                    <p className="text-sm font-bold leading-relaxed text-slate-500">{teacher.bio}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {teacher.tags.map((tag) => <span key={tag} className="rounded-lg bg-slate-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500">{tag}</span>)}
                                    </div>
                                    <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                                        <div className="text-xs font-black text-slate-400">{t('pages.teachers.experience')}: <span className="text-slate-900">{teacher.experience}</span></div>
                                        <button className="rounded-xl bg-indigo-50 px-5 py-2.5 text-sm font-black text-indigo-600 transition-all hover:bg-indigo-600 hover:text-white">{t('pages.teachers.viewProfile')}</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
                <div className="relative z-10 mx-auto max-w-7xl px-6">
                    <div className="grid items-center gap-16 lg:grid-cols-2">
                        <div className="space-y-8">
                            <h2 className="text-4xl font-black md:text-6xl">{t('pages.teachers.qualityTitle')}</h2>
                            <p className="text-lg font-bold text-slate-400">{t('pages.teachers.qualityDescription')}</p>
                            <div className="space-y-6">
                                {[ShieldCheck, Award, Sparkles].map((Icon, index) => (
                                    <div key={qualityItems[index].title} className="flex gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-6">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500 text-white"><Icon size={24} /></div>
                                        <div>
                                            <div className="font-black text-white">{qualityItems[index].title}</div>
                                            <div className="text-sm font-bold text-white/50">{qualityItems[index].desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <div className="relative rounded-[4rem] bg-indigo-600 p-12 text-center space-y-8">
                                <Sparkles size={80} className="mx-auto text-indigo-200" />
                                <h3 className="text-3xl font-black">{t('pages.teachers.qualityCtaTitle')}</h3>
                                <p className="font-bold text-indigo-100">{t('pages.teachers.qualityCtaDescription')}</p>
                                <Link to="/placement-test" className="block w-full rounded-3xl bg-white py-6 text-xl font-black text-indigo-600 shadow-2xl transition-transform hover:scale-105">
                                    {t('pages.teachers.qualityCtaButton')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="border-t border-slate-100 py-12 text-center text-sm font-bold text-slate-400">© {new Date().getFullYear()} {t('footer.copyright')}</footer>
        </div>
    );
};

export default TeachersPage;
