import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Globe, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PublicFooter: React.FC = () => {
    const { t, i18n } = useTranslation();

    return (
        <footer className="border-t border-slate-100 bg-white px-6 py-12" dir={i18n.dir()}>
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-12 lg:grid-cols-[1.5fr,1fr,1fr]">
                    <div className={`space-y-6 ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>
                        <div className={`flex items-center gap-3 ${i18n.dir() === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white shadow-md">
                                <Sparkles size={20} className="text-indigo-400" />
                            </div>
                            <span className="text-2xl font-black tracking-tight text-slate-950">Readmint</span>
                        </div>
                        <p className={`max-w-sm text-sm font-bold leading-relaxed text-slate-500 ${i18n.dir() === 'rtl' ? 'mr-auto' : 'ml-0'}`}>
                            {t('footer.description')}
                        </p>
                        <div className={`flex items-center gap-3 ${i18n.dir() === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all hover:bg-indigo-50 hover:text-indigo-600">
                                    <Globe size={16} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-2 grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h4 className="text-xs font-black uppercase tracking-[0.1em] text-slate-900">{t('footer.platform')}</h4>
                            <ul className="space-y-3 text-sm font-bold text-slate-500">
                                <li><Link to="/curriculum" className="hover:text-indigo-600">{t('nav.curriculum')}</Link></li>
                                <li><Link to="/teachers" className="hover:text-indigo-600">{t('nav.teachers')}</Link></li>
                                <li><Link to="/curriculum" className="hover:text-indigo-600">{t('footer.methodology')}</Link></li>
                                <li><Link to="/teachers" className="hover:text-indigo-600">{t('footer.successStories')}</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xs font-black uppercase tracking-[0.1em] text-slate-900">{t('footer.support')}</h4>
                            <ul className="space-y-3 text-sm font-bold text-slate-500">
                                <li><Link to="/contact" className="hover:text-indigo-600">{t('footer.helpCenter')}</Link></li>
                                <li><Link to="/terms" className="hover:text-indigo-600">{t('nav.terms')}</Link></li>
                                <li><Link to="/privacy" className="hover:text-indigo-600">{t('nav.privacy')}</Link></li>
                                <li><Link to="/faq" className="hover:text-indigo-600">{t('nav.faq')}</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 text-xs font-black uppercase tracking-widest text-slate-400 md:flex-row">
                    <div>© {new Date().getFullYear()} {t('footer.copyright')}</div>
                    <div className="flex items-center gap-1.5">
                        {t('footer.madeWith')} <Heart size={14} fill="#F43F5E" className="text-rose-500" /> {t('footer.forFuture')}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default PublicFooter;
