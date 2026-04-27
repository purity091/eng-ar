import React from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarClock, Video } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';
import { parentSessions } from '../../constants/platformData';

const ParentSessionsPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-8 pb-16">
            <SectionHeader
                eyebrow={t('appPages.parent.sessions.eyebrow')}
                title={t('appPages.parent.sessions.title')}
                description={t('appPages.parent.sessions.description')}
            />

            <div className="space-y-4">
                {parentSessions.map((session) => (
                    <div key={`${session.day}-${session.time}`} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                                    <CalendarClock size={20} />
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-slate-900">{session.title}</div>
                                    <div className="text-slate-500">{session.day} • {session.time}</div>
                                </div>
                            </div>
                            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">{session.mode}</div>
                            <div className={`rounded-full px-4 py-2 text-sm font-bold ${session.status === 'مكتملة' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                                {session.status === 'مكتملة' ? t('appPages.parent.sessions.completed') : session.status}
                            </div>
                            <button className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-5 py-3 font-bold text-white">
                                <Video size={18} />
                                {t('appPages.parent.sessions.details')}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ParentSessionsPage;
