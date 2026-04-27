import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, Settings2, Shield, SlidersHorizontal } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';
import { adminSettingsSections } from '../../constants/adminConsoleData';

const AdminSettingsPage: React.FC = () => {
    const { t } = useTranslation();
    const [activeId, setActiveId] = useState('platform');

    return (
        <div className="space-y-8">
            <SectionHeader
                eyebrow={t('appPages.admin.settings.eyebrow')}
                title={t('appPages.admin.settings.title')}
                description={t('appPages.admin.settings.description')}
            />

            <div className="grid gap-6 xl:grid-cols-[0.8fr,1.2fr]">
                <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-2 text-slate-900">
                        <SlidersHorizontal size={18} />
                        <h2 className="text-lg font-black">Control areas</h2>
                    </div>
                    <div className="space-y-2">
                        {adminSettingsSections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveId(section.id)}
                                className={`w-full rounded-[1.25rem] border px-4 py-4 text-right transition ${activeId === section.id ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white'}`}
                            >
                                <div className="font-black">{section.title}</div>
                                <div className={`mt-1 text-xs leading-6 ${activeId === section.id ? 'text-slate-300' : 'text-slate-500'}`}>{section.description}</div>
                            </button>
                        ))}
                    </div>
                </section>

                <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-black text-slate-950">{adminSettingsSections.find((item) => item.id === activeId)?.title}</h2>
                            <p className="mt-2 text-sm leading-7 text-slate-500">{adminSettingsSections.find((item) => item.id === activeId)?.description}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                            <Settings2 size={18} />
                        </div>
                    </div>

                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                            <div className="text-sm font-black text-slate-900">Primary toggle</div>
                            <p className="mt-2 text-sm leading-7 text-slate-500">Keep this control enabled to preserve the current operating model for this section.</p>
                            <div className="mt-5 h-6 w-11 rounded-full bg-slate-900" />
                        </div>
                        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                            <div className="text-sm font-black text-slate-900">Approval mode</div>
                            <p className="mt-2 text-sm leading-7 text-slate-500">Manual approvals remain the safer default until the governance flow is fully automated.</p>
                            <div className="mt-5 inline-flex rounded-full bg-white px-3 py-1 text-xs font-black text-slate-700 shadow-sm">Manual</div>
                        </div>
                        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                            <div className="text-sm font-black text-slate-900">Support channel</div>
                            <p className="mt-2 text-sm leading-7 text-slate-500">ops@readmint.com</p>
                        </div>
                        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                            <div className="inline-flex items-center gap-2 text-sm font-black text-slate-900">
                                <Shield size={16} />
                                Security note
                            </div>
                            <p className="mt-2 text-sm leading-7 text-slate-500">Privilege changes should be reviewed by a global administrator before they become effective.</p>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white">
                            <Save size={16} />
                            Save settings
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AdminSettingsPage;
