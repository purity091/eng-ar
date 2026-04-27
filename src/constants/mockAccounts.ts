import { AdminProfile, EducationalStage } from '../types';

export const MOCK_ACCOUNTS: Record<string, AdminProfile> = {
  student: {
    id: 'user-student',
    name: 'ليان أحمد',
    email: 'student@readmint.com',
    phone: '1000000000',
    password: '123456',
    role: 'student',
    assignedCountryId: 'eg',
    assignedStage: EducationalStage.PRIMARY,
    status: 'active',
    lastActive: 'Now',
    avatarUrl: 'https://ui-avatars.com/api/?name=Layan+Student&background=f97316&color=fff',
  },
  teacher: {
    id: 'user-teacher',
    name: 'Ms. Emma Carter',
    email: 'teacher@readmint.com',
    phone: '2000000000',
    password: '123456',
    role: 'teacher',
    assignedCountryId: 'eg',
    assignedStage: EducationalStage.PRIMARY,
    assignedSubjects: ['phonics-1', 'speaking-2', 'reading-3'],
    status: 'active',
    lastActive: 'Now',
    avatarUrl: 'https://ui-avatars.com/api/?name=Emma+Carter&background=0f766e&color=fff',
  },
  academic_admin: {
    id: 'user-academic-admin',
    name: 'د. سلمى الحربي',
    email: 'academic@readmint.com',
    phone: '2100000000',
    password: '123456',
    role: 'academic_admin',
    assignedCountryId: 'eg',
    assignedStage: EducationalStage.PRIMARY,
    assignedSubjects: ['phonics', 'speaking', 'reading'],
    status: 'active',
    lastActive: 'Now',
    avatarUrl: 'https://ui-avatars.com/api/?name=Salma+Academic&background=7c3aed&color=fff',
  },
  stage_admin: {
    id: 'user-stage-admin',
    name: 'مدير المرحلة الابتدائية',
    email: 'stage@readmint.com',
    phone: '2200000000',
    password: '123456',
    role: 'stage_admin',
    assignedCountryId: 'eg',
    assignedStage: EducationalStage.PRIMARY,
    status: 'active',
    lastActive: 'Now',
    avatarUrl: 'https://ui-avatars.com/api/?name=Primary+Lead&background=f59e0b&color=fff',
  },
  admin: {
    id: 'user-admin',
    name: 'مدير التشغيل',
    email: 'admin@readmint.com',
    phone: '3000000000',
    password: '123456',
    role: 'country_admin',
    assignedCountryId: 'eg',
    status: 'active',
    lastActive: 'Now',
    avatarUrl: 'https://ui-avatars.com/api/?name=Ops+Admin&background=dc2626&color=fff',
  },
  moderator: {
    id: 'user-moderator',
    name: 'مشرف المجتمع',
    email: 'mod@readmint.com',
    phone: '5000000000',
    password: '123456',
    role: 'moderator',
    assignedCountryId: 'eg',
    status: 'active',
    lastActive: 'Now',
    avatarUrl: 'https://ui-avatars.com/api/?name=Moderator&background=64748b&color=fff',
  },
};

export const getRoleDisplayName = (role: string): string => {
  const names: Record<string, string> = {
    student: 'طالب',
    teacher: 'معلم Native',
    moderator: 'مشرف مجتمع',
    academic_admin: 'مشرف أكاديمي',
    stage_admin: 'مدير مرحلة',
    country_admin: 'مدير تشغيل',
    global_super_admin: 'مشرف عام',
    platform_owner: 'مالك المنصة',
  };

  return names[role] || role;
};

export const getRoleColor = (role: string): string => {
  const colors: Record<string, string> = {
    student: 'bg-emerald-500',
    teacher: 'bg-sky-500',
    moderator: 'bg-slate-500',
    academic_admin: 'bg-violet-500',
    stage_admin: 'bg-amber-500',
    country_admin: 'bg-rose-500',
    global_super_admin: 'bg-indigo-500',
    platform_owner: 'bg-slate-900',
  };

  return colors[role] || 'bg-slate-500';
};
