import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Search } from 'lucide-react';
import { BOOKS } from '../constants';

const BooksPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBooks = BOOKS.filter((book) => {
        const q = searchQuery.toLowerCase();
        return book.title.toLowerCase().includes(q) || book.subject.toLowerCase().includes(q) || book.author.toLowerCase().includes(q);
    });

    return (
        <div className="space-y-6 pb-24">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">مكتبة الإنجليزي</h1>
                <p className="mt-2 text-slate-600">قصص، كتيبات phonics، وأدلة منزلية تساعد الطفل والأهل على الاستمرار بين الحصص.</p>
            </div>

            <div className="relative max-w-2xl">
                <Search className="absolute right-4 top-3.5 text-slate-400" size={18} />
                <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="ابحث عن reading أو phonics أو grammar..."
                    className="w-full rounded-2xl border border-slate-200 bg-white py-3 pr-11 pl-4 outline-none transition-colors focus:border-orange-400"
                />
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {filteredBooks.map((book) => (
                    <button
                        key={book.id}
                        onClick={() => navigate(`/books/${book.id}`)}
                        className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white text-right shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                    >
                        <img src={book.coverUrl} alt={book.title} className="h-64 w-full object-cover" />
                        <div className="p-4">
                            <div className="mb-2 inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">{book.subject}</div>
                            <h2 className="line-clamp-2 text-lg font-bold text-slate-900">{book.title}</h2>
                            <p className="mt-2 text-sm text-slate-500">{book.author}</p>
                            <div className="mt-4 flex items-center gap-2 text-sm font-bold text-slate-700">
                                <BookOpen size={16} />
                                افتح المورد
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BooksPage;
