import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const grades = [
    { id: 0, name: 'KG', note: 'تهيئة سمعية وبداية phonics' },
    { id: 1, name: 'Grade 1', note: 'كلمات أولى وجمل قصيرة' },
    { id: 2, name: 'Grade 2', note: 'تثبيت القراءة والمفردات' },
    { id: 3, name: 'Grade 3', note: 'Speaking وsentence building' },
    { id: 4, name: 'Grade 4', note: 'قراءة وفهم واستقلالية أعلى' },
    { id: 5, name: 'Grade 5', note: 'محادثة وقواعد مبسطة' },
    { id: 6, name: 'Grade 6', note: 'انتقال من الأساسي إلى المتقدم' },
];

const ChangeGradePage: React.FC = () => {
    const navigate = useNavigate();
    const { userProfile, updateProfile } = useApp();
    const [selectedGrade, setSelectedGrade] = useState(userProfile?.grade || 2);

    return (
        <div className="mx-auto max-w-5xl space-y-6 py-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">اختر المرحلة المناسبة</h1>
                <p className="mt-2 text-slate-600">سنكيّف المحتوى والقياس وخطة المعلم حسب عمر الطفل ومستواه.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {grades.map((grade) => {
                    const selected = grade.id === selectedGrade;
                    return (
                        <button
                            key={grade.id}
                            onClick={() => setSelectedGrade(grade.id)}
                            className={`rounded-[1.5rem] border p-5 text-right transition-all ${selected ? 'border-orange-400 bg-orange-50 shadow-lg' : 'border-slate-200 bg-white shadow-sm hover:border-orange-200'}`}
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <div className="text-2xl font-bold text-slate-900">{grade.name}</div>
                                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${selected ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                    {selected ? <Check size={20} /> : grade.id}
                                </div>
                            </div>
                            <div className="leading-7 text-slate-600">{grade.note}</div>
                        </button>
                    );
                })}
            </div>

            <div className="flex justify-end">
                <button
                    onClick={() => {
                        updateProfile({ grade: selectedGrade });
                        navigate('/');
                    }}
                    className="rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white"
                >
                    حفظ واستخدام هذا المسار
                </button>
            </div>
        </div>
    );
};

export default ChangeGradePage;
