export interface Unit {
    id: string;
    subjectId: string;
    order: number;
    title: string;
    description: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    isLocked: boolean;
    topics: string[];
}

// قواميس للمواضيع حسب المادة (لتوليد محتوى واقعي)
const SUBJECT_TOPICS: Record<string, string[]> = {
    'math': ['الجبر', 'الهندسة', 'حساب المثلثات', 'التفاضل', 'التكامل', 'الإحتمالات', 'الإحصاء', 'المصفوفات'],
    'physics': ['الميكانيكا', 'الكهرباء', 'المغناطيسية', 'الديناميكا الحرارية', 'الضوء', 'الفيزياء الحديثة', 'الطاقة'],
    'chemistry': ['الجدول الدوري', 'الروابط الكيميائية', 'التفاعلات', 'الكيمياء العضوية', 'الغازات', 'الأحماض والقواعد'],
    'biology': ['الخلية', 'الوراثة', 'أجهزة الجسم', 'البيئة', 'التطور', 'النباتات', 'المناعة'],
    'arabic': ['النحو', 'الصرف', 'البلاغة', 'الأدب الجاهلي', 'الأدب العباسي', 'النقد الأدبي', 'القراءة'],
    'english': ['Grammar', 'Vocabulary', 'Reading', 'Writing', 'Listening', 'Speaking', 'Literature'],
    'history': ['العصور القديمة', 'العصور الوسطى', 'التاريخ الحديث', 'الحروب العالمية', 'تاريخ المنطقة', 'الثورات'],
    'geography': ['المناخ', 'التضاريس', 'السكان', 'الموارد الاقتصادية', 'الخرائط', 'البيئة'],
    'geology': ['المعادن', 'الصخور', 'الزلازل', 'البراكين', 'تاريخ الأرض', 'المياه الجوفية'],
    'philosophy': ['المنطق', 'الأخلاق', 'الفلسفة اليونانية', 'الفلسفة الحديثة', 'علم الجمال', 'الميتافيزيقا'],
    'psychology': ['النمو', 'الشخصية', 'التعلم', 'الذكاء', 'الاضطرابات النفسية', 'علم النفس الاجتماعي']
};

/**
 * دالة لتوليد وحدات دراسية ذكية بناءً على اسم المادة
 */
const generateUnitsForSubject = (subjectId: string, subjectName: string): Unit[] => {
    // استخراج الكلمة المفتاحية من المعرف (مثلاً 'math' من 'math-10')
    const key = Object.keys(SUBJECT_TOPICS).find(k => subjectId.includes(k)) || 'general';
    const topics = SUBJECT_TOPICS[key] || ['مقدمة', 'المفاهيم الأساسية', 'تطبيقات', 'مراجعة'];

    // توليد 4-6 وحدات لكل مادة
    const numUnits = 5;

    return Array.from({ length: numUnits }).map((_, index) => {
        const unitNum = index + 1;
        const topic = topics[index % topics.length];

        // تنويع العناوين
        const titles = [
            `الوحدة ${unitNum}: مقدمة في ${topic}`,
            `الوحدة ${unitNum}: أسرار ${topic}`,
            `الوحدة ${unitNum}: تطبيقات ${topic}`,
            `الوحدة ${unitNum}: ${topic} المتقدمة`
        ];

        // حالة القفل والتقدم (الأولى مفتوحة دائماً)
        const isLocked = index > 1; // أول وحدتين مفتوحات لإغراء الطالب
        const progress = index === 0 ? 75 : (index === 1 ? 30 : 0);
        const totalLessons = 5 + Math.floor(Math.random() * 5); // 5-10 دروس
        const completedLessons = Math.floor((progress / 100) * totalLessons);

        return {
            id: `u${unitNum}-${subjectId}`,
            subjectId: subjectId,
            order: unitNum,
            title: titles[Math.floor(Math.random() * titles.length)],
            description: `شرح شامل لمواضيع ${topic} مع أمثلة عملية واختبارات تفاعلية لضمان الفهم الكامل.`,
            progress: progress,
            totalLessons: totalLessons,
            completedLessons: completedLessons,
            isLocked: isLocked,
            topics: [topic, `${topic} 2`, 'تمارين عملية']
        };
    });
};

// الذاكرة المؤقتة (Cache) حتى لا نعيد التوليد كل مرة
const GENERATED_CACHE: Record<string, Unit[]> = {};

export const getSubjectUnits = (subjectId: string): Unit[] => {
    // إذا كانت البيانات موجودة في الكاش، أعدها
    if (GENERATED_CACHE[subjectId]) {
        return GENERATED_CACHE[subjectId];
    }

    // توليد بيانات جديدة
    // ملاحظة: نحتاج اسم المادة هنا، لكن للتبسيط سنعتمد على المعرف
    const units = generateUnitsForSubject(subjectId, subjectId);

    // حفظ في الكاش
    GENERATED_CACHE[subjectId] = units;

    return units;
};
