import { Bird, CalendarDays, Cat, Crown, Dog, Fish, Gem, Sparkles, Wallet } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const childProfile = {
    id: 'omar-01',
    name: 'عمر',
    age: 7,
    grade: 'الصف الثاني',
    level: 'Pre-A1',
    track: 'الأصوات + المفردات',
    stage: 'مسار التأسيس',
    lastSession: 'الأحد 4:00 مساءً',
    nextSession: 'الثلاثاء 5:00 مساءً',
    teacher: 'المعلمة إيما',
    focus: 'أصوات P / B + الثقة في التحدث',
};

export const growthBreakdown = [
    { label: 'المفردات', value: 82, tone: 'bg-emerald-500' },
    { label: 'النطق', value: 61, tone: 'bg-orange-500' },
    { label: 'الاستماع', value: 70, tone: 'bg-sky-500' },
    { label: 'المحادثة', value: 66, tone: 'bg-violet-500' },
    { label: 'الحضور', value: 90, tone: 'bg-amber-500' },
];

export const weeklyReport = {
    sessionsCompleted: '2 / 2',
    wordsLearned: 18,
    activitiesDone: 4,
    practiceMinutes: 32,
    weeklySkill: 'تحسن في نطق /p/ و /b/',
    teacherNote: 'عمر أصبح أكثر ثقة في تكرار الكلمات، لكنه يحتاج إلى مراجعة كلمات: pen, book, bag.',
    parentTip: 'ننصح بمراجعة نشاط My School Bag مرتين قبل الحصة القادمة.',
};

export const audioProgress = [
    { label: 'قبل البرنامج', date: '1 يناير', score: 42, note: 'يتردد قبل إكمال الجملة.' },
    { label: 'بعد 8 أسابيع', date: '28 فبراير', score: 71, note: 'وضوح أعلى في الجمل القصيرة.' },
];

export const learningTimeline = [
    { week: 'الأسبوع 1', title: 'التشخيص', status: 'completed', goal: 'تحديد المفردات الأساسية والثقة في الاستجابة.' },
    { week: 'الأسبوع 2', title: 'بناء المفردات', status: 'completed', goal: 'فهم كلمات المدرسة والحيوانات والألوان.' },
    { week: 'الأسبوع 4', title: 'الأصوات', status: 'active', goal: 'التمييز بين أصوات P و B.', task: 'استمع وكرر 10 كلمات.' },
    { week: 'الأسبوع 6', title: 'الجمل القصيرة', status: 'upcoming', goal: 'استخدام I can see و I have got.' },
    { week: 'الأسبوع 9', title: 'القراءة', status: 'upcoming', goal: 'قراءة جمل قصيرة مع دعم بصري.' },
    { week: 'الأسبوع 12', title: 'التقييم النهائي', status: 'upcoming', goal: 'قياس التطور في النطق والمحادثة.' },
];

export const todayMission = {
    title: 'تعلّم 5 كلمات عن الحيوانات',
    subtitle: 'cat, dog, bird, fish, rabbit',
    streak: 7,
    stars: 3,
};

export const rewardBadges = [
    'نجمة التحدث الأولى',
    '7 أيام ممارسة',
    'بطل الأصوات',
    'باني المفردات',
    'متحدث شجاع',
];

export const dailyChoices: Array<{ id: string; label: string; icon: LucideIcon }> = [
    { id: 'cat', label: 'قطة', icon: Cat },
    { id: 'dog', label: 'كلب', icon: Dog },
    { id: 'bird', label: 'طائر', icon: Bird },
    { id: 'fish', label: 'سمكة', icon: Fish },
];

export const teacherSessions = [
    { id: 'sara-1', time: '4:00', learner: 'سارة', level: 'Pre-A1', type: 'فردية', prep: 'جاهز', focus: 'الحركات القصيرة + الثقة' },
    { id: 'group-a', time: '5:00', learner: 'المجموعة أ', level: 'A1', type: 'جماعية', prep: 'الشرائح جاهزة', focus: 'الحيوانات + I can see' },
    { id: 'omar-1', time: '6:00', learner: 'عمر', level: 'Pre-A1', type: 'فردية', prep: 'الواجب غير مكتمل', focus: 'مراجعة P / B' },
];

export const weakStudents = [
    'سارة تحتاج دعماً في الحركات القصيرة',
    'عمر لم يكمل الواجب الأخير',
    'المجموعة أ منخفضة التفاعل في المحادثة',
];

export const adminStats = [
    { title: 'الطلاب النشطون', value: '1,284', delta: '+8%', tone: 'bg-sky-500' },
    { title: 'المعلمون', value: '46', delta: '+3', tone: 'bg-violet-500' },
    { title: 'حصص اليوم', value: '312', delta: '+12%', tone: 'bg-emerald-500' },
    { title: 'متوسط مؤشر التقدم', value: '74', delta: '+5 نقاط', tone: 'bg-orange-500' },
];

export const adminStudents = [
    { name: 'عمر', age: 7, grade: 'الصف الثاني', level: 'Pre-A1', plan: 'متوسطة', status: 'نشط' },
    { name: 'ليان', age: 6, grade: 'الصف الأول', level: 'A0', plan: 'اقتصادية', status: 'يحتاج متابعة' },
    { name: 'سارة', age: 8, grade: 'الصف الثالث', level: 'A1', plan: 'بريميوم', status: 'نشط' },
];

export const adminTeachers = [
    { name: 'المعلمة إيما', speciality: 'رياض الأطفال + الأصوات', capacity: 8, rating: 4.8, load: 75, accent: 'بريطانية' },
    { name: 'المعلم جيمس', speciality: 'الصف 1-3 محادثة', capacity: 7, rating: 4.7, load: 60, accent: 'أمريكية' },
    { name: 'المعلمة نورا', speciality: 'القراءة + المفردات', capacity: 6, rating: 4.9, load: 82, accent: 'بريطانية' },
];

export const curriculumUnits = [
    {
        level: 'الصف الثاني',
        unit: 'الحيوانات',
        lesson: 'أستطيع رؤية الحيوانات',
        targetWords: ['cat', 'dog', 'bird', 'fish'],
        targetSentence: 'I can see a cat',
        skills: ['الاستماع', 'المحادثة', 'المفردات'],
        homework: 'استمع واختر الحيوان الصحيح',
    },
    {
        level: 'KG2',
        unit: 'الألوان',
        lesson: 'ما لون هذا؟',
        targetWords: ['red', 'blue', 'yellow'],
        targetSentence: 'It is red',
        skills: ['الاستماع', 'المحادثة'],
        homework: 'سجل 3 كلمات عن الألوان',
    },
];

export const pricingPlans = [
    {
        name: 'الباقة الاقتصادية',
        price: '249 - 399 ريال',
        icon: Wallet,
        highlight: false,
        features: ['حصتان جماعيتان أسبوعيًا', '4 إلى 6 طلاب', 'أنشطة ذاتية', 'تقرير أسبوعي'],
    },
    {
        name: 'الباقة المتوسطة',
        price: '449 - 699 ريال',
        icon: Sparkles,
        highlight: true,
        features: ['3 حصص أسبوعيًا', 'مجموعة صغيرة', 'أنشطة يومية', 'تقييم شهري'],
    },
    {
        name: 'باقة بريميوم',
        price: '799 - 1,400 ريال',
        icon: Crown,
        highlight: false,
        features: ['حصص فردية أو هجينة', 'معلم أصلي للغة', 'تقرير مفصل', 'تسجيل صوتي قبل وبعد'],
    },
    {
        name: 'باقة التأسيس المكثف',
        price: '1,200 - 2,000 ريال',
        icon: Gem,
        highlight: false,
        features: ['4 حصص أسبوعيًا', 'تقييم أسبوعي', 'متابعة دقيقة', 'مناسبة للطلاب الضعفاء'],
    },
];

export const parentSessions = [
    { day: 'الأحد', time: '4:00 مساءً', title: 'محادثة الحيوانات', mode: 'مباشرة فردية', status: 'مكتملة' },
    { day: 'الثلاثاء', time: '5:00 مساءً', title: 'حقيبتي المدرسية', mode: 'مباشرة جماعية', status: 'قادمة' },
];

export const placementStepsKg = [
    'اختر اللون الصحيح',
    'اسمع الكلمة واختر الصورة',
    'كرر كلمة قصيرة',
    'اختر الحرف المناسب',
    'أجب شفهيًا عن سؤال بسيط',
];

export const placementStepsPrimary = [
    'اقرأ كلمة',
    'اسمع جملة واختر الصورة',
    'رتب كلمات',
    'سجل جملة',
    'أجب عن سؤال محادثة',
];

export const scheduleWeek = [
    { day: 'الأحد', sessions: 7 },
    { day: 'الاثنين', sessions: 9 },
    { day: 'الثلاثاء', sessions: 8 },
    { day: 'الأربعاء', sessions: 6 },
    { day: 'الخميس', sessions: 5 },
];

export const billingItems = [
    { title: 'الباقة الحالية', value: 'الباقة المتوسطة' },
    { title: 'التجديد القادم', value: '15 مارس 2026' },
    { title: 'الدفعة الشهرية', value: '549 ريال' },
    { title: 'الحالة', value: 'نشطة' },
];

export const reportHighlights = [
    'أتقن 18 كلمة جديدة هذا الأسبوع',
    'تحسن في نطق /p/ و /b/',
    'أكمل جميع الأنشطة المطلوبة',
    'يحتاج دعمًا إضافيًا في صوت V',
];

export const liveClassPhases = [
    { label: 'تمهيد', time: '3 دقائق' },
    { label: 'لعبة مفردات', time: '6 دقائق' },
    { label: 'تدريب محادثة', time: '8 دقائق' },
    { label: 'تقييم سريع', time: '4 دقائق' },
];

export const summaryQuickActions = [
    'أتقن كلمات اليوم',
    'يحتاج مراجعة P/B',
    'يحتاج تدريب V/F',
    'لم يكمل الواجب',
    'تحسن واضح في الثقة',
];

export const sidebarSections = {
    parent: [
        { label: 'الرئيسية', path: '/parent/dashboard' },
        { label: 'تقدم الطفل', path: '/parent/child/omar-01/progress' },
        { label: 'التقارير', path: '/parent/child/omar-01/reports' },
        { label: 'التسجيلات', path: '/parent/child/omar-01/audio-progress' },
        { label: 'الحصص', path: '/parent/sessions' },
        { label: 'الباقة والدفع', path: '/parent/billing' },
    ],
    student: [
        { label: 'مهمتي اليوم', path: '/student/dashboard' },
        { label: 'التدريب اليومي', path: '/student/daily-practice' },
        { label: 'الحصة المباشرة', path: '/student/live-class' },
        { label: 'التسجيل الصوتي', path: '/student/voice-practice' },
        { label: 'النجوم والشارات', path: '/student/rewards' },
    ],
    teacher: [
        { label: 'حصصي اليوم', path: '/teacher/dashboard' },
        { label: 'الطلاب', path: '/teacher/students' },
        { label: 'بطاقة ما قبل الحصة', path: '/teacher/session/sara-1/brief' },
        { label: 'الجلسة المباشرة', path: '/teacher/session/sara-1/live' },
        { label: 'ملخص بعد الحصة', path: '/teacher/session/sara-1/summary' },
    ],
    admin: [
        { label: 'لوحة التحكم', path: '/admin/dashboard' },
        { label: 'الطلاب', path: '/admin/students' },
        { label: 'المعلمون', path: '/admin/teachers' },
        { label: 'الجداول', path: '/admin/schedule' },
        { label: 'المناهج', path: '/admin/curriculum' },
        { label: 'الاشتراكات', path: '/admin/subscriptions' },
    ],
};

export const sessionReviewMatrix = [
    { skill: 'الحضور', value: 'حضر' },
    { skill: 'التفاعل', value: 'جيد' },
    { skill: 'النطق', value: 'يحتاج مراجعة' },
    { skill: 'المفردات', value: 'أتقن جزئيًا' },
    { skill: 'المحادثة', value: 'متردد' },
];

export const reportsQueue = [
    { parent: 'عمر', score: '74 / 100', attendance: '90%', renewal: 'مرشح للاستمرار' },
    { parent: 'ليان', score: '58 / 100', attendance: '65%', renewal: 'يحتاج تدخل' },
    { parent: 'سارة', score: '83 / 100', attendance: '95%', renewal: 'احتمال ترقية الخطة' },
];

export const scheduleAlert = {
    teacher: 'المعلمة إيما',
    message: 'هذا المعلم لديه 9 حصص اليوم. يفضل ألا يتجاوز 8 حصص للأطفال الصغار للحفاظ على الجودة.',
};

export const upcomingMilestones = [
    { title: 'تقرير الشهر', date: '28 فبراير', icon: CalendarDays },
    { title: 'إعادة تقييم النطق', date: '3 مارس', icon: CalendarDays },
];
