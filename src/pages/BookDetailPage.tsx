import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, BookOpen, Download, FileText } from 'lucide-react';
import { BOOKS } from '../constants';

const BookDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const book = BOOKS.find((item) => item.id === slug);

    if (!book) {
        return <div className="rounded-3xl bg-white p-10 text-center text-slate-500">المورد غير موجود.</div>;
    }

    return (
        <div className="space-y-6 pb-24">
            <button onClick={() => navigate('/books')} className="flex items-center gap-2 font-bold text-slate-600 transition-colors hover:text-orange-600">
                <ArrowRight size={18} />
                العودة إلى المكتبة
            </button>

            <div className="grid gap-8 lg:grid-cols-[0.8fr,1.2fr]">
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <img src={book.coverUrl} alt={book.title} className="w-full rounded-[1.5rem] object-cover" />
                    <div className="mt-5 space-y-3">
                        <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 py-3 font-bold text-white">
                            <BookOpen size={18} />
                            افتح المورد
                        </button>
                        <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-100 py-3 font-bold text-slate-700">
                            <Download size={18} />
                            تنزيل نسخة PDF
                        </button>
                    </div>
                </div>

                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
                    <div className="mb-3 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-700">{book.subject}</div>
                    <h1 className="text-4xl font-bold text-slate-900">{book.title}</h1>
                    <p className="mt-3 text-lg text-slate-600">بإعداد {book.author}</p>

                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                        {[
                            { label: 'الفئة', value: `الصف ${book.grade}` },
                            { label: 'المرحلة', value: 'ابتدائي' },
                            { label: 'الاستخدام', value: 'داخل الحصة + المنزل' },
                        ].map((item) => (
                            <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
                                <div className="text-sm text-slate-500">{item.label}</div>
                                <div className="mt-1 font-bold text-slate-900">{item.value}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 space-y-5 text-slate-700">
                        <p>
                            هذا المورد مصمم لمساعدة الطفل العربي على ربط ما يتعلمه داخل الحصة بما يراجعه في البيت. المحتوى بسيط بصريًا، واضح لغويًا، ومقسّم إلى أجزاء قصيرة مناسبة لعمر KG والابتدائي.
                        </p>
                        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
                            <div className="mb-2 flex items-center gap-2 font-bold text-orange-700">
                                <FileText size={18} />
                                لماذا هذا المورد مهم؟
                            </div>
                            <p className="leading-7">
                                لأنه لا يضيف عبئًا على الأهل. يمكنهم استخدامه في 10 دقائق يوميًا مع نشاط نطق أو قراءة أو مراجعة كلمات.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetailPage;
