import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, TrendingDown, Clock, MessageSquare, ShieldCheck, Zap } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';

const TeacherRiskAlertsPage: React.FC = () => {
    return (
        <div className="space-y-10 pb-16 font-outfit">
            <SectionHeader
                eyebrow="Risk & Retention"
                title="AI Risk Alerts"
                description="Predictive dashboard identifying at-risk students with AI-recommended intervention playbooks."
            />

            <div className="grid gap-5 md:grid-cols-3 mb-8">
                {[
                    { label: 'Active Alerts', value: '2', tone: 'text-rose-600', bg: 'bg-rose-50', icon: ShieldAlert },
                    { label: 'Resolved This Week', value: '5', tone: 'text-emerald-600', bg: 'bg-emerald-50', icon: ShieldCheck },
                    { label: 'Retention Rate', value: '98%', tone: 'text-indigo-600', bg: 'bg-indigo-50', icon: TrendingDown },
                ].map((stat) => (
                    <div key={stat.label} className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm flex items-center gap-4">
                        <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.tone}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                            <div className="text-sm font-bold text-slate-500">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <section className="rounded-[2.5rem] border border-rose-100 bg-white p-8 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-rose-50 text-rose-600">
                            <ShieldAlert size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900">At-Risk Students</h2>
                            <p className="text-sm font-medium text-slate-500">Requires immediate attention and intervention.</p>
                        </div>
                    </div>
                </div>
                
                <div className="grid gap-5 lg:grid-cols-2">
                    {[
                        { 
                            student: 'Omar Fahad', 
                            level: 'High Risk', 
                            trigger: 'Engagement dropped significantly over the last 2 sessions. Avoids answering open questions.',
                            action: 'Switch to game-based activities to lower stress. Send an encouraging progress note to parents.',
                            tone: 'rose'
                        },
                        { 
                            student: 'Sara Ahmed', 
                            level: 'Low Risk', 
                            trigger: 'One delayed homework submission.',
                            action: 'Send an automated friendly reminder to the parent.',
                            tone: 'amber'
                        },
                    ].map((risk) => (
                        <div key={risk.student} className={`rounded-3xl border p-6 relative overflow-hidden group ${
                            risk.tone === 'rose' ? 'border-rose-200 bg-gradient-to-br from-rose-50 to-white' : 'border-amber-200 bg-gradient-to-br from-amber-50 to-white'
                        }`}>
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-black text-slate-900">{risk.student}</h3>
                                    <div className="mt-1 flex items-center gap-2">
                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-black uppercase tracking-wider ${
                                            risk.tone === 'rose' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                                        }`}>
                                            <AlertTriangle size={12} />
                                            {risk.level}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Trigger</div>
                                    <div className="text-sm font-bold text-slate-800 leading-relaxed">{risk.trigger}</div>
                                </div>
                                <div className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-indigo-500 mb-2">
                                        <Zap size={12} />
                                        AI Playbook
                                    </div>
                                    <div className="text-sm font-bold text-slate-700 leading-relaxed">{risk.action}</div>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <button className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-black text-white transition-colors shadow-md ${
                                    risk.tone === 'rose' ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20' : 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
                                }`}>
                                    <ShieldAlert size={16} />
                                    Apply Intervention
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-3 text-sm font-black text-slate-700 hover:bg-slate-50 transition-colors">
                                    <MessageSquare size={16} />
                                    Notify Parent
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default TeacherRiskAlertsPage;
