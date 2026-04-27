import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ContactPage: React.FC = () => {
    const { t } = useTranslation();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    return (
        <div className="min-h-screen bg-slate-50 py-16 lg:py-24">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-16 space-y-4 text-center">
                    <h1 className="text-4xl font-black text-slate-900 md:text-5xl">{t('pages.contact.title')}</h1>
                    <p className="text-lg font-bold text-slate-500">{t('pages.contact.description')}</p>
                </div>

                <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-24">
                    <div className="space-y-10">
                        <div className="space-y-8">
                            <h2 className="text-2xl font-black text-slate-900">{t('pages.contact.infoTitle')}</h2>

                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-900">{t('pages.contact.emailLabel')}</h3>
                                    <p className="mt-1 font-bold text-slate-500">support@readmint.com</p>
                                    <p className="mt-1 text-sm font-medium text-slate-400">{t('pages.contact.emailText')}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-900">{t('pages.contact.phoneLabel')}</h3>
                                    <p className="mt-1 font-bold text-slate-500" dir="ltr">+966 50 123 4567</p>
                                    <p className="mt-1 text-sm font-medium text-slate-400">{t('pages.contact.phoneText')}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-900">{t('pages.contact.locationLabel')}</h3>
                                    <p className="mt-1 font-bold text-slate-500">{t('pages.contact.locationValue')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200 md:p-10">
                        <h2 className="mb-8 text-2xl font-black text-slate-900">{t('pages.contact.formTitle')}</h2>

                        {isSubmitted ? (
                            <div className="rounded-2xl bg-emerald-50 p-8 text-center ring-1 ring-emerald-200">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                    <Send size={32} />
                                </div>
                                <h3 className="text-xl font-black text-emerald-800">{t('pages.contact.submittedTitle')}</h3>
                                <p className="mt-2 font-bold text-emerald-600">{t('pages.contact.submittedDescription')}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-700">{t('pages.contact.fields.name')}</label>
                                        <input type="text" required className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500" placeholder={t('pages.contact.placeholders.name')} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-700">{t('pages.contact.fields.phone')}</label>
                                        <input type="tel" className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500" placeholder={t('pages.contact.placeholders.phone')} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-700">{t('pages.contact.fields.email')}</label>
                                    <input type="email" required className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500" placeholder={t('pages.contact.placeholders.email')} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-700">{t('pages.contact.fields.message')}</label>
                                    <textarea rows={4} required className="w-full resize-none rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500" placeholder={t('pages.contact.placeholders.message')} />
                                </div>
                                <button type="submit" className="w-full rounded-xl bg-indigo-600 px-4 py-4 text-base font-black text-white transition-all hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 active:scale-[0.98]">
                                    {t('pages.contact.submit')}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
