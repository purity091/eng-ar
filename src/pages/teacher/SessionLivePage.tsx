import React from 'react';
import { useTranslation } from 'react-i18next';
import { GraduationCap, Mic2, MonitorPlay, TimerReset, UserRound, Video, MicOff, ScreenShare, MoreVertical, LayoutGrid, BrainCircuit, Target, Sparkles, Wand2 } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';

const SessionLivePage: React.FC = () => {
    const { t } = useTranslation();

    const quickButtons = t('appPages.teacher.sessionLive.quickButtons', { returnObjects: true }) as Array<{ text: string; tone: string }>;
    const phases = t('appPages.teacher.sessionLive.phases', { returnObjects: true }) as Array<{ label: string; time: string; status: 'completed' | 'active' | 'pending' }>;

    return (
        <div className="space-y-10 pb-16 font-outfit">
            <SectionHeader
                eyebrow={t('appPages.teacher.sessionLive.eyebrow')}
                title={t('appPages.teacher.sessionLive.title')}
                description={t('appPages.teacher.sessionLive.description')}
            />

            <div className="grid gap-8 xl:grid-cols-[1.1fr,0.9fr]">
                <div className="space-y-6">
                    <div className="group relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-6 text-white shadow-xl shadow-slate-900/10">
                        <div className="pointer-events-none absolute right-0 top-0 h-full w-full bg-gradient-to-b from-white/5 to-transparent" />
                        <div className="relative z-10 grid gap-4 md:grid-cols-2">
                            <div className="group/view relative overflow-hidden rounded-[1.5rem] border border-slate-800 bg-slate-900/80 p-5 transition-colors hover:border-slate-700">
                                <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-lg bg-slate-950/50 px-3 py-1.5 text-xs font-black backdrop-blur-md">
                                    <Video size={14} className="text-indigo-400" /> {t('appPages.teacher.sessionLive.instructor')}
                                </div>
                                <div className="grid h-64 place-items-center rounded-[1.2rem] bg-slate-800/50 text-slate-700 transition-colors group-hover/view:bg-slate-800">
                                    <GraduationCap size={48} className="opacity-50" />
                                </div>
                            </div>
                            <div className="group/view relative overflow-hidden rounded-[1.5rem] border border-slate-800 bg-slate-900/80 p-5 transition-colors hover:border-slate-700">
                                <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-lg bg-slate-950/50 px-3 py-1.5 text-xs font-black backdrop-blur-md">
                                    <Mic2 size={14} className="text-emerald-400" /> {t('appPages.teacher.sessionLive.student')}
                                </div>
                                <div className="absolute right-4 top-4 z-20 flex items-center gap-1.5 rounded-lg bg-emerald-500/20 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-400 backdrop-blur-md">
                                    <Sparkles size={12} /> {t('appPages.teacher.sessionLive.highEngagement')}
                                </div>
                                <div className="grid h-64 place-items-center rounded-[1.2rem] bg-slate-800/50 text-slate-700 transition-colors group-hover/view:bg-slate-800">
                                    <UserRound size={48} className="opacity-50" />
                                </div>
                            </div>
                        </div>
                        <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-3 px-2">
                            <div className="flex items-center gap-3">
                                <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-slate-300 transition-colors hover:bg-rose-500 hover:text-white"><MicOff size={20} /></button>
                                <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-slate-300 transition-colors hover:bg-slate-700"><Video size={20} /></button>
                                <button className="flex h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white transition-colors hover:bg-indigo-700">
                                    <ScreenShare size={18} /> {t('appPages.teacher.sessionLive.shareScreen')}
                                </button>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-slate-300 transition-colors hover:bg-slate-700"><LayoutGrid size={20} /></button>
                                <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-slate-300 transition-colors hover:bg-slate-700"><MoreVertical size={20} /></button>
                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-indigo-50" />
                        <div className="relative z-10 mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-3 text-slate-900">
                                <div className="rounded-xl bg-indigo-100 p-2 text-indigo-600"><Target size={20} /></div>
                                <h3 className="text-xl font-black">{t('appPages.teacher.sessionLive.liveAssessment')}</h3>
                            </div>
                            <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-slate-400 transition-colors hover:text-indigo-600">
                                <Wand2 size={12} /> {t('appPages.teacher.sessionLive.editPrompts')}
                            </button>
                        </div>
                        <div className="relative z-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {quickButtons.map((item) => (
                                <button key={item.text} className={`group flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-bold transition-all ${
                                    item.tone === 'emerald' ? 'border-emerald-100 bg-emerald-50/50 text-emerald-700 hover:bg-emerald-100' :
                                    item.tone === 'amber' ? 'border-amber-100 bg-amber-50/50 text-amber-700 hover:bg-amber-100' :
                                    item.tone === 'rose' ? 'border-rose-100 bg-rose-50/50 text-rose-700 hover:bg-rose-100' :
                                    'border-indigo-100 bg-indigo-50/50 text-indigo-700 hover:bg-indigo-100'
                                }`}>
                                    {item.text}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="relative overflow-hidden rounded-[2.5rem] border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-8 text-center shadow-sm">
                        <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-100/50 px-4 py-2 text-sm font-black text-amber-700">
                            <TimerReset size={18} /> {t('appPages.teacher.sessionLive.sessionTimer')}
                        </div>
                        <div className="mb-2 text-6xl font-black tracking-tighter text-slate-900">12<span className="text-amber-500">:</span>32</div>
                        <div className="text-sm font-bold text-slate-500">{t('appPages.teacher.sessionLive.targetDuration')}</div>
                    </div>

                    <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="mb-6 flex items-center gap-3 text-slate-900">
                            <div className="rounded-xl bg-slate-100 p-2 text-slate-600"><MonitorPlay size={20} /></div>
                            <h3 className="text-xl font-black">{t('appPages.teacher.sessionLive.pacingGuide')}</h3>
                        </div>
                        <div className="space-y-4">
                            {phases.map((phase) => (
                                <div key={phase.label} className={`flex items-center justify-between rounded-2xl border px-5 py-4 ${
                                    phase.status === 'active' ? 'border-indigo-200 bg-indigo-50 shadow-sm' :
                                    phase.status === 'completed' ? 'border-slate-100 bg-slate-50/50 opacity-60' :
                                    'border-slate-100 bg-white'
                                }`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`h-2 w-2 rounded-full ${
                                            phase.status === 'active' ? 'animate-pulse bg-indigo-500' :
                                            phase.status === 'completed' ? 'bg-slate-400' : 'bg-slate-200'
                                        }`} />
                                        <span className={`text-sm font-bold ${phase.status === 'active' ? 'text-indigo-900' : 'text-slate-700'}`}>{phase.label}</span>
                                    </div>
                                    <span className={`text-xs font-black ${phase.status === 'active' ? 'text-indigo-600' : 'text-slate-400'}`}>{phase.time}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                            <BrainCircuit size={18} className="mt-0.5 shrink-0 text-slate-400" />
                            <p className="text-xs font-medium leading-relaxed text-slate-600">{t('appPages.teacher.sessionLive.aiSuggestionText')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionLivePage;
