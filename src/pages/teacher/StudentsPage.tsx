import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Filter, Globe2, Search, SlidersHorizontal, Sparkles, Users, Activity, TrendingUp, ShieldAlert, ArrowRight } from 'lucide-react';
import SectionHeader from '../../components/platform/SectionHeader';

type StudentStatus = 'Stable' | 'Needs Attention' | 'At Risk' | 'Ready to Advance';

interface StudentRecord {
    id: string;
    name: string;
    age: number;
    country: string;
    cefr: string;
    performance: number;
    engagement: number;
    lastAttendance: string;
    weakestSkill: string;
    planType: string;
    status: StudentStatus;
    aiInsight: string;
}

const studentRecords: StudentRecord[] = [
    { id: 'sara-1', name: 'Sara Ahmed', age: 8, country: 'Saudi Arabia', cefr: 'A1', performance: 71, engagement: 54, lastAttendance: 'Today', weakestSkill: 'Speaking', planType: 'Confidence Recovery', status: 'Needs Attention', aiInsight: 'Needs more visual prompts' },
    { id: 'omar-1', name: 'Omar Fahd', age: 7, country: 'UAE', cefr: 'Pre-A1', performance: 66, engagement: 61, lastAttendance: 'Yesterday', weakestSkill: 'Pronunciation', planType: 'Homework Recovery', status: 'At Risk', aiInsight: 'Assign phonetic practice' },
    { id: 'layan-1', name: 'Layan Ahmad', age: 6, country: 'Saudi Arabia', cefr: 'A1', performance: 84, engagement: 88, lastAttendance: 'Today', weakestSkill: 'Grammar', planType: 'Level Upgrade', status: 'Ready to Advance', aiInsight: 'Capable of A2 roleplay' },
    { id: 'zayn-1', name: 'Zayn Ali', age: 9, country: 'Qatar', cefr: 'A2', performance: 73, engagement: 57, lastAttendance: '2 days ago', weakestSkill: 'Confidence', planType: 'Engagement Recovery', status: 'Needs Attention', aiInsight: 'Pair with extrovert peer' },
    { id: 'maya-1', name: 'Maya Noor', age: 10, country: 'Kuwait', cefr: 'A2', performance: 79, engagement: 76, lastAttendance: 'Today', weakestSkill: 'Writing', planType: 'Stable Growth', status: 'Stable', aiInsight: 'Consistently improving' },
];

const statusStyles: Record<StudentStatus, string> = {
    Stable: 'bg-slate-100 text-slate-700 border-slate-200',
    'Needs Attention': 'bg-amber-100 text-amber-700 border-amber-200',
    'At Risk': 'bg-red-100 text-red-700 border-red-200',
    'Ready to Advance': 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

const statusIcons: Record<StudentStatus, React.ElementType> = {
    Stable: Activity,
    'Needs Attention': AlertCircle,
    'At Risk': ShieldAlert,
    'Ready to Advance': TrendingUp,
};

const StudentsPage: React.FC = () => {
    const [statusFilter, setStatusFilter] = useState<'All' | StudentStatus>('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStudents = useMemo(() => {
        return studentRecords.filter((student) => {
            const matchesStatus = statusFilter === 'All' || student.status === statusFilter;
            const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.country.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    }, [searchTerm, statusFilter]);

    return (
        <div className="space-y-8 font-outfit pb-16">
            <SectionHeader
                eyebrow="Student Roster"
                title="AI Command Roster"
                description="An executive, AI-driven overview of your students' performance, risks, and next-best actions. Use smart filters for rapid decision making."
            />

            <div className="grid gap-4 md:grid-cols-3">
                {[
                    { icon: Users, label: 'Total Students', value: '48', trend: '+2 this month', tone: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { icon: AlertCircle, label: 'Require Attention', value: '9', trend: 'Down by 2', tone: 'text-amber-600', bg: 'bg-amber-50' },
                    { icon: CheckCircle2, label: 'Ready for Promotion', value: '5', trend: 'Consistent', tone: 'text-emerald-600', bg: 'bg-emerald-50' },
                ].map((item) => (
                    <div key={item.label} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl ${item.bg}`}>
                                <item.icon className={item.tone} size={24} />
                            </div>
                            <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">{item.trend}</span>
                        </div>
                        <div className="text-4xl font-black text-slate-900 tracking-tight">{item.value}</div>
                        <div className="mt-2 text-sm font-bold text-slate-500">{item.label}</div>
                    </div>
                ))}
            </div>

            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">Smart Filters</h2>
                        <p className="mt-1 text-sm font-medium text-slate-500">Filter by level, age, risk status, last attendance, or weakest skill.</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <div className="relative group">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                            <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by name or country"
                                className="w-72 rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-bold text-slate-700 outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 transition-all"
                            />
                        </div>
                        <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-50 border border-slate-200 px-5 py-3 text-sm font-black text-slate-600 hover:bg-slate-100 transition-colors">
                            <Filter size={16} />
                            Level: All
                        </button>
                        <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-50 border border-slate-200 px-5 py-3 text-sm font-black text-slate-600 hover:bg-slate-100 transition-colors">
                            <SlidersHorizontal size={16} />
                            Weakest Skill: All
                        </button>
                    </div>
                </div>

                <div className="mb-6 flex flex-wrap gap-2">
                    {(['All', 'Stable', 'Needs Attention', 'At Risk', 'Ready to Advance'] as const).map((item) => (
                        <button
                            key={item}
                            onClick={() => setStatusFilter(item)}
                            className={`rounded-full px-5 py-2.5 text-xs font-black transition-all border ${
                                statusFilter === item 
                                ? 'bg-slate-950 text-white border-slate-900 shadow-md' 
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white">
                    <div className="grid grid-cols-[1.5fr,0.8fr,0.8fr,1fr,1fr,0.8fr] gap-4 bg-slate-50/80 px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider border-b border-slate-200">
                        <div>Student Profile</div>
                        <div>Level</div>
                        <div>Metrics</div>
                        <div>AI Insight</div>
                        <div>Status</div>
                        <div className="text-right">Action</div>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {filteredStudents.map((student) => {
                            const StatusIcon = statusIcons[student.status];
                            return (
                                <div key={student.id} className="group grid grid-cols-[1.5fr,0.8fr,0.8fr,1fr,1fr,0.8fr] gap-4 px-6 py-5 items-center hover:bg-slate-50/50 transition-colors">
                                    <div>
                                        <div className="font-black text-slate-900 text-base">{student.name}</div>
                                        <div className="mt-1 inline-flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                            <Globe2 size={12} />
                                            {student.country} • {student.age} yo • {student.lastAttendance}
                                        </div>
                                        <div className="mt-2 text-xs font-bold text-slate-500 bg-slate-100 inline-block px-2 py-1 rounded-md">Weakest: {student.weakestSkill}</div>
                                    </div>
                                    <div className="font-black text-slate-700">
                                        <span className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-xl">{student.cefr}</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-xs font-black text-slate-600 flex justify-between">
                                            <span>Perf.</span> <span className="text-emerald-600">{student.performance}</span>
                                        </div>
                                        <div className="text-xs font-black text-slate-600 flex justify-between">
                                            <span>Eng.</span> <span className={student.engagement < 60 ? 'text-amber-600' : 'text-emerald-600'}>{student.engagement}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-500 line-clamp-2 leading-relaxed">
                                            <Sparkles size={10} className="inline mr-1 text-indigo-400" />
                                            {student.aiInsight}
                                        </div>
                                        <div className="text-xs font-black text-indigo-600 mt-1">{student.planType}</div>
                                    </div>
                                    <div>
                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black border ${statusStyles[student.status]}`}>
                                            <StatusIcon size={12} />
                                            {student.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <Link to={`/teacher/students/${student.id}`} className="inline-flex items-center justify-center h-10 w-10 rounded-2xl bg-slate-100 text-slate-700 transition-all hover:bg-slate-950 hover:text-white group-hover:shadow-md">
                                            <ArrowRight size={18} />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8 rounded-[2rem] border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-6 relative overflow-hidden shadow-sm">
                    <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-indigo-100/50 to-transparent pointer-events-none"></div>
                    <div className="relative">
                        <div className="inline-flex items-center gap-2 text-sm font-black text-indigo-700 bg-indigo-100/50 px-3 py-1 rounded-full">
                            <Sparkles size={16} />
                            Next Best Action Recommended by AI
                        </div>
                        <p className="mt-3 text-base font-bold leading-relaxed text-indigo-900 max-w-3xl">
                            Current Priority: Review the profiles of students classified as 'At Risk' and generate a quick progress update for parents before the end of the day.
                        </p>
                        <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-2xl text-sm font-black transition-colors shadow-sm shadow-indigo-200">
                            Execute Priority Actions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentsPage;
