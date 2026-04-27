import React from 'react';

interface CircularScoreProps {
    score: number;
    label: string;
    note?: string;
}

const CircularScore: React.FC<CircularScoreProps> = ({ score, label, note }) => {
    const angle = Math.min(100, Math.max(0, score)) * 3.6;

    return (
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div
                    className="relative grid h-40 w-40 place-items-center rounded-full"
                    style={{ background: `conic-gradient(#2563eb 0deg, #f97316 ${angle * 0.45}deg, #22c55e ${angle}deg, #e2e8f0 ${angle}deg)` }}
                >
                    <div className="grid h-28 w-28 place-items-center rounded-full bg-white text-center">
                        <div>
                            <div className="text-4xl font-bold text-slate-900">{score}</div>
                            <div className="text-sm text-slate-500">/ 100</div>
                        </div>
                    </div>
                </div>

                <div className="max-w-xl space-y-2 text-center lg:text-right">
                    <h2 className="text-2xl font-bold text-slate-900">{label}</h2>
                    <p className="text-lg text-slate-600">تحسن جيد هذا الشهر</p>
                    {note && <p className="leading-8 text-slate-500">{note}</p>}
                </div>
            </div>
        </div>
    );
};

export default CircularScore;
