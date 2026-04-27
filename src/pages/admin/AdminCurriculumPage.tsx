import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, BookOpenCheck, Layers3, Rocket } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';
import { adminCurriculumTracks, adminReleaseQueue } from '../../constants/adminConsoleData';

const statusToneMap = {
    Active: 'bg-sky-50 text-sky-700 border-sky-100',
    Review: 'bg-amber-50 text-amber-700 border-amber-100',
    Published: 'bg-emerald-50 text-emerald-700 border-emerald-100',
} as const;

const queueToneMap: Record<string, string> = {
    'Ready for QA': 'bg-sky-50 text-sky-700 border-sky-100',
    'Awaiting Assets': 'bg-amber-50 text-amber-700 border-amber-100',
    'Publish Today': 'bg-emerald-50 text-emerald-700 border-emerald-100',
};

const AdminCurriculumPage: React.FC = () => {
    const { t } = useTranslation();

    const statusLabels: Record<string, string> = {
        Active: t('appPages.admin.curriculum.active'),
        Review: t('appPages.admin.curriculum.review'),
        Published: t('appPages.admin.curriculum.published'),
    };

    return (
        <div className="space-y-8">
            <SectionHeader
                eyebrow={t('appPages.admin.curriculum.eyebrow')}
                title={t('appPages.admin.curriculum.title')}
                description={t('appPages.admin.curriculum.description')}
            />

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-950">{t('appPages.admin.curriculum.libraryTitle')}</h2>
                        <p className="mt-2 text-sm leading-7 text-slate-500">{t('appPages.admin.curriculum.libraryDesc')}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white">40 active units</div>
                </div>

                <div className="mt-6 grid gap-5 xl:grid-cols-3">
                    {adminCurriculumTracks.map((track) => (
                        <article key={track.id} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <div className="text-sm font-black text-sky-700">{track.level}</div>
                                    <h3 className="mt-1 text-xl font-black text-slate-950">{track.title}</h3>
                                </div>
                                <span className={`rounded-full border px-3 py-1 text-xs font-black ${statusToneMap[track.status as keyof typeof statusToneMap]}`}>
                                    {statusLabels[track.status]}
                                </span>
                            </div>

                            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-black text-slate-900">
                                {track.sentence}
                            </div>

                            <div className="mt-4 grid gap-3 md:grid-cols-2">
                                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                    <div className="text-xs font-black uppercase tracking-wider text-slate-500">{t('appPages.admin.curriculum.owner')}</div>
                                    <div className="mt-2 text-sm font-bold text-slate-900">{track.owner}</div>
                                </div>
                                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                    <div className="text-xs font-black uppercase tracking-wider text-slate-500">{t('appPages.admin.curriculum.coverage')}</div>
                                    <div className="mt-2 text-sm font-bold text-slate-900">{track.coverage}</div>
                                </div>
                            </div>

                            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                                <div className="text-xs font-black uppercase tracking-wider text-slate-500">{t('appPages.admin.curriculum.targetWords')}</div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {track.targetWords.map((word) => (
                                        <span key={word} className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">{word}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                                <div className="text-xs font-black uppercase tracking-wider text-slate-500">{t('appPages.admin.curriculum.skills')}</div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {track.skills.map((skill) => (
                                        <span key={skill} className="rounded-xl bg-sky-50 px-3 py-1 text-xs font-black text-sky-700">{skill}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-5 flex items-center justify-between">
                                <div className="text-xs font-bold text-slate-400">{t('appPages.admin.curriculum.lastUpdate')}: {track.updatedAt}</div>
                                <button className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2 text-xs font-black text-white">
                                    {t('appPages.admin.curriculum.openUnit')}
                                    <ArrowUpRight size={14} />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-slate-950">{t('appPages.admin.curriculum.releaseQueueTitle')}</h2>
                        <p className="mt-2 text-sm leading-7 text-slate-500">{t('appPages.admin.curriculum.releaseQueueDesc')}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                        <Rocket size={18} />
                    </div>
                </div>

                <div className="mt-6 grid gap-4 xl:grid-cols-[1.15fr,0.85fr]">
                    <div className="space-y-3">
                        {adminReleaseQueue.map((item) => (
                            <div key={item.id} className="flex flex-col gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm">
                                        <BookOpenCheck size={18} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-black text-slate-900">{item.name}</div>
                                        <div className="mt-1 text-xs font-bold text-slate-400">{item.owner}</div>
                                    </div>
                                </div>
                                <span className={`rounded-full border px-3 py-1 text-xs font-black ${queueToneMap[item.status]}`}>{item.status}</span>
                            </div>
                        ))}
                    </div>

                    <div className="grid gap-3">
                        <button className="rounded-[1.5rem] border border-slate-200 bg-emerald-50 px-5 py-4 text-sm font-black text-emerald-700 transition hover:bg-emerald-100">
                            {t('appPages.admin.curriculum.publish')}
                        </button>
                        <button className="rounded-[1.5rem] border border-slate-200 bg-amber-50 px-5 py-4 text-sm font-black text-amber-700 transition hover:bg-amber-100">
                            {t('appPages.admin.curriculum.review')}
                        </button>
                        <button className="rounded-[1.5rem] border border-slate-200 bg-slate-950 px-5 py-4 text-sm font-black text-white transition hover:bg-slate-800">
                            <span className="inline-flex items-center gap-2">
                                <Layers3 size={16} />
                                {t('appPages.admin.curriculum.openUnit')}
                            </span>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminCurriculumPage;
