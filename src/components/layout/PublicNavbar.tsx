import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const PublicNavbar: React.FC = () => {
    const { t, i18n } = useTranslation();

    return (
        <header className="border-b border-slate-200 bg-white/95 backdrop-blur" dir={i18n.dir()}>
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
                <Link to="/" className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">R</div>
                    <span className="text-xl font-black text-slate-900">Readmint</span>
                </Link>

                <nav className="hidden items-center gap-6 text-sm font-bold text-slate-600 lg:flex">
                    <Link to="/pricing" className="hover:text-slate-900">{t('nav.pricing')}</Link>
                    <Link to="/curriculum" className="hover:text-slate-900">{t('nav.curriculum')}</Link>
                    <Link to="/teachers" className="hover:text-slate-900">{t('nav.teachers')}</Link>
                    <Link to="/faq" className="hover:text-slate-900">{t('nav.faq')}</Link>
                    <Link to="/contact" className="hover:text-slate-900">{t('nav.contact')}</Link>
                </nav>

                <div className="flex items-center gap-3">
                    <LanguageSwitcher />
                    <Link to="/join" className="rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-black text-white shadow-md transition-all hover:bg-slate-800 active:scale-95">
                        {t('nav.auth')}
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default PublicNavbar;
