import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LogIn, Sparkles, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../contexts/AppContext';
import LanguageSwitcher from '../../components/layout/LanguageSwitcher';

const StudentAuthPage: React.FC = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const { loginStudent, loginWithPhone } = useApp();
    const [mode, setMode] = useState<'register' | 'login'>('register');
    const [name, setName] = useState('');
    const [grade, setGrade] = useState(2);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const gradeLabels = t('auth.register.gradeLabels', { returnObjects: true }) as string[];
    const stats = t('auth.register.stats', { returnObjects: true }) as Array<{ value: string; label: string }>;

    const submit = () => {
        setError('');
        const fullPhone = `+966${phone}`;

        if (mode === 'login') {
            const ok = loginWithPhone(fullPhone, password);
            if (ok) {
                navigate('/');
                return;
            }
            setError(t('auth.register.loginError'));
            return;
        }

        const result = loginStudent({
            name,
            phone: fullPhone,
            countryId: 'sa',
            grade,
            password,
        });

        if (result.success) {
            navigate('/');
            return;
        }

        setError(result.message || t('auth.register.createError'));
    };

    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,#fff7ed,#eff6ff)] relative" dir={i18n.dir()}>
            <div className={`fixed top-6 ${i18n.dir() === 'rtl' ? 'left-6' : 'right-6'} z-50`}>
                <LanguageSwitcher />
            </div>
            <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">
                <div className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-xl font-bold text-white">R</div>
                        <div>
                            <div className="text-2xl font-bold">{t('common.readmintEnglish')}</div>
                            <div className="text-sm text-white/60">{t('auth.register.heroDescription')}</div>
                        </div>
                    </div>

                    <div className="max-w-xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-orange-300">
                            <Sparkles size={14} />
                            {t('auth.register.heroBadge')}
                        </div>
                        <h1 className="text-5xl font-bold leading-tight">{t('auth.register.heroTitle')}</h1>
                        <p className="mt-6 text-lg leading-8 text-white/70">{t('auth.register.heroDescription')}</p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        {stats.map((item) => (
                            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <div className="text-2xl font-bold">{item.value}</div>
                                <div className="mt-1 text-sm text-white/60">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-center p-6 lg:p-10">
                    <div className="w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl lg:p-8">
                        <div className="mb-6 flex items-center gap-3">
                            <button onClick={() => navigate('/')} className="rounded-xl bg-slate-100 p-2 text-slate-600 hover:bg-slate-200">
                                <ArrowLeft size={18} />
                            </button>
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900">{mode === 'register' ? t('auth.register.createAccount') : t('auth.register.login')}</h2>
                                <p className="mt-1 text-slate-500">{mode === 'register' ? t('auth.register.createDescription') : t('auth.register.loginDescription')}</p>
                            </div>
                        </div>

                        <div className="mb-6 grid grid-cols-2 rounded-2xl bg-slate-100 p-1">
                            <button onClick={() => setMode('register')} className={`rounded-2xl px-4 py-3 font-bold ${mode === 'register' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>
                                <UserPlus className="ml-2 inline" size={16} />
                                {t('auth.register.newAccount')}
                            </button>
                            <button onClick={() => setMode('login')} className={`rounded-2xl px-4 py-3 font-bold ${mode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>
                                <LogIn className="ml-2 inline" size={16} />
                                {t('auth.register.loginTab')}
                            </button>
                        </div>

                        <div className="space-y-4">
                            {mode === 'register' && (
                                <>
                                    <div>
                                        <label className="mb-2 block text-sm font-bold text-slate-700">{t('auth.register.childName')}</label>
                                        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400" placeholder={t('auth.register.namePlaceholder')} />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-bold text-slate-700">{t('auth.register.gradeOrLevel')}</label>
                                        <select value={grade} onChange={(e) => setGrade(parseInt(e.target.value, 10))} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400">
                                            {gradeLabels.map((item, index) => (
                                                <option key={item} value={index}>{item}</option>
                                            ))}
                                        </select>
                                    </div>
                                </>
                            )}

                            {mode === 'register' && (
                                <div className="mb-4 rounded-2xl border-2 border-emerald-100 bg-emerald-50 p-3 text-center">
                                    <p className="text-xs font-black text-emerald-700">🇸🇦 {t('auth.register.saudiOnly')}</p>
                                </div>
                            )}

                            <div>
                                <label className="mb-2 block text-sm font-bold text-slate-700">{t('auth.register.phone')}</label>
                                <div className="relative flex items-center" dir="ltr">
                                    <div className="absolute left-4 flex items-center gap-2 border-r border-slate-200 pr-3">
                                        <span className="text-lg">🇸🇦</span>
                                        <span className="text-sm font-black text-slate-700">+966</span>
                                    </div>
                                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-24 pr-4 text-sm font-bold outline-none focus:border-orange-500" placeholder={t('auth.register.phonePlaceholder')} />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-slate-700">{t('auth.register.password')}</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400" />
                            </div>

                            {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</div>}

                            <button onClick={submit} className="w-full rounded-2xl bg-slate-900 px-6 py-4 font-bold text-white">
                                {mode === 'register' ? t('auth.register.createButton') : t('auth.register.loginButton')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentAuthPage;
