import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Country, EducationalStage, AdminProfile, UserRole, UserRoleEnum, Action, Resource, UserScope } from '../types';
import { COUNTRIES } from '../constants';
import { MOCK_ACCOUNTS } from '../constants/mockAccounts';
import { hasRole, canAccessScope, canPerformAction } from '../utils/permissions';

interface UserProfile {
    name: string;
    grade: number;
    stage: EducationalStage;
    avatarUrl?: string;
}

interface AppContextType {
    selectedCountry: Country;
    setCountry: (countryId: string) => void;
    userProfile: UserProfile | null;
    updateProfile: (updates: Partial<UserProfile>) => void;
    loginStudent: (data: { name: string; phone: string; countryId: string; grade: number; password?: string }) => { success: boolean; message?: string };
    loginWithPhone: (phone: string, password: string) => boolean;
    currentUser: AdminProfile | null;
    isAuthenticated: boolean;
    loginAs: (roleKey: string) => void;
    logout: () => void;
    isAdmin: boolean;
    isTeacher: boolean;
    isStudent: boolean;
    isModerator: boolean;
    checkRole: (role: UserRole) => boolean;
    checkPermission: (resource: Resource, action: Action, scope?: UserScope) => boolean;
    checkScope: (scope: UserScope) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
    const [currentUser, setCurrentUser] = useState<AdminProfile | null>(() => {
        const savedSession = localStorage.getItem('readmint_session_user');
        return savedSession ? JSON.parse(savedSession) : null;
    });
    const [studentGrade, setStudentGrade] = useState<number>(() => {
        const savedGrade = localStorage.getItem('readmint_student_grade');
        return savedGrade ? parseInt(savedGrade, 10) : 2;
    });

    useEffect(() => {
        localStorage.setItem('readmint_student_grade', studentGrade.toString());
    }, [studentGrade]);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('readmint_users_db') || '[]');
        let hasChanges = false;

        Object.values(MOCK_ACCOUNTS).forEach((mockUser) => {
            if (mockUser.phone && !storedUsers.find((user: any) => user.phone === mockUser.phone)) {
                storedUsers.push(mockUser);
                hasChanges = true;
            }
        });

        if (hasChanges) {
            localStorage.setItem('readmint_users_db', JSON.stringify(storedUsers));
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('readmint_session_user', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('readmint_session_user');
        }
    }, [currentUser]);

    const userProfile = currentUser
        ? {
            name: currentUser.name,
            grade: studentGrade,
            stage: currentUser.assignedStage || EducationalStage.PRIMARY,
            avatarUrl: currentUser.avatarUrl,
        }
        : null;

    const updateProfile = (updates: Partial<UserProfile>) => {
        if (typeof updates.grade === 'number') {
            setStudentGrade(updates.grade);
        }
    };

    const setCountry = (countryId: string) => {
        const country = COUNTRIES.find((item) => item.id === countryId);
        if (country) {
            setSelectedCountry(country);
        }
    };

    const loginStudent = (data: { name: string; phone: string; countryId: string; grade: number; password?: string }) => {
        const storedUsers = JSON.parse(localStorage.getItem('readmint_users_db') || '[]');
        const exists = storedUsers.findIndex((user: any) => user.phone === data.phone);

        if (exists >= 0) {
            return { success: false, message: 'رقم الهاتف مسجل مسبقًا. استخدم تسجيل الدخول.' };
        }

        const newStudentUser: AdminProfile = {
            id: `student-${data.phone}`,
            name: data.name,
            email: `${data.phone}@readmint.com`,
            role: 'student',
            avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=f97316&color=fff`,
            assignedCountryId: data.countryId,
            assignedStage: EducationalStage.PRIMARY,
            status: 'active',
            lastActive: new Date().toISOString(),
        };

        storedUsers.push({
            ...newStudentUser,
            phone: data.phone,
            password: data.password || '123456',
            grade: data.grade,
        });

        localStorage.setItem('readmint_users_db', JSON.stringify(storedUsers));
        setCurrentUser(newStudentUser);
        setCountry(data.countryId);
        setStudentGrade(data.grade);

        return { success: true };
    };

    const loginWithPhone = (phone: string, password: string): boolean => {
        const storedUsers = JSON.parse(localStorage.getItem('readmint_users_db') || '[]');
        const user = storedUsers.find((item: any) => item.phone === phone && item.password === password);

        if (!user) {
            return false;
        }

        const { password: _password, phone: _phone, ...profileData } = user;
        setCurrentUser(profileData as AdminProfile);
        setCountry(user.assignedCountryId);
        setStudentGrade(user.grade || 2);
        return true;
    };

    const loginAs = (roleKey: string) => {
        const user = MOCK_ACCOUNTS[roleKey as keyof typeof MOCK_ACCOUNTS] || Object.values(MOCK_ACCOUNTS).find((item) => item.role === roleKey);

        if (!user) {
            return;
        }

        setCurrentUser(user);
        if (user.assignedCountryId && user.assignedCountryId !== 'ALL') {
            setCountry(user.assignedCountryId);
        }
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('readmint_session_user');
        localStorage.removeItem('readmint_student_grade');
    };

    const isAdmin = currentUser ? hasRole(currentUser.role, UserRoleEnum.MODERATOR) : false;
    const isTeacher = currentUser?.role === UserRoleEnum.TEACHER;
    const isStudent = currentUser?.role === UserRoleEnum.STUDENT;
    const isModerator = currentUser?.role === UserRoleEnum.MODERATOR;

    const checkRole = useCallback((role: UserRole) => {
        if (!currentUser) {
            return false;
        }
        return hasRole(currentUser.role, role);
    }, [currentUser]);

    const checkPermission = useCallback((resource: Resource, action: Action, scope?: UserScope) => {
        if (!currentUser) {
            return false;
        }
        return canPerformAction(currentUser, resource, action, scope);
    }, [currentUser]);

    const checkScope = useCallback((scope: UserScope) => {
        if (!currentUser) {
            return false;
        }
        return canAccessScope(currentUser, scope);
    }, [currentUser]);

    useEffect(() => {
        const hostname = window.location.hostname;
        const parts = hostname.split('.');
        if (parts.length > 2) {
            const country = COUNTRIES.find((item) => item.subdomain === parts[0]);
            if (country) {
                setSelectedCountry(country);
            }
        }
    }, []);

    return (
        <AppContext.Provider
            value={{
                selectedCountry,
                setCountry,
                userProfile,
                updateProfile,
                loginStudent,
                loginWithPhone,
                currentUser,
                isAuthenticated: !!currentUser,
                loginAs,
                logout,
                isAdmin,
                isTeacher,
                isStudent,
                isModerator,
                checkRole,
                checkPermission,
                checkScope,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
