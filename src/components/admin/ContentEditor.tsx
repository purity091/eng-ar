import React, { useState } from 'react';
import { X, Upload, Save, BookOpen, Video, Globe, GraduationCap, Layout } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { ContentService } from '../../services/contentService';
import { EducationalStage, ContentStatus } from '../../types';
import { COUNTRIES } from '../../constants';

interface ContentEditorProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'book' | 'lesson';
    initialData?: any;
    onSuccess?: (newItem: any) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ isOpen, onClose, type, initialData, onSuccess }) => {
    const { currentUser, isAdmin, isTeacher } = useApp();
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [title, setTitle] = useState(initialData?.title || '');
    const [subject, setSubject] = useState(initialData?.subject || '');
    const [grade, setGrade] = useState(initialData?.grade || (currentUser?.grade || 10)); // Default or Users grade

    // Permission Logic: Teacher is locked to their assigned scope
    const [countryId, setCountryId] = useState(
        currentUser?.assignedCountryId && currentUser.assignedCountryId !== 'ALL'
            ? currentUser.assignedCountryId
            : (initialData?.countryId || 'eg')
    );

    const [stage, setStage] = useState<EducationalStage>(
        currentUser?.assignedStage
            ? currentUser.assignedStage
            : (initialData?.stage || EducationalStage.SECONDARY)
    );

    // File State
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [contentFile, setContentFile] = useState<File | null>(null); // PDF or Video

    if (!isOpen) return null;

    // Logic: Is the user allowed to change Country/Stage?
    const canChangeScope = isAdmin || currentUser?.role === 'platform_owner';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // 1. Upload Files
            let coverUrl = initialData?.coverUrl || '';
            let contentUrl = initialData?.videoUrl || ''; // Simplified logic

            if (coverFile) {
                const url = await ContentService.uploadFile(coverFile, 'covers');
                if (url) coverUrl = url;
            }

            // 2. Prepare Payload based on Role Logic
            // Teacher -> Pending Review
            // Admin -> Approved Direct (or Pending if they choose)
            const initialStatus: ContentStatus = isTeacher ? 'pending' : 'approved';

            const payload = {
                title,
                subject,
                grade: Number(grade),
                stage,
                countryId,
                status: initialStatus,
                uploadedBy: currentUser?.id || 'unknown',
                coverUrl,
                // Add validation for type specific fields...
            };

            // 3. Send to Service
            let result;
            if (type === 'book') {
                result = await ContentService.addBook(payload as any);
            } else {
                result = await ContentService.addLesson(payload as any);
            }

            if (onSuccess) onSuccess(result);

            alert('تم الحفظ بنجاح!');
            onClose();

        } catch (error) {
            console.error(error);
            alert('حدث خطأ أثناء الحفظ.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl ${type === 'book' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                            {type === 'book' ? <BookOpen size={24} /> : <Video size={24} />}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">
                                {initialData ? 'تعديل' : 'إضافة'} {type === 'book' ? 'كتاب جديد' : 'درس جديد'}
                            </h2>
                            <p className="text-sm text-slate-500">
                                {isTeacher ? 'سيتم إرسال المحتوى للمراجعة قبل النشر' : 'نشر مباشر للمنصة'}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-red-500 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Form Body - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">عنوان المحتوى</label>
                            <input
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-mint-500 focus:border-mint-500 outline-none transition-all"
                                placeholder={type === 'book' ? "مثال: كتاب الفيزياء للصف الأول" : "مثال: شرح قانون نيوتن"}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">المادة الدراسية</label>
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={e => setSubject(e.target.value)}
                                    className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-mint-500"
                                    placeholder="مثال: الفيزياء"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">الصف الدراسي</label>
                                <select
                                    value={grade}
                                    onChange={e => setGrade(Number(e.target.value))}
                                    className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-mint-500 bg-white"
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(g => (
                                        <option key={g} value={g}>الصف {g}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Scope Settings (Locked for Teachers/Scoped Admins) */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                        <div className="flex items-center gap-2 text-slate-800 font-bold border-b border-slate-200 pb-2 mb-2">
                            <Globe size={18} />
                            <h3>نطاق النشر</h3>
                            {!canChangeScope && <span className="text-xs font-normal text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">مقيد بصلاحياتك</span>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1">الدولة</label>
                                <select
                                    value={countryId}
                                    onChange={e => setCountryId(e.target.value)}
                                    disabled={!canChangeScope}
                                    className={`w-full p-2.5 rounded-lg border text-sm ${!canChangeScope ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-white border-slate-300'}`}
                                >
                                    {COUNTRIES.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1">المرحلة</label>
                                <select
                                    value={stage}
                                    onChange={e => setStage(e.target.value as EducationalStage)}
                                    disabled={!canChangeScope}
                                    className={`w-full p-2.5 rounded-lg border text-sm ${!canChangeScope ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-white border-slate-300'}`}
                                >
                                    {Object.values(EducationalStage).map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* File Upload Area */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">غلاف {type === 'book' ? 'الكتاب' : 'الدرس'}</label>
                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-slate-500 hover:border-mint-500 hover:bg-mint-50 transition-colors cursor-pointer relative">
                            <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={e => setCoverFile(e.target.files?.[0] || null)}
                                accept="image/*"
                            />
                            <Upload size={32} className="mb-2" />
                            <p className="text-sm font-bold">{coverFile ? coverFile.name : 'اسحب الصورة هنا أو اضغط للاختيار'}</p>
                            <p className="text-xs text-slate-400 mt-1">PNG, JPG بحد أقصى 2MB</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50 rounded-b-2xl">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                        إلغاء
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="px-8 py-2.5 bg-mint-600 text-white rounded-xl font-bold hover:bg-mint-700 transition-colors flex items-center gap-2 shadow-lg shadow-mint-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <Save size={18} />
                                {initialData ? 'حفظ التعديلات' : 'نشر المحتوى'}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContentEditor;

