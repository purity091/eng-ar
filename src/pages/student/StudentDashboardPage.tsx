import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Clock3, Rocket, Star, Target } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';

const StudentDashboardPage: React.FC = () => {
    const { t } = useTranslation();

    const skillMeters = [
        { label: 'Vocabulary', value: 82, tone: 'bg-emerald-500' },
        { label: 'Pronunciation', value: 61, tone: 'bg-orange-500' },
        { label: 'Listening', value: 70, tone: 'bg-sky-500' },
        { label: 'Conversation', value: 66, tone: 'bg-violet-500' },
    ];

    const checklist = [
        { title: 'Complete vocabulary mission', points: '+25', done: true },
        { title: 'Record voice practice', points: '+15', done: false },
        { title: 'Join live class at 5:00 PM', points: '+30', done: false },
    ];

    return (
        <div className="space-y-8 pb-16 font-outfit">
            <SectionHeader
                eyebrow={t('appPages.student.dashboard.eyebrow')}
                title={t('appPages.student.dashboard.title')}
                description={t('appPages.student.dashboard.description')}
            />

            <section className="rounded-[2.5rem] bg-gradient-to-br from-indigo-600 via-blue-600 to-emerald-600 p-8 text-white shadow-2xl">
                <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
                    <div className="space-y-5">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-black tracking-widest">
                            <Rocket size={14} /> Level 4
                        </div>
                        <h2 className="text-4xl font-black">Hi Layan!</h2>
                        <div>
                            <p className="mb-2 text-sm font-black uppercase tracking-wider text-white/80">{t('appPages.student.dashboard.missionProgress')}</p>
                            <div className="h-3 w-full rounded-full bg-white/20 p-0.5">
                                <div className="h-full w-[65%] rounded-full bg-orange-400" />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Link to="/student/daily-practice" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-slate-900">
                                {t('appPages.student.dashboard.startMission')} <ChevronRight size={16} />
                            </Link>
                            <Link to="/student/live-class" className="rounded-xl border border-white/30 px-5 py-3 text-sm font-black text-white">
                                {t('appPages.student.dashboard.liveClass')}
                            </Link>
                        </div>
                    </div>
                    <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
                        <div className="mb-3 flex items-center gap-2 text-sm font-black"><Star size={16} /> Rewards</div>
                        <div className="text-4xl font-black">1,200</div>
                        <div className="text-xs font-bold text-white/70">points</div>
                    </div>
                </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-5 text-xl font-black text-slate-900">{t('appPages.student.dashboard.strengths')}</h3>
                    <div className="space-y-3">
                        {skillMeters.map((meter) => (
                            <div key={meter.label}>
                                <div className="mb-1 flex items-center justify-between text-xs font-black text-slate-500">
                                    <span>{meter.label}</span>
                                    <span>{meter.value}%</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-slate-100">
                                    <div className={`h-full rounded-full ${meter.tone}`} style={{ width: `${meter.value}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center justify-between">
                        <h3 className="text-xl font-black text-slate-900">{t('appPages.student.dashboard.checklist')}</h3>
                        <Clock3 size={18} className="text-slate-400" />
                    </div>
                    <div className="space-y-3">
                        {checklist.map((task) => (
                            <div key={task.title} className={`flex items-center justify-between rounded-xl border p-3 ${task.done ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-slate-50'}`}>
                                <div>
                                    <p className="text-sm font-black text-slate-900">{task.title}</p>
                                    <p className="text-xs font-bold text-slate-500">{task.points}</p>
                                </div>
                                {task.done ? <CheckCircle2 className="text-emerald-500" size={18} /> : <Target className="text-slate-400" size={18} />}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StudentDashboardPage;
