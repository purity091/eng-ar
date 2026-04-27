import React, { useState } from 'react';
import { X, Save, User, Mail, Shield, MapPin, GraduationCap } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { usePermissions } from '../../hooks/usePermissions';
import { AdminProfile, UserRole, EducationalStage } from '../../types';
import { COUNTRIES } from '../../constants';

interface UserManagementModalProps {
    isOpen: boolean;
    onClose: () => void;
    user?: AdminProfile | null; // For editing
    onSave: (user: AdminProfile) => void;
}

const UserManagementModal: React.FC<UserManagementModalProps> = ({ isOpen, onClose, user, onSave }) => {
    const { currentUser } = useApp();
    const { getAccessibleCountries } = usePermissions();

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [role, setRole] = useState<UserRole>(user?.role || 'student');
    const [countryId, setCountryId] = useState(user?.assignedCountryId || 'eg');
    const [stage, setStage] = useState<EducationalStage>(user?.assignedStage || EducationalStage.SECONDARY);
    const [status, setStatus] = useState<'active' | 'suspended' | 'pending'>(user?.status || 'active');

    const accessibleCountries = getAccessibleCountries();
    const canChangeCountry = accessibleCountries.includes('ALL') || accessibleCountries.length > 1;

    // Determine which roles this admin can assign
    const getAssignableRoles = (): UserRole[] => {
        switch (currentUser?.role) {
            case 'platform_owner':
                return ['global_super_admin', 'country_admin', 'stage_admin', 'academic_admin', 'teacher', 'moderator', 'student'];
            case 'global_super_admin':
                return ['country_admin', 'stage_admin', 'academic_admin', 'teacher', 'moderator', 'student'];
            case 'country_admin':
                return ['stage_admin', 'academic_admin', 'teacher', 'moderator', 'student'];
            case 'stage_admin':
                return ['teacher', 'student'];
            default:
                return ['student'];
        }
    };

    const assignableRoles = getAssignableRoles();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const userData: AdminProfile = {
            id: user?.id || `user-${Date.now()}`,
            name,
            email,
            role,
            assignedCountryId: countryId,
            assignedStage: ['teacher', 'stage_admin', 'academic_admin'].includes(role) ? stage : undefined,
            status,
            lastActive: user?.lastActive || 'الآن',
            avatarUrl: user?.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
        };

        onSave(userData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-mint-100 text-mint-600">
                            <User size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">
                                {user ? 'تعديل مستخدم' : 'إضافة مستخدم جديد'}
                            </h2>
                            <p className="text-sm text-slate-500">إدارة الحسابات والصلاحيات</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-red-500 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">الاسم الكامل</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-mint-500 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-mint-500 outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">الدور الوظيفي</label>
                        <select
                            value={role}
                            onChange={e => setRole(e.target.value as UserRole)}
                            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-mint-500 outline-none bg-white"
                        >
                            {assignableRoles.map(r => (
                                <option key={r} value={r}>
                                    {r === 'student' ? 'طالب' :
                                        r === 'teacher' ? 'معلم' :
                                            r === 'moderator' ? 'مشرف مجتمع' :
                                                r === 'academic_admin' ? 'مشرف أكاديمي' :
                                                    r === 'stage_admin' ? 'مدير مرحلة' :
                                                        r === 'country_admin' ? 'مدير دولة' :
                                                            r === 'global_super_admin' ? 'مدير عالمي' : r}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Scope Settings */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <MapPin size={18} className="text-slate-400" />
                            النطاق الجغرافي والتعليمي
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1">الدولة</label>
                                <select
                                    value={countryId}
                                    onChange={e => setCountryId(e.target.value)}
                                    disabled={!canChangeCountry}
                                    className={`w-full p-2.5 rounded-lg border text-sm ${!canChangeCountry ? 'bg-slate-100 cursor-not-allowed' : 'bg-white'}`}
                                >
                                    {COUNTRIES.filter(c => accessibleCountries.includes(c.id) || accessibleCountries.includes('ALL')).map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1">المرحلة</label>
                                <select
                                    value={stage}
                                    onChange={e => setStage(e.target.value as EducationalStage)}
                                    className="w-full p-2.5 rounded-lg border text-sm bg-white"
                                >
                                    {Object.values(EducationalStage).map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">حالة الحساب</label>
                        <select
                            value={status}
                            onChange={e => setStatus(e.target.value as any)}
                            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-mint-500 outline-none bg-white"
                        >
                            <option value="active">نشط</option>
                            <option value="pending">قيد المراجعة</option>
                            <option value="suspended">محظور</option>
                        </select>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                            إلغاء
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-2.5 bg-mint-600 text-white rounded-xl font-bold hover:bg-mint-700 transition-colors flex items-center gap-2 shadow-lg shadow-mint-600/20"
                        >
                            <Save size={18} />
                            {user ? 'حفظ التعديلات' : 'إضافة المستخدم'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserManagementModal;
