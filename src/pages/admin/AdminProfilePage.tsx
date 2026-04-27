import React from 'react';
import { useTranslation } from 'react-i18next';
import { Clock3, Mail, MapPin, Shield, UserCircle2 } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';
import { adminProfileActivity } from '../../constants/adminConsoleData';
import { useApp } from '../../contexts/AppContext';

const AdminProfilePage: React.FC = () => {
    const { t } = useTranslation();
    const { currentUser } = useApp();

    if (!currentUser) return null;

    return (
        <div className="space-y-8">
            <SectionHeader
                eyebrow={t('appPages.admin.profile.eyebrow')}
                title={t('appPages.admin.profile.title')}
                description={t('appPages.admin.profile.description')}
            />

            <div className="grid gap-6 xl:grid-cols-[0.85fr,1.15fr]">
                <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col items-center text-center">
                        <img src={currentUser.avatarUrl} alt={currentUser.name} className="h-28 w-28 rounded-full border-4 border-slate-100 object-cover shadow-sm" />
                        <h2 className="mt-5 text-2xl font-black text-slate-950">{currentUser.name}</h2>
                        <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-xs font-black text-white">
                            <Shield size={14} />
                            {currentUser.role}
                        </div>
                    </div>

                    <div className="mt-6 space-y-3">
                        <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
                            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500"><Mail size={14} /> Email</div>
                            <div className="mt-2 text-sm font-bold text-slate-900">{currentUser.email}</div>
                        </div>
                        <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
                            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500"><MapPin size={14} /> Scope</div>
                            <div className="mt-2 text-sm font-bold text-slate-900">{currentUser.assignedCountryId || 'ALL'} / {currentUser.assignedStage || 'All stages'}</div>
                        </div>
                        <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
                            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500"><UserCircle2 size={14} /> Status</div>
                            <div className="mt-2 text-sm font-bold text-slate-900">{currentUser.status}</div>
                        </div>
                    </div>
                </section>

                <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-2 text-slate-900">
                        <Clock3 size={18} />
                        <h2 className="text-2xl font-black">Recent admin activity</h2>
                    </div>
                    <div className="mt-6 space-y-4">
                        {adminProfileActivity.map((item) => (
                            <div key={item.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                                <div className="text-sm font-black text-slate-900">{item.action}</div>
                                <div className="mt-2 text-xs font-bold text-slate-400">{item.time}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AdminProfilePage;
