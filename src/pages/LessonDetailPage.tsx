import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Mic2, PlayCircle } from 'lucide-react';
import { LESSONS } from '../constants';

const LessonDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const lesson = LESSONS.find((item) => item.id === slug);

    if (!lesson) {
        return <div className="rounded-3xl bg-white p-10 text-center text-slate-500">الحصة غير موجودة.</div>;
    }

    return (
        <div className="space-y-6 pb-24">
            <button onClick={() => navigate('/lessons')} className="flex items-center gap-2 font-bold text-slate-600 transition-colors hover:text-orange-600">
                <ArrowRight size={18} />
                العودة إلى الحصص
            </button>

            <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
                <div className="space-y-6">
                    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                        <div className="relative">
                            <img src={lesson.thumbnailUrl} alt={lesson.title} className="h-[360px] w-full object-cover" />
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/20">
                                <button className="flex h-24 w-24 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-2xl">
                                    <PlayCircle size={44} />
                                </button>
                            </div>
                        </div>
                        <div className="p-6 lg:p-8">
                            <div className="mb-3 flex flex-wrap gap-2">
                                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">{lesson.subject}</span>
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{lesson.duration}</span>
                            </div>
                            <h1 className="text-4xl font-bold text-slate-900">{lesson.title}</h1>
                            <p className="mt-4 leading-8 text-slate-600">
                                في هذه الحصة يكرر الطفل النموذج الصحيح مع المعلم، ثم يطبّق داخل نشاط قصير، وبعدها يتم تثبيت النتيجة داخل dashboard التقدم.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900">ماذا سيتعلم الطفل؟</h2>
                        <div className="mt-5 space-y-3">
                            {[
                                'تمييز الصوت أو النمط اللغوي المستهدف.',
                                'تكرار الجمل الأساسية بنطق أوضح.',
                                'استخدام المفردات داخل mini conversation.',
                                'إنهاء quick check ينعكس في تقرير الأهل.',
                            ].map((item) => (
                                <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                                    <CheckCircle2 className="mt-1 shrink-0 text-emerald-500" size={18} />
                                    <span className="text-slate-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                        <h3 className="text-xl font-bold text-slate-900">لوحة القياس السريع</h3>
                        <div className="mt-5 space-y-4">
                            {[
                                { label: 'هدف الحصة', value: 'Short vowel accuracy' },
                                { label: 'نوع القياس', value: 'Voice check + mini quiz' },
                                { label: 'زمن التركيز', value: '12 - 18 دقيقة' },
                            ].map((item) => (
                                <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
                                    <div className="text-sm text-slate-500">{item.label}</div>
                                    <div className="mt-1 font-bold text-slate-900">{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-orange-200 bg-orange-50 p-6 shadow-sm">
                        <div className="mb-3 flex items-center gap-2 font-bold text-orange-700">
                            <Mic2 size={18} />
                            توصية للأهل بعد الحصة
                        </div>
                        <p className="leading-8 text-slate-700">
                            اطلب من الطفل تكرار 3 كلمات و2 جمل قصيرة أمامك. لا تصحح كل شيء؛ ركز فقط على الهدف الصوتي الأساسي.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonDetailPage;
