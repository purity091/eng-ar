import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Globe2, Shield, UserCog } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';
import { adminUserRecords } from '../../constants/adminConsoleData';

const statusToneMap = {
    active: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    pending: 'bg-amber-50 text-amber-700 border-amber-100',
    suspended: 'bg-rose-50 text-rose-700 border-rose-100',
} as const;

const AdminUsersPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-8">
            <SectionHeader
                eyebrow={t('appPages.admin.users.eyebrow')}
                title={t('appPages.admin.users.title')}
                description={t('appPages.admin.users.description')}
            />

            <section className="grid gap-4 md:grid-cols-3">
                <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                        <UserCog size={20} />
                    </div>
                    <div className="mt-5 text-3xl font-black text-slate-950">24</div>
                    <div className="mt-2 text-sm font-bold text-slate-500">Active operators</div>
                </div>
                <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-white">
                        <Globe2 size={20} />
                    </div>
                    <div className="mt-5 text-3xl font-black text-slate-950">4</div>
                    <div className="mt-2 text-sm font-bold text-slate-500">Country scopes</div>
                </div>
                <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white">
                        <Shield size={20} />
                    </div>
                    <div className="mt-5 text-3xl font-black text-slate-950">3</div>
                    <div className="mt-2 text-sm font-bold text-slate-500">Pending approvals</div>
                </div>
            </section>

            <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-[880px] w-full text-right">
                        <thead className="bg-slate-50 text-xs font-black uppercase tracking-wider text-slate-500">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Scope</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Last active</th>
                                <th className="px-6 py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminUserRecords.map((user) => (
                                <tr key={user.id} className="border-t border-slate-100">
                                    <td className="px-6 py-5">
                                        <div className="font-black text-slate-950">{user.name}</div>
                                        <div className="mt-1 text-xs font-medium text-slate-400">{user.email}</div>
                                    </td>
                                    <td className="px-6 py-5 text-sm font-bold text-slate-700">{user.role}</td>
                                    <td className="px-6 py-5 text-sm font-medium text-slate-600">{user.scope}</td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-black ${statusToneMap[user.status]}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-sm font-medium text-slate-500">{user.lastActive}</td>
                                    <td className="px-6 py-5">
                                        <button className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2 text-xs font-black text-white transition hover:bg-slate-800">
                                            Manage
                                            <ArrowUpRight size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default AdminUsersPage;
