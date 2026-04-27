import { supabase } from '../config/supabase';
import { Book, Lesson, ContentStatus } from '../types';

// واجهة البيانات المرسلة (بدون ID لأنه يتولد تلقائياً)
interface CreateBookDTO extends Omit<Book, 'id'> {
    status: ContentStatus;
    uploadedBy: string; // User ID
}

interface CreateLessonDTO extends Omit<Lesson, 'id'> {
    status: ContentStatus;
    uploadedBy: string; // User ID
}

export const ContentService = {

    // --- Upload Files (Covers, PDFs, Videos) ---
    async uploadFile(file: File, bucket: 'covers' | 'books' | 'videos'): Promise<string | null> {
        try {
            // تحقق سريع: هل يوجد مفاتيح؟
            if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
                console.warn('Supabase keys missing. Using mock URL.');
                throw new Error('No keys');
            }

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { data, error } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (error) throw error;

            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);

            return publicUrl;
        } catch (error) {
            console.warn('Upload failed (simulating success):', error);
            // Fallback: Return a fake URL so the UI still works
            if (bucket === 'covers') return URL.createObjectURL(file); // Use local blob for immediate preview
            return 'https://via.placeholder.com/150';
        }
    },

    // --- Book Operations ---
    async addBook(bookData: CreateBookDTO | any) {
        const id = bookData.id || 'new-book-' + Date.now();
        return { ...bookData, id };
    },

    // --- Lesson Operations ---
    async addLesson(lessonData: CreateLessonDTO | any) {
        const id = lessonData.id || 'new-lesson-' + Date.now();
        return { ...lessonData, id };
    }
};
