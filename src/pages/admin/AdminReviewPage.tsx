import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Clock3, Eye, ShieldAlert, XCircle } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';
import { adminReviewItems } from '../../constants/adminConsoleData';

const priorityToneMap = {
    urgent: 'bg-rose-50 text-rose-700 border-rose-100',
    monitor: 'bg-amber-50 text-amber-700 border-amber-100',
    healthy: 'bg-emerald-50 text-emerald-700 border-emerald-100',
} as const;

const AdminReviewPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-8">
            <SectionHeader
                eyebrow={t('appPages.admin.review.eyebrow')}
                title={t('appPages.admin.review.title')}
                description={t('appPages.admin.review.description')}
            />

            <section className="grid gap-5">
                {adminReviewItems.map((item) => (
                    <article key={item.id} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                                    <span className={`rounded-full border px-3 py-1 text-xs font-black ${priorityToneMap[item.priority as keyof typeof priorityToneMap]}`}>{item.priority}</span>
                                </div>
                                <div className="mt-3 flex flex-wrap gap-3 text-sm font-medium text-slate-500">
                                    <span>{item.author}</span>
                                    <span>{item.type}</span>
                                    <span>{item.country}</span>
                                    <span>{item.grade}</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <div className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-600">
                                    <Clock3 size={14} />
                                    {item.submittedAt}
                                </div>
                                <button className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-xs font-black text-slate-700">
                                    <Eye size={14} />
                                    Preview
                                </button>
                                <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-black text-white">
                                    <CheckCircle2 size={14} />
                                    Approve
                                </button>
                                <button className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-black text-white">
                                    <XCircle size={14} />
                                    Reject
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </section>

            <section className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
                <div className="flex items-start gap-3">
                    <ShieldAlert className="mt-0.5 text-amber-300" size={20} />
                    <div>
                        <h3 className="text-lg font-black">Review policy</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-300">High-risk or curriculum-changing assets should always pass through QA before publishing, even if the content owner is trusted.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminReviewPage;
