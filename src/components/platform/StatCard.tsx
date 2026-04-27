import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string;
    subtitle?: string;
    icon?: LucideIcon;
    tone?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon: Icon, tone = 'bg-slate-900' }) => {
    return (
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
            {Icon && (
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-white ${tone}`}>
                    <Icon size={20} />
                </div>
            )}
            <div className="text-3xl font-bold text-slate-900">{value}</div>
            <div className="mt-1 text-base font-bold text-slate-700">{title}</div>
            {subtitle && <div className="mt-2 text-sm leading-7 text-slate-500">{subtitle}</div>}
        </div>
    );
};

export default StatCard;
