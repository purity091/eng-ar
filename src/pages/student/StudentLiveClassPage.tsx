import React from 'react';
import { useTranslation } from 'react-i18next';
import { GraduationCap, Mic2, MonitorUp, TimerReset, UserRound, Video } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';
import { dailyChoices, liveClassPhases } from '../../constants/platformData';

const StudentLiveClassPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-8 pb-16">
            <SectionHeader
                eyebrow={t('appPages.student.liveClass.eyebrow')}
                title={t('appPages.student.liveClass.title')}
                description={t('appPages.student.liveClass.description')}
            />

            <div className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
                <div className="space-y-6">
                    <div className="rounded-[2rem] border border-slate-200 bg-slate-900 p-6 text-white shadow-sm">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-[1.5rem] bg-white/10 p-6">
                                <div className="mb-3 flex items-center gap-2"><Video size={18} /> {t('appPages.student.liveClass.teacher')}</div>
                                <div className="grid h-44 place-items-center rounded-[1.25rem] bg-white/10 text-sky-200"><GraduationCap size={56} /></div>
                            </div>
                            <div className="rounded-[1.5rem] bg-white/10 p-6">
                                <div className="mb-3 flex items-center gap-2"><Mic2 size={18} /> {t('appPages.student.liveClass.student')}</div>
                                <div className="grid h-44 place-items-center rounded-[1.25rem] bg-white/10 text-emerald-200"><UserRound size={56} /></div>
                            </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-3">
                            <button className="rounded-2xl bg-white/10 px-4 py-3 font-bold">{t('appPages.student.liveClass.mute')}</button>
                            <button className="rounded-2xl bg-white/10 px-4 py-3 font-bold">{t('appPages.student.liveClass.camera')}</button>
                            <button className="rounded-2xl bg-white/10 px-4 py-3 font-bold">{t('appPages.student.liveClass.shareScreen')}</button>
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                        <h3 className="text-2xl font-bold text-slate-900">{t('appPages.student.liveClass.lessonCards')}</h3>
                        <div className="mt-5 grid gap-4 md:grid-cols-4">
                            {dailyChoices.map((choice) => (
                                <div key={choice.id} className="rounded-[1.5rem] bg-slate-50 p-5 text-center">
                                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white text-indigo-600">
                                        <choice.icon size={34} />
                                    </div>
                                    <div className="mt-3 text-lg font-bold text-slate-900">{choice.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center gap-2 text-slate-900">
                            <TimerReset size={18} />
                            <h3 className="text-xl font-bold">{t('appPages.student.liveClass.timer')}</h3>
                        </div>
                        <div className="text-5xl font-bold text-orange-500">18:45</div>
                        <div className="mt-2 text-slate-500">{t('appPages.student.liveClass.currentActivity')}</div>
                    </div>

                    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center gap-2 text-slate-900">
                            <MonitorUp size={18} />
                            <h3 className="text-xl font-bold">{t('appPages.student.liveClass.phases')}</h3>
                        </div>
                        <div className="space-y-3">
                            {liveClassPhases.map((phase) => (
                                <div key={phase.label} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                                    <span className="font-bold text-slate-800">{phase.label}</span>
                                    <span className="text-slate-500">{phase.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentLiveClassPage;
