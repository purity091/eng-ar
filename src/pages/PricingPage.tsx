import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, GraduationCap, Layers3, ShieldCheck, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type GradeLevel = 'kg' | 'primary_lower' | 'primary_upper';

interface PricingPackage {
    id: string;
    name: string;
    subtitle: string;
    priceSemester: string;
    priceAnnual: string;
    entryLevel: string;
    targetLevel: string;
    highlight: boolean;
    outcomes: string[];
}

interface GradeLevelData {
    id: GradeLevel;
    title: string;
    packages: PricingPackage[];
}

const PricingPage: React.FC = () => {
    const { t } = useTranslation();
    const [isAnnual, setIsAnnual] = useState(false);
    const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('primary_lower');
    const gradeLevels = t('pages.pricing.gradeLevels', { returnObjects: true }) as GradeLevelData[];
    const pillars = t('pages.pricing.pillars', { returnObjects: true }) as Array<{ title: string; description: string }>;
    const parentItems = t('pages.pricing.parentView.items', { returnObjects: true }) as string[];
    const parentSkills = t('pages.pricing.parentView.skills', { returnObjects: true }) as string[];
    const currentData = gradeLevels.find((item) => item.id === selectedGrade) ?? gradeLevels[1];

    return (
        <div className="relative overflow-hidden bg-slate-50 text-slate-900">
            <div className="fixed inset-0 -z-10">
                <div className="absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-indigo-200/40 blur-[120px]" />
                <div className="absolute right-[-10%] top-[40%] h-[30%] w-[30%] rounded-full bg-rose-200/30 blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[20%] h-[40%] w-[40%] rounded-full bg-emerald-200/20 blur-[120px]" />
            </div>

            <main className="relative z-10 mx-auto w-full max-w-7xl space-y-20 px-6 py-16 lg:py-24">
                <section className="mx-auto max-w-3xl space-y-6 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100/50 px-4 py-2 text-xs font-black text-indigo-700 ring-1 ring-indigo-200/50 backdrop-blur-md">
                        <Star size={14} />
                        {t('pages.pricing.heroBadge')}
                    </div>
                    <h1 className="text-4xl font-black leading-[1.2] tracking-tight text-slate-950 md:text-6xl">{t('pages.pricing.heroTitle')}</h1>
                    <p className="text-lg font-bold leading-relaxed text-slate-500">{t('pages.pricing.heroDescription')}</p>

                    <div className="pt-8">
                        <div className="mx-auto inline-flex flex-wrap items-center justify-center gap-2 rounded-3xl bg-white p-2 shadow-lg ring-1 ring-slate-200/50 backdrop-blur-sm">
                            {gradeLevels.map((grade) => {
                                const isSelected = selectedGrade === grade.id;
                                return (
                                    <button key={grade.id} onClick={() => setSelectedGrade(grade.id)} className={`rounded-2xl px-6 py-4 text-sm font-black transition-all ${isSelected ? 'scale-105 bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                                        {grade.title}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex items-center justify-center pt-8">
                        <div className="flex items-center gap-2 rounded-2xl bg-slate-200/50 p-1.5 ring-1 ring-slate-200 backdrop-blur-sm">
                            <button onClick={() => setIsAnnual(false)} className={`rounded-xl px-6 py-2.5 text-sm font-black transition-all ${!isAnnual ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/50' : 'text-slate-500 hover:text-slate-700'}`}>
                                {t('pages.pricing.billing.term')}
                            </button>
                            <button onClick={() => setIsAnnual(true)} className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-black transition-all ${isAnnual ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}>
                                {t('pages.pricing.billing.annual')}
                                <span className={`rounded-md px-2 py-0.5 text-[10px] uppercase tracking-wider ${isAnnual ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'}`}>{t('pages.pricing.billing.save')}</span>
                            </button>
                        </div>
                    </div>
                </section>

                <section className={`mx-auto grid max-w-5xl gap-8 transition-all duration-500 ${currentData.packages.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}`}>
                    {currentData.packages.map((pkg) => {
                        const displayPrice = isAnnual ? pkg.priceAnnual : pkg.priceSemester;
                        const installmentAmount = (parseInt(displayPrice.replace(/,/g, ''), 10) / 4).toLocaleString('en-US', { maximumFractionDigits: 0 });
                        return (
                            <div key={pkg.id} className={`relative flex flex-col rounded-[2.5rem] bg-white p-8 transition-all duration-500 ${pkg.highlight ? 'ring-2 ring-indigo-600 shadow-[0_32px_64px_rgba(79,70,229,0.15)] lg:-translate-y-4' : 'ring-1 ring-slate-200 hover:ring-indigo-200 hover:shadow-xl'}`}>
                                {pkg.highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-6 py-2 text-xs font-black tracking-widest text-white shadow-lg whitespace-nowrap">{t('pages.pricing.mostRequested')}</div>}
                                <div className="mb-8">
                                    <h2 className="mb-1 text-3xl font-black text-slate-950">{pkg.subtitle}</h2>
                                    <p className="text-sm font-bold text-slate-500">{pkg.name}</p>
                                </div>
                                <div className="mb-8">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-black tracking-tighter text-slate-950">{displayPrice}</span>
                                        <span className="text-sm font-black text-slate-400">SAR</span>
                                    </div>
                                    <div className="mt-4 rounded-2xl border border-indigo-50 bg-slate-50/50 p-3">
                                        <span className="text-xs font-black text-slate-900">{t('pages.pricing.perMonth', { amount: installmentAmount })}</span>
                                        <div className="mt-1 text-[10px] font-bold text-slate-500">{t('pages.pricing.installments')}</div>
                                    </div>
                                </div>
                                <div className="mb-8 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-bold text-slate-500">{t('pages.pricing.entryLevel')}:</span>
                                        <span className="font-black text-indigo-700">{pkg.entryLevel}</span>
                                    </div>
                                    <div className="my-2 h-px w-full bg-indigo-100" />
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-bold text-slate-500">{t('pages.pricing.targetLevel')}:</span>
                                        <span className="font-black text-indigo-700">{pkg.targetLevel}</span>
                                    </div>
                                </div>
                                <ul className="mb-10 flex-1 space-y-4">
                                    {pkg.outcomes.map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"><CheckCircle2 size={14} /></div>
                                            <span className="text-sm font-bold leading-tight text-slate-600">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/placement-test" className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-black transition-all ${pkg.highlight ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100 active:scale-95' : 'bg-slate-100 text-slate-900 hover:bg-slate-200 active:scale-95'}`}>
                                    {t('pages.pricing.startTest')}
                                </Link>
                            </div>
                        );
                    })}
                </section>

                <section className="grid gap-6 border-t border-slate-200/50 pt-8 md:grid-cols-3">
                    {[Layers3, GraduationCap, ShieldCheck].map((Icon, index) => (
                        <div key={pillars[index].title} className="rounded-3xl p-6 text-center">
                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 ring-4 ring-white shadow-sm"><Icon size={24} /></div>
                            <h3 className="mb-2 text-lg font-black text-slate-900">{pillars[index].title}</h3>
                            <p className="text-sm font-bold leading-relaxed text-slate-500">{pillars[index].description}</p>
                        </div>
                    ))}
                </section>

                <section className="relative overflow-hidden rounded-[3rem] bg-slate-950 p-10 text-white shadow-2xl md:p-16">
                    <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-[100px]" />
                    <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-500/20 text-indigo-400"><Star size={32} /></div>
                            <h3 className="mb-4 text-3xl font-black md:text-4xl">{t('pages.pricing.parentView.title')}</h3>
                            <p className="mb-8 text-lg font-bold text-slate-400">{t('pages.pricing.parentView.description')}</p>
                            <ul className="space-y-5">
                                {parentItems.map((item) => (
                                    <li key={item} className="flex items-start gap-4">
                                        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/20 text-emerald-400"><CheckCircle2 size={14} /></div>
                                        <span className="text-base font-bold leading-relaxed text-slate-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 rotate-3 rounded-[2rem] bg-gradient-to-tr from-indigo-500 to-rose-500 opacity-50 blur-lg" />
                            <div className="relative rounded-[2rem] border border-slate-800 bg-slate-900 p-8 shadow-2xl">
                                <div className="mb-8 flex items-center justify-between border-b border-slate-800 pb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/20 font-black text-indigo-400">ع</div>
                                        <div>
                                            <div className="font-black text-white">{t('pages.pricing.parentView.student')}</div>
                                            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">{currentData.title}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-black text-emerald-400">92%</div>
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{t('pages.pricing.parentView.mastery')}</div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    {parentSkills.map((skill, index) => (
                                        <div key={skill} className="space-y-2">
                                            <div className="flex justify-between text-sm font-black text-slate-400">
                                                <span>{skill}</span>
                                                <span className="text-indigo-400">+{15 - index * 4}%</span>
                                            </div>
                                            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                                                <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400" style={{ width: `${85 - index * 10}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative overflow-hidden rounded-[3rem] border border-slate-200 bg-white p-10 text-center shadow-xl md:p-16">
                    <div className="absolute left-1/2 top-0 h-1 w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
                    <div className="relative z-10 mx-auto max-w-2xl space-y-8">
                        <h2 className="text-4xl font-black leading-tight text-slate-950 md:text-5xl">{t('pages.pricing.cta.title')}</h2>
                        <p className="text-lg font-bold leading-relaxed text-slate-500">{t('pages.pricing.cta.description')}</p>
                        <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
                            <Link to="/placement-test" className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-indigo-600 px-8 py-4 text-lg font-black text-white shadow-xl shadow-indigo-200 transition-all hover:scale-105 hover:bg-indigo-700 active:scale-95 sm:w-auto">
                                {t('pages.pricing.cta.primary')}
                                <ArrowLeft size={20} />
                            </Link>
                            <Link to="/contact" className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-slate-200 bg-white px-8 py-4 text-lg font-black text-slate-700 transition-all hover:border-indigo-200 hover:bg-slate-50 sm:w-auto">
                                {t('pages.pricing.cta.secondary')}
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default PricingPage;
