import React, { createContext, useContext, useState, useEffect } from 'react';

export interface PlatformSettings {
    // Platform Info
    platformName: string;
    platformLogo: string;
    platformDescription: string;
    supportEmail: string;

    // Registration
    registrationOpen: boolean;
    emailVerificationRequired: boolean;
    autoApproveUsers: boolean;
    allowedDomains: string[]; // للمدارس: فقط @school.edu

    // Content
    autoApproveContent: boolean;
    requireContentReview: boolean;
    maxUploadSize: number; // MB
    allowedFileTypes: string[];

    // Community
    communityEnabled: boolean;
    allowStudentPosts: boolean;
    requirePostModeration: boolean;
    maxPostsPerDay: number;

    // Security
    twoFactorEnabled: boolean;
    sessionDuration: number; // minutes
    passwordMinLength: number;
    maxLoginAttempts: number;

    // Maintenance
    maintenanceMode: boolean;
    maintenanceMessage: string;

    // Customization
    primaryColor: string;
    accentColor: string;
    defaultLanguage: 'ar' | 'en';
    rtlEnabled: boolean;

    // Features
    aiTutorEnabled: boolean;
    examSystemEnabled: boolean;
    certificatesEnabled: boolean;
}

const DEFAULT_SETTINGS: PlatformSettings = {
    platformName: 'Readmint',
    platformLogo: '/logo.png',
    platformDescription: 'منصة تعليمية شاملة للطلاب',
    supportEmail: 'support@readmint.com',

    registrationOpen: true,
    emailVerificationRequired: true,
    autoApproveUsers: false,
    allowedDomains: [],

    autoApproveContent: false,
    requireContentReview: true,
    maxUploadSize: 50,
    allowedFileTypes: ['pdf', 'jpg', 'png', 'mp4'],

    communityEnabled: true,
    allowStudentPosts: true,
    requirePostModeration: false,
    maxPostsPerDay: 10,

    twoFactorEnabled: false,
    sessionDuration: 480,
    passwordMinLength: 8,
    maxLoginAttempts: 5,

    maintenanceMode: false,
    maintenanceMessage: 'الموقع تحت الصيانة. سنعود قريباً.',

    primaryColor: '#0D9488',
    accentColor: '#14B8A6',
    defaultLanguage: 'ar',
    rtlEnabled: true,

    aiTutorEnabled: true,
    examSystemEnabled: false,
    certificatesEnabled: false,
};

interface SettingsContextType {
    settings: PlatformSettings;
    updateSettings: (newSettings: Partial<PlatformSettings>) => void;
    resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<PlatformSettings>(() => {
        try {
            const saved = localStorage.getItem('platform_settings');
            return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
        } catch (e) {
            return DEFAULT_SETTINGS;
        }
    });

    useEffect(() => {
        localStorage.setItem('platform_settings', JSON.stringify(settings));
    }, [settings]);

    const updateSettings = (newSettings: Partial<PlatformSettings>) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    const resetSettings = () => {
        if (window.confirm('هل أنت متأكد من إعادة تعيين جميع الإعدادات إلى القيم الافتراضية؟')) {
            setSettings(DEFAULT_SETTINGS);
        }
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) throw new Error('useSettings must be used within SettingsProvider');
    return context;
};
