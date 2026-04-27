import React from 'react';
import { BarChart3, CheckCircle2, Clock3, Mic2, Star } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const ProfilePage: React.FC = () => {
    const { userProfile } = useApp();

    return (
        <div className="space-y-6 pb-24">
            <section className="rounded-[2rem] bg-[linear-gradient(135deg,#0f172a,#1d4ed8,#f97316)] p-6 text-white shadow-2xl">
                <div className="flex flex-col gap-5 md:flex-row md:items-center">
                    <img src={userProfile?.avatarUrl} alt={userProfile?.name} className="h-24 w-24 rounded-full border-4 border-white/20 object-cover" />
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold">{userProfile?.name}</h1>
                        <p className="mt-2 text-white/80">الصف {userProfile?.grade} • رحلة English الأساسية</p>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4">
                        <div className="text-sm text-white/70">Weekly Growth</div>
                        <div className="text-3xl font-bold">+14%</div>
                    </div>
                </div>
            </section>

            <section className="grid gap-4 md:grid-cols-4">
                {[
                    { icon: BarChart3, label: 'إجمالي التقدم', value: '79%' },
                    { icon: Mic2, label: 'Speaking', value: '82%' },
                    { icon: Clock3, label: 'الالتزام', value: '5 أيام' },
                    { icon: Star, label: 'الإنجازات', value: '7 badges' },
                ].map((item) => (
                    <div key={item.label} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                        <item.icon className="mb-4 text-orange-500" />
                        <div className="text-3xl font-bold text-slate-900">{item.value}</div>
                        <div className="mt-1 text-slate-500">{item.label}</div>
                    </div>
                ))}
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900">تقرير ولي الأمر</h2>
                    <div className="mt-5 space-y-3">
                        {[
                            'الطفل يشارك صوتيًا بثقة أكبر من الأسبوع الماضي.',
                            'ما يزال يحتاج دعمًا بسيطًا في blending أثناء القراءة.',
                            'الواجبات المنزلية أُنجزت كاملة هذا الأسبوع.',
                        ].map((note) => (
                            <div key={note} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                                <CheckCircle2 className="mt-1 shrink-0 text-emerald-500" size={18} />
                                <span className="text-slate-700">{note}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900">الخطة القادمة</h2>
                    <div className="mt-5 space-y-4">
                        {[
                            { title: 'Speaking Drill', text: '3 جمل يوميًا بصوت واضح.' },
                            { title: 'Reading Card', text: 'بطاقة قصيرة من 6 كلمات.' },
                            { title: 'Parent Support', text: '5 دقائق listening before sleep.' },
                        ].map((item) => (
                            <div key={item.title} className="rounded-2xl border border-slate-200 p-4">
                                <div className="font-bold text-slate-900">{item.title}</div>
                                <div className="mt-1 text-slate-600">{item.text}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProfilePage;
