import React from 'react';
import { MessageSquareMore, Send, MailCheck, Sparkles, UserRound, ArrowRight, Clock } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';

const TeacherParentMessagesPage: React.FC = () => {
    return (
        <div className="space-y-10 pb-16 font-outfit">
            <SectionHeader
                eyebrow="Communication"
                title="AI Parent Updates"
                description="Review, customize, and send auto-drafted, personalized parent messages based on recent student progress."
            />

            <div className="grid gap-8 xl:grid-cols-[1.1fr,0.9fr]">
                <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-indigo-50 text-indigo-600">
                                <MessageSquareMore size={20} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Pending Drafts</h2>
                                <p className="text-sm font-medium text-slate-500">Auto-generated templates ready for your review.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        {[
                            { 
                                type: 'Weekly Progress Report', 
                                student: 'Omar Fahad', 
                                content: 'Omar showed great improvement in vocabulary retention this week. We recommend repeating the visual card game twice over the weekend.',
                                tone: 'indigo'
                            },
                            { 
                                type: 'Homework Alert', 
                                student: 'Sara Ahmed', 
                                content: 'Just a friendly reminder that Sara\'s speaking assignment is overdue. Let me know if you need any help with the platform!',
                                tone: 'amber'
                            },
                            { 
                                type: 'Milestone Celebration', 
                                student: 'Layan Khalid', 
                                content: 'Layan spoke with incredible confidence today! She completed full sentences without hesitation. Great job at home supporting her.',
                                tone: 'emerald'
                            },
                        ].map((msg, i) => (
                            <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 hover:bg-white hover:shadow-md transition-all group">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className={`p-1.5 rounded-lg ${
                                            msg.tone === 'indigo' ? 'bg-indigo-100 text-indigo-600' :
                                            msg.tone === 'amber' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                                        }`}>
                                            <Sparkles size={14} />
                                        </div>
                                        <span className="text-sm font-black text-slate-900">{msg.type}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                                        <UserRound size={12} />
                                        {msg.student}
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-white border border-slate-200 text-sm font-medium text-slate-700 leading-relaxed mb-4">
                                    "{msg.content}"
                                </div>
                                <div className="flex gap-2">
                                    <button className="flex-1 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-black text-white hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                        <Send size={14} />
                                        Send Now
                                    </button>
                                    <button className="rounded-xl bg-white border border-slate-200 px-4 py-2.5 text-xs font-black text-slate-700 hover:bg-slate-50 transition-colors">
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="space-y-8">
                    <div className="rounded-[2.5rem] border border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-white p-8 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                        
                        <div className="mb-6 flex items-center gap-4 relative z-10">
                            <div className="flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-indigo-600 text-white shadow-md shadow-indigo-200">
                                <Sparkles size={20} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Custom Composer</h2>
                                <p className="text-sm font-medium text-slate-500">Generate specific messages.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm relative z-10 mb-6">
                            <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Message Goal</label>
                            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all">
                                <option>Request Schedule Change</option>
                                <option>Suggest Extra Practice</option>
                                <option>Share Positive Feedback</option>
                                <option>Discuss Behavioral Challenge</option>
                            </select>
                        </div>
                        
                        <div className="flex flex-col gap-3 relative z-10">
                            <button className="flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-4 text-sm font-black text-white hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20 group">
                                <span className="flex items-center gap-2">
                                    <Sparkles size={18} />
                                    Generate Draft
                                </span>
                            </button>
                            <button className="flex items-center justify-center rounded-xl bg-white border border-slate-200 px-5 py-4 text-sm font-black text-slate-700 hover:bg-slate-50 transition-colors group">
                                <span className="flex items-center gap-2">
                                    <Clock size={18} className="text-slate-400" />
                                    View Past History
                                </span>
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TeacherParentMessagesPage;
