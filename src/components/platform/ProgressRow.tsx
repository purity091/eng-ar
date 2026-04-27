import React from 'react';

interface ProgressRowProps {
    label: string;
    value: number;
    tone?: string;
}

const ProgressRow: React.FC<ProgressRowProps> = ({ label, value, tone = 'bg-sky-500' }) => {
    return (
        <div>
            <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-bold text-slate-700">{label}</span>
                <span className="text-slate-500">{value}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div className={`h-full rounded-full ${tone}`} style={{ width: `${value}%` }} />
            </div>
        </div>
    );
};

export default ProgressRow;
