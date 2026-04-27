import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    Calendar, Trophy, BookOpen, ExternalLink, Users,
    ArrowRight, MapPin, Award, CheckCircle, Clock,
    ChevronDown, ChevronUp, X
} from 'lucide-react';
import { COMPETITIONS } from '../constants/competitions';

const CompetitionDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const competition = COMPETITIONS.find(c => c.id === id);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (!competition) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <Trophy size={64} className="text-slate-300 mb-4" />
                <h2 className="text-2xl font-bold text-slate-800 mb-2">المسابقة غير موجودة</h2>
                <Link to="/competitions" className="text-mint-600 hover:underline">العودة لقائمة المسابقات</Link>
            </div>
        );
    }

    const Icon = competition.icon;

    return (
        <div className="pb-20 animate-fade-in">
            {/* Hero Section */}
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl mb-8">
                <img
                    src={competition.coverImage || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80'}
                    alt={competition.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

                <div className="absolute bottom-0 right-0 w-full p-8 md:p-12 text-white">
                    <button
                        onClick={() => navigate('/competitions')}
                        className="flex items-center gap-2 text-white/70 hover:text-white mb-6 text-sm font-bold transition-colors"
                    >
                        <ArrowRight size={18} /> العودة للمسابقات
                    </button>

                    <div className="flex flex-col md:flex-row items-end justify-between gap-6">
                        <div className="flex items-end gap-6">
                            <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                                <Icon size={48} className="text-white drop-shadow-md" />
                            </div>
                            <div className="mb-2">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 border ${competition.category === 'math' ? 'bg-blue-500/20 border-blue-400 text-blue-300' :
                                    competition.category === 'science' ? 'bg-green-500/20 border-green-400 text-green-300' :
                                        'bg-amber-500/20 border-amber-400 text-amber-300'
                                    }`}>
                                    {competition.category === 'math' ? 'الرياضيات' : competition.category === 'science' ? 'العلوم' : competition.category === 'coding' ? 'البرمجة' : 'مسابقة عامة'}
                                </span>
                                <h1 className="text-4xl md:text-5xl font-bold leading-tight">{competition.title}</h1>
                                <p className="text-lg text-white/80 mt-2 font-light flex items-center gap-2">
                                    <MapPin size={16} /> تنظيم: {competition.organizer}
                                </p>
                            </div>
                        </div>

                        <a
                            href={competition.url || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-all flex items-center gap-2 shadow-xl hover:translate-y-[-2px]"
                        >
                            التسجيل الرسمي <ExternalLink size={20} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Description */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-mint-100 rounded-xl flex items-center justify-center text-mint-600">
                                <BookOpen size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">عن المسابقة</h2>
                        </div>
                        <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-line">
                            {competition.fullDescription || competition.description}
                        </p>
                    </div>

                    {/* Timeline */}
                    {competition.timeline && (
                        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                                    <Calendar size={24} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800">مراحل المسابقة</h2>
                            </div>

                            <div className="space-y-8 relative before:absolute before:right-6 before:top-2 before:bottom-0 before:w-0.5 before:bg-slate-100">
                                {competition.timeline.map((stage, i) => {
                                    const isCompleted = stage.status === 'completed';
                                    const isActive = stage.status === 'active';

                                    return (
                                        <div key={i} className="relative flex gap-6">
                                            <div className={`relative z-10 w-12 h-12 rounded-full border-4 flex items-center justify-center shrink-0 ${isCompleted ? 'bg-green-100 border-green-50 text-green-600' :
                                                isActive ? 'bg-mint-600 border-mint-100 text-white animate-pulse-slow' :
                                                    'bg-slate-50 border-white text-slate-300'
                                                }`}>
                                                {isCompleted ? <CheckCircle size={20} /> : isActive ? <Clock size={20} /> : <span className="font-bold">{i + 1}</span>}
                                            </div>
                                            <div className={`flex-1 rounded-2xl p-5 border ${isActive ? 'bg-mint-50 border-mint-200 shadow-md' : 'bg-white border-slate-100'}`}>
                                                <div className="flex items-center justify-between mb-1">
                                                    <h3 className={`font-bold text-lg ${isActive ? 'text-mint-800' : 'text-slate-800'}`}>{stage.title}</h3>
                                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${isActive ? 'bg-mint-200 text-mint-800' : 'bg-slate-100 text-slate-500'
                                                        }`}>{stage.date}</span>
                                                </div>
                                                <p className="text-slate-500">{stage.description}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Prizes */}
                    {competition.prizes && (
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border border-amber-100 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-amber-200 rounded-xl flex items-center justify-center text-amber-700">
                                    <Trophy size={24} />
                                </div>
                                <h2 className="text-2xl font-bold text-amber-900">الجوائز والتكريم</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {competition.prizes.map((prize, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white/60 p-4 rounded-2xl border border-amber-100/50">
                                        <Award className="text-amber-500 shrink-0" size={24} />
                                        <span className="font-bold text-amber-800">{prize}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar - Toggle on Mobile */}
                <div className="lg:block">
                    {/* Mobile Toggle Button */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden w-full mb-4 py-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between px-6 font-bold text-slate-700 hover:bg-slate-50 transition-all"
                    >
                        <span className="flex items-center gap-2">
                            <Users size={20} className="text-slate-400" />
                            معلومات إضافية والمصادر
                        </span>
                        {sidebarOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>

                    {/* Sidebar Content */}
                    <div className={`space-y-6 lg:block transition-all duration-300 overflow-hidden ${sidebarOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 lg:max-h-none opacity-0 lg:opacity-100'
                        }`}>
                        {/* Eligibility Card */}
                        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Users size={20} className="text-slate-400" /> الفئة المستهدفة
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {competition.targetGrades.length === 0 ? (
                                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg font-bold">جميع الصفوف</span>
                                ) : (
                                    competition.targetGrades.map(g => (
                                        <span key={g} className="bg-mint-50 text-mint-700 border border-mint-100 px-3 py-1 rounded-lg font-bold">
                                            {g === 12 ? 'الصف 12 (توجيهي)' : `الصف ${g}`}
                                        </span>
                                    ))
                                )}
                            </div>
                            <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                                تأكد من مطابقة صفك الدراسي وشروط العمر قبل التسجيل في المسابقة.
                            </p>
                        </div>

                        {/* Resources Widget */}
                        {competition.resources && (
                            <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <BookOpen size={20} className="text-mint-400" /> مصادر للاستعداد
                                </h3>
                                <ul className="space-y-3">
                                    {competition.resources.map((res, i) => (
                                        <li key={i}>
                                            <a href={res.url} className="block p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/10 group">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-sm font-bold truncate pr-2">{res.title}</span>
                                                    <ExternalLink size={14} className="opacity-50 group-hover:opacity-100" />
                                                </div>
                                                <span className="text-[10px] text-slate-400 bg-black/20 px-2 py-0.5 rounded uppercase">{res.type}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-6 pt-4 border-t border-white/10 text-center">
                                    <p className="text-xs text-slate-400 mb-3">هل تحتاج مساعدة إضافية؟</p>
                                    <button onClick={() => navigate('/ai')} className="w-full py-3 bg-mint-600 hover:bg-mint-700 rounded-xl font-bold text-sm transition-colors">
                                        اسأل المعلم الذكي
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompetitionDetailsPage;
