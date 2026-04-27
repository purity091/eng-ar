import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircle } from 'lucide-react';
import { LESSONS } from '../constants';

const LessonsPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-6 pb-24">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">حصص الإنجليزي</h1>
                <p className="mt-2 text-slate-600">كل حصة مصممة لتكون قصيرة، مرحة، ومرتبطة بهدف لغوي واحد يمكن قياسه.</p>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
                {LESSONS.map((lesson) => (
                    <button
                        key={lesson.id}
                        onClick={() => navigate(`/lessons/${lesson.id}`)}
                        className="group grid gap-4 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-4 text-right shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl md:grid-cols-[220px,1fr]"
                    >
                        <div className="relative overflow-hidden rounded-[1.25rem]">
                            <img src={lesson.thumbnailUrl} alt={lesson.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/20">
                                <PlayCircle className="text-white" size={46} />
                            </div>
                        </div>

                        <div className="flex flex-col justify-center">
                            <div className="mb-3 flex flex-wrap gap-2">
                                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">{lesson.subject}</span>
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{lesson.duration}</span>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">{lesson.title}</h2>
                            <p className="mt-3 leading-7 text-slate-600">
                                حصة مركزة مع teacher-led modeling، نشاط نطق، وسؤال تحقق سريع ينعكس فورًا في تقرير التقدم.
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LessonsPage;
