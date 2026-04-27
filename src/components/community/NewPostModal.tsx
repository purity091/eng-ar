import React, { useState } from 'react';
import { X, Send, Tag, AlertCircle, PenLine } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface NewPostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (post: any) => void;
}

const NewPostModal: React.FC<NewPostModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const { currentUser, selectedCountry, userProfile } = useApp();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newPost = {
            id: `post-${Date.now()}`,
            title,
            content,
            author: currentUser?.name || '.ستخد.',
            authorRole: currentUser?.role || 'student',
            countryId: selectedCountry.id,
            grade: userProfile?.grade,
            tags: tags.split(',').map(t => t.trim()).filter(Boolean),
            replies: 0,
            views: 0,
            likes: 0,
            isPinned: false,
            isClosed: false,
            isReported: false,
            createdAt: new Date().toLocaleDateString('ar-EG'),
            lastActivity: 'اآ?'
        };

        onSubmit(newPost);
        setTitle('');
        setContent('');
        setTags('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800"><PenLine size={20} className="text-mint-600" /> ????? ????</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">ع?^ا? ا".^ض^ع</label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-mint-500 outline-none"
                            placeholder=".ثا": fSف أح" ?ذ? ا".سأةY"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">ا".حت^?</label>
                        <textarea
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-mint-500 outline-none h-32 resize-none"
                            placeholder="اfتب تفاصS" .^ض^عf ??ا..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">ا"^س^. (Tags)</label>
                        <div className="relative">
                            <Tag className="absolute right-3 top-3 text-slate-400" size={18} />
                            <input
                                type="text"
                                value={tags}
                                onChange={e => setTags(e.target.value)}
                                className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-mint-500 outline-none"
                                placeholder="رSاضSات, .ساعدة (افص" بفاصة)"
                            />
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-start gap-2 text-sm">
                        <AlertCircle size={16} className="text-blue-600 mt-0.5 shrink-0" />
                        <p className="text-blue-700">تأfد .? اتزا.f ب,^اعد ا".جت.ع. ا".حت^? ا".خاف سSت. حذف?.</p>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100"
                        >
                            إغاء
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-2.5 bg-mint-600 text-white rounded-xl font-bold hover:bg-mint-700 flex items-center gap-2 shadow-lg shadow-mint-600/20"
                        >
                            <Send size={18} />
                            ?شر
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewPostModal;



