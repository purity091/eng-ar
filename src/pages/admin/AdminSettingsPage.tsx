import React, { useState } from 'react';
import { Settings, Info, UserCog, FileText, MessageSquare, Shield, Wrench, Palette, Zap, Save, RotateCcw, TriangleAlert } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';
import { usePermissions } from '../../hooks/usePermissions';

type TabKey = 'platform' | 'registration' | 'content' | 'community' | 'security' | 'maintenance' | 'customization' | 'features';

const AdminSettingsPage: React.FC = () => {
    const { settings, updateSettings, resetSettings } = useSettings();
    const { hasPermission } = usePermissions();
    const [activeTab, setActiveTab] = useState<TabKey>('platform');
    const [hasChanges, setHasChanges] = useState(false);

    // Check permission
    if (!hasPermission('settings', 'manage')) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="text-center">
                    <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">غير مصرح</h2>
                    <p className="text-slate-600">فقط مالك المنصة يستطيع الوصول للإعدادات العامة.</p>
                </div>
            </div>
        );
    }

    const tabs = [
        { key: 'platform' as TabKey, label: 'معلومات المنصة', icon: Info },
        { key: 'registration' as TabKey, label: 'التسجيل', icon: UserCog },
        { key: 'content' as TabKey, label: 'المحتوى', icon: FileText },
        { key: 'community' as TabKey, label: 'المجتمع', icon: MessageSquare },
        { key: 'security' as TabKey, label: 'الأمان', icon: Shield },
        { key: 'maintenance' as TabKey, label: 'الصيانة', icon: Wrench },
        { key: 'customization' as TabKey, label: 'التخصيص', icon: Palette },
        { key: 'features' as TabKey, label: 'الميزات', icon: Zap },
    ];

    const handleChange = (key: keyof typeof settings, value: any) => {
        updateSettings({ [key]: value });
        setHasChanges(true);
    };

    const handleSave = () => {
        alert('تم حفظ الإعدادات بنجاح!');
        setHasChanges(false);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Settings className="text-slate-600" />
                        الإعدادات العامة للمنصة
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">تحكم كامل في سلوك وإعدادات المنصة</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={resetSettings}
                        className="px-4 py-2 border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                        <RotateCcw size={16} />
                        إعادة تعيين
                    </button>
                    {hasChanges && (
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 bg-mint-600 text-white rounded-xl font-bold hover:bg-mint-700 flex items-center gap-2 shadow-lg shadow-mint-600/20"
                        >
                            <Save size={16} />
                            حفظ التغييرات
                        </button>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                <div className="flex border-b border-slate-100 overflow-x-auto">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-6 py-4 font-bold text-sm whitespace-nowrap flex items-center gap-2 transition-colors border-b-2 ${activeTab === tab.key
                                    ? 'border-mint-600 text-mint-600 bg-mint-50'
                                    : 'border-transparent text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                <Icon size={18} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content */}
                <div className="p-6 space-y-6">
                    {/* Platform Info Tab */}
                    {activeTab === 'platform' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">اسم المنصة</label>
                                <input
                                    type="text"
                                    value={settings.platformName}
                                    onChange={e => handleChange('platformName', e.target.value)}
                                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-mint-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">وصف المنصة</label>
                                <textarea
                                    value={settings.platformDescription}
                                    onChange={e => handleChange('platformDescription', e.target.value)}
                                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-mint-500 outline-none h-24 resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">بريد الدعم</label>
                                <input
                                    type="email"
                                    value={settings.supportEmail}
                                    onChange={e => handleChange('supportEmail', e.target.value)}
                                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-mint-500 outline-none"
                                />
                            </div>
                        </div>
                    )}

                    {/* Registration Tab */}
                    {activeTab === 'registration' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div>
                                    <p className="font-bold text-slate-800">السماح بالتسجيل</p>
                                    <p className="text-sm text-slate-500">إذا تم التعطيل، لن يستطيع المستخدمون الجدد التسجيل</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.registrationOpen}
                                        onChange={e => handleChange('registrationOpen', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-mint-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mint-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div>
                                    <p className="font-bold text-slate-800">التحقق من البريد الإلكتروني</p>
                                    <p className="text-sm text-slate-500">المستخدمون الجدد يجب أن يؤكدوا بريدهم</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.emailVerificationRequired}
                                        onChange={e => handleChange('emailVerificationRequired', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-mint-600 peer-focus:ring-2 peer-focus:ring-mint-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div>
                                    <p className="font-bold text-slate-800">الموافقة التلقائية على المستخدمين</p>
                                    <p className="text-sm text-slate-500">إذا تم التعطيل، المدير يجب أن يوافق يدوياً</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.autoApproveUsers}
                                        onChange={e => handleChange('autoApproveUsers', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-mint-600 peer-focus:ring-2 peer-focus:ring-mint-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Content Tab */}
                    {activeTab === 'content' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div>
                                    <p className="font-bold text-slate-800">الموافقة التلقائية على المحتوى</p>
                                    <p className="text-sm text-slate-500">المحتوى الجديد يُنشر مباشرة دون مراجعة</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.autoApproveContent}
                                        onChange={e => handleChange('autoApproveContent', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-mint-600 peer-focus:ring-2 peer-focus:ring-mint-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">الحد الأقصى لحجم الرفع (MB)</label>
                                <input
                                    type="number"
                                    value={settings.maxUploadSize}
                                    onChange={e => handleChange('maxUploadSize', parseInt(e.target.value))}
                                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-mint-500 outline-none"
                                />
                            </div>
                        </div>
                    )}

                    {/* Community Tab */}
                    {activeTab === 'community' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div>
                                    <p className="font-bold text-slate-800">تفعيل المجتمع</p>
                                    <p className="text-sm text-slate-500">السماح للمستخدمين بالنقاش والتفاعل</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.communityEnabled}
                                        onChange={e => handleChange('communityEnabled', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-mint-600 peer-focus:ring-2 peer-focus:ring-mint-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div>
                                    <p className="font-bold text-slate-800">السماح للطلاب بإنشاء منشورات</p>
                                    <p className="text-sm text-slate-500">إذا تم التعطيل، فقط المعلمون يمكنهم النشر</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.allowStudentPosts}
                                        onChange={e => handleChange('allowStudentPosts', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-mint-600 peer-focus:ring-2 peer-focus:ring-mint-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">الحد الأقصى للمنشورات يومياً</label>
                                <input
                                    type="number"
                                    value={settings.maxPostsPerDay}
                                    onChange={e => handleChange('maxPostsPerDay', parseInt(e.target.value))}
                                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-mint-500 outline-none"
                                />
                            </div>
                        </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div>
                                    <p className="font-bold text-slate-800">Two-Factor Authentication</p>
                                    <p className="text-sm text-slate-500">المصادقة الثنائية للمدراء</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.twoFactorEnabled}
                                        onChange={e => handleChange('twoFactorEnabled', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-mint-600 peer-focus:ring-2 peer-focus:ring-mint-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">مدة الجلسة (دقائق)</label>
                                <input
                                    type="number"
                                    value={settings.sessionDuration}
                                    onChange={e => handleChange('sessionDuration', parseInt(e.target.value))}
                                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-mint-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">الحد الأدنى لطول كلمة المرور</label>
                                <input
                                    type="number"
                                    value={settings.passwordMinLength}
                                    onChange={e => handleChange('passwordMinLength', parseInt(e.target.value))}
                                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-mint-500 outline-none"
                                />
                            </div>
                        </div>
                    )}

                    {/* Maintenance Tab */}
                    {activeTab === 'maintenance' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                                <div>
                                    <p className="font-bold text-yellow-900 inline-flex items-center gap-1"><TriangleAlert size={14} /> وضع الصيانة</p>
                                    <p className="text-sm text-yellow-700">تعطيل الموقع مؤقتاً للصيانة</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.maintenanceMode}
                                        onChange={e => handleChange('maintenanceMode', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-yellow-200 rounded-full peer peer-checked:bg-yellow-600 peer-focus:ring-2 peer-focus:ring-yellow-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-yellow-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                </label>
                            </div>

                            {settings.maintenanceMode && (
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">رسالة الصيانة</label>
                                    <textarea
                                        value={settings.maintenanceMessage}
                                        onChange={e => handleChange('maintenanceMessage', e.target.value)}
                                        className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-mint-500 outline-none h-24 resize-none"
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Customization Tab */}
                    {activeTab === 'customization' && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">اللون الأساسي</label>
                                    <input
                                        type="color"
                                        value={settings.primaryColor}
                                        onChange={e => handleChange('primaryColor', e.target.value)}
                                        className="w-full h-12 border border-slate-200 rounded-xl cursor-pointer"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">اللون الثانوي</label>
                                    <input
                                        type="color"
                                        value={settings.accentColor}
                                        onChange={e => handleChange('accentColor', e.target.value)}
                                        className="w-full h-12 border border-slate-200 rounded-xl cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">اللغة الافتراضية</label>
                                <select
                                    value={settings.defaultLanguage}
                                    onChange={e => handleChange('defaultLanguage', e.target.value)}
                                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-mint-500 outline-none bg-white"
                                >
                                    <option value="ar">العربية</option>
                                    <option value="en">English</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Features Tab */}
                    {activeTab === 'features' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div>
                                    <p className="font-bold text-slate-800">المعلم الذكي (AI Tutor)</p>
                                    <p className="text-sm text-slate-500">تفعيل مساعد الذكاء الاصطناعي</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.aiTutorEnabled}
                                        onChange={e => handleChange('aiTutorEnabled', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-mint-600 peer-focus:ring-2 peer-focus:ring-mint-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div>
                                    <p className="font-bold text-slate-800">نظام الاختبارات</p>
                                    <p className="text-sm text-slate-500">تفعيل الاختبارات الإلكترونية</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.examSystemEnabled}
                                        onChange={e => handleChange('examSystemEnabled', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-mint-600 peer-focus:ring-2 peer-focus:ring-mint-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div>
                                    <p className="font-bold text-slate-800">الشهادات الإلكترونية</p>
                                    <p className="text-sm text-slate-500">إصدار شهادات للطلاب عند الإنجاز</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.certificatesEnabled}
                                        onChange={e => handleChange('certificatesEnabled', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-mint-600 peer-focus:ring-2 peer-focus:ring-mint-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                </label>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminSettingsPage;
