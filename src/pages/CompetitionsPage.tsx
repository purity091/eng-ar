import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Trophy, Globe, ExternalLink, Calendar, Users,
    Award, ArrowRight, Filter, Search
} from 'lucide-react';
import { COMPETITIONS } from '../constants/competitions';

const CompetitionsPage: React.FC = () => {
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter Logic
    const filteredCompetitions = COMPETITIONS.filter(comp => {
        const matchesCategory = filterCategory === 'all' || comp.category === filterCategory;
        const matchesSearch = comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            comp.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const categories = [
        { id: 'all', label: 'الكل' },
        { id: 'math', label: 'الرياضيات' },
        { id: 'science', label: 'العلوم' },
        { id: 'coding', label: 'البرمجة' },
        { id: 'reading', label: 'القراءة' },
        { id: 'arts', label: 'الفنون' },
        { id: 'business', label: 'ريادة الأعمال' }
    ];

    return (
        <div className="space-y-8 pb-20 animate-fade-in">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner border border-white/30">
                            <Trophy size={40} className="text-white drop-shadow-md" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-2">المسابقات التعليمية</h1>
                            <p className="text-white/90 text-lg max-w-xl leading-relaxed">
                                اكتشف قدراتك وتنافس مع المبدعين في الوطن العربي والعالم.
                                بوابة وصولك لأهم الأولمبيادات والمسابقات الدولية.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-10 bg-slate-50/95 backdrop-blur-sm py-4">
                <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm overflow-x-auto max-w-full no-scrollbar">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setFilterCategory(cat.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${filterCategory === cat.id
                                ? 'bg-amber-100 text-amber-700'
                                : 'text-slate-500 hover:bg-slate-50'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-64">
                    <Search className="absolute right-3 top-3 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="ابحث عن مسابقة..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pr-10 pl-4 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                    />
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCompetitions.length > 0 ? (
                    filteredCompetitions.map(comp => {
                        const Icon = comp.icon;
                        return (
                            <div key={comp.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                                <div className="p-6 flex-1">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg ${comp.category === 'math' ? 'bg-blue-500' :
                                            comp.category === 'science' ? 'bg-green-500' :
                                                comp.category === 'coding' ? 'bg-purple-500' :
                                                    comp.category === 'reading' ? 'bg-rose-500' :
                                                        'bg-amber-500'
                                            }`}>
                                            <Icon size={24} />
                                        </div>
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${comp.category === 'math' ? 'bg-blue-50 text-blue-600' :
                                            comp.category === 'science' ? 'bg-green-50 text-green-600' :
                                                comp.category === 'coding' ? 'bg-purple-50 text-purple-600' :
                                                    'bg-slate-100 text-slate-600'
                                            }`}>
                                            {categories.find(c => c.id === comp.category)?.label}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors">
                                        {comp.title}
                                    </h3>

                                    <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">
                                        {comp.description}
                                    </p>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <Users size={14} className="text-slate-400" />
                                            <span>متاح للصفوف: </span>
                                            <span className="font-bold text-slate-700">
                                                {comp.targetGrades.length === 0 ? 'الكل' : comp.targetGrades.map(g => g === 12 ? 'التوجيهي' : g).join(', ')}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <Globe size={14} className="text-slate-400" />
                                            <span>الجهة المنظمة: </span>
                                            <span className="font-bold text-slate-700">{comp.organizer}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                                    <div className="text-xs text-slate-400 font-bold flex items-center gap-1">
                                        <Calendar size={12} />
                                        <span>التسجيل مفتوح</span>
                                    </div>
                                    <Link
                                        to={`/competitions/${comp.id}`}
                                        className="text-sm font-bold text-amber-600 hover:text-amber-800 flex items-center gap-1 hover:gap-2 transition-all"
                                    >
                                        التفاصيل <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-span-full py-20 text-center text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">
                        <Filter size={48} className="mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-bold">لا توجد مسابقات تطابق بحثك</p>
                        <button onClick={() => { setFilterCategory('all'); setSearchQuery(''); }} className="mt-4 text-amber-600 underline">
                            إعادة تعيين الفلترة
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompetitionsPage;
