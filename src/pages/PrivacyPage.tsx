import React from 'react';
import { Lock, EyeOff, Server, Database } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SectionItem {
    title: string;
    body?: string;
    list?: string[];
}

const PrivacyPage: React.FC = () => {
    const { t } = useTranslation();
    const sections = t('pages.privacy.sections', { returnObjects: true }) as SectionItem[];

    return (
        <div className="bg-slate-50 py-16 lg:py-24">
            <div className="mx-auto max-w-4xl px-6">
                <div className="mb-12 space-y-4 text-center">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-sm">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 md:text-5xl">{t('pages.privacy.title')}</h1>
                    <p className="text-lg font-bold text-slate-500">{t('pages.privacy.description')}</p>
                </div>

                <div className="space-y-10 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-12">
                    {sections.map((section, index) => (
                        <section key={section.title} className="space-y-4">
                            <h2 className="flex items-center gap-3 text-2xl font-black text-slate-900">
                                {index === 0 ? <Database size={24} className="text-emerald-600" /> : index === 1 ? <Server size={24} className="text-emerald-600" /> : index === 2 ? <EyeOff size={24} className="text-emerald-600" /> : null}
                                {section.title}
                            </h2>
                            {section.body && <p className="font-medium leading-relaxed text-slate-600">{section.body}</p>}
                            {section.list && (
                                <ul className="list-inside list-disc space-y-3 font-medium leading-relaxed text-slate-600">
                                    {section.list.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;
