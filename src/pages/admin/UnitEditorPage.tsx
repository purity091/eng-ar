import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Save, ArrowRight, Layout, Video, FileText,
    Settings, Image as ImageIcon, Plus, Trash2,
    Move, PlayCircle
} from 'lucide-react';

const UnitEditorPage: React.FC = () => {
    const { unitId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'explanation' | 'lessons' | 'resources' | 'settings'>('explanation');

    // Mock State for Form
    const [formData, setFormData] = useState({
        title: 'الوحدة الأولى: أساسيات الفيزياء',
        description: 'مقدمة شاملة عن فيزياء الحركة',
        explanation: 'محتوى الشرح النصي هنا...',
        lessons: [
            { id: 1, title: 'درس 1: المقدمة', url: '', duration: '10:00' },
            { id: 2, title: 'درس 2: السرعة والتسارع', url: '', duration: '15:20' }
        ],
        resources: [
            { id: 1, title: 'ملخص القوانين.pdf', url: '' }
        ]
    });

    const handleSave = () => {
        // Save logic here
        alert('تم حفظ التغييرات بنجاح');
    };

    return (
        <div className="space-y-6 pb-20 animate-fade-in">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-20 px-6 py-4 flex items-center justify-between -mx-6 -mt-6 mb-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
                    >
                        <ArrowRight size={20} />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">محرر الوحدة</h1>
                        <p className="text-xs text-slate-500">تعديل: {formData.title}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-lg text-sm">
                        معاينة
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-mint-600 text-white font-bold rounded-lg hover:bg-mint-700 shadow-lg shadow-mint-600/20 flex items-center gap-2"
                    >
                        <Save size={18} /> حفظ التغييرات
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-1 space-y-2">
                    {[
                        { id: 'explanation', label: 'الشرح والمحتوى', icon: Layout },
                        { id: 'lessons', label: 'الدروس الفيديوهات', icon: Video },
                        { id: 'resources', label: 'المرفقات والمصادر', icon: FileText },
                        { id: 'settings', label: 'إعدادات الوحدة', icon: Settings },
                    ].map(tab => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`w-full text-right p-4 rounded-xl font-bold flex items-center gap-3 transition-all ${isActive
                                        ? 'bg-mint-600 text-white shadow-md'
                                        : 'bg-white text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200'
                                    }`}
                            >
                                <Icon size={20} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3">
                    {activeTab === 'explanation' && (
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">عنوان الوحدة</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-mint-500 focus:ring-1 focus:ring-mint-200 transition-all font-bold"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">صورة الغلاف (رابط)</label>
                                <div className="flex gap-4">
                                    <div className="flex-1 relative">
                                        <ImageIcon className="absolute top-3 right-3 text-slate-400" size={20} />
                                        <input
                                            type="text"
                                            placeholder="https://example.com/image.jpg"
                                            className="w-full p-3 pr-10 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-mint-500 transition-all"
                                        />
                                    </div>
                                    <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200">
                                        رفع صورة
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">الشرح النصي والمقدمة</label>
                                <textarea
                                    rows={10}
                                    value={formData.explanation}
                                    onChange={e => setFormData({ ...formData, explanation: e.target.value })}
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-mint-500 transition-all leading-relaxed"
                                    placeholder="اكتب شرحاً تفصيلياً للوحدة هنا..."
                                ></textarea>
                                <p className="text-xs text-slate-400 mt-2">يدعم تنسيق Markdown البسيط.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'lessons' && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-slate-700">قائمة الدروس</h3>
                                <button className="text-sm bg-mint-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-mint-700 transition-colors flex items-center gap-2">
                                    <Plus size={16} /> درس جديد
                                </button>
                            </div>

                            {formData.lessons.map((lesson, idx) => (
                                <div key={lesson.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4 hover:shadow-md transition-all group">
                                    <div className="cursor-move text-slate-300 hover:text-slate-500">
                                        <Move size={18} />
                                    </div>
                                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                                        <PlayCircle size={24} />
                                    </div>
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-slate-400 block mb-1">عنوان الدرس</label>
                                            <input
                                                type="text"
                                                value={lesson.title}
                                                className="w-full font-bold text-slate-800 bg-transparent border-none p-0 focus:ring-0"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-400 block mb-1">المدة</label>
                                            <input
                                                type="text"
                                                value={lesson.duration}
                                                className="w-full text-slate-600 bg-transparent border-none p-0 focus:ring-0"
                                            />
                                        </div>
                                    </div>
                                    <button className="p-2 text-slate-400 hover:text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'resources' && (
                        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
                            <FileText size={48} className="mx-auto text-slate-300 mb-4" />
                            <h3 className="text-lg font-bold text-slate-700 mb-2">الملفات والمرفقات</h3>
                            <p className="text-slate-500 mb-6">قم برفع ملفات PDF، صور، أو ملخصات لكي تظهر للطلاب في قسم المصادر.</p>
                            <button className="bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 border border-slate-200 flex items-center gap-2 mx-auto">
                                <Plus size={20} /> رفع ملف جديد
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UnitEditorPage;
