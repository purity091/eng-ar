import React, { useState, useEffect } from 'react';
import {
    ArrowUpRight,
    AudioLines,
    BarChart3,
    BookOpenCheck,
    BrainCircuit,
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    Clock3,
    Crown,
    FileText,
    Flame,
    History,
    Medal,
    MessageSquareQuote,
    Mic2,
    Sparkles,
    Star,
    Target,
    TrendingUp,
    Trophy,
    UserRound,
    Circle,
    CheckCircle,
} from 'lucide-react';
import omarAvatar from '../../assets/omar.webp';
import StatCard from '../../components/platform/StatCard';

// Task definitions for each skill category
const INITIAL_SKILLS_DATA = [
    {
        id: 'listening',
        label: 'الاستماع',
        tone: 'bg-sky-500',
        problemSolved: 'علاج التداخل اللغوي: تمييز الأصوات المتحركة القصيرة والطويلة.',
        aiNote: 'يفهم التعليمات الأساسية بسرعة ويستجيب بشكل أفضل مع التكرار الأول.',
        icon: AudioLines,
        tasks: [
            { id: 'l1', label: 'تمييز أصوات الحيوانات المختلفة', completed: true },
            { id: 'l2', label: 'فهم تعليمات "Open your book"', completed: true },
            { id: 'l3', label: 'تمييز الصوت القصير A في الكلمات', completed: true },
            { id: 'l4', label: 'الاستماع لقصة مدتها 3 دقائق بتركيز', completed: true },
            { id: 'l5', label: 'تمييز الفرق السمعي بين Sit و Set', completed: false },
            { id: 'l6', label: 'فهم سؤال "What is your name?" والرد عليه', completed: true },
            { id: 'l7', label: 'اتباع تعليمات من خطوتين متتاليتين', completed: false },
            { id: 'l8', label: 'تمييز أصوات الآلات الموسيقية بالإنجليزية', completed: true },
            { id: 'l9', label: 'الاستماع لأنشودة وتكرار القافية', completed: false },
            { id: 'l10', label: 'تمييز الكلمات التي تبدأ بحرف S', completed: true },
        ]
    },
    {
        id: 'conversation',
        label: 'المحادثة',
        tone: 'bg-violet-500',
        problemSolved: 'هندسة الجملة: إتقان ترتيب (الصفة قبل الموصوف).',
        aiNote: 'تحسن في استخدام أفعال الكينونة (Is/Are)، مع العمل على تقليل التردد.',
        icon: Mic2,
        tasks: [
            { id: 'c1', label: 'إلقاء التحية "Hello" والوداع "Goodbye"', completed: true },
            { id: 'c2', label: 'تعريف النفس باستخدام "I am..."', completed: true },
            { id: 'c3', label: 'استخدام جملة "I see a..." لوصف صورة', completed: true },
            { id: 'c4', label: 'طلب الإذن باستخدام "Can I...?"', completed: false },
            { id: 'c5', label: 'وصف لون 5 أشياء مختلفة في الغرفة', completed: true },
            { id: 'c6', label: 'التمييز بين استخدام "He" و "She"', completed: false },
            { id: 'c7', label: 'الإجابة على أسئلة Yes/No بوضوح', completed: true },
            { id: 'c8', label: 'استخدام جملة "I have..." لوصف الممتلكات', completed: false },
            { id: 'c9', label: 'وصف المشاعر الأساسية (Happy/Sad)', completed: false },
            { id: 'c10', label: 'إجراء حوار قصير من 3 جمل متصلة', completed: false },
        ]
    },
    {
        id: 'vocabulary',
        label: 'المفردات',
        tone: 'bg-emerald-500',
        problemSolved: 'تحدي التعريف: استخدام أدوات التنكير (A & An) بشكل تلقائي.',
        aiNote: 'يلتقط الكلمات الجديدة بسهولة ويحتفظ بها جيداً خلال الأنشطة.',
        icon: BookOpenCheck,
        tasks: [
            { id: 'v1', label: 'حفظ وتسمية 10 ألوان أساسية', completed: true },
            { id: 'v2', label: 'حفظ وتسمية 10 أنواع من الفواكه', completed: true },
            { id: 'v3', label: 'استخدام A و An قبل الأسماء بشكل صحيح', completed: true },
            { id: 'v4', label: 'حفظ 5 كلمات تتعلق بالملابس', completed: true },
            { id: 'v5', label: 'استخدام s الجمع في الكلمات البسيطة', completed: true },
            { id: 'v6', label: 'حفظ وتسمية أفراد العائلة الأساسيين', completed: true },
            { id: 'v7', label: 'تمييز كلمات الأدوات المدرسية', completed: true },
            { id: 'v8', label: 'حفظ 5 أفعال حركة (Run, Jump, etc)', completed: true },
            { id: 'v9', label: 'تسمية أدوات المائدة بالإنجليزية', completed: false },
            { id: 'v10', label: 'تسمية 5 أجزاء رئيسية من الجسم', completed: false },
        ]
    },
    {
        id: 'pronunciation',
        label: 'النطق',
        tone: 'bg-orange-500',
        problemSolved: 'المخارج الصعبة: تجاوز مشكلة (P vs B) والعمل على الحروف الصامتة.',
        aiNote: 'يحتاج لمراجعة الحروف التي تُكتب ولا تُنطق (Silent Letters).',
        icon: Sparkles,
        tasks: [
            { id: 'p1', label: 'نطق حرف P بوضوح (إخراج هواء)', completed: true },
            { id: 'p2', label: 'التمييز بين B و P في الكلمات المتشابهة', completed: true },
            { id: 'p3', label: 'نطق الكلمات المنتهية بـ Magic e', completed: false },
            { id: 'p4', label: 'نطق الـ Th بوضع اللسان الصحيح', completed: true },
            { id: 'p5', label: 'التعرف على الحروف الصامتة (مثل K في Knife)', completed: false },
            { id: 'p6', label: 'نطق أصوات الشين (Sh) بوضوح', completed: true },
            { id: 'p7', label: 'نطق أصوات التاء (T) في نهاية الكلمات', completed: false },
            { id: 'p8', label: 'تحسين نطق الحروف المتحركة الطويلة (ee, oo)', completed: false },
            { id: 'p9', label: 'التحكم في نبرة الصوت عند السؤال', completed: false },
            { id: 'p10', label: 'نطق الكلمات ثلاثية الحروف (CVC) بطلاقة', completed: true },
        ]
    },
    {
        id: 'literacy',
        label: 'القراءة والكتابة',
        tone: 'bg-indigo-500',
        problemSolved: 'الاتجاه والتمييز: استقرار القراءة من اليسار، وتمييز (b, d, p, q).',
        aiNote: 'تقدم ملحوظ في سرعة "فك الشفرات" (Blending) للكلمات الجديدة.',
        icon: FileText,
        tasks: [
            { id: 'r1', label: 'كتابة كافة الحروف الكبيرة بشكل صحيح', completed: true },
            { id: 'r2', label: 'كتابة كافة الحروف الصغيرة بشكل صحيح', completed: true },
            { id: 'r3', label: 'التمييز البصري التام بين b و d', completed: true },
            { id: 'r4', label: 'قراءة كلمات ثلاثية بسيطة (Cat, Dog)', completed: true },
            { id: 'r5', label: 'الالتزام باتجاه الكتابة من اليسار لليمين', completed: true },
            { id: 'r6', label: 'تهجئة اسم الطالب بالكامل كتابةً', completed: true },
            { id: 'r7', label: 'قراءة جملة مكونة من 3 كلمات بصوت عالٍ', completed: true },
            { id: 'r8', label: 'تمييز 10 كلمات بصر (Sight words) شائعة', completed: false },
            { id: 'r9', label: 'ربط 20 حرفاً بصور تبدأ بها', completed: true },
            { id: 'r10', label: 'قراءة قصة قصيرة جداً (مستوى 1)', completed: false },
        ]
    },
    {
        id: 'confidence',
        label: 'الثقة',
        tone: 'bg-rose-500',
        problemSolved: 'كسر الحاجز: انخفاض الخجل والمبادرة بتسجيل المقاطع الصوتية.',
        aiNote: 'تزداد الثقة مع وجود الدعم البصري والتشجيع المباشر.',
        icon: BrainCircuit,
        tasks: [
            { id: 'cf1', label: 'بدء الحصة بتحية واضحة وبصوت مسموع', completed: true },
            { id: 'cf2', label: 'تسجيل أول مقطع صوتي اختياري في المنصة', completed: true },
            { id: 'cf3', label: 'الإجابة على سؤال مفاجئ دون تردد طويل', completed: true },
            { id: 'cf4', label: 'المشاركة الفعالة في الألعاب الجماعية', completed: true },
            { id: 'cf5', label: 'طلب المساعدة من المعلمة بالإنجليزية', completed: false },
            { id: 'cf6', label: 'الغناء أو إنشاد قصيدة قصيرة أمام الآخرين', completed: false },
            { id: 'cf7', label: 'تصحيح خطأ للنفس أثناء التحدث بشجاعة', completed: false },
            { id: 'cf8', label: 'المبادرة بالحديث مع المعلمة في بداية الحصة', completed: true },
            { id: 'cf9', label: 'عرض عمل فني وشرحه بكلمات بسيطة', completed: false },
            { id: 'cf10', label: 'تسجيل فيديو قصير يتحدث فيه عن يومه', completed: false },
        ]
    },
    {
        id: 'commitment',
        label: 'الالتزام',
        tone: 'bg-slate-500',
        problemSolved: 'الاستمرارية: تفاعل يومي ممتاز مع الحاجة لتنظيم تسليم الواجبات.',
        aiNote: 'يحتاج لمتابعة في الاستمرارية الأسبوعية لضمان تثبيت المعلومة.',
        icon: Clock3,
        tasks: [
            { id: 'cm1', label: 'حضور 3 حصص متتالية دون غياب', completed: true },
            { id: 'cm2', label: 'تسليم الواجب المنزلي في موعده المحدد', completed: true },
            { id: 'cm3', label: 'فتح التطبيق والممارسة لمدة 5 أيام متتالية', completed: true },
            { id: 'cm4', label: 'إكمال نشاط إضافي اختياري لزيادة النقاط', completed: true },
            { id: 'cm5', label: 'مراجعة الكلمات المكتسبة في الأسبوع السابق', completed: true },
            { id: 'cm6', label: 'التفاعل مع منشورات الزملاء في مجتمع التعلم', completed: true },
            { id: 'cm7', label: 'تكرار تمرين صعب 3 مرات حتى الإتقان', completed: true },
            { id: 'cm8', label: 'الاستماع لنصيحة المعلمة وتطبيقها في الواجب', completed: true },
            { id: 'cm9', label: 'تحقيق Streak (سلسلة تعلم) لمدة 5 أيام', completed: false },
            { id: 'cm10', label: 'إكمال التقييم الأسبوعي الشامل بنجاح', completed: false },
        ]
    },
];

const studentReport = {
    studentName: 'عمر فهد',
    age: 7,
    country: 'المملكة العربية السعودية',
    grade: 'الصف الثاني الابتدائي',
    level: 'Pre-A1',
    reportingPeriod: 'أبريل 2026',
    teacher: 'المعلمة إيما',
    attendance: '95%',
    pathway: 'Phonics + Vocabulary Foundation',
    status: 'مسار إيجابي متسارع',
    sessionsCompleted: 12,
    newWords: 48,
    completedActivities: 24,
    practiceMinutes: 180,
    rankings: {
        global: 124,
        class: 3,
        percentile: 92,
    },
    xp: {
        current: 850,
        nextLevel: 1000,
        level: 8,
    },
    strengths: [
        'يستجيب بسرعة للتعليمات البسيطة عندما تكون مدعومة بصورة أو إشارة واضحة.',
        'يكتسب المفردات البصرية بسرعة ويسترجع الكلمات المألوفة بثقة أعلى من السابق.',
        'مدة إجابته الشفهية أصبحت أطول من بداية الأسبوع وبدأ يركب جملة كاملة أحيانًا.',
    ],
    needsSupport: [
        'ما يزال مترددًا قبل بدء الإجابة الشفهية ويحتاج إلى تهيئة قصيرة في بداية كل جلسة.',
        'يخلط أحيانًا بين صوتي P و B ويحتاج إلى تدريب نطقي موجه داخل جمل قصيرة.',
        'التزام الواجب جيد إجمالًا لكنه يحتاج متابعة أقرب في التسليم قبل الجلسة القادمة.',
    ],
    masteredWords: ['cat', 'dog', 'bird', 'school', 'bag', 'book', 'apple', 'blue'],
    reviewWords: ['pen', 'fish', 'purple', 'playground'],
    teacherNote:
        'عمر أصبح أكثر ارتياحًا أثناء التكرار، وبدأ يستخدم جملًا أطول عند وجود صورة داعمة. الفهم العام جيد، لكن التحدي الأساسي الحالي هو الثقة قبل الكلام وليس فهم المطلوب.',
    parentAdvice:
        'ننصح بإعادة نشاط الصور القصير مرتين هذا الأسبوع، مع تشجيع عمر على قول جملة كاملة بدل كلمة واحدة، وعدم مقاطعته عند التردد حتى لا ينخفض حماسه.',
    homework:
        'واجب هذا الأسبوع: نشاط "My School Bag Speaking" لمدة 7 دقائق، ثم تسجيل 3 جمل قصيرة وإرسالها قبل الحصة القادمة.',
    aiSummary:
        'الطالب في مسار تحسن إيجابي. الفرصة الأهم الآن هي زيادة وقت حديثه داخل الجلسة من خلال أسئلة مفتوحة قصيرة وتمارين رفع الثقة قبل النشاط الرئيسي.',
};

const monthlyProgress = [
    { week: 'الأسبوع 1', score: 65, status: 'بداية مستقرة' },
    { week: 'الأسبوع 2', score: 72, status: 'تحسن ملحوظ' },
    { week: 'الأسبوع 3', score: 68, status: 'ثبات أداء' },
    { week: 'الأسبوع 4', score: 84, status: 'قفزة في الأداء' },
];

const badges = [
    { id: 1, name: 'بطل الاستمرار', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 2, name: 'نجم النطق', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { id: 3, name: 'صديق المكتبة', icon: BookOpenCheck, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 4, name: 'المتحدث الواعد', icon: Mic2, color: 'text-violet-500', bg: 'bg-violet-50' },
];

const ChildReportsPage: React.FC = () => {
    const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
    const [skills, setSkills] = useState(INITIAL_SKILLS_DATA);

    // Calculate dynamic scores based on completed tasks
    const getSkillScore = (skillId: string) => {
        const skill = skills.find(s => s.id === skillId);
        if (!skill) return 0;
        const completedCount = skill.tasks.filter(t => t.completed).length;
        return Math.round((completedCount / skill.tasks.length) * 100);
    };

    const toggleTask = (skillId: string, taskId: string) => {
        setSkills(prevSkills => 
            prevSkills.map(skill => {
                if (skill.id === skillId) {
                    return {
                        ...skill,
                        tasks: skill.tasks.map(task => 
                            task.id === taskId ? { ...task, completed: !task.completed } : task
                        )
                    };
                }
                return skill;
            })
        );
    };

    return (
        <div className="space-y-10 pb-20 font-sans" dir="rtl">
            {/* Header Section */}
            <header className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-2xl md:p-12">
                <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
                <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
                
                <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-col gap-8 md:flex-row md:items-center">
                        <div className="relative">
                            <img
                                src={omarAvatar}
                                alt={studentReport.studentName}
                                className="h-32 w-32 rounded-3xl border-4 border-white/10 bg-slate-800 object-cover p-1 shadow-2xl"
                            />
                            <div className="absolute -bottom-3 -right-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg ring-4 ring-slate-950">
                                <Trophy size={20} />
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-4xl font-black tracking-tight">{studentReport.studentName}</h1>
                                <span className="rounded-full bg-white/10 px-4 py-1 text-sm font-bold backdrop-blur-md">
                                    {studentReport.level}
                                </span>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-4 text-slate-400">
                                <div className="flex items-center gap-2">
                                    <CalendarDays size={16} />
                                    <span className="text-sm font-bold">{studentReport.age} سنوات</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Target size={16} />
                                    <span className="text-sm font-bold">{studentReport.grade}</span>
                                </div>
                                <div className="flex items-center gap-2 text-emerald-400">
                                    <TrendingUp size={16} />
                                    <span className="text-sm font-black">{studentReport.status}</span>
                                </div>
                            </div>

                            {/* Level Progress */}
                            <div className="mt-6 w-full max-w-md">
                                <div className="mb-2 flex items-center justify-between text-xs font-black uppercase tracking-widest text-slate-500">
                                    <span>المستوى {studentReport.xp.level}</span>
                                    <span>{studentReport.xp.current} / {studentReport.xp.nextLevel} XP</span>
                                </div>
                                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                                    <div 
                                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                                        style={{ width: `${(studentReport.xp.current / studentReport.xp.nextLevel) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:w-[40%]">
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-md transition-transform hover:scale-105">
                            <div className="mb-1 text-xs font-black text-slate-500">الترتيب العالمي</div>
                            <div className="flex items-center justify-center gap-2">
                                <Crown className="text-yellow-500" size={18} />
                                <span className="text-2xl font-black">#{studentReport.rankings.global}</span>
                            </div>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-md transition-transform hover:scale-105">
                            <div className="mb-1 text-xs font-black text-slate-500">ترتيب الفصل</div>
                            <div className="flex items-center justify-center gap-2">
                                <Medal className="text-blue-400" size={18} />
                                <span className="text-2xl font-black">#{studentReport.rankings.class}</span>
                            </div>
                        </div>
                        <div className="col-span-2 rounded-3xl border border-white/10 bg-emerald-500/10 p-5 text-center backdrop-blur-md transition-transform hover:scale-105 sm:col-span-1">
                            <div className="mb-1 text-xs font-black text-emerald-500/60">أفضل من</div>
                            <div className="text-2xl font-black text-emerald-400">{studentReport.rankings.percentile}%</div>
                            <div className="text-[10px] font-bold text-emerald-500/60 uppercase mt-1">من الطلاب</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Monthly Progress Tracker */}
            <section className="grid gap-8 lg:grid-cols-3">
                <div className="col-span-2 rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-2 text-indigo-600">
                                <History size={20} />
                                <span className="text-sm font-black uppercase tracking-wider">Growth Tracker</span>
                            </div>
                            <h2 className="mt-1 text-2xl font-black text-slate-900">تقدم الطالب في شهر {studentReport.reportingPeriod}</h2>
                        </div>
                        <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-2 text-emerald-700">
                            <TrendingUp size={18} />
                            <span className="text-sm font-black">نمو +14% عن الشهر السابق</span>
                        </div>
                    </div>

                    <div className="relative flex h-64 items-end justify-between gap-4 pt-10">
                        {/* Fake Chart Lines */}
                        <div className="absolute inset-x-0 top-10 flex flex-col justify-between h-full pointer-events-none opacity-20">
                            {[1, 2, 3, 4].map(i => <div key={i} className="border-t border-slate-300 w-full" />)}
                        </div>
                        
                        {monthlyProgress.map((item, index) => (
                            <div key={item.week} className="group relative flex flex-1 flex-col items-center">
                                <div className="mb-2 hidden text-xs font-black text-slate-900 transition-opacity group-hover:block">
                                    {item.score}%
                                </div>
                                <div 
                                    className="w-full rounded-2xl bg-gradient-to-t from-indigo-600 to-indigo-400 shadow-lg shadow-indigo-200 transition-all duration-500 hover:scale-105 hover:shadow-indigo-300"
                                    style={{ height: `${item.score}%` }}
                                >
                                    <div className="h-2 w-full bg-white/20" />
                                </div>
                                <div className="mt-4 text-center">
                                    <div className="text-sm font-black text-slate-900">{item.week}</div>
                                    <div className="text-[10px] font-bold text-slate-500">{item.status}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    {/* Badge Collection */}
                    <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-xl font-black text-slate-900">أوسمة هذا الشهر</h3>
                            <Medal className="text-slate-400" size={20} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {badges.map((badge) => {
                                const Icon = badge.icon;
                                return (
                                    <div key={badge.id} className={`flex flex-col items-center gap-2 rounded-3xl ${badge.bg} p-4 transition-transform hover:-translate-y-1`}>
                                        <div className={`rounded-2xl bg-white p-3 shadow-sm ${badge.color}`}>
                                            <Icon size={24} />
                                        </div>
                                        <span className="text-center text-[11px] font-black text-slate-700">{badge.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <button className="mt-6 w-full rounded-2xl bg-slate-50 py-3 text-sm font-black text-slate-600 transition-colors hover:bg-slate-100">
                            عرض كل الإنجازات
                        </button>
                    </div>
                </div>
            </section>

            {/* Core Metrics */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard 
                    title="عدد الحصص" 
                    value={`${studentReport.sessionsCompleted}`} 
                    icon={CalendarDays} 
                    tone="bg-blue-600" 
                    subtitle="التزام ممتاز بالمواعيد"
                />
                <StatCard 
                    title="الكلمات المكتسبة" 
                    value={`${studentReport.newWords}`} 
                    icon={Sparkles} 
                    tone="bg-emerald-600" 
                    subtitle="زيادة 20% عن الهدف"
                />
                <StatCard 
                    title="الأنشطة المنجزة" 
                    value={`${studentReport.completedActivities}`} 
                    icon={BookOpenCheck} 
                    tone="bg-violet-600" 
                    subtitle="تفاعل عالي مع التمارين"
                />
                <StatCard 
                    title="وقت الممارسة" 
                    value={`${studentReport.practiceMinutes} د`} 
                    icon={Clock3} 
                    tone="bg-orange-600" 
                    subtitle="معدل 15 دقيقة يومياً"
                />
            </div>

            {/* Learning Roadmap */}
            <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">خارطة طريق {studentReport.studentName}</h2>
                        <p className="mt-1 text-sm font-medium text-slate-500">المسار المخطط للوصول إلى المستوى التالي</p>
                    </div>
                    <Target className="text-slate-400" size={24} />
                </div>
                
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                    {[
                        { step: 'تأسيس النطق', status: 'completed', desc: 'إتقان الأصوات الأساسية' },
                        { step: 'تركيب الجمل', status: 'current', desc: 'استخدام جمل I see, I have' },
                        { step: 'القراءة بطلاقة', status: 'upcoming', desc: 'قراءة القصص القصيرة' },
                        { step: 'المحادثة الحرة', status: 'upcoming', desc: 'التحدث عن اليوم والمشاعر' },
                    ].map((step, idx) => (
                        <div key={idx} className="relative flex flex-1 flex-col items-center gap-3">
                            <div className={`z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 ${
                                step.status === 'completed' ? 'border-emerald-100 bg-emerald-500 text-white' :
                                step.status === 'current' ? 'border-indigo-100 bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]' :
                                'border-slate-50 bg-slate-100 text-slate-400'
                            }`}>
                                {step.status === 'completed' ? <CheckCircle2 size={20} /> : <span className="font-black">{idx + 1}</span>}
                            </div>
                            <div className="text-center">
                                <div className={`text-sm font-black ${step.status === 'upcoming' ? 'text-slate-400' : 'text-slate-900'}`}>{step.step}</div>
                                <div className="text-[10px] font-bold text-slate-500">{step.desc}</div>
                            </div>
                            {idx < 3 && (
                                <div className={`absolute right-[-50%] top-6 hidden h-1 w-full lg:block ${
                                    step.status === 'completed' ? 'bg-emerald-200' : 'bg-slate-100'
                                }`} />
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Detailed Skills Analysis (Dynamic Task System) */}
            <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">تحليل المهارات التفصيلي والمهام المنجزة</h2>
                        <p className="mt-1 text-sm font-medium text-slate-500">يتغير مؤشر التقدم تلقائياً مع إكمال كل مهمة من المهام العشر المحددة لكل مهارة.</p>
                    </div>
                    <BarChart3 className="text-slate-400" size={24} />
                </div>

                <div className="space-y-4">
                    {skills.map((skill) => {
                        const isExpanded = expandedSkill === skill.id;
                        const Icon = skill.icon;
                        const score = getSkillScore(skill.id);
                        const completedCount = skill.tasks.filter(t => t.completed).length;

                        return (
                            <div key={skill.id} className={`overflow-hidden rounded-3xl border transition-all duration-300 ${isExpanded ? 'border-indigo-200 bg-indigo-50/30' : 'border-slate-100 bg-slate-50 hover:bg-slate-100'}`}>
                                <button 
                                    onClick={() => setExpandedSkill(isExpanded ? null : skill.id)}
                                    className="flex w-full items-center justify-between p-6 text-right"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg ${skill.tone}`}>
                                            <Icon size={20} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg font-black text-slate-900">{skill.label}</span>
                                                <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-black text-emerald-600 shadow-sm">
                                                    {completedCount} / 10 مهام
                                                </span>
                                            </div>
                                            <div className="mt-1 text-sm font-bold text-slate-500">
                                                {score}% تقدم المهارة الحالية
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="hidden h-3 w-40 overflow-hidden rounded-full bg-slate-200 md:block shadow-inner">
                                            <div 
                                                className={`h-full ${skill.tone} transition-all duration-700 ease-out shadow-[0_0_10px_rgba(0,0,0,0.1)]`} 
                                                style={{ width: `${score}%` }} 
                                            />
                                        </div>
                                        {isExpanded ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                                    </div>
                                </button>
                                
                                <div className={`transition-all duration-500 ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="border-t border-indigo-100 p-8">
                                        {/* Linguistic context */}
                                        <div className="mb-8 grid gap-4 md:grid-cols-2">
                                            <div className="rounded-2xl border border-indigo-100 bg-white p-4">
                                                <div className="mb-2 text-[10px] font-black text-indigo-500 uppercase tracking-widest flex items-center gap-2">
                                                    <BrainCircuit size={12} />
                                                    الهدف اللغوي المحقق
                                                </div>
                                                <p className="text-sm font-bold text-slate-700">{skill.problemSolved}</p>
                                            </div>
                                            <div className="rounded-2xl bg-indigo-600 p-4 shadow-lg">
                                                <div className="mb-2 text-[10px] font-black text-indigo-100 uppercase tracking-widest flex items-center gap-2">
                                                    <Sparkles size={12} />
                                                    ملاحظة المعلم الذكي
                                                </div>
                                                <p className="text-sm font-medium text-white/90">{skill.aiNote}</p>
                                            </div>
                                        </div>

                                        {/* Actionable Task List */}
                                        <div>
                                            <h4 className="mb-4 text-sm font-black text-slate-900 flex items-center gap-2">
                                                <Target size={16} className="text-indigo-600" />
                                                المهام المطلوبة للإتقان (10 خطوات)
                                            </h4>
                                            <div className="grid gap-3 sm:grid-cols-2">
                                                {skill.tasks.map((task) => (
                                                    <button
                                                        key={task.id}
                                                        onClick={() => toggleTask(skill.id, task.id)}
                                                        className={`flex items-center gap-3 rounded-2xl border p-4 text-right transition-all hover:scale-[1.02] active:scale-95 ${
                                                            task.completed 
                                                            ? 'border-emerald-200 bg-emerald-50/50 text-emerald-900' 
                                                            : 'border-slate-100 bg-white text-slate-600'
                                                        }`}
                                                    >
                                                        {task.completed 
                                                            ? <CheckCircle className="shrink-0 text-emerald-500" size={20} /> 
                                                            : <Circle className="shrink-0 text-slate-300" size={20} />
                                                        }
                                                        <span className={`text-sm font-bold ${task.completed ? 'line-through opacity-70' : ''}`}>
                                                            {task.label}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* AI Advisor Insight */}
                <div className="mt-10 rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <BrainCircuit size={80} />
                    </div>
                    <div className="relative z-10">
                        <div className="mb-4 flex items-center gap-3 text-emerald-400">
                            <Sparkles size={24} />
                            <h3 className="text-xl font-black">نصيحة الموجه الذكي (AI Insight)</h3>
                        </div>
                        <blockquote className="text-lg font-medium leading-9 text-slate-300">
                            "عمر يقترب من <span className="text-emerald-400 font-black">إتقان المستوى الحالي</span>. نلاحظ أن المهام المتبقية تتركز في مهارة <span className="text-orange-400 font-black">النطق والمحادثة</span>. إتمام 3 مهام إضافية في هذه الأقسام سيؤهله لاختبار المستوى التالي فوراً."
                        </blockquote>
                    </div>
                </div>
            </section>

            {/* Strengths & Growth Areas */}
            <section className="grid gap-8 lg:grid-cols-2">
                <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-xl">
                    <div className="mb-8 flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                            <CheckCircle2 size={28} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900">نقاط القوة الحالية</h3>
                    </div>
                    <div className="space-y-4">
                        {studentReport.strengths.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-4 rounded-3xl bg-emerald-50/50 p-5 transition-transform hover:scale-[1.02]">
                                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] font-black">
                                    {idx + 1}
                                </div>
                                <p className="text-base font-bold leading-7 text-slate-700">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-xl">
                    <div className="mb-8 flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                            <Target size={28} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900">فرص التطوير</h3>
                    </div>
                    <div className="space-y-4">
                        {studentReport.needsSupport.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-4 rounded-3xl bg-rose-50/50 p-5 transition-transform hover:scale-[1.02]">
                                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white text-[10px] font-black">
                                    {idx + 1}
                                </div>
                                <p className="text-base font-bold leading-7 text-slate-700">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vocabulary Mastery */}
            <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">حصيلة المفردات</h2>
                        <p className="mt-1 text-sm font-medium text-slate-500">الكلمات التي تم إتقانها والكلمات تحت المراجعة</p>
                    </div>
                    <BookOpenCheck className="text-slate-400" size={24} />
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    <div className="rounded-[2rem] bg-emerald-50/50 p-6">
                        <h4 className="mb-4 text-sm font-black text-emerald-700">كلمات أتقنها (Mastered)</h4>
                        <div className="flex flex-wrap gap-2">
                            {studentReport.masteredWords.map((word) => (
                                <span key={word} className="rounded-2xl bg-white px-4 py-2.5 text-sm font-black text-slate-700 shadow-sm border border-emerald-100 transition-transform hover:scale-110">
                                    {word}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="rounded-[2rem] bg-rose-50/50 p-6">
                        <h4 className="mb-4 text-sm font-black text-rose-700">كلمات تحت المراجعة (Review)</h4>
                        <div className="flex flex-wrap gap-2">
                            {studentReport.reviewWords.map((word) => (
                                <span key={word} className="rounded-2xl bg-white px-4 py-2.5 text-sm font-black text-slate-700 shadow-sm border border-rose-100 transition-transform hover:scale-110">
                                    {word}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Action Center (Homework & Advice) */}
            <section className="rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-2xl md:p-12">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-black">مركز متابعة المنزل</h2>
                    <p className="mt-2 text-slate-400">خطوات عملية لتعزيز مستوى {studentReport.studentName} هذا الأسبوع</p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10">
                        <div className="mb-6 flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                                <FileText size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black">واجب هذا الأسبوع</h3>
                                <div className="mt-1 flex items-center gap-2 text-xs font-bold text-emerald-500">
                                    <Clock3 size={14} />
                                    <span>يستغرق حوالي 15 دقيقة</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-lg font-medium leading-8 text-slate-300">
                            {studentReport.homework}
                        </p>
                        <button className="mt-8 flex items-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 font-black text-white transition-transform hover:scale-105 active:scale-95">
                            <span>ابدأ الواجب الآن</span>
                            <ArrowUpRight size={18} />
                        </button>
                    </div>

                    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10">
                        <div className="mb-6 flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400">
                                <MessageSquareQuote size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black">توصية للأهل</h3>
                                <div className="mt-1 flex items-center gap-2 text-xs font-bold text-amber-500">
                                    <BrainCircuit size={14} />
                                    <span>نصيحة تربوية مخصصة</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-lg font-medium leading-8 text-slate-300">
                            {studentReport.parentAdvice}
                        </p>
                        <div className="mt-8 flex gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-slate-400">
                                <CheckCircle2 size={18} />
                            </div>
                            <span className="text-sm font-bold text-slate-400 leading-relaxed">
                                اتباع هذه النصيحة يزيد من سرعة تعلم الطالب بنسبة 30% حسب إحصائياتنا.
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Support */}
            <footer className="text-center">
                <p className="text-sm font-bold text-slate-400">
                    هل لديك استفسار حول التقرير؟ <button className="text-indigo-600 hover:underline">تحدث مع المعلمة إيما</button>
                </p>
            </footer>
        </div>
    );
};

export default ChildReportsPage;
