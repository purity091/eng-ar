import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FaqItem {
    question: string;
    answer: string;
}

const FaqPage: React.FC = () => {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const faqs = t('pages.faq.items', { returnObjects: true }) as FaqItem[];

    return (
        <div className="min-h-screen bg-slate-50 py-16 lg:py-24">
            <div className="mx-auto max-w-3xl px-6">
                <div className="mb-12 space-y-4 text-center">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 shadow-sm">
                        <HelpCircle size={32} />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 md:text-5xl">{t('pages.faq.title')}</h1>
                    <p className="text-lg font-bold text-slate-500">{t('pages.faq.description')}</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={faq.question}
                                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                                    isOpen ? 'border-indigo-500 bg-white shadow-md' : 'border-slate-200 bg-white hover:border-slate-300'
                                }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="flex w-full items-center justify-between p-6 text-right outline-none"
                                >
                                    <span className="text-lg font-black text-slate-900">{faq.question}</span>
                                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </div>
                                </button>
                                <div className={`overflow-hidden px-6 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="font-medium leading-relaxed text-slate-600">{faq.answer}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FaqPage;
