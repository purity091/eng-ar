import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Clock3, Globe2, XCircle } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';
import { adminTeacherApplications } from '../../constants/adminConsoleData';

const statusToneMap = {
    pending: 'bg-amber-50 text-amber-700 border-amber-100',
    approved: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    rejected: 'bg-rose-50 text-rose-700 border-rose-100',
} as const;

const AdminApplicationsPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-8">
            <SectionHeader
                eyebrow={t('appPages.admin.applications.eyebrow')}
                title={t('appPages.admin.applications.title')}
                description={t('appPages.admin.applications.description')}
            />

            <section className="grid gap-5 xl:grid-cols-3">
                {adminTeacherApplications.map((application) => (
                    <article key={application.id} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h3 className="text-lg font-black text-slate-950">{application.name}</h3>
                                <p className="mt-1 text-sm font-medium text-slate-500">{application.specialty}</p>
                            </div>
                            <span className={`rounded-full border px-3 py-1 text-xs font-black ${statusToneMap[application.status]}`}>
                                {application.status}
                            </span>
                        </div>

                        <div className="mt-5 space-y-3">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700">
                                <div className="text-xs font-black uppercase tracking-wider text-slate-500">Experience</div>
                                <div className="mt-2 font-bold text-slate-900">{application.experience}</div>
                            </div>
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700">
                                <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500">
                                    <Globe2 size={14} />
                                    Country
                                </div>
                                <div className="mt-2 font-bold text-slate-900">{application.country}</div>
                            </div>
                        </div>

                        <div className="mt-5 flex items-center justify-between text-xs font-bold text-slate-400">
                            <span className="inline-flex items-center gap-1.5"><Clock3 size={14} /> {application.submittedAt}</span>
                            <span>{application.id}</span>
                        </div>

                        <div className="mt-5 flex gap-2">
                            <button className="flex-1 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-black text-white">
                                <span className="inline-flex items-center gap-2"><CheckCircle2 size={14} /> Approve</span>
                            </button>
                            <button className="flex-1 rounded-xl bg-rose-600 px-4 py-2 text-xs font-black text-white">
                                <span className="inline-flex items-center gap-2"><XCircle size={14} /> Reject</span>
                            </button>
                        </div>
                    </article>
                ))}
            </section>
        </div>
    );
};

export default AdminApplicationsPage;
