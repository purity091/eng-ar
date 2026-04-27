import { LucideIcon, BookOpen, Calculator, FlaskConical, Code, Palette, Globe } from 'lucide-react';

export interface CommunityPost {
    id: string;
    title: string;
    content: string;
    author: string;
    authorLevel: number;
    timestamp: string;
    tags: string[];
    replies: number;
    views: number;
    upvotes: number;
    downvotes: number;
    isPinned: boolean;
    isClosed: boolean;
    isSolved: boolean;
    isReported: boolean;
    countryId: string;

    // New fields for Moderation System
    status: 'approved' | 'pending' | 'rejected';
    adminNote?: string; // If an admin improves or rejects a post
}

export const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
    {
        id: '1',
        title: 'أفضل استراتيجية لمذاكرة الفيزياء للثانوية العامة؟',
        content: 'أواجه صعوبة كبيرة في فهم قوانين الديناميكا الحرارية. هل يعتمد الاختبار النهائي على الحفظ أم الفهم العميق للمسائل؟ وهل هناك قنوات يوتيوب تنصحون بها للشرح المبسط؟',
        author: 'أحمد سعيد',
        authorLevel: 5,
        timestamp: 'منذ ساعتين',
        tags: ['فيزياء', 'ثانوية_عامة', 'نصائح'],
        replies: 12,
        views: 340,
        upvotes: 25,
        downvotes: 1,
        isPinned: true,
        isClosed: false,
        isSolved: false,
        isReported: false,
        countryId: 'eg',
        status: 'approved'
    },
    {
        id: '2',
        title: 'شرح قاعدة If الشرطية في اللغة الإنجليزية - توجيهي',
        content: 'قمت بكتابة ملخص سريع لحالات If الأربعة مع أمثلة. أتمنى أن يفيدكم.\n1. Zero Conditional: Facts\n2. First Conditional: Possibilities\n...',
        author: 'سارة محمد',
        authorLevel: 12,
        timestamp: 'منذ 5 ساعات',
        tags: ['إنجليزي', 'ملخصات', 'توجيهي'],
        replies: 45,
        views: 1200,
        upvotes: 150,
        downvotes: 0,
        isPinned: false,
        isClosed: false,
        isSolved: true,
        isReported: false,
        countryId: 'jo',
        status: 'approved'
    },
    {
        id: '3',
        title: 'طلب مساعدة في حل معادلة تفاضلية',
        content: 'y\'\' + 4y = 0. حاولت استخدام المعادلة المميزة ولكن لم أصل للناتج النهائي الموجود في الكتاب.',
        author: 'عمر خالد',
        authorLevel: 3,
        timestamp: 'منذ دقيقة',
        tags: ['رياضيات', 'جامعة'],
        replies: 0,
        views: 5,
        upvotes: 1,
        downvotes: 0,
        isPinned: false,
        isClosed: false,
        isSolved: false,
        isReported: false,
        countryId: 'sa',
        status: 'pending' // Waiting for approval
    },
    {
        id: '4',
        title: 'مشكلة في تثبيت برنامج VS Code على ويندوز 7',
        content: 'كل ما أحاول أثبت البرنامج تطلع لي رسالة خطأ بخصوص .NET Framework. هل النسخة غير متوافقة؟',
        author: 'كريم عادل',
        authorLevel: 2,
        timestamp: 'منذ 10 دقائق',
        tags: ['برمجة', 'تقنية'],
        replies: 2,
        views: 20,
        upvotes: 0,
        downvotes: 0,
        isPinned: false,
        isClosed: false,
        isSolved: false,
        isReported: false,
        countryId: 'all',
        status: 'pending'
    },
    {
        id: '5',
        title: 'كيف أوازن بين القدرات والتحصيلي والمدرسة؟',
        content: 'جدولي مضغوط جداً وأحس بضغط نفسي. محتاج جدول تنظيم وقت مجرب من طلاب سابقين جابوا درجات عالية.',
        author: 'نورة',
        authorLevel: 8,
        timestamp: 'منذ يوم',
        tags: ['قدرات', 'تحصيلي', 'تنظيم_وقت'],
        replies: 8,
        views: 500,
        upvotes: 60,
        downvotes: 2,
        isPinned: false,
        isClosed: false,
        isSolved: true,
        isReported: false,
        countryId: 'sa',
        status: 'approved'
    },
    {
        id: '6',
        title: 'ملخص الباب الأول في الكيمياء العضوية',
        content: 'جمعت لكم أهم التفاعلات والمركبات العضوية في ملف PDF واحد. يشمل الألكانات، الألكينات، والمجموعات الوظيفية.',
        author: 'ليلى أحمد',
        authorLevel: 10,
        timestamp: 'منذ 3 ساعات',
        tags: ['كيمياء', 'عضوية', 'ملخصات'],
        replies: 20,
        views: 450,
        upvotes: 80,
        downvotes: 0,
        isPinned: false,
        isClosed: false,
        isSolved: true,
        isReported: false,
        countryId: 'eg',
        status: 'approved'
    },
    {
        id: '7',
        title: 'شرح التكامل بالتعويض - رياضيات الصف 12',
        content: 'كثير من الطلاب يخطئون في اختيار التعويض المناسب. هذا شرح مبسط مع 5 أمثلة متدرجة الصعوبة.',
        author: 'محمد علي',
        authorLevel: 15,
        timestamp: 'منذ يومين',
        tags: ['رياضيات', 'تكامل', 'توجيهي'],
        replies: 35,
        views: 890,
        upvotes: 120,
        downvotes: 2,
        isPinned: true,
        isClosed: false,
        isSolved: true,
        isReported: false,
        countryId: 'jo',
        status: 'approved'
    },
    {
        id: '8',
        title: 'سؤال عن الانقسام الميوزي في الأحياء',
        content: 'ما الفرق بين الانقسام الميتوزي والميوزي؟ ومتى يحدث كل منهما في الخلايا؟',
        author: 'رنا خالد',
        authorLevel: 4,
        timestamp: 'منذ 4 ساعات',
        tags: ['أحياء', 'خلية', 'انقسام'],
        replies: 8,
        views: 120,
        upvotes: 15,
        downvotes: 0,
        isPinned: false,
        isClosed: false,
        isSolved: true,
        isReported: false,
        countryId: 'sa',
        status: 'approved'
    },
    {
        id: '9',
        title: 'أفضل طريقة لحفظ مفردات الإنجليزي',
        content: 'جربت طريقة البطاقات التعليمية (Flashcards) وفعلاً ساعدتني كثير. شاركوني طرقكم!',
        author: 'هدى سامي',
        authorLevel: 7,
        timestamp: 'منذ أمس',
        tags: ['إنجليزي', 'مفردات', 'نصائح'],
        replies: 25,
        views: 300,
        upvotes: 45,
        downvotes: 1,
        isPinned: false,
        isClosed: false,
        isSolved: false,
        isReported: false,
        countryId: 'ae',
        status: 'approved'
    }
];
