import React from 'react';
import { Link } from 'react-router-dom';
import { Mic2, PlayCircle, Star, Trophy, Rocket, Target, Volume2, Sparkles, ChevronRight, Heart, Zap, Award, Ghost, Gamepad2, MousePointer2, BookOpenCheck, CalendarClock, CheckCircle2, Clock3 } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';
import { todayMission } from '../../constants/platformData';

const StudentDashboardPage: React.FC = () => {
    const growthScore = 74;
    const skillMeters = [
        { label: 'المفردات', value: 82, tone: 'bg-emerald-500' },
        { label: 'النطق', value: 61, tone: 'bg-orange-500' },
        { label: 'الاستماع', value: 70, tone: 'bg-sky-500' },
        { label: 'المحادثة', value: 66, tone: 'bg-violet-500' },
        { label: 'الحضور', value: 90, tone: 'bg-amber-500' },
    ];

    const todayChecklist = [
        { title: 'أنهِ مهمة المفردات', points: '+25 نقطة', done: true, icon: BookOpenCheck },
        { title: 'سجل تدريب النطق', points: '+15 نقطة', done: false, icon: Mic2 },
        { title: 'ادخل الحصة المباشرة الساعة 5:00', points: '+30 نقطة', done: false, icon: CalendarClock },
    ];

    return (
        <div className="space-y-10 pb-16 font-outfit">
            <section className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-indigo-600 via-blue-600 to-emerald-600 p-10 text-white shadow-2xl">
                <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-white/10 blur-3xl animate-pulse-soft" />
                <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-orange-400/20 blur-2xl animate-pulse-soft" style={{ animationDelay: '1s' }} />

                <div className="relative grid gap-12 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
                    <div className="space-y-8">
                        <div className="flex flex-wrap gap-3">
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2.5 text-xs font-black tracking-widest text-white backdrop-blur-md">
                                <Rocket size={16} className="animate-bounce" />
                                المستكشف - المستوى 4
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-xs font-black tracking-widest text-white shadow-lg">
                                <Zap size={16} />
                                1,200 نقطة
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-5xl font-black tracking-tight lg:text-7xl">مرحبًا <span className="text-orange-400">ليان!</span></h1>
                            <p className="max-w-xl text-xl font-medium leading-relaxed text-blue-50/80">
                                بقي لك <span className="font-black text-white underline decoration-orange-400 underline-offset-4">3 مهام فقط</span> لفتح شخصية جديدة.
                            </p>
                        </div>

                        <div className="glass-dark inline-block rounded-[2.5rem] border border-white/10 p-8 shadow-xl">
                            <div className="flex items-center gap-5">
                                <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-orange-500 shadow-orange-glow animate-float">
                                    <Target size={40} />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black tracking-[0.2em] text-white/50">مهمة اليوم</div>
                                    <div className="text-3xl font-black">{todayMission.title}</div>
                                    <div className="mt-1 text-sm font-bold text-white/70">{todayMission.subtitle}</div>
                                </div>
                            </div>

                            <div className="mt-8 space-y-4">
                                <div className="flex items-center justify-between text-xs font-black tracking-widest text-white/60">
                                    <span>تقدم المهمة</span>
                                    <span>65%</span>
                                </div>
                                <div className="h-4 w-full rounded-full bg-white/10 p-1">
                                    <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 shadow-lg" style={{ width: '65%' }} />
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                                <Link to="/student/daily-practice" className="group flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white px-8 py-5 text-sm font-black text-slate-900 shadow-xl transition-all hover:scale-105 active:scale-95">
                                    ابدأ المهمة <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                                </Link>
                                <Link to="/student/live-class" className="flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-8 py-5 text-sm font-black text-white transition-all hover:bg-white/20">
                                    ادخل الحصة المباشرة
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="relative mx-auto group perspective-1000">
                        <div className="absolute -inset-10 rounded-full bg-white/10 blur-3xl transition-all duration-700 group-hover:bg-white/20" />
                        <div className="relative h-80 w-80 rounded-[3rem] border-8 border-white/20 bg-white/5 p-8 shadow-2xl backdrop-blur-md transition-all duration-700 group-hover:rotate-[5deg] group-hover:scale-110">
                            <div className="relative grid h-full place-items-center overflow-hidden rounded-[2rem] border-4 border-dashed border-white/30 bg-white/5 text-center">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                                <div className="relative z-10 animate-float">
                                    <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">
                                        <Ghost size={80} className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]" />
                                    </div>
                                    <div className="px-4">
                                        <div className="text-2xl font-black tracking-widest text-white">غوستي</div>
                                        <div className="mt-1 text-xs font-bold text-blue-100/60">رفيقك الذكي</div>
                                        <div className="mt-4 flex justify-center gap-1">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <Star key={i} size={12} className={i <= 4 ? 'fill-orange-400 text-orange-400' : 'text-white/20'} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="group relative overflow-hidden rounded-[2.5rem] border-2 border-transparent bg-white p-8 shadow-premium transition-all hover:-translate-y-2 hover:border-amber-100 hover:shadow-2xl">
                    <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-amber-50 opacity-0 transition-all group-hover:scale-150 group-hover:opacity-100" />
                    <div className="relative mb-6 flex items-center justify-between">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 transition-all group-hover:rotate-6 group-hover:scale-110">
                            <Star size={36} className="fill-amber-500" />
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] font-black tracking-widest text-slate-400">إجمالي النجوم</div>
                            <div className="text-5xl font-black text-slate-900">{todayMission.stars}</div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs font-black tracking-widest text-slate-500">
                            <span>المكافأة القادمة</span>
                            <span>باقي 12 نجمة</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                            <div className="h-full rounded-full bg-amber-400 transition-all duration-1000" style={{ width: '75%' }} />
                        </div>
                    </div>
                </div>

                <div className="group relative overflow-hidden rounded-[2.5rem] border-2 border-transparent bg-white p-8 shadow-premium transition-all hover:-translate-y-2 hover:border-emerald-100 hover:shadow-2xl">
                    <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-50 opacity-0 transition-all group-hover:scale-150 group-hover:opacity-100" />
                    <div className="relative mb-6 flex items-center justify-between">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500 transition-all group-hover:rotate-6 group-hover:scale-110">
                            <Trophy size={36} />
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] font-black tracking-widest text-slate-400">سلسلة الالتزام</div>
                            <div className="text-5xl font-black text-slate-900">{todayMission.streak}</div>
                            <div className="text-xs font-bold text-emerald-600">أيام</div>
                        </div>
                    </div>
                    <div className="flex gap-2.5">
                        {[1, 2, 3, 4, 5, 0, 0].map((s, i) => (
                            <div key={i} className={`h-3 flex-1 rounded-full ${s > 0 ? 'bg-emerald-400 shadow-sm animate-pulse' : 'bg-slate-100'}`} />
                        ))}
                    </div>
                </div>

                <div className="group relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-8 shadow-2xl transition-all hover:-translate-y-2">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.2),_transparent)]" />
                    <div className="relative mb-6 flex items-center justify-between">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-blue-400 backdrop-blur-md transition-all group-hover:rotate-6 group-hover:scale-110">
                            <Mic2 size={36} />
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] font-black tracking-widest text-blue-400/60">ركن الصوت</div>
                            <div className="text-2xl font-black text-white">فحص اليوم</div>
                        </div>
                    </div>
                    <Link to="/student/voice-practice" className="relative block w-full overflow-hidden rounded-2xl bg-blue-600 py-4 text-xs font-black text-white shadow-xl transition-all hover:bg-blue-700 hover:shadow-blue-500/20 active:scale-95">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            <Volume2 size={16} /> سجّل صوتك الآن
                        </span>
                    </Link>
                </div>
            </div>

            <section className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
                <div className="rounded-[2.5rem] border-2 border-slate-100 bg-white p-8 shadow-premium">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black tracking-[0.2em] text-slate-400">التقدم في الإنجليزية</p>
                            <h3 className="text-2xl font-black text-slate-900">مؤشر هذا الشهر</h3>
                        </div>
                        <Heart size={20} className="text-rose-500" />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-[0.7fr,1.3fr] sm:items-center">
                        <div className="relative mx-auto grid h-40 w-40 place-items-center rounded-full bg-gradient-to-br from-blue-50 via-white to-emerald-50">
                            <div className="grid h-32 w-32 place-items-center rounded-full border-8 border-blue-200/70 bg-white shadow-inner">
                                <div className="text-center">
                                    <div className="text-4xl font-black text-slate-900">{growthScore}</div>
                                    <div className="text-[10px] font-black tracking-[0.2em] text-slate-400">من 100</div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {skillMeters.map((meter) => (
                                <div key={meter.label}>
                                    <div className="mb-1 flex items-center justify-between text-xs font-black tracking-wider text-slate-500">
                                        <span>{meter.label}</span>
                                        <span>{meter.value}%</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-slate-100">
                                        <div className={`h-full rounded-full ${meter.tone}`} style={{ width: `${meter.value}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="rounded-[2.5rem] border-2 border-slate-100 bg-white p-8 shadow-premium">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black tracking-[0.2em] text-slate-400">خطة اليوم</p>
                            <h3 className="text-2xl font-black text-slate-900">قائمة تعلمك اليومية</h3>
                        </div>
                        <Clock3 size={20} className="text-slate-400" />
                    </div>

                    <div className="space-y-3">
                        {todayChecklist.map((task) => (
                            <div key={task.title} className={`flex items-center justify-between rounded-2xl border p-4 ${task.done ? 'border-emerald-200 bg-emerald-50/60' : 'border-slate-200 bg-slate-50'}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`grid h-10 w-10 place-items-center rounded-xl ${task.done ? 'bg-emerald-500 text-white' : 'bg-white text-slate-500'}`}>
                                        <task.icon size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900">{task.title}</p>
                                        <p className="text-[10px] font-black tracking-widest text-slate-400">{task.points}</p>
                                    </div>
                                </div>
                                {task.done ? <CheckCircle2 size={18} className="text-emerald-500" /> : <PlayCircle size={18} className="text-slate-400" />}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="rounded-[3rem] border-2 border-slate-100/50 bg-slate-50 p-10">
                <SectionHeader
                    eyebrow="خريطة التعلم"
                    title="عودي إلى رحلتك"
                    description="المهام اليومية جاهزة. أنهي الأنشطة لتحصلي على النجوم والنقاط."
                />
                <div className="mt-10 grid gap-6 md:grid-cols-4">
                    {[
                        { title: 'تعلّم كلمات', desc: 'صيد مفردات جديدة', icon: Gamepad2, color: 'text-orange-500', bg: 'bg-orange-50', border: 'hover:border-orange-200' },
                        { title: 'الحصة المباشرة', desc: 'تحدث مع معلمك', icon: Mic2, color: 'text-blue-500', bg: 'bg-blue-50', border: 'hover:border-blue-200' },
                        { title: 'القراءة بصوت عالٍ', desc: 'تدريب وقت القصة', icon: Volume2, color: 'text-purple-500', bg: 'bg-purple-50', border: 'hover:border-purple-200' },
                        { title: 'اختبار سريع', desc: 'اختبر ما تعلمته', icon: MousePointer2, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'hover:border-emerald-200' },
                    ].map((item, idx) => (
                        <button
                            key={item.title}
                            className={`group relative flex flex-col items-start rounded-[2.5rem] border-2 border-white bg-white p-8 text-left shadow-premium transition-all hover:-translate-y-3 hover:shadow-2xl ${item.border}`}
                            style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                            <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${item.bg} ${item.color} transition-all group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-lg`}>
                                <item.icon size={32} />
                            </div>
                            <div className="text-xl font-black text-slate-900">{item.title}</div>
                            <div className="mt-1 text-xs font-bold tracking-widest text-slate-400">{item.desc}</div>

                            <div className="mt-8 flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 shadow-sm transition-all group-hover:bg-slate-900 group-hover:text-white">
                                <ChevronRight size={18} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row">
                <div className="flex-1 rounded-[2.5rem] bg-gradient-to-br from-purple-600 to-indigo-700 p-10 text-white shadow-xl">
                    <div className="mb-6 flex items-center gap-4">
                        <Award size={32} className="text-purple-200" />
                        <h3 className="text-2xl font-black">آخر إنجاز</h3>
                    </div>
                    <div className="flex items-center gap-6 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg rotate-3">
                            <Sparkles size={40} className="text-white" />
                        </div>
                        <div>
                            <div className="text-xl font-black">بطلة النطق</div>
                            <div className="text-sm font-bold text-white/70">أتقنتِ التفريق بين صوتي P و B بشكل ممتاز.</div>
                            <div className="mt-2 text-[10px] font-black tracking-[0.2em] text-orange-300">تم الحصول عليها قبل يومين</div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center rounded-[2.5rem] border-2 border-slate-100 bg-white p-10 text-center shadow-premium lg:w-1/3">
                    <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 text-slate-300">
                        <Ghost size={48} />
                    </div>
                    <h4 className="text-lg font-black text-slate-900">عنصر مفاجأة</h4>
                    <p className="mt-2 text-xs font-bold text-slate-400">اجمعي 500 نقطة إضافية لكشف هذه المفاجأة.</p>
                    <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-slate-50">
                        <div className="h-full w-1/2 bg-slate-200" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboardPage;


