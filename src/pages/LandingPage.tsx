import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, CheckCircle2, Globe, Headphones, Heart, Mic2, PlayCircle, Sparkles, Star, Target, Trophy, Video, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/layout/LanguageSwitcher';

const toneMap = {
    indigo: 'bg-indigo-600',
    rose: 'bg-rose-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
} as const;

const iconMap = [Headphones, Zap, Globe, Trophy];
const resultIconMap = [Video, BarChart3, Target];

const LandingPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const featureItems = t('pages.landing.features.items', { returnObjects: true }) as Array<{ title: string; desc: string; tone: keyof typeof toneMap }>;
    const resultItems = t('pages.landing.results.items', { returnObjects: true }) as Array<{ title: string; desc: string }>;
    const plans = t('pages.landing.pricing.plans', { returnObjects: true }) as Array<{ name: string; price: string; duration: string; highlight: boolean; features: string[] }>;
    const logos = t('pages.landing.trusted.logos', { returnObjects: true }) as string[];
    const checks = t('pages.landing.features.checks', { returnObjects: true }) as string[];
    const skills = t('pages.landing.results.report.skills', { returnObjects: true }) as string[];

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900" dir={i18n.dir()}>
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -left-[10%] -top-[10%] h-[50%] w-[50%] rounded-full bg-indigo-50/50 blur-[120px]" />
                <div className="absolute -right-[10%] top-[20%] h-[40%] w-[40%] rounded-full bg-rose-50/40 blur-[100px]" />
                <div className="absolute bottom-0 left-[10%] h-[30%] w-[30%] rounded-full bg-emerald-50/30 blur-[80px]" />
            </div>

            <nav className="sticky top-0 z-50 w-full px-6 py-4">
                <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/40 bg-white/70 px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.05)] backdrop-blur-2xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white shadow-xl">
                                <Sparkles size={20} className="text-indigo-400" />
                            </div>
                            <div className="hidden sm:block">
                                <span className="text-xl font-black tracking-tight text-slate-950">Readmint</span>
                            </div>
                        </div>
                        <div className="hidden items-center gap-8 text-sm font-black text-slate-600 lg:flex">
                            <a href="#how" className="transition-all hover:text-indigo-600">{t('pages.landing.nav.how')}</a>
                            <Link to="/teachers" className="transition-all hover:text-indigo-600">{t('pages.landing.nav.teachers')}</Link>
                            <a href="#results" className="transition-all hover:text-indigo-600">{t('pages.landing.nav.results')}</a>
                            <Link to="/pricing" className="transition-all hover:text-indigo-600">{t('pages.landing.nav.plans')}</Link>
                        </div>
                        <div className="flex items-center gap-3">
                            <LanguageSwitcher />
                            <Link to="/join" className="hidden px-5 py-2.5 text-sm font-black text-slate-600 transition-all hover:text-slate-950 md:block">{t('pages.landing.nav.login')}</Link>
                            <Link to="/placement-test" className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-indigo-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-indigo-200 transition-all hover:scale-105 active:scale-95">
                                <span className="relative z-10 flex items-center gap-2">{t('pages.landing.nav.cta')} <ArrowRight size={16} /></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <section className="overflow-hidden px-6 py-12 lg:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-3 rounded-full border border-indigo-100 bg-indigo-50/50 px-4 py-2 text-sm font-black text-indigo-700 backdrop-blur-md">
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white">
                                    <Star size={10} fill="currentColor" />
                                </div>
                                <span>{t('pages.landing.hero.badge')}</span>
                            </div>
                            <div className="space-y-6">
                                <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-slate-950 md:text-6xl xl:text-7xl">
                                    {t('pages.landing.hero.titleBefore')} <span className="relative text-indigo-600">{t('pages.landing.hero.titleHighlight')}<span className="absolute bottom-2 left-0 h-3 w-full -z-10 bg-indigo-100" /></span> {t('pages.landing.hero.titleAfter')}
                                </h1>
                                <p className="max-w-xl text-lg font-bold leading-relaxed text-slate-500 md:text-xl">{t('pages.landing.hero.description')}</p>
                            </div>
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <Link to="/placement-test" className="flex items-center justify-center gap-3 rounded-2xl bg-indigo-600 px-8 py-4 text-lg font-black text-white shadow-xl shadow-indigo-200 transition-all hover:scale-105 hover:bg-indigo-700 active:scale-95">
                                    {t('pages.landing.hero.primaryCta')}
                                </Link>
                                <Link to="/teachers" className="group flex items-center justify-center gap-3 rounded-2xl border-2 border-slate-100 bg-white px-8 py-4 text-lg font-black text-slate-700 transition-all hover:border-indigo-200 hover:bg-indigo-50/30">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-600 transition-transform group-hover:scale-110">
                                        <PlayCircle size={20} fill="currentColor" className="text-rose-500" />
                                    </div>
                                    {t('pages.landing.hero.secondaryCta')}
                                </Link>
                            </div>
                            <div className="flex items-center gap-6 pt-4">
                                <div className="flex -space-x-3 space-x-reverse">
                                    {[1, 2, 3, 4, 5].map((i) => <div key={i} className="h-12 w-12 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-sm ring-1 ring-slate-100"><div className="h-full w-full bg-gradient-to-br from-indigo-100 to-indigo-200" /></div>)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="#F59E0B" className="text-amber-500" />)}
                                        <span className="mr-2 text-sm font-black text-slate-900">4.9/5</span>
                                    </div>
                                    <div className="text-xs font-bold text-slate-500">{t('pages.landing.hero.rating')}</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative mt-8 lg:mt-0">
                            <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-tr from-indigo-500/10 to-rose-500/10 blur-2xl" />
                            <div className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/20 p-3 shadow-2xl backdrop-blur-xl">
                                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-slate-950">
                                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-900/80 to-transparent p-6">
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md"><Mic2 size={20} className="text-white" /></div>
                                                <div>
                                                    <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400">{t('pages.landing.preview.teacherLabel')}</div>
                                                    <div className="text-xs font-bold text-white">{t('pages.landing.preview.teacherMeta')}</div>
                                                </div>
                                            </div>
                                            <div className="animate-pulse rounded-xl bg-rose-500 px-3 py-1.5 text-[10px] font-black text-white">{t('pages.landing.preview.liveNow')}</div>
                                        </div>
                                        <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
                                            <div className="mb-3 text-center text-base font-bold leading-relaxed text-white">{t('pages.landing.preview.sentence')}</div>
                                            <div className="flex gap-2">
                                                <div className="h-1.5 flex-1 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                                                <div className="h-1.5 flex-1 rounded-full bg-white/20" />
                                                <div className="h-1.5 flex-1 rounded-full bg-white/20" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute left-6 top-6 space-y-3">
                                        <div className="animate-float rounded-xl border border-white/10 bg-slate-900/80 p-3 shadow-2xl backdrop-blur-xl">
                                            <div className="mb-1 text-[9px] font-black uppercase text-white/40">{t('pages.landing.preview.pronunciation')}</div>
                                            <div className="text-lg font-black text-emerald-400">92%</div>
                                        </div>
                                        <div className="animate-float rounded-xl border border-white/10 bg-slate-900/80 p-3 shadow-2xl backdrop-blur-xl" style={{ animationDelay: '1s' }}>
                                            <div className="mb-1 text-[9px] font-black uppercase text-white/40">{t('pages.landing.preview.newWords')}</div>
                                            <div className="text-lg font-black text-indigo-400">+12</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-y border-slate-100 bg-slate-50/30 py-12">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <p className="mb-8 text-xs font-black uppercase tracking-[0.2em] text-slate-400">{t('pages.landing.trusted.title')}</p>
                    <div className="flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale transition-all hover:grayscale-0">
                        {logos.map((logo) => <span key={logo} className="text-xl font-black tracking-tighter text-slate-900">{logo}</span>)}
                    </div>
                </div>
            </section>

            <section id="how" className="relative overflow-hidden px-6 py-16 lg:py-24">
                <div className="absolute -right-10 top-10 h-72 w-72 rounded-full bg-indigo-50/50 blur-[80px]" />
                <div className="relative z-10 mx-auto max-w-7xl">
                    <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                        <div className="order-2 lg:order-1">
                            <div className="grid gap-5 sm:grid-cols-2">
                                {featureItems.map((feature, index) => {
                                    const FeatureIcon = iconMap[index];
                                    return (
                                        <div key={feature.title} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                                            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-white ${toneMap[feature.tone]} shadow-md`}>
                                                <FeatureIcon size={20} />
                                            </div>
                                            <h3 className="mb-2 text-lg font-black text-slate-900">{feature.title}</h3>
                                            <p className="text-sm font-bold leading-relaxed text-slate-500">{feature.desc}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="order-1 space-y-6 lg:order-2">
                            <div className="inline-block rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-black tracking-widest text-indigo-600">{t('pages.landing.features.badge')}</div>
                            <h2 className="text-3xl font-black leading-tight text-slate-900 md:text-5xl">{t('pages.landing.features.title')}</h2>
                            <p className="text-base font-bold leading-relaxed text-slate-500">{t('pages.landing.features.description')}</p>
                            <div className="flex flex-wrap items-center gap-5 pt-2">
                                {checks.map((check) => (
                                    <div key={check} className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600"><CheckCircle2 size={16} /></div>
                                        <span className="text-sm font-black text-slate-900">{check}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="results" className="relative px-6 py-16 lg:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                        <div className="space-y-6">
                            <div className="inline-block rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black uppercase tracking-widest text-emerald-600">{t('pages.landing.results.badge')}</div>
                            <h2 className="text-3xl font-black leading-tight text-slate-900 md:text-5xl">{t('pages.landing.results.title')}</h2>
                            <p className="text-base font-bold leading-relaxed text-slate-500">{t('pages.landing.results.description')}</p>
                            <div className="space-y-4 pt-4">
                                {resultItems.map((item, index) => {
                                    const ResultIcon = resultIconMap[index];
                                    return (
                                        <div key={item.title} className="flex gap-4 rounded-2xl border border-slate-100 p-4 transition-all hover:bg-slate-50 hover:shadow-sm">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm"><ResultIcon size={20} /></div>
                                            <div>
                                                <div className="mb-1 text-sm font-black text-slate-900">{item.title}</div>
                                                <div className="text-xs font-bold text-slate-500">{item.desc}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
                                <div className="absolute right-0 top-0 h-1.5 w-full bg-gradient-to-r from-indigo-500 to-rose-500" />
                                <div className="mb-8 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-slate-100" />
                                        <div>
                                            <div className="text-sm font-black text-slate-900">{t('pages.landing.results.report.student')}</div>
                                            <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">{t('pages.landing.results.report.level')}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-black text-indigo-600">84%</div>
                                        <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">{t('pages.landing.results.report.mastery')}</div>
                                    </div>
                                </div>
                                <div className="space-y-5">
                                    {skills.map((skill, index) => (
                                        <div key={skill} className="space-y-1.5">
                                            <div className="flex justify-between text-xs font-black text-slate-600">
                                                <span>{skill}</span>
                                                <span className="text-indigo-600">+{15 - index * 4}%</span>
                                            </div>
                                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                                                <div className="h-full rounded-full bg-indigo-500" style={{ width: `${80 - index * 10}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
                                    <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-indigo-600">
                                        <Sparkles size={12} />
                                        {t('pages.landing.results.report.recommendationTitle')}
                                    </div>
                                    <p className="text-xs font-bold italic leading-relaxed text-slate-700">{t('pages.landing.results.report.recommendationText')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="pricing" className="bg-slate-50/50 px-6 py-16 lg:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-16 space-y-3 text-center">
                        <div className="inline-block rounded-full bg-slate-900 px-3 py-1.5 text-xs font-black uppercase tracking-widest text-white">{t('pages.landing.pricing.badge')}</div>
                        <h2 className="text-3xl font-black text-slate-900 md:text-5xl">{t('pages.landing.pricing.title')}</h2>
                        <p className="mx-auto max-w-2xl text-base font-medium text-slate-500">{t('pages.landing.pricing.description')}</p>
                    </div>
                    <div className="grid gap-6 lg:grid-cols-3">
                        {plans.map((plan) => (
                            <div key={plan.name} className={`group relative flex flex-col rounded-3xl border-2 p-8 transition-all hover:-translate-y-1 ${plan.highlight ? 'border-indigo-600 bg-white shadow-xl' : 'border-slate-200 bg-white hover:border-indigo-200'}`}>
                                {plan.highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1.5 text-[10px] font-black tracking-widest text-white shadow-md">{t('pages.landing.pricing.popular')}</div>}
                                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-white shadow-md"><Trophy size={24} /></div>
                                <h3 className="mb-1 text-2xl font-black text-slate-900">{plan.name}</h3>
                                <div className="mb-6 flex items-baseline gap-1.5">
                                    <span className="text-xs font-black text-slate-400">SAR</span>
                                    <span className="text-4xl font-black tracking-tighter text-slate-950">{plan.price}</span>
                                    <span className="text-xs font-bold text-slate-400">/ {plan.duration}</span>
                                </div>
                                <ul className="mb-8 flex-1 space-y-3 font-bold text-slate-600">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-2.5">
                                            <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"><CheckCircle2 size={12} /></div>
                                            <span className="text-sm leading-tight">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/pricing" className={`w-full rounded-2xl py-3 text-center text-base font-black transition-all ${plan.highlight ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                                    {t('pages.landing.pricing.subscribe')}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-16 lg:py-24">
                <div className="mx-auto max-w-4xl">
                    <div className="relative overflow-hidden rounded-3xl bg-indigo-600 p-8 text-center text-white shadow-xl shadow-indigo-200 lg:p-16">
                        <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-br from-indigo-500/50 to-transparent opacity-50" />
                        <div className="relative z-10 space-y-6">
                            <h2 className="text-3xl font-black leading-tight md:text-5xl">{t('pages.landing.cta.title')}</h2>
                            <p className="mx-auto max-w-xl text-base font-bold text-indigo-100">{t('pages.landing.cta.description')}</p>
                            <div className="flex flex-col justify-center gap-3 pt-4 sm:flex-row sm:items-center">
                                <Link to="/placement-test" className="rounded-2xl bg-white px-8 py-4 text-base font-black text-indigo-600 shadow-lg transition-all hover:scale-105 active:scale-95">{t('pages.landing.cta.primary')}</Link>
                                <Link to="/join-team" className="rounded-2xl border-2 border-indigo-400 bg-transparent px-8 py-4 text-base font-black text-white transition-all hover:bg-indigo-500">{t('pages.landing.cta.secondary')}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="border-t border-slate-100 bg-white px-6 py-12">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-12 lg:grid-cols-[1.5fr,1fr,1fr]">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white shadow-md"><Sparkles size={20} className="text-indigo-400" /></div>
                                <span className="text-2xl font-black tracking-tight text-slate-950">Readmint</span>
                            </div>
                            <p className="max-w-sm text-sm font-bold leading-relaxed text-slate-500">{t('footer.description')}</p>
                            <div className="flex items-center gap-3">
                                {[1, 2, 3, 4].map((i) => <div key={i} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all hover:bg-indigo-50 hover:text-indigo-600"><Globe size={16} /></div>)}
                            </div>
                        </div>
                        <div className="col-span-2 grid grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="text-xs font-black uppercase tracking-[0.1em] text-slate-900">{t('footer.platform')}</h4>
                                <ul className="space-y-3 text-sm font-bold text-slate-500">
                                    <li><Link to="/curriculum" className="hover:text-indigo-600">{t('nav.curriculum')}</Link></li>
                                    <li><Link to="/teachers" className="hover:text-indigo-600">{t('nav.teachers')}</Link></li>
                                    <li><Link to="/curriculum" className="hover:text-indigo-600">{t('footer.methodology')}</Link></li>
                                    <li><Link to="/teachers" className="hover:text-indigo-600">{t('footer.successStories')}</Link></li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-xs font-black uppercase tracking-[0.1em] text-slate-900">{t('footer.support')}</h4>
                                <ul className="space-y-3 text-sm font-bold text-slate-500">
                                    <li><Link to="/contact" className="hover:text-indigo-600">{t('footer.helpCenter')}</Link></li>
                                    <li><Link to="/terms" className="hover:text-indigo-600">{t('nav.terms')}</Link></li>
                                    <li><Link to="/privacy" className="hover:text-indigo-600">{t('nav.privacy')}</Link></li>
                                    <li><Link to="/faq" className="hover:text-indigo-600">{t('nav.faq')}</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 text-xs font-black uppercase tracking-widest text-slate-400 md:flex-row">
                        <div>© {new Date().getFullYear()} {t('footer.copyright')}</div>
                        <div className="flex items-center gap-1.5">{t('footer.madeWith')} <Heart size={14} fill="#F43F5E" className="text-rose-500" /> {t('footer.forFuture')}</div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
