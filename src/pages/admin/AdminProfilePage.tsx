import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { User, Mail, Shield, MapPin, Save, Key, Camera, Clock, CheckCircle } from 'lucide-react';
import { EducationalStage } from '../../types';

const AdminProfilePage: React.FC = () => {
    const { currentUser, loginAs } = useApp();
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [name, setName] = useState(currentUser?.name || '');
    const [email, setEmail] = useState(currentUser?.email || '');
    const [password, setPassword] = useState('');

    if (!currentUser) return null;

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API Call
        setTimeout(() => {
            setIsLoading(false);
            alert('تم تحديث بيانات الملف الشخصي بنجاح!');
        }, 1000);
    };

    // Helper to visualize Scope
    const getScopeDescription = () => {
        if (currentUser.role === 'platform_owner') return 'صلاحيات مطلقة على جميع الدول والأنظمة.';
        if (currentUser.role === 'global_super_admin') return 'إدارة شاملة لجميع الدول.';
        if (currentUser.role === 'country_admin') return `إدارة كاملة لدولة: ${currentUser.assignedCountryId === 'eg' ? 'مصر' : currentUser.assignedCountryId === 'sa' ? 'السعودية' : currentUser.assignedCountryId}`;
        if (currentUser.role === 'teacher') return `معلم مختص في ${currentUser.assignedCountryId === 'eg' ? 'مصر' : 'السعودية'} - مرحلة ${currentUser.assignedStage || 'عامة'}`;
        return 'مستخدم إداري';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-800">إعدادات الحساب</h1>
                <p className="text-slate-500">إدارة ملفك الشخصي وصلاحياتك</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Stats & Scope (Role Card) */}
                <div className="space-y-6">
                    {/* Identity Card */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center relative overflow-hidden group">
                        <div className={`absolute top-0 left-0 w-full h-24 ${currentUser.role === 'platform_owner' ? 'bg-slate-900' : 'bg-mint-600'}`}></div>

                        <div className="relative mt-8 mb-4">
                            <div className="w-24 h-24 mx-auto rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                                <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
                            </div>
                            <button className="absolute bottom-0 right-1/2 translate-x-12 translate-y-2 p-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors shadow-sm">
                                <Camera size={14} />
                            </button>
                        </div>

                        <h2 className="text-xl font-bold text-slate-800">{name}</h2>
                        <div className="flex items-center justify-center gap-2 mt-1 text-slate-500 text-sm">
                            <Shield size={14} />
                            <span className="capitalize">{currentUser.role.replace('_', ' ')}</span>
                        </div>
                    </div>

                    {/* Permissions & Scope */}
                    <div className="bg-slate-900 text-white rounded-2xl shadow-sm p-6">
                        <h3 className="font-bold flex items-center gap-2 mb-4">
                            <Key size={18} className="text-mint-400" />
                            نطاق الصلاحيات
                        </h3>

                        <div className="space-y-4 text-sm text-slate-300">
                            <p className="leading-relaxed border-l-2 border-mint-500 pl-3">
                                {getScopeDescription()}
                            </p>

                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <div className="bg-slate-800 p-2 rounded-lg">
                                    <span className="block text-xs text-slate-500">الدولة</span>
                                    <span className="font-bold text-white uppercase">{currentUser.assignedCountryId || 'Global'}</span>
                                </div>
                                <div className="bg-slate-800 p-2 rounded-lg">
                                    <span className="block text-xs text-slate-500">المرحلة</span>
                                    <span className="font-bold text-white">{currentUser.assignedStage || 'All'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Edit Form */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
                        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-50">
                            <User className="text-mint-600" size={24} />
                            <h3 className="text-lg font-bold text-slate-800">البيانات الأساسية</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">الاسم الكامل</label>
                                <div className="relative">
                                    <User className="absolute right-3 top-3 text-slate-400" size={18} />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-mint-500 focus:border-mint-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني</label>
                                <div className="relative">
                                    <Mail className="absolute right-3 top-3 text-slate-400" size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        disabled
                                        className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-500 cursor-not-allowed"
                                    />
                                </div>
                                <p className="text-xs text-slate-400 mt-1">لا يمكن تغيير البريد الإلكتروني إلا من قبل المشرف الأعلى.</p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-bold text-slate-700 mb-2">تغيير كلمة المرور</label>
                            <div className="relative">
                                <Key className="absolute right-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="اتركها فارغة إذا لم ترد التغيير"
                                    className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-mint-500 focus:border-mint-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">
                                <CheckCircle size={16} />
                                <span>حسابك نشط وموثق</span>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-8 py-3 bg-mint-600 text-white rounded-xl font-bold hover:bg-mint-700 transition-colors flex items-center gap-2 shadow-lg shadow-mint-600/20"
                            >
                                {isLoading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                                <Save size={18} />
                            </button>
                        </div>
                    </form>

                    {/* Recent Activity (Mock) */}
                    <div className="mt-6 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Clock size={18} className="text-slate-400" />
                            آخر النشاطات
                        </h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-start gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-slate-200"></div>
                                    <div>
                                        <p className="text-sm text-slate-700">قام بتسجيل الدخول إلى لوحة التحكم.</p>
                                        <span className="text-xs text-slate-400">منذ {i * 2} ساعة</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfilePage;
