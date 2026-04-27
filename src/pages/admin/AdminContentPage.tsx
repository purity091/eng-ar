import React, { useState, useEffect } from 'react';
import { BOOKS, LESSONS } from '../../constants';
import { Edit, Trash2, Plus, Book, Video } from 'lucide-react';
import { DataTable } from '../../components/admin/DataTable';
import ContentEditor from '../../components/admin/ContentEditor';

const AdminContentPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'books' | 'lessons'>('books');
    const [searchQuery, setSearchQuery] = useState('');

    // Local State with LocalStorage Persistence so data survives refresh
    const [booksData, setBooksData] = useState(() => {
        try {
            const saved = localStorage.getItem('admin_books');
            return saved ? JSON.parse(saved) : BOOKS;
        } catch (e) {
            return BOOKS;
        }
    });

    const [lessonsData, setLessonsData] = useState(() => {
        try {
            const saved = localStorage.getItem('admin_lessons');
            return saved ? JSON.parse(saved) : LESSONS;
        } catch (e) {
            return LESSONS;
        }
    });

    // Sync with LocalStorage
    useEffect(() => {
        localStorage.setItem('admin_books', JSON.stringify(booksData));
    }, [booksData]);

    useEffect(() => {
        localStorage.setItem('admin_lessons', JSON.stringify(lessonsData));
    }, [lessonsData]);

    // Editor Modal State
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    const filteredBooks = booksData.filter((item: any) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredLessons = lessonsData.filter((item: any) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddNew = () => {
        setEditingItem(null);
        setIsEditorOpen(true);
    };

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setIsEditorOpen(true);
    };

    // Callback when item is successfully added OR edited via Editor
    const handleSuccess = (item: any) => {
        const isEditing = editingItem !== null;

        if (activeTab === 'books') {
            if (isEditing) {
                setBooksData(booksData.map((b: any) => b.id === item.id ? { ...b, ...item } : b));
            } else {
                setBooksData([item, ...booksData]);
            }
        } else {
            if (isEditing) {
                setLessonsData(lessonsData.map((l: any) => l.id === item.id ? { ...l, ...item } : l));
            } else {
                setLessonsData([item, ...lessonsData]);
            }
        }
        setEditingItem(null);
    };

    const handleDelete = (item: any) => {
        if (!window.confirm(`هل أنت متأكد من حذف "${item.title}"؟`)) return;

        if (activeTab === 'books') {
            setBooksData(booksData.filter((b: any) => b.id !== item.id));
        } else {
            setLessonsData(lessonsData.filter((l: any) => l.id !== item.id));
        }
    };

    // Define columns for Books
    const bookColumns = [
        {
            header: 'عنوان الكتاب',
            accessor: (item: any) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-14 bg-slate-200 rounded overflow-hidden shrink-0 shadow-sm border border-slate-100">
                        <img src={item.coverUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p className="font-bold text-slate-800 line-clamp-1 w-48">{item.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5 font-mono">ID: {item.id}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'المادة / المؤلف',
            accessor: (item: any) => (
                <div>
                    <span className="font-bold block text-slate-800">{item.subject}</span>
                    <span className="text-xs text-slate-500">{item.author || item.uploadedBy || 'مسؤول'}</span>
                </div>
            )
        },
        {
            header: 'الصف الدراسي',
            accessor: (item: any) => (
                <span className="px-2 py-1 bg-slate-100 rounded text-xs font-bold text-slate-600">الصف {item.grade}</span>
            )
        },
        {
            header: 'الدولة',
            accessor: (item: any) => (
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-bold uppercase border border-blue-100">{item.countryId}</span>
            )
        }
    ];

    // Define columns for Lessons
    const lessonColumns = [
        {
            header: 'عنوان الدرس',
            accessor: (item: any) => (
                <div className="flex items-center gap-3">
                    <div className="w-14 h-10 bg-slate-200 rounded overflow-hidden shrink-0 shadow-sm border border-slate-100 relative group">
                        <img src={item.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Video size={16} className="text-white" />
                        </div>
                    </div>
                    <div>
                        <p className="font-bold text-slate-800 line-clamp-1 w-48">{item.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{item.duration}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'المادة',
            accessor: 'subject'
        },
        {
            header: 'الصعوبة',
            accessor: (item: any) => (
                <span className={`px-2 py-1 rounded text-xs font-bold ${item.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    item.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                    }`}>
                    {item.difficulty || 'Easy'}
                </span>
            )
        },
        {
            header: 'الدولة',
            accessor: (item: any) => (
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-bold uppercase border border-blue-100">{item.countryId}</span>
            )
        }
    ];

    const actions = [
        { icon: Edit, label: 'تعديل', onClick: handleEdit, color: 'text-blue-600 hover:bg-blue-50' },
        { icon: Trash2, label: 'حذف', onClick: handleDelete, color: 'text-red-600 hover:bg-red-50' },
    ];

    return (
        <div className="space-y-6">
            {/* Context Toggle */}
            <div className="bg-white p-1.5 rounded-xl border border-slate-100 shadow-sm inline-flex mb-2">
                <button
                    onClick={() => setActiveTab('books')}
                    className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'books' ? 'bg-mint-600 text-white shadow-md shadow-mint-600/20' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    <Book size={18} />
                    مكتبة الكتب
                </button>
                <button
                    onClick={() => setActiveTab('lessons')}
                    className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'lessons' ? 'bg-mint-600 text-white shadow-md shadow-mint-600/20' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    <Video size={18} />
                    مكتبة الدروس
                </button>
            </div>

            <DataTable
                title={activeTab === 'books' ? 'قائمة الكتب' : 'قائمة الدروس'}
                subtitle={`إدارة ${activeTab === 'books' ? 'جميع الكتب والمراجع' : 'جميع الدروس والشروحات'} في المنصة`}
                data={activeTab === 'books' ? filteredBooks : filteredLessons}
                columns={activeTab === 'books' ? bookColumns : lessonColumns}
                actions={actions}
                onSearch={setSearchQuery}
                primaryAction={{
                    label: activeTab === 'books' ? 'إضافة كتاب' : 'إضافة درس',
                    icon: Plus,
                    onClick: handleAddNew
                }}
            />

            {/* Smart Content Editor Modal */}
            <ContentEditor
                isOpen={isEditorOpen}
                onClose={() => setIsEditorOpen(false)}
                type={activeTab === 'books' ? 'book' : 'lesson'}
                initialData={editingItem}
                onSuccess={handleSuccess}
            />
        </div>
    );
};

export default AdminContentPage;

