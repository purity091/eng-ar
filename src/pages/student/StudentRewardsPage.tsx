import React from 'react';
import { useTranslation } from 'react-i18next';
import { Flame, Star, Award, Ghost, Medal, Sparkles, ChevronRight, Zap } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';
import { rewardBadges, todayMission } from '../../constants/platformData';

const StudentRewardsPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-10 pb-16 font-outfit">
            <SectionHeader
                eyebrow={t('appPages.student.rewards.eyebrow')}
                title={t('appPages.student.rewards.title')}
                description={t('appPages.student.rewards.description')}
            />

            <div className="grid gap-6 md:grid-cols-3">
                <div className="group relative overflow-hidden rounded-[2.5rem] border-2 border-amber-100 bg-amber-50 p-8 shadow-premium transition-all hover:-translate-y-2 hover:shadow-2xl">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-amber-500 shadow-sm transition-transform group-hover:rotate-6 group-hover:scale-110">
                        <Star className="fill-amber-500" size={32} />
                    </div>
                    <div className="mt-8 text-5xl font-black text-slate-900">{todayMission.stars}</div>
                    <div className="mt-1 text-sm font-bold tracking-widest text-amber-700">{t('appPages.student.rewards.stars')}</div>
                </div>

                <div className="group relative overflow-hidden rounded-[2.5rem] border-2 border-emerald-100 bg-emerald-50 p-8 shadow-premium transition-all hover:-translate-y-2 hover:shadow-2xl">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-emerald-500 shadow-sm transition-transform group-hover:rotate-6 group-hover:scale-110">
                        <Flame className="fill-emerald-500" size={32} />
                    </div>
                    <div className="mt-8 text-5xl font-black text-slate-900">{todayMission.streak}</div>
                    <div className="mt-1 text-sm font-bold tracking-widest text-emerald-700">{t('appPages.student.rewards.streak')}</div>
                </div>

                <div className="group relative overflow-hidden rounded-[2.5rem] border-2 border-indigo-100 bg-indigo-50 p-8 shadow-premium transition-all hover:-translate-y-2 hover:shadow-2xl">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-indigo-500 shadow-sm transition-transform group-hover:rotate-6 group-hover:scale-110">
                        <Ghost size={32} />
                    </div>
                    <div className="mt-8 text-5xl font-black text-slate-900">{t('appPages.student.rewards.level')}</div>
                    <div className="mt-1 text-sm font-bold tracking-widest text-indigo-700">{t('appPages.student.rewards.nextLevel')}</div>
                </div>
            </div>

            <div className="rounded-[3rem] border-2 border-slate-50 bg-white p-10 shadow-premium">
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <h3 className="text-3xl font-black text-slate-900">{t('appPages.student.rewards.galleryTitle')}</h3>
                        <p className="mt-1 text-sm font-medium text-slate-500">{t('appPages.student.rewards.galleryDescription')}</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
                        <Medal size={24} />
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {rewardBadges.map((badge) => (
                        <div key={badge} className="group relative flex flex-col items-center rounded-[2.5rem] border-2 border-slate-50 bg-slate-50/50 p-8 text-center transition-all hover:-translate-y-2 hover:border-orange-100 hover:bg-white hover:shadow-xl">
                            <div className="relative mb-6">
                                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg transition-transform group-hover:rotate-6 group-hover:scale-110">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-inner">
                                        <Award size={48} />
                                    </div>
                                </div>
                                <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-emerald-500 text-white shadow-lg">
                                    <Sparkles size={16} />
                                </div>
                            </div>
                            <h4 className="text-xl font-black text-slate-900">{badge}</h4>
                            <p className="mt-2 text-xs font-bold tracking-widest text-slate-400">{t('appPages.student.rewards.badgeUnlocked')}</p>
                            <div className="mt-6 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-300 transition-all group-hover:bg-slate-900 group-hover:text-white">
                                <ChevronRight size={16} />
                            </div>
                        </div>
                    ))}

                    <div className="flex flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-slate-50/30 p-8 grayscale opacity-50">
                        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100">
                            <Zap size={48} className="text-slate-300" />
                        </div>
                        <div className="text-xl font-black text-slate-400">{t('appPages.student.rewards.nextAchievement')}</div>
                        <div className="mt-2 text-[10px] font-black tracking-widest text-slate-300">{t('appPages.student.rewards.needStars')}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentRewardsPage;
