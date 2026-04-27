import React, { useState, useEffect } from 'react';
import { Users, Filter, MoreHorizontal, Shield, MapPin, Briefcase, UserPlus, Ban, CheckCircle, Flag, Globe, TriangleAlert } from 'lucide-react';
import { MOCK_ADMIN_USERS } from '../../constants/adminUsers';
import { DataTable } from '../../components/admin/DataTable';
import { AdminProfile, UserRole } from '../../types';
import { usePermissions } from '../../hooks/usePermissions';
import UserManagementModal from '../../components/admin/UserManagementModal';

const AdminUsersPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { hasPermission, canAccessContent, canManageUser } = usePermissions();

    // Local State with Persistence
    const [usersData, setUsersData] = useState<AdminProfile[]>(() => {
        try {
            const saved = localStorage.getItem('admin_users_list');
            return saved ? JSON.parse(saved) : MOCK_ADMIN_USERS;
        } catch (e) {
            return MOCK_ADMIN_USERS;
        }
    });

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<AdminProfile | null>(null);

    // Sync with LocalStorage
    useEffect(() => {
        localStorage.setItem('admin_users_list', JSON.stringify(usersData));
    }, [usersData]);

    // Filter users based on permissions
    const filteredUsers = usersData.filter(user => {
        // Search filter
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.role.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        // Scope filter: can only see users in accessible scope
        if (user.assignedCountryId && user.assignedCountryId !== 'ALL') {
            return canAccessContent(user.assignedCountryId);
        }

        return true;
    });

    const handleAddNew = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const handleEdit = (user: AdminProfile) => {
        if (!canManageUser(user)) {
            alert('ليس لديك صلاحية لتعديل هذا المستخدم');
            return;
        }
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleSave = (user: AdminProfile) => {
        if (editingUser) {
            // Update existing
            setUsersData(usersData.map(u => u.id === user.id ? user : u));
        } else {
            // Add new
            setUsersData([user, ...usersData]);
        }
    };

    const handleToggleStatus = (user: AdminProfile) => {
        if (!hasPermission('users', 'manage')) {
            alert('ليس لديك صلاحية لتعديل حالة المستخدمين');
            return;
        }

        const newStatus = user.status === 'active' ? 'suspended' : 'active';
        setUsersData(usersData.map(u =>
            u.id === user.id ? { ...u, status: newStatus } : u
        ));
    };

    const handleDelete = (user: AdminProfile) => {
        if (!hasPermission('users', 'manage')) {
            alert('ليس لديك صلاحية لحذف المستخدمين');
            return;
        }

        if (!window.confirm(`هل أنت متأكد من حذف "${user.name}"؟`)) return;

        setUsersData(usersData.filter(u => u.id !== user.id));
    };

    // Helper to get role badge styling
    const getRoleBadge = (role: UserRole) => {
        switch (role) {
            case 'platform_owner': return { bg: 'bg-slate-900', text: 'text-white', label: 'مالك المنصة' };
            case 'global_super_admin': return { bg: 'bg-indigo-600', text: 'text-white', label: 'مدير عالمي' };
            case 'country_admin': return { bg: 'bg-blue-600', text: 'text-white', label: 'مدير دولة' };
            case 'stage_admin': return { bg: 'bg-orange-500', text: 'text-white', label: 'مدير مرحلة' };
            case 'academic_admin': return { bg: 'bg-purple-500', text: 'text-white', label: 'مشرف أكاديمي' };
            case 'teacher': return { bg: 'bg-mint-600', text: 'text-white', label: 'معلم' };
            case 'moderator': return { bg: 'bg-gray-500', text: 'text-white', label: 'مشرف' };
            case 'student': return { bg: 'bg-green-500', text: 'text-white', label: 'طالب' };
            default: return { bg: 'bg-slate-200', text: 'text-slate-700', label: role };
        }
    };

    const columns = [
        {
            header: 'المستخدم',
            accessor: (user: AdminProfile) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                        <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p className="font-bold text-slate-800">{user.name}</p>
                        <p className="text-xs text-slate-400 font-mono">{user.email}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'الدور والمسؤولية',
            accessor: (user: AdminProfile) => {
                const badge = getRoleBadge(user.role);
                return (
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm ${badge.bg} ${badge.text}`}>
                        {badge.label}
                    </span>
                );
            }
        },
        {
            header: 'نطاق الصلاحية (Scope)',
            accessor: (user: AdminProfile) => (
                <div className="flex flex-col gap-1 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                        <MapPin size={12} className="text-slate-400" />
                        <span className="font-bold">
                            {user.assignedCountryId === 'ALL' ? (
                                <span className="inline-flex items-center gap-1">
                                    <Globe size={12} /> عالمي (Global)
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1">
                                    <Flag size={12} /> {user.assignedCountryId?.toUpperCase()}
                                </span>
                            )}
                        </span>
                    </div>
                    {user.assignedStage && (
                        <div className="flex items-center gap-1.5 text-slate-600">
                            <Briefcase size={12} className="text-slate-400" />
                            <span>{user.assignedStage}</span>
                        </div>
                    )}
                </div>
            )
        },
        {
            header: 'الحالة',
            accessor: (user: AdminProfile) => (
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${user.status === 'active' ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20' :
                    user.status === 'pending' ? 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20' :
                        'bg-red-50 text-red-700 ring-1 ring-red-600/20'
                    }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                    {user.status === 'active' ? 'نشط' : user.status === 'pending' ? 'معلق' : 'محظور'}
                </span>
            )
        },
        {
            header: 'آخر نشاط',
            accessor: (user: AdminProfile) => (
                <span className="text-slate-400 text-xs">{user.lastActive}</span>
            )
        }
    ];

    const actions = [];

    // Add actions based on permissions
    if (hasPermission('users', 'manage')) {
        actions.push({
            icon: Shield,
            label: (user: AdminProfile) => user.status === 'active' ? 'حظر' : 'إلغاء الحظر',
            onClick: handleToggleStatus,
            color: 'text-orange-600 hover:bg-orange-50'
        });
        actions.push({
            icon: MoreHorizontal,
            label: 'تعديل',
            onClick: handleEdit,
            color: 'text-blue-600 hover:bg-blue-50'
        });
    }

    return (
        <div className="space-y-6">
            {!hasPermission('users', 'manage') && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
                    <div className="text-yellow-600"><TriangleAlert size={18} /></div>
                    <div>
                        <p className="font-bold text-yellow-800 text-sm">صلاحية محدودة</p>
                        <p className="text-yellow-700 text-xs">يمكنك فقط عرض المستخدمين. ليس لديك صلاحية للتعديل.</p>
                    </div>
                </div>
            )}

            <DataTable
                title="الهيكل الإداري للمنصة"
                subtitle="إدارة الصلاحيات والأدوار وفقاً للهيكل الهرمي (RBAC)"
                data={filteredUsers}
                columns={columns}
                actions={actions}
                onSearch={setSearchQuery}
                primaryAction={hasPermission('users', 'manage') ? {
                    label: 'إضافة مستخدم جديد',
                    icon: UserPlus,
                    onClick: handleAddNew
                } : undefined}
            />

            {/* User Management Modal */}
            <UserManagementModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                user={editingUser}
                onSave={handleSave}
            />
        </div>
    );
};

export default AdminUsersPage;
