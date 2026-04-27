import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Book, Plus, Edit3, Trash2, GripVertical,
    MoreVertical, ChevronRight, Layers, FileText, Video
} from 'lucide-react';
import { SUBJECTS_BY_GRADE } from '../../constants/subjects';
import { getSubjectUnits } from '../../constants/units';

const SubjectManagerPage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedGrade, setSelectedGrade] = useState(10);
    const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

    // Get subjects for selected grade (Mock for specific country)
    const subjects = SUBJECTS_BY_GRADE[selectedGrade] || [];

    // Get units for selected subject
    const units = selectedSubjectId ? getSubjectUnits(selectedSubjectId) : [];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">إدارة ا".حت^? اتعS.S</h1>
                    <p className="text-slate-500">,. بب?اء ^ت?ظS. ا".?ا?ج ادراسSة بس?^"ة</p>
                </div>
                <button className="bg-mint-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-mint-700 transition-colors shadow-lg shadow-mint-600/20 flex items-center gap-2">
                    <Plus size={20} /> إضافة .ادة جدSدة
                </button>
            </div>

            {/* Grade Selector */}
            <div className="flex gap-2 border-b border-slate-200 pb-1 overflow-x-auto no-scrollbar">
                {Array.from({ length: 12 }, (_, i) => i + 1).map(grade => (
                    <button
                        key={grade}
                        onClick={() => { setSelectedGrade(grade); setSelectedSubjectId(null); }}
                        className={`px-6 py-3 rounded-t-xl font-bold transition-all whitespace-nowrap ${selectedGrade === grade
                                ? 'bg-white text-mint-700 border-b-2 border-mint-500 shadow-sm'
                                : 'text-slate-500 hover:bg-slate-50'
                            }`}
                    >
                        اصف {grade}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sidebar: Subjects List */}
                <div className="lg:col-span-1 space-y-4">
                    <h3 className="font-bold text-slate-700 mx-1">ا".^اد ادراسSة</h3>
                    <div className="grid gap-3">
                        {subjects.map(subject => (
                            <div
                                key={subject.id}
                                onClick={() => setSelectedSubjectId(subject.id)}
                                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-4 ${selectedSubjectId === subject.id
                                    ? 'bg-mint-50 border-mint-500 ring-1 ring-mint-200'
                                    : 'bg-white border-slate-200 hover:border-mint-300'
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl text-white ${subject.color}`}>
                                    <subject.icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-800">{subject.name}</h4>
                                    <p className="text-xs text-slate-500">{subject.grade} Units</p>
                                </div>
                                {selectedSubjectId === subject.id && <ChevronRight className="text-mint-600" />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Area: Units Manager */}
                <div className="lg:col-span-2">
                    {selectedSubjectId ? (
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 min-h-[500px]">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                    <Layers className="text-mint-600" />
                                    ^حدات ا".ادة
                                </h3>
                                <button className="text-sm font-bold text-mint-600 bg-mint-50 px-4 py-2 rounded-lg hover:bg-mint-100 transition-colors flex items-center gap-2">
                                    <Plus size={16} /> إضافة ^حدة
                                </button>
                            </div>

                            {units.length > 0 ? (
                                <div className="space-y-3">
                                    {units.map((unit, index) => (
                                        <div key={unit.id} className="group bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-all">
                                            <div className="cursor-move text-slate-300 hover:text-slate-500">
                                                <GripVertical size={20} />
                                            </div>
                                            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-600 text-sm">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-800">{unit.title}</h4>
                                                <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                                                    <span className="flex items-center gap-1"><Video size={12} /> {unit.totalLessons} در^س</span>
                                                    <span className="flex items-center gap-1"><FileText size={12} /> {Math.floor(Math.random() * 5)} ."فات</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => navigate(`/admin/unit-editor/${unit.id}`)}
                                                    className="p-2 text-slate-500 hover:text-mint-600 hover:bg-mint-50 rounded-lg tooltip"
                                                    title="تعدS" ا".حت^?"
                                                >
                                                    <Edit3 size={18} />
                                                </button>
                                                <button className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 text-slate-400">
                                    <Layers size={48} className="mx-auto mb-4 opacity-50" />
                                    <p>"ا ت^جد ^حدات .ضافة "?ذ? ا".ادة بعد</p>
                                    <button className="mt-4 text-mint-600 font-bold hover:underline">ابدأ بإضافة ا"^حدة اأ^"?</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-8 h-full flex flex-col items-center justify-center text-slate-400">
                            <Book size={64} className="mb-4 opacity-50" />
                            <p className="text-lg font-bold">اختر .ادة ""بدء فS إدارة .حت^ا?ا</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubjectManagerPage;



