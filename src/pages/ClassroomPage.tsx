import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Video,
    VideoOff,
    Mic,
    MicOff,
    MessageCircle,
    Hand,
    Star,
    X,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    Smile,
    Flag,
    Volume2,
    Users
} from 'lucide-react';

const ClassroomPage: React.FC = () => {
    const { t } = useTranslation();
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [stars] = useState(12);

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-slate-950 font-sans text-white" dir="rtl">
            <header className="flex h-20 shrink-0 items-center justify-between border-b border-white/5 bg-slate-900 px-8">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-lg">
                            <Sparkles size={20} />
                        </div>
                        <div>
                            <div className="text-sm font-black">{t('appPages.classroom.level')}</div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400">{t('appPages.classroom.topic')}</div>
                        </div>
                    </div>
                    <div className="hidden h-8 w-[1px] bg-white/10 md:block" />
                    <div className="hidden items-center gap-3 text-emerald-400 md:flex">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        <span className="text-xs font-black">{t('appPages.classroom.connection')}</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 rounded-2xl border border-white/5 bg-white/5 px-4 py-2">
                        <Star size={16} fill="#F59E0B" className="text-amber-500" />
                        <span className="text-sm font-black">{t('appPages.classroom.stars', { count: stars })}</span>
                    </div>
                    <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/20 text-rose-500 transition-all hover:bg-rose-500 hover:text-white">
                        <X size={20} />
                    </button>
                </div>
            </header>

            <main className="flex min-h-0 flex-1 gap-4 p-4">
                <div className="relative flex flex-1 flex-col overflow-hidden rounded-[2.5rem] bg-white">
                    <div className="flex flex-1 flex-col items-center justify-center p-12 text-slate-900">
                        <div className="relative mb-12">
                            <div className="absolute -inset-10 rounded-full bg-indigo-100 opacity-50 blur-3xl" />
                            <div className="relative flex h-64 w-64 items-center justify-center rounded-[3rem] border-4 border-slate-100 bg-slate-50 text-8xl shadow-2xl">🏠</div>
                        </div>
                        <h2 className="mb-4 text-6xl font-black tracking-tight">House</h2>
                        <p className="text-2xl font-bold text-slate-400">"This is my <span className="text-indigo-600">house</span>."</p>
                    </div>

                    <div className="absolute left-8 top-8 flex flex-col gap-3">
                        <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-100 bg-white text-slate-600 shadow-xl transition-all hover:text-indigo-600">
                            <Volume2 size={24} />
                        </button>
                        <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-100 bg-white text-slate-600 shadow-xl transition-all hover:text-indigo-600">
                            <Smile size={24} />
                        </button>
                    </div>

                    <div className="flex h-20 shrink-0 items-center justify-between border-t border-slate-100 bg-slate-50 px-8">
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className={`h-2 w-8 rounded-full ${i === 1 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
                            ))}
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-400 shadow-md hover:text-indigo-600">
                                <ChevronRight size={20} />
                            </button>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">{t('appPages.classroom.slide', { current: 1, total: 12 })}</span>
                            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-400 shadow-md hover:text-indigo-600">
                                <ChevronLeft size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex w-[400px] shrink-0 flex-col gap-4">
                    <div className="group relative h-[300px] overflow-hidden rounded-[2.5rem] bg-slate-900">
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900/50 to-slate-900">
                            <div className="space-y-4 text-center">
                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
                                    <Users size={32} />
                                </div>
                                <div className="text-sm font-black">{t('appPages.classroom.teacher')}</div>
                            </div>
                        </div>
                        <div className="absolute bottom-6 right-6 flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/50 px-3 py-1.5 backdrop-blur-md">
                            <Flag size={14} className="text-indigo-400" />
                            <span className="text-[10px] font-black uppercase tracking-widest">{t('appPages.classroom.teacherLocation')}</span>
                        </div>
                    </div>

                    <div className="relative h-[200px] overflow-hidden rounded-[2.5rem] border-4 border-indigo-600 bg-slate-900 shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                            <div className="space-y-2 text-center">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400">
                                    <Star size={20} />
                                </div>
                                <div className="text-xs font-black">{t('appPages.classroom.you')}</div>
                            </div>
                        </div>
                        <div className="absolute left-4 top-4 flex h-6 w-12 items-center justify-center rounded-lg bg-emerald-500 text-[10px] font-black">
                            {t('appPages.classroom.live')}
                        </div>
                    </div>

                    <div className="flex min-h-0 flex-1 flex-col rounded-[2.5rem] border border-white/5 bg-white/5 p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-white/40">
                                <MessageCircle size={16} />
                                {t('appPages.classroom.chatTitle')}
                            </h3>
                            <button className="text-xs font-bold text-indigo-400 hover:underline">{t('appPages.classroom.viewAll')}</button>
                        </div>
                        <div className="mb-4 flex-1 space-y-4 overflow-y-auto">
                            <div className="space-y-1">
                                <div className="text-[10px] font-black text-indigo-400">Teacher Emma</div>
                                <div className="inline-block rounded-2xl bg-white/10 p-3 text-xs font-medium">{t('appPages.classroom.teacherMessage')} 🌟</div>
                            </div>
                            <div className="py-2 text-center">
                                <div className="inline-block rounded-full bg-emerald-500/20 px-4 py-1.5 text-[10px] font-black text-emerald-400">
                                    {t('appPages.classroom.starMessage')}
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder={t('appPages.classroom.chatPlaceholder')}
                                className="w-full rounded-2xl border border-white/5 bg-white/10 px-4 py-3 text-xs font-bold outline-none transition-all focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </div>
            </main>

            <footer className="flex h-24 shrink-0 items-center justify-between border-t border-white/5 bg-slate-900 px-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-all ${isMuted ? 'bg-rose-500 text-white' : 'bg-white/5 text-white hover:bg-white/10'}`}
                    >
                        {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                    </button>
                    <button
                        onClick={() => setIsVideoOff(!isVideoOff)}
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-all ${isVideoOff ? 'bg-rose-500 text-white' : 'bg-white/5 text-white hover:bg-white/10'}`}
                    >
                        {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-3 rounded-[2rem] bg-indigo-600 px-8 py-4 font-black shadow-xl shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95">
                        <Hand size={20} />
                        {t('appPages.classroom.raiseHand')}
                    </button>
                    <button className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-white transition-all hover:bg-white/10">
                        <Smile size={24} />
                    </button>
                </div>

                <div className="hidden items-center gap-6 lg:flex">
                    <div className="text-left">
                        <div className="text-[10px] font-black uppercase text-white/40">{t('appPages.classroom.remainingTime')}</div>
                        <div className="text-xl font-black text-white">12:45</div>
                    </div>
                    <div className="h-12 w-[1px] bg-white/10" />
                    <button className="text-sm font-black text-rose-500">{t('appPages.classroom.endSession')}</button>
                </div>
            </footer>
        </div>
    );
};

export default ClassroomPage;
