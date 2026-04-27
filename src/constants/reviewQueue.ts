import { ReviewItem } from '../types';

export const MOCK_REVIEW_QUEUE: ReviewItem[] = [
    {
        id: 'rev-101',
        title: 'شرح قواعد اللغة العربية - المبتدأ والخبر',
        type: 'lesson',
        author: 'أ. خالد جبر',
        submittedAt: '2025-01-09',
        status: 'pending',
        countryId: 'eg',
        subject: 'اللغة العربية',
        grade: 10,
        thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg'
    },
    {
        id: 'rev-102',
        title: 'ملخص التاريخ الحديث',
        type: 'book',
        author: 'د. منى المؤرخ',
        submittedAt: '2025-01-08',
        status: 'pending',
        countryId: 'sa',
        subject: 'التاريخ',
        grade: 11,
        thumbnailUrl: 'https://via.placeholder.com/150/0000FF/808080?text=History'
    },
    {
        id: 'rev-103',
        title: 'مسائل فيزياء متقدمة',
        type: 'lesson',
        author: 'أ. سامي الفيزيائي',
        submittedAt: '2025-01-10',
        status: 'rejected', // مثال على محتوى مرفوض سابقاً
        countryId: 'eg',
        subject: 'الفيزياء',
        grade: 12,
        thumbnailUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Physics'
    },
    {
        id: 'rev-104',
        title: 'كراسة التدريبات - رياضيات',
        type: 'book',
        author: 'أ. هدى للرياضيات',
        submittedAt: '2025-01-10',
        status: 'pending', // محتوى جديد
        countryId: 'ae',
        subject: 'الرياضيات',
        grade: 9,
        thumbnailUrl: 'https://via.placeholder.com/150/ebf8ff/000000?text=Math'
    }
];
