import { AdminProfile, EducationalStage } from '../types';

export const MOCK_ADMIN_USERS: AdminProfile[] = [
    {
        id: 'owner-1',
        name: 'د. سا.S ا".اf',
        email: 'owner@readmint.com',
        role: 'platform_owner',
        assignedCountryId: 'ALL',
        status: 'active',
        lastActive: 'اآ?',
        avatarUrl: 'https://ui-avatars.com/api/?name=Sami+Owner&background=000&color=fff'
    },

    {
        id: 'global-1',
        name: 'سارة اعا".Sة',
        email: 'sara@readmint.com',
        role: 'global_super_admin',
        assignedCountryId: 'ALL',
        status: 'active',
        lastActive: '.?ذ 5 د',
        avatarUrl: 'https://ui-avatars.com/api/?name=Sara+Global&background=6366f1&color=fff'
    },

    {
        id: 'country-eg-1',
        name: 'أح.د ا".صرS',
        email: 'ahmed.eg@readmint.com',
        role: 'country_admin',
        assignedCountryId: 'eg',
        status: 'active',
        lastActive: '.?ذ 1 ساعة',
        avatarUrl: 'https://ui-avatars.com/api/?name=Ahmed+EG&background=ef4444&color=fff'
    },

    {
        id: 'country-sa-1',
        name: 'فSص" اسع^دS',
        email: 'faisal.sa@readmint.com',
        role: 'country_admin',
        assignedCountryId: 'sa',
        status: 'active',
        lastActive: '.?ذ 10 د',
        avatarUrl: 'https://ui-avatars.com/api/?name=Faisal+SA&background=22c55e&color=fff'
    },

    {
        id: 'stage-eg-sec',
        name: '.?? اثا?^Sة',
        email: 'mona.sec@readmint.com',
        role: 'stage_admin',
        assignedCountryId: 'eg',
        assignedStage: EducationalStage.SECONDARY,
        status: 'active',
        lastActive: 'أ.س',
        avatarUrl: 'https://ui-avatars.com/api/?name=Mona+Sec&background=f59e0b&color=fff'
    },

    {
        id: 'teach-sa-math',
        name: 'أ. خاد جبر',
        email: 'khaled.math@readmint.com',
        role: 'teacher',
        assignedCountryId: 'sa',
        assignedSubjects: ['ارSاضSات'],
        status: 'active',
        lastActive: '.?ذ 2 S^.',
        avatarUrl: 'https://ui-avatars.com/api/?name=Khaled+Math&background=3b82f6&color=fff'
    },

    {
        id: 'mod-1',
        name: 'حارس ا".جت.ع',
        email: 'mod@readmint.com',
        role: 'moderator',
        assignedCountryId: 'eg',
        status: 'pending',
        lastActive: '-',
        avatarUrl: 'https://ui-avatars.com/api/?name=Mod+User&background=64748b&color=fff'
    }
];


