import React from 'react';
import { BrainCircuit, BookOpen, CheckCircle2, Globe, Sparkles, Trophy, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const colorMap = {
    orange: 'text-orange-500',
    blue: 'text-blue-500',
    indigo: 'text-indigo-500',
} as const;

const toneMap = {
    sky: 'from-sky-500 to-blue-600',
    indigo: 'from-indigo-500 to-indigo-700',
    violet: 'from-violet-500 to-purple-700',
} as const;

const bgMap = {
    sky: 'bg-sky-50',
    indigo: 'bg-indigo-50',
    violet: 'bg-violet-50',
} as const;

const CurriculumPage: React.FC = () => {
    const { t } = useTranslation();
    const methodology = t('pages.curriculum.methodology', { returnObjects: true }) as Array<{ title: string; desc: string; color: keyof typeof colorMap }>;
    const levels = t('pages.curriculum.levels', { returnObjects: true }) as Array<{ id: string; name: string; alias: string; age: string; focus: string; desc: string; topics: string[]; tone: keyof typeof toneMap; bg: keyof typeof bgMap }>;
    const challenges = t('pages.curriculum.comparison.challenges', { returnObjects: true }) as string[];
    const solutions = t('pages.curriculum.comparison.solutions', { returnObjects: true }) as string[];

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900" dir="rtl">
            <header className="relative overflow-hidden bg-slate-950 px-6 py-24 text-white">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-indigo-500 blur-[120px]" />
                    <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-rose-500 blur-[120px]" />
                </div>
                <div className="relative mx-auto max-w-5xl space-y-8 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black tracking-widest text-indigo-300">
                        <BookOpen size={16} />
                        <span>{t('pages.curriculum.heroBadge')}</span>
                    </div>
                    <h1 className="text-5xl font-black leading-tight md:text-7xl">{t('pages.curriculum.heroTitle')}</h1>
                    <p className="mx-auto max-w-2xl text-lg font-bold text-slate-400">{t('pages.curriculum.heroDescription')}</p>
                </div>
            </header>

            <section className="px-6 py-32">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-20 text-center">
                        <h2 className="text-4xl font-black text-slate-900">{t('pages.curriculum.methodologyTitle')}</h2>
                        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-indigo-600" />
                    </div>
                    <div className="grid gap-12 lg:grid-cols-3">
                        {methodology.map((item, index) => {
                            const Icon = [Trophy, Globe, BrainCircuit][index];
                            return (
                                <div key={item.title} className="group relative rounded-[3rem] border border-slate-100 bg-white p-10 shadow-premium transition-all hover:-translate-y-2 hover:shadow-2xl">
                                    <div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 ${colorMap[item.color]} shadow-inner transition-transform group-hover:scale-110`}>
                                        <Icon size={32} />
                                    </div>
                                    <h3 className="mb-4 text-2xl font-black text-slate-900">{item.title}</h3>
                                    <p className="text-lg font-bold leading-relaxed text-slate-500">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-slate-50/50 px-6 py-32">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-20 space-y-4">
                        <div className="inline-block rounded-full bg-indigo-100 px-4 py-1 text-xs font-black text-indigo-600">{t('pages.curriculum.levelsTitle')}</div>
                        <p className="text-xl font-bold text-slate-500">{t('pages.curriculum.levelsSubtitle')}</p>
                    </div>
                    <div className="space-y-12">
                        {levels.map((level, idx) => (
                            <div key={level.id} className="group relative overflow-hidden rounded-[3.5rem] border border-white bg-white p-10 shadow-premium">
                                <div className={`absolute right-0 top-0 h-full w-4 bg-gradient-to-b ${toneMap[level.tone]}`} />
                                <div className="grid items-center gap-12 lg:grid-cols-[1fr,1.5fr]">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-xl ${toneMap[level.tone]}`}>
                                                <span className="text-2xl font-black">0{idx + 1}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-slate-900">{level.name}</h3>
                                                <div className="text-sm font-black uppercase tracking-widest text-indigo-600">{level.alias}</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-4">
                                            <div className="rounded-2xl bg-slate-50 px-4 py-2 text-sm font-bold text-slate-600">{level.age}</div>
                                            <div className="rounded-2xl bg-indigo-50 px-4 py-2 text-sm font-black text-indigo-600">{level.focus}</div>
                                        </div>
                                        <p className="text-lg font-bold leading-relaxed text-slate-500">{level.desc}</p>
                                    </div>
                                    <div className={`rounded-[2.5rem] p-8 lg:p-12 ${bgMap[level.bg]}`}>
                                        <h4 className="mb-6 flex items-center gap-3 text-xl font-black text-slate-900">
                                            <Zap className="text-amber-500" />
                                            {t('pages.curriculum.levelsTitle')}
                                        </h4>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {level.topics.map((topic) => (
                                                <div key={topic} className="flex items-center gap-3 rounded-2xl bg-white p-5 shadow-sm transition-transform hover:scale-105">
                                                    <CheckCircle2 className="text-emerald-500" size={20} />
                                                    <span className="font-bold text-slate-700">{topic}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-32">
                <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[4rem] bg-slate-950 p-12 text-white lg:p-20">
                    <div className="absolute right-0 top-0 p-8 opacity-10"><BrainCircuit size={150} /></div>
                    <div className="relative z-10 space-y-12">
                        <div className="space-y-4 text-center">
                            <h2 className="text-3xl font-black md:text-5xl">{t('pages.curriculum.comparison.title')}</h2>
                            <p className="text-lg font-bold text-slate-400">{t('pages.curriculum.comparison.subtitle')}</p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2">
                            <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8">
                                <h3 className="text-xl font-black text-rose-400">{t('pages.curriculum.comparison.challengesTitle')}</h3>
                                <ul className="space-y-4 text-sm font-bold text-white/60">
                                    {challenges.map((item) => (
                                        <li key={item} className="flex items-start gap-3"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-400" />{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-6 rounded-3xl border border-indigo-500/30 bg-indigo-600/20 p-8">
                                <h3 className="text-xl font-black text-emerald-400">{t('pages.curriculum.comparison.solutionsTitle')}</h3>
                                <ul className="space-y-4 text-sm font-bold text-white/90">
                                    {solutions.map((item) => (
                                        <li key={item} className="flex items-start gap-3"><CheckCircle2 className="shrink-0 text-emerald-400" size={18} />{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-12 px-6 py-32 text-center">
                <h2 className="text-4xl font-black text-slate-900 md:text-6xl">{t('pages.curriculum.cta.title')}</h2>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link to="/placement-test" className="rounded-[2.5rem] bg-indigo-600 px-12 py-6 text-xl font-black text-white shadow-2xl transition-all hover:scale-105 active:scale-95">{t('pages.curriculum.cta.primary')}</Link>
                    <Link to="/pricing" className="rounded-[2.5rem] border-2 border-slate-200 bg-white px-12 py-6 text-xl font-black text-slate-700 transition-all hover:border-indigo-200">{t('pages.curriculum.cta.secondary')}</Link>
                </div>
            </section>

            <footer className="border-t border-slate-100 py-12 text-center text-sm font-bold text-slate-400">© {new Date().getFullYear()} {t('footer.copyright')}</footer>
        </div>
    );
};

export default CurriculumPage;
