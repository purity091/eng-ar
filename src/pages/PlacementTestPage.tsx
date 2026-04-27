import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpenCheck, CheckCircle2, Headphones, Languages, Mic2, Play, Sparkles, Timer, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface QuestionOption {
    id: string;
    label: string;
    correct: boolean;
}

interface PlacementQuestion {
    id: number;
    category: string;
    prompt: string;
    options: QuestionOption[];
}

interface ResultPlan {
    subtitle: string;
    targetLevel: string;
    weeklyLiveSessions: string;
    kpis: Array<{ label: string; target: string }>;
}

const PlacementTestPage: React.FC = () => {
    const { t } = useTranslation();
    const [step, setStep] = useState<'intro' | 'quiz' | 'result'>('intro');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    const questions = t('pages.placementTest.questions', { returnObjects: true }) as PlacementQuestion[];
    const introCards = t('pages.placementTest.introCards', { returnObjects: true }) as Array<{ label: string; value: string }>;
    const totalQuestions = questions.length;
    const scorePercent = Math.round((correctAnswers / totalQuestions) * 100);

    const level = useMemo(() => {
        if (scorePercent <= 40) return 'A0';
        if (scorePercent <= 75) return 'A1';
        return 'A2';
    }, [scorePercent]);

    const resultPlan = t(`pages.placementTest.results.${level}`, { returnObjects: true }) as ResultPlan;

    const handleSelectAnswer = (option: QuestionOption) => {
        if (option.correct) {
            setCorrectAnswers((prev) => prev + 1);
        }

        if (currentQuestion === totalQuestions - 1) {
            setStep('result');
            return;
        }

        setCurrentQuestion((prev) => prev + 1);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900" dir="rtl">
            <nav className="border-b border-slate-200 bg-white px-6 py-4">
                <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">R</div>
                        <span className="text-xl font-black">Readmint</span>
                    </Link>
                    <p className="text-sm font-bold text-slate-500">{t('pages.placementTest.navTitle')}</p>
                </div>
            </nav>

            <main className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-4xl items-center px-6 py-10">
                {step === 'intro' && (
                    <section className="w-full rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-10">
                        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-xs font-black text-indigo-700">
                            <Sparkles size={14} />
                            {t('pages.placementTest.introBadge')}
                        </div>
                        <h1 className="mt-5 text-3xl font-black leading-tight text-slate-950 md:text-5xl">{t('pages.placementTest.introTitle')}</h1>
                        <p className="mt-4 text-base font-semibold leading-7 text-slate-600">{t('pages.placementTest.introDescription')}</p>

                        <div className="mt-7 grid gap-4 md:grid-cols-3">
                            {introCards.map((card, index) => {
                                const Icon = [Timer, Languages, BookOpenCheck][index];
                                return (
                                    <article key={card.label} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                                        <Icon size={18} className="mb-2 text-indigo-600" />
                                        <p className="text-sm font-black text-slate-800">{card.label}</p>
                                        <p className="mt-1 text-sm font-semibold text-slate-600">{card.value}</p>
                                    </article>
                                );
                            })}
                        </div>

                        <button onClick={() => setStep('quiz')} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-black text-white hover:bg-indigo-700">
                            {t('pages.placementTest.start')}
                            <ArrowLeft size={16} />
                        </button>
                    </section>
                )}

                {step === 'quiz' && (
                    <section className="w-full rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-10">
                        <div className="mb-6">
                            <div className="mb-2 flex items-center justify-between text-xs font-black text-slate-500">
                                <span>{t('pages.placementTest.questionOf', { current: currentQuestion + 1, total: totalQuestions })}</span>
                                <span>{Math.round(((currentQuestion + 1) / totalQuestions) * 100)}%</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                                <div className="h-full rounded-full bg-indigo-600" style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }} />
                            </div>
                        </div>

                        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">
                            {questions[currentQuestion].category === questions[1].category ? <Headphones size={14} /> : <Mic2 size={14} />}
                            {questions[currentQuestion].category}
                        </div>

                        <h2 className="text-2xl font-black leading-9 text-slate-950">{questions[currentQuestion].prompt}</h2>

                        {questions[currentQuestion].category === questions[1].category && (
                            <button className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white">
                                <Play size={14} />
                                {t('pages.placementTest.playAudio')}
                            </button>
                        )}

                        <div className="mt-6 grid gap-3">
                            {questions[currentQuestion].options.map((option) => (
                                <button key={option.id} onClick={() => handleSelectAnswer(option)} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-right text-sm font-bold text-slate-800 ring-1 ring-slate-200 hover:bg-indigo-50 hover:ring-indigo-200">
                                    <span>{option.label}</span>
                                    <span className="h-5 w-5 rounded-full border-2 border-slate-300" />
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                {step === 'result' && (
                    <section className="w-full rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-10">
                        <div className="flex items-center gap-3 text-emerald-700">
                            <Trophy size={22} />
                            <p className="text-sm font-black">{t('pages.placementTest.resultBadge')}</p>
                        </div>

                        <h2 className="mt-4 text-3xl font-black text-slate-950">{t('pages.placementTest.resultTitle')}</h2>
                        <p className="mt-2 text-sm font-semibold text-slate-600">{t('pages.placementTest.resultDescription')}</p>

                        <div className="mt-6 grid gap-4 md:grid-cols-3">
                            <article className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                                <p className="text-xs font-black text-slate-500">{t('pages.placementTest.score')}</p>
                                <p className="mt-1 text-3xl font-black text-slate-950">{scorePercent}%</p>
                            </article>
                            <article className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                                <p className="text-xs font-black text-slate-500">{t('pages.placementTest.entryLevel')}</p>
                                <p className="mt-1 text-3xl font-black text-slate-950">{level}</p>
                            </article>
                            <article className="rounded-2xl bg-indigo-600 p-4 text-white">
                                <p className="text-xs font-black text-indigo-100">{t('pages.placementTest.recommendedPackage')}</p>
                                <p className="mt-1 text-xl font-black">{resultPlan.subtitle}</p>
                            </article>
                        </div>

                        <div className="mt-6 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                            <p className="text-sm font-black text-slate-900">{t('pages.placementTest.planTitle')}</p>
                            <p className="mt-2 text-sm font-semibold text-slate-700">{t('pages.placementTest.targetLevel')}: {resultPlan.targetLevel} | {resultPlan.weeklyLiveSessions}</p>
                            <ul className="mt-4 space-y-2">
                                {resultPlan.kpis.map((kpi) => (
                                    <li key={kpi.label} className="flex items-start gap-2 text-sm font-semibold text-slate-700">
                                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                                        <span>{kpi.label}: {kpi.target}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <Link to="/pricing" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-black text-white hover:bg-slate-800">
                                {t('pages.placementTest.comparePackages')}
                                <ArrowLeft size={16} />
                            </Link>
                            <Link to="/register" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white hover:bg-indigo-700">
                                {t('pages.placementTest.startSubscription')}
                                <ArrowLeft size={16} />
                            </Link>
                            <Link to="/parent/dashboard" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-700 hover:bg-slate-50">
                                {t('pages.placementTest.viewParentDashboard')}
                                <ArrowLeft size={16} />
                            </Link>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default PlacementTestPage;
