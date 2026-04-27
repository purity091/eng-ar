import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PublicNavbar from '../components/layout/PublicNavbar';
import PublicFooter from '../components/layout/PublicFooter';

const PublicLayout: React.FC = () => {
    const { i18n } = useTranslation();

    return (
        <div className="flex min-h-screen flex-col font-sans text-slate-900 bg-white" dir={i18n.dir()}>
            <PublicNavbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <PublicFooter />
        </div>
    );
};

export default PublicLayout;
