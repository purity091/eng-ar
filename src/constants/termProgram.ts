export type PackageId = 'foundation' | 'progress' | 'mastery';

export interface TermKpiTarget {
    label: string;
    target: string;
}

export interface TermPackage {
    id: PackageId;
    name: string;
    subtitle: string;
    audience: string;
    duration: string;
    weeklyLiveSessions: string;
    automationLevel: string;
    entryLevel: string;
    targetLevel: string;
    priceRange: string;
    priceHint: string;
    outcomes: string[];
    components: string[];
    kpis: TermKpiTarget[];
    highlight?: boolean;
}

export interface LearningJourneyPhase {
    phase: string;
    title: string;
    description: string;
}

export interface GrowthOffer {
    title: string;
    value: string;
    details: string;
}

export interface StudentKpiMetric {
    key: string;
    label: string;
}

export const saudiAcademicModel = {
    region: 'المملكة العربية السعودية',
    termsPerYear: 3,
    weeksPerTerm: 13,
    schoolDaysPerTerm: '60-65 يومًا دراسيًا',
};

export const termSeasons = ['الفصل الصيفي', 'الفصل الخريفي', 'الفصل الربيعي'];

export const minimumSubscriptionTerms = 1;

export const learningJourney: LearningJourneyPhase[] = [
    {
        phase: 'الأسبوع 1-2',
        title: 'التشخيص والتهيئة',
        description: 'اختبار تحديد المستوى، تهيئة الطالب، وضبط خطة التعلم الفردية لكل فصل.',
    },
    {
        phase: 'الأسبوع 3-8',
        title: 'التعلم الأساسي المكثف',
        description: 'جلسات مباشرة + أنشطة يومية قصيرة لرفع المفردات والفهم والنطق بشكل متدرج.',
    },
    {
        phase: 'الأسبوع 9-11',
        title: 'التطبيق العملي (تركيز التحدث)',
        description: 'تدريبات محادثة موجهة، مواقف حياتية، وزيادة وقت تحدث الطالب داخل الجلسة.',
    },
    {
        phase: 'الأسبوع 12-13',
        title: 'التقييم النهائي والتوصية',
        description: 'قياس مستوى الخروج، إصدار تقرير نهاية الفصل للأهل، وتوصية الخطة للفصل التالي.',
    },
];

export const studentKpis: StudentKpiMetric[] = [
    { key: 'words', label: 'عدد الكلمات المكتسبة' },
    { key: 'pronunciation', label: 'تحسن النطق' },
    { key: 'sentences', label: 'عدد الجمل المستخدمة' },
    { key: 'fluency', label: 'مستوى الطلاقة' },
    { key: 'listening', label: 'الفهم السمعي' },
];

export const termPackages: TermPackage[] = [
    {
        id: 'foundation',
        name: 'Foundation Term',
        subtitle: 'باقة التأسيس',
        audience: 'رياض الأطفال + الصفوف الأولى',
        duration: 'فصل دراسي كامل (13 أسبوعًا)',
        weeklyLiveSessions: 'جلستان مباشرتان أسبوعيًا',
        automationLevel: 'أتمتة متوسطة',
        entryLevel: 'A0 / Pre-A1',
        targetLevel: 'Pre-A1 قوي',
        priceRange: '2,490 - 3,490 ريال / الفصل',
        priceHint: 'تكلفة منخفضة مع نتائج تأسيسية قابلة للقياس.',
        outcomes: [
            'التعرف على 150-300 كلمة جديدة',
            'تكوين جمل بسيطة للاستخدام اليومي',
            'تحسن أولي واضح في النطق',
        ],
        components: [
            'محتوى تفاعلي بسيط (ألعاب + كلمات + نطق)',
            'واجبات قصيرة مؤتمتة',
            'تقييم شهري تلقائي',
            'تقرير نهاية الفصل للأهل',
        ],
        kpis: [
            { label: 'نمو المفردات', target: '150-300 كلمة' },
            { label: 'دقة النطق', target: '+15% إلى +25%' },
            { label: 'استخدام الجمل', target: '5-10 جمل قصيرة' },
        ],
    },
    {
        id: 'progress',
        name: 'Progress Term',
        subtitle: 'باقة التقدم',
        audience: 'طلاب الابتدائي (مستوى متوسط)',
        duration: 'فصل دراسي كامل (13 أسبوعًا)',
        weeklyLiveSessions: '3 جلسات مباشرة أسبوعيًا',
        automationLevel: 'أتمتة مرتفعة',
        entryLevel: 'Pre-A1 / A1',
        targetLevel: 'A1 أقوى / بداية A2',
        priceRange: '4,490 - 6,490 ريال / الفصل',
        priceHint: 'توازن بين كثافة الحصص والتشخيص الذكي والتقارير التفصيلية.',
        outcomes: [
            'تحسن ملحوظ في التحدث والفهم',
            'القدرة على محادثة بسيطة بثقة أعلى',
            'زيادة مفردات بنسبة قابلة للقياس',
        ],
        components: [
            'تمارين يومية قصيرة Micro-learning',
            'تحليل نطق عبر الذكاء الاصطناعي',
            'اختبار تحديد مستوى بداية/نهاية الفصل',
            'تقارير أسبوعية + تقرير نهائي مفصل',
        ],
        kpis: [
            { label: 'نمو المفردات', target: '+30% إلى +45%' },
            { label: 'دقة النطق', target: '+20% إلى +35%' },
            { label: 'الفهم السمعي', target: '+25%+' },
        ],
        highlight: true,
    },
    {
        id: 'mastery',
        name: 'Mastery Term',
        subtitle: 'باقة الإتقان',
        audience: 'طلاب جادون + أولياء أمور يبحثون عن نتائج قوية',
        duration: 'فصل دراسي كامل (13 أسبوعًا)',
        weeklyLiveSessions: '4-5 جلسات أسبوعيًا',
        automationLevel: 'أتمتة عالية + تخصيص مرتفع',
        entryLevel: 'A1 / A2',
        targetLevel: 'A2 أقوى / بداية B1',
        priceRange: '7,990 - 11,900 ريال / الفصل',
        priceHint: 'أعلى تخصيص وأسرع انتقال فعلي في المستوى اللغوي.',
        outcomes: [
            'انتقال حقيقي في المستوى اللغوي',
            'تحسن قوي في الطلاقة والنطق',
            'استخدام اللغة في مواقف يومية واقعية',
        ],
        components: [
            'مدرس ثابت لكل طالب',
            'AI Coach يومي للتدريب والمتابعة',
            'مهام تطبيقية (مواقف حياتية + محادثات واقعية)',
            'خطة تعلم فردية + متابعة دورية مخصصة للأهل',
        ],
        kpis: [
            { label: 'مؤشر الطلاقة', target: '+30% إلى +50%' },
            { label: 'دقة النطق', target: '+25% إلى +40%' },
            { label: 'مخرجات المحادثة', target: 'محادثات أطول وأكثر ثباتًا' },
        ],
    },
];

export const growthOffers: GrowthOffer[] = [
    {
        title: 'اشتراك سنوي (3 فصول)',
        value: 'خصم 15-25%',
        details: 'يشمل تقييم شامل مجاني + محتوى صيفي خفيف.',
    },
    {
        title: 'ضمان النتيجة',
        value: 'تمديد بدون تكلفة',
        details: 'عند عدم تحقيق مستوى الخروج المتفق عليه.',
    },
    {
        title: 'عرض بداية الفصل',
        value: 'اختبار مجاني + أسبوع تجريبي',
        details: 'تقليل التردد قبل الاشتراك ورفع التحويل.',
    },
    {
        title: 'خطة العائلة',
        value: 'خصم الطفل الثاني',
        details: 'لوحة متابعة موحدة لكل الأبناء في حساب واحد.',
    },
];

export const parentDashboardMock = {
    studentName: 'عمر فهد',
    grade: 'Grade 2',
    currentTerm: 'الفصل الدراسي الثاني',
    packageName: 'Progress Term',
    entryLevel: 'Pre-A1',
    targetLevel: 'A1+',
    progressScore: 76,
    attendanceRate: 92,
    sessionsCompleted: 29,
    sessionsTotal: 33,
    recommendation: 'الطالب جاهز مبدئيًا للانتقال إلى Progress+ في الفصل القادم مع دعم إضافي للنطق (P/V).',
    kpis: [
        { label: 'عدد الكلمات المكتسبة', value: '248 كلمة', progress: 82, trend: '+32%' },
        { label: 'تحسن النطق', value: '73%', progress: 73, trend: '+18%' },
        { label: 'عدد الجمل المستخدمة', value: '64 جملة', progress: 68, trend: '+27%' },
        { label: 'مستوى الطلاقة', value: '68/100', progress: 68, trend: '+14 نقطة' },
        { label: 'الفهم السمعي', value: '79/100', progress: 79, trend: '+11 نقطة' },
    ],
};

export const packageByPlacementLevel: Record<string, PackageId> = {
    A0: 'foundation',
    'Pre-A1': 'foundation',
    A1: 'progress',
    A2: 'mastery',
};

export const placementScoreLevelMap = [
    { min: 0, max: 39, level: 'A0' },
    { min: 40, max: 69, level: 'Pre-A1' },
    { min: 70, max: 84, level: 'A1' },
    { min: 85, max: 100, level: 'A2' },
];
