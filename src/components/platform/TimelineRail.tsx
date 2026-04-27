import React from 'react';

interface TimelineItem {
    week: string;
    title: string;
    status: 'completed' | 'active' | 'upcoming';
    goal: string;
    task?: string;
}

interface TimelineRailProps {
    items: TimelineItem[];
    statusLabels?: Partial<Record<TimelineItem['status'], string>>;
}

const statusStyles = {
    completed: 'bg-emerald-500 border-emerald-500 text-white',
    active: 'bg-orange-500 border-orange-500 text-white',
    upcoming: 'bg-white border-slate-300 text-slate-500',
};

const TimelineRail: React.FC<TimelineRailProps> = ({ items, statusLabels }) => {
    return (
        <div className="space-y-4">
            {items.map((item, index) => (
                <div key={`${item.week}-${item.title}`} className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className={`grid h-10 w-10 place-items-center rounded-full border-2 text-xs font-bold ${statusStyles[item.status]}`}>
                            {index + 1}
                        </div>
                        {index < items.length - 1 && <div className="mt-2 h-full min-h-12 w-px bg-slate-200" />}
                    </div>
                    <div className="flex-1 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold text-sky-600">{item.week}</span>
                            <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : item.status === 'active' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'}`}>
                                {statusLabels?.[item.status] ?? (item.status === 'completed' ? 'مكتمل' : item.status === 'active' ? 'جارٍ' : 'قادم')}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                        <p className="mt-2 leading-7 text-slate-600">{item.goal}</p>
                        {item.task && <p className="mt-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">{item.task}</p>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TimelineRail;
