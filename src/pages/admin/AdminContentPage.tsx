import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Clock3, FileText, Layers3, Video } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';
import { adminContentLibrary } from '../../constants/adminConsoleData';

const typeIconMap = {
    Book: BookOpen,
    Lesson: Video,
    Resource: FileText,
} as const;

const statusToneMap: Record<string, string> = {
    Published: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Review: 'bg-amber-50 text-amber-700 border-amber-100',
    Draft: 'bg-slate-100 text-slate-700 border-slate-200',
};

const AdminContentPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-8">
            <SectionHeader
                eyebrow={t('appPages.admin.content.eyebrow')}
                title={t('appPages.admin.content.title')}
                description={t('appPages.admin.content.description')}
            />

            <section className="grid gap-4 md:grid-cols-3">
                <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-white"><Layers3 size={20} /></div>
                    <div className="mt-5 text-3xl font-black text-slate-950">126</div>
                    <div className="mt-2 text-sm font-bold text-slate-500">Active assets</div>
                </div>
                <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white"><Clock3 size={20} /></div>
                    <div className="mt-5 text-3xl font-black text-slate-950">12</div>
                    <div className="mt-2 text-sm font-bold text-slate-500">Waiting for review</div>
                </div>
                <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white"><BookOpen size={20} /></div>
                    <div className="mt-5 text-3xl font-black text-slate-950">9</div>
                    <div className="mt-2 text-sm font-bold text-slate-500">Published this week</div>
                </div>
            </section>

            <section className="grid gap-5 xl:grid-cols-2">
                {adminContentLibrary.map((item) => {
                    const Icon = typeIconMap[item.type as keyof typeof typeIconMap];
                    return (
                        <article key={item.id} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                                        <Icon size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                                        <p className="mt-1 text-sm font-medium text-slate-500">{item.subject} • {item.grade}</p>
                                    </div>
                                </div>
                                <span className={`rounded-full border px-3 py-1 text-xs font-black ${statusToneMap[item.status]}`}>{item.status}</span>
                            </div>

                            <div className="mt-5 grid gap-3 md:grid-cols-2">
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <div className="text-xs font-black uppercase tracking-wider text-slate-500">Owner</div>
                                    <div className="mt-2 text-sm font-bold text-slate-900">{item.owner}</div>
                                </div>
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <div className="text-xs font-black uppercase tracking-wider text-slate-500">Country</div>
                                    <div className="mt-2 text-sm font-bold text-slate-900">{item.country}</div>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between text-xs font-bold text-slate-400">
                                <span>{item.type}</span>
                                <span>{item.updatedAt}</span>
                            </div>
                        </article>
                    );
                })}
            </section>
        </div>
    );
};

export default AdminContentPage;
