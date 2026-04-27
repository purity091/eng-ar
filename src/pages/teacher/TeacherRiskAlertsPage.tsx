import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldAlert, AlertTriangle, TrendingDown, MessageSquare, ShieldCheck, Zap } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';

const TeacherRiskAlertsPage: React.FC = () => {
    const { t } = useTranslation();

    const stats = t('appPages.teacher.riskAlertsPage.stats', { returnObjects: true }) as Array<{ label: string; value: string; tone: string; bg: string; icon: 'active'|'resolved'|'retention' }>;
    const risks = t('appPages.teacher.riskAlertsPage.risks', { returnObjects: true }) as Array<{ student: string; level: string; trigger: string; action: string; tone: 'rose'|'amber' }>;

    return (
        <div className="space-y-10 pb-16 font-outfit">
            <SectionHeader eyebrow={t('appPages.teacher.riskAlerts.eyebrow')} title={t('appPages.teacher.riskAlerts.title')} description={t('appPages.teacher.riskAlerts.description')} />

            <div className="mb-8 grid gap-5 md:grid-cols-3">
                {stats.map((stat) => {
                    const Icon = stat.icon === 'active' ? ShieldAlert : stat.icon === 'resolved' ? ShieldCheck : TrendingDown;
                    return (
                        <div key={stat.label} className="flex items-center gap-4 rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm">
                            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.bg} ${stat.tone}`}><Icon size={24} /></div>
                            <div><div className="text-2xl font-black text-slate-900">{stat.value}</div><div className="text-sm font-bold text-slate-500">{stat.label}</div></div>
                        </div>
                    );
                })}
            </div>

            <section className="rounded-[2.5rem] border border-rose-100 bg-white p-8 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-rose-50 text-rose-600"><ShieldAlert size={20} /></div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900">{t('appPages.teacher.riskAlertsPage.atRiskTitle')}</h2>
                            <p className="text-sm font-medium text-slate-500">{t('appPages.teacher.riskAlertsPage.atRiskDesc')}</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                    {risks.map((risk) => (
                        <div key={risk.student} className={`group relative overflow-hidden rounded-3xl border p-6 ${risk.tone === 'rose' ? 'border-rose-200 bg-gradient-to-br from-rose-50 to-white' : 'border-amber-200 bg-gradient-to-br from-amber-50 to-white'}`}>
                            <div className="mb-4 flex items-start justify-between">
                                <div>
                                    <h3 className="text-xl font-black text-slate-900">{risk.student}</h3>
                                    <div className="mt-1 flex items-center gap-2">
                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-black uppercase tracking-wider ${risk.tone === 'rose' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}><AlertTriangle size={12} />{risk.level}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="mb-1 text-[10px] font-black uppercase tracking-wider text-slate-400">{t('appPages.teacher.riskAlertsPage.trigger')}</div>
                                    <div className="text-sm font-bold leading-relaxed text-slate-800">{risk.trigger}</div>
                                </div>
                                <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                                    <div className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-indigo-500"><Zap size={12} />{t('appPages.teacher.riskAlertsPage.playbook')}</div>
                                    <div className="text-sm font-bold leading-relaxed text-slate-700">{risk.action}</div>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <button className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-black text-white shadow-md transition-colors ${risk.tone === 'rose' ? 'bg-rose-600 shadow-rose-600/20 hover:bg-rose-700' : 'bg-amber-600 shadow-amber-600/20 hover:bg-amber-700'}`}><ShieldAlert size={16} />{t('appPages.teacher.riskAlertsPage.apply')}</button>
                                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 transition-colors hover:bg-slate-50"><MessageSquare size={16} />{t('appPages.teacher.riskAlertsPage.notify')}</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default TeacherRiskAlertsPage;
