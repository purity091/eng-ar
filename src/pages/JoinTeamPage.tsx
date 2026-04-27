import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, CheckCircle, Mail, Phone, Send, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TeacherApplication {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    specialization: string;
    experience: string;
    bio: string;
    status: 'pending' | 'approved' | 'rejected';
    submittedAt: string;
}

const JoinTeamPage: React.FC = () => {
    const { t } = useTranslation();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        specialization: '',
        experience: '',
        bio: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const next: Record<string, string> = {};
        if (!formData.fullName.trim()) next.fullName = t('pages.joinTeam.errors.fullName');
        if (!formData.email.trim()) next.email = t('pages.joinTeam.errors.emailRequired');
        else if (!/\S+@\S+\.\S+/.test(formData.email)) next.email = t('pages.joinTeam.errors.emailInvalid');
        if (!formData.phone.trim()) next.phone = t('pages.joinTeam.errors.phone');
        if (!formData.specialization.trim()) next.specialization = t('pages.joinTeam.errors.specialization');
        if (!formData.experience.trim()) next.experience = t('pages.joinTeam.errors.experience');
        if (formData.bio.trim().length < 30) next.bio = t('pages.joinTeam.errors.bio');
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        const application: TeacherApplication = {
            id: `app_${Date.now()}`,
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            specialization: formData.specialization,
            experience: formData.experience,
            bio: formData.bio,
            status: 'pending',
            submittedAt: new Date().toISOString(),
        };

        const existing = JSON.parse(localStorage.getItem('teacher_applications') || '[]');
        existing.push(application);
        localStorage.setItem('teacher_applications', JSON.stringify(existing));

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-slate-50 p-6" dir="rtl">
                <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-xl">
                    <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                        <CheckCircle size={34} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">{t('pages.joinTeam.successTitle')}</h1>
                    <p className="mt-3 text-slate-600">{t('pages.joinTeam.successDescription')}</p>
                    <p className="mt-3 text-sm font-bold text-mint-700">{t('pages.joinTeam.confirmation', { email: formData.email })}</p>
                    <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-bold text-white">
                        <ArrowLeft size={16} /> {t('pages.joinTeam.backHome')}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white p-6" dir="rtl">
            <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-900">{t('pages.joinTeam.title')}</h1>
                <p className="mt-2 text-slate-600">{t('pages.joinTeam.description')}</p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-bold text-slate-700">{t('pages.joinTeam.fields.fullName')}</label>
                        <div className="relative">
                            <User className="absolute right-3 top-3 text-slate-400" size={16} />
                            <input value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full rounded-xl border border-slate-200 p-3 pr-9 outline-none focus:border-mint-500" placeholder={t('pages.joinTeam.placeholders.fullName')} />
                        </div>
                        {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-bold text-slate-700">{t('pages.joinTeam.fields.email')}</label>
                            <div className="relative">
                                <Mail className="absolute right-3 top-3 text-slate-400" size={16} />
                                <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full rounded-xl border border-slate-200 p-3 pr-9 outline-none focus:border-mint-500" placeholder={t('pages.joinTeam.placeholders.email')} dir="ltr" />
                            </div>
                            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-bold text-slate-700">{t('pages.joinTeam.fields.phone')}</label>
                            <div className="relative">
                                <Phone className="absolute right-3 top-3 text-slate-400" size={16} />
                                <input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full rounded-xl border border-slate-200 p-3 pr-9 outline-none focus:border-mint-500" placeholder={t('pages.joinTeam.placeholders.phone')} dir="ltr" />
                            </div>
                            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-bold text-slate-700">{t('pages.joinTeam.fields.specialization')}</label>
                            <input value={formData.specialization} onChange={(e) => setFormData({ ...formData, specialization: e.target.value })} className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-mint-500" placeholder={t('pages.joinTeam.placeholders.specialization')} />
                            {errors.specialization && <p className="mt-1 text-xs text-red-600">{errors.specialization}</p>}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-bold text-slate-700">{t('pages.joinTeam.fields.experience')}</label>
                            <input value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-mint-500" placeholder={t('pages.joinTeam.placeholders.experience')} />
                            {errors.experience && <p className="mt-1 text-xs text-red-600">{errors.experience}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-bold text-slate-700">{t('pages.joinTeam.fields.bio')}</label>
                        <textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} className="h-28 w-full resize-none rounded-xl border border-slate-200 p-3 outline-none focus:border-mint-500" placeholder={t('pages.joinTeam.placeholders.bio')} />
                        {errors.bio && <p className="mt-1 text-xs text-red-600">{errors.bio}</p>}
                    </div>

                    <button type="submit" disabled={isSubmitting} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-mint-600 px-5 py-3 font-bold text-white hover:bg-mint-700 disabled:opacity-60">
                        {isSubmitting ? t('pages.joinTeam.submitting') : t('pages.joinTeam.submit')}
                        <Send size={16} />
                    </button>
                </form>

                <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                    <p className="inline-flex items-center gap-2 font-bold text-slate-700"><Briefcase size={16} /> {t('pages.joinTeam.noteTitle')}</p>
                    <p className="mt-1">{t('pages.joinTeam.noteBody')}</p>
                </div>
            </div>
        </div>
    );
};

export default JoinTeamPage;
