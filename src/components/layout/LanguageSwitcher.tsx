import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-black text-slate-700 transition-all hover:bg-slate-200"
            title={i18n.language === 'en' ? t('languageSwitcher.switchToArabic') : t('languageSwitcher.switchToEnglish')}
        >
            <Globe size={16} className="text-indigo-600" />
            <span>{i18n.language === 'en' ? t('languageSwitcher.arabic') : t('languageSwitcher.english')}</span>
        </button>
    );
};

export default LanguageSwitcher;
