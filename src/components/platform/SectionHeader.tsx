import React from 'react';

interface SectionHeaderProps {
    eyebrow?: string;
    title: string;
    description?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ eyebrow, title, description }) => {
    return (
        <div className="space-y-2">
            {eyebrow && <p className="text-xs font-bold tracking-[0.12em] text-sky-600">{eyebrow}</p>}
            <h1 className="text-3xl font-bold text-slate-900 lg:text-4xl">{title}</h1>
            {description && <p className="max-w-3xl text-base leading-8 text-slate-600">{description}</p>}
        </div>
    );
};

export default SectionHeader;
