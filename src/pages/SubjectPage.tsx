import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Book, Video, MessageSquare, Lock, CheckCircle, Eye, Pin, ThumbsUp, Lightbulb,
    PlayCircle, FileText, ArrowRight, Youtube, Play,
    LayoutList, Library, BrainCircuit, Users, Search, ArrowLeft,
    AlignRight // For the "Text Explanation" tab
} from 'lucide-react';
import { getSubjectById } from '../constants/subjects';
import { getSubjectUnits, Unit } from '../constants/units';
import { useApp } from '../contexts/AppContext';
import { MOCK_COMMUNITY_POSTS, CommunityPost } from '../constants/communityData';

// Mock content
const MOCK_UNIT_LESSONS = [
    { id: 1, title: '.,د.ة فS ا".ف?^.', duration: '10:00', type: 'video' },
    { id: 2, title: 'شرح تفصSS ""جزء اأ^"', duration: '15:30', type: 'video' },
    { id: 3, title: 'تطبS,ات ع."Sة', duration: '12:45', type: 'video' },
];

const MOCK_UNIT_RESOURCES = [
    { id: 1, title: '."خص ا"^حدة (PDF)', size: '2.5 MB', type: 'pdf' },
    { id: 2, title: 'أ?. ا",^ا?S?', size: '1.2 MB', type: 'image' },
];

const MOCK_UNIT_DISCUSSIONS = [
    { id: 1, title: 'سؤا" بخص^ص ادرس اثا?S', author: 'أح.د', replies: 5 },
    { id: 2, title: '.? "دS? ."خص "",^ا?S?Y', author: 'سارة', replies: 12 },
];

const SubjectPage: React.FC = () => {
    const { subjectId } = useParams<{ subjectId: string }>();
    const { selectedCountry } = useApp();

    const [activeMainTab, setActiveMainTab] = useState<'path' | 'library' | 'community' | 'ai'>('path');
    const [activeUnitId, setActiveUnitId] = useState<string | null>(null);
    const [activeUnitTab, setActiveUnitTab] = useState<'explanation' | 'lessons' | 'resources' | 'community'>('explanation');

    // Get Data
    const subject = subjectId ? getSubjectById(subjectId) : null;
    const units = subjectId ? getSubjectUnits(subjectId) : [];

    // Derive Active Unit safely
    const activeUnit = units.find(u => u.id === activeUnitId);

    // Subject Tag Mapping (Arabic names to match community post tags)
    const SUBJECT_TAG_MAP: Record<string, string[]> = {
        'math': ['رSاضSات', 'جبر', '??دسة', 'تفاض"', 'تfا."'],
        'physics': ['فSزSاء', 'دS?ا.Sfا', 'حرارSة', 'f?رباء'],
        'chemistry': ['fS.Sاء', 'ع?اصر'],
        'biology': ['أحSاء', 'حS^ا?', '?بات'],
        'arabic': ['عربS', ',^اعد', 'باغة', '?ح^'],
        'english': ['إ?جSزS', 'ا?جSزS', ',^اعد_إ?جSزSة'],
        'cs': ['بر.جة', 'حاس^ب', 'ت,?Sة', 'f^د'],
    };

    // Get community posts related to this subject
    const getSubjectRelatedPosts = (): CommunityPost[] => {
        if (!subject) return [];

        // Get posts from localStorage or mock data
        const storedPosts = localStorage.getItem('community_posts');
        const allPosts: CommunityPost[] = storedPosts ? JSON.parse(storedPosts) : MOCK_COMMUNITY_POSTS;

        // Get relevant tags for this subject
        const subjectTags = SUBJECT_TAG_MAP[subject.id] || [subject.name];

        // Filter posts that have any matching tag (case insensitive)
        return allPosts.filter(post =>
            post.status === 'approved' &&
            post.tags.some(tag =>
                subjectTags.some(subjectTag =>
                    tag.toLowerCase().includes(subjectTag.toLowerCase()) ||
                    subjectTag.toLowerCase().includes(tag.toLowerCase())
                )
            )
        );
    };

    const subjectPosts = getSubjectRelatedPosts();

    // Effect to recover if activeUnit is lost
    useEffect(() => {
        if (activeUnitId && !activeUnit) {
            console.warn('Active unit not found, resetting view');
            setActiveUnitId(null);
        }
    }, [activeUnitId, activeUnit]);

    // Reset unit tab to 'explanation' when opening a unit
    useEffect(() => {
        if (activeUnitId) {
            setActiveUnitTab('explanation');
        }
    }, [activeUnitId]);

    if (!subject) {
        return <div className="p-8 text-center text-slate-500">ا".ادة غSر .^ج^دة</div>;
    }

    const openUnit = (unit: Unit) => {
        if (unit.isLocked) {
            alert('?ذ? ا"^حدة .غ",ة حاSا<. أf." ا"^حدات اساب,ة "فتح?ا.');
            return;
        }
        setActiveUnitId(unit.id);
        window.scrollTo({ top: 0, behavior: 'instant' });
    };

    return (
        <div className="space-y-6 pb-20">
            {/* Header: Always show unless deep in a unit (optional, but safer to hide for focus) */}
            {!activeUnitId && (
                <div className={`rounded-3xl p-6 text-white shadow-xl relative overflow-hidden ${subject.color}`}>
                    <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl backdrop-blur-md shadow-inner border border-white/20">
                                <subject.icon size={34} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold mb-1">{subject.name}</h1>
                                <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
                                    <span className="bg-white/20 px-3 py-1 rounded-full">اصف {subject.grade}</span>
                                    <span>?</span>
                                    <span>{selectedCountry.name}</span>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="flex bg-white/10 backdrop-blur-sm p-1 rounded-xl border border-white/20 overflow-x-auto">
                            {[
                                { id: 'path', label: 'ا".سار', icon: LayoutList },
                                { id: 'library', label: 'ا".fتبة', icon: Library },
                                { id: 'community', label: 'ا".جت.ع', icon: Users },
                                { id: 'ai', label: 'ا".ع". اذfS', icon: BrainCircuit },
                            ].map(tab => {
                                const Icon = tab.icon;
                                const isActive = activeMainTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveMainTab(tab.id as any)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold white-space-nowrap transition-all ${isActive
                                            ? 'bg-white text-slate-900 shadow-md'
                                            : 'text-white hover:bg-white/10'
                                            }`}
                                    >
                                        <Icon size={18} />
                                        <span>{tab.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: Learning Path */}
            {activeMainTab === 'path' && (
                <>
                    {/* CASE 1: NO UNIT SELECTED (LIST VIEW) */}
                    {!activeUnitId && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between px-2">
                                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                    <div className="w-1 h-6 bg-mint-500 rounded-full"></div>
                                    ^حدات ا".ادة
                                </h2>
                                <span className="text-sm text-slate-500 font-bold">{units.length} ^حدات</span>
                            </div>

                            <div className="grid gap-4">
                                {units.map((unit, index) => {
                                    const isLocked = unit.isLocked;
                                    return (
                                        <button
                                            key={unit.id}
                                            onClick={() => openUnit(unit)}
                                            className={`w-full text-right bg-white rounded-2xl border p-5 flex items-center gap-4 transition-all duration-300 ${isLocked
                                                ? 'border-slate-100 opacity-75 bg-slate-50 cursor-not-allowed'
                                                : 'border-slate-100 hover:border-mint-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer'
                                                }`}
                                        >
                                            <div className="shrink-0">
                                                {isLocked ? (
                                                    <div className="w-14 h-14 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400">
                                                        <Lock size={20} />
                                                    </div>
                                                ) : unit.progress === 100 ? (
                                                    <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 shadow-sm border border-green-200">
                                                        <CheckCircle size={24} />
                                                    </div>
                                                ) : (
                                                    <div className="w-14 h-14 bg-mint-100 rounded-2xl flex items-center justify-center text-mint-600 font-bold text-xl border border-mint-200 shadow-sm">
                                                        {index + 1}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h3 className={`font-bold text-lg mb-1 truncate ${isLocked ? 'text-slate-500' : 'text-slate-800'}`}>
                                                    {unit.title}
                                                </h3>
                                                <div className="flex items-center gap-4 text-xs text-slate-500">
                                                    <span>{unit.completedLessons}/{unit.totalLessons} درس</span>
                                                    {!isLocked && (
                                                        <div className="flex-1 max-w-[120px] bg-slate-100 rounded-full h-2 ml-4">
                                                            <div
                                                                className="bg-green-500 h-full rounded-full transition-all"
                                                                style={{ width: `${unit.progress}%` }}
                                                            ></div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {!isLocked && (
                                                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                                    <ChevronLeftIcon />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* CASE 2: UNIT SELECTED (DETAIL VIEW) */}
                    {activeUnitId && activeUnit && (
                        <div className="space-y-6">
                            {/* Focus Header with Back Button */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setActiveUnitId(null)}
                                    className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors shadow-sm"
                                >
                                    <ArrowRight size={20} />
                                </button>
                                <h2 className="text-2xl font-bold text-slate-800 flex-1">{activeUnit.title}</h2>
                            </div>

                            {/* Main Content Area */}
                            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden min-h-[600px] flex flex-col">
                                {/* Unit Tabs */}
                                <div className="flex border-b border-slate-100 overflow-x-auto">
                                    {[
                                        { id: 'explanation', label: 'اشرح ^ا"."خص', icon: AlignRight },
                                        { id: 'lessons', label: 'ادر^س ا".رئSة', icon: PlayCircle },
                                        { id: 'resources', label: 'ا".صادر', icon: FileText },
                                        { id: 'community', label: 'ا"?,اشات', icon: MessageSquare },
                                    ].map(tab => {
                                        const Icon = tab.icon;
                                        const active = activeUnitTab === tab.id;
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveUnitTab(tab.id as any)}
                                                className={`flex-1 py-4 px-4 text-sm font-bold flex items-center justify-center gap-2 transition-all min-w-[120px] whitespace-nowrap ${active
                                                    ? 'text-mint-700 bg-mint-50 border-b-2 border-mint-500'
                                                    : 'text-slate-500 hover:bg-slate-50 border-b-2 border-transparent'
                                                    }`}
                                            >
                                                <Icon size={18} />
                                                <span className="inline">{tab.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Content Body */}
                                <div className="p-6 flex-1 bg-slate-50/30">
                                    {activeUnitTab === 'explanation' && (
                                        <div className="space-y-6">
                                            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                                                <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-3">.,د.ة فS {activeUnit.title}</h3>
                                                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                                                    <p className="mb-4">
                                                        .رحبا< بf فS ا"^حدة اأ^"?! فS ?ذ? ا"^حدة س?غطS ا".فا?S. اأساسSة اتS ستشf" حجر اأساس "ف?.f "".ادة. س?بدأ باتعارSف ابسSطة ث. ??ت," تدرSجSا< ""تطبS,ات اأfثر تع,Sدا<.
                                                    </p>
                                                    <div className="my-6 rounded-xl overflow-hidden shadow-lg border border-slate-200">
                                                        <img
                                                            src={`https://placehold.co/800x400/e2e8f0/1e293b?text=${encodeURIComponent(activeUnit.title)}`}
                                                            alt="Unit Explanation"
                                                            className="w-full h-auto object-cover"
                                                        />
                                                        <div className="bg-slate-50 p-3 text-center text-xs text-slate-500 font-bold border-t border-slate-200">
                                                            شf" ت^ضSحS ر,. (1): اخارطة اذ??Sة ".^اضSع ا"^حدة
                                                        </div>
                                                    </div>
                                                    <h4 className="text-lg font-bold text-slate-800 mb-2">أ?داف ا"^حدة:</h4>
                                                    <ul className="list-disc list-inside space-y-2 marker:text-mint-500 mb-6">
                                                        <li>ف?. ا".صطحات ارئSسSة ^استخدا.?ا بشf" صحSح.</li>
                                                        <li>تحS" اعا,ات بS? ا".تغSرات ا".ختفة.</li>
                                                        <li>تطبS, ا",^ا?S? ا".ستفادة فS ح" .سائ" ^ا,عSة.</li>
                                                    </ul>
                                                    <div className="bg-yellow-50 border-r-4 border-yellow-400 p-4 rounded-lg my-4">
                                                        <p className="font-bold text-yellow-800 text-sm inline-flex items-center gap-1"><Lightbulb size={14} /> ت?^S? ?ا.:</p>
                                                        <p className="text-sm text-yellow-700 mt-1">
                                                            Sرج? .راجعة ,ا?^? ?S^ت? اثا?S ,ب" ابدء فS ادرس اثاثO حSث س?عت.د عS? بشf" fبSر.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-white rounded-xl p-4 border border-slate-200 flex items-start gap-3">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                                                        <Book size={20} />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-bold text-slate-800 text-sm mb-1">ا".فا?S. ا"?ظرSة</h5>
                                                        <p className="text-xs text-slate-500 leading-relaxed">
                                                            تحت^S ?ذ? ا"^حدة ع"? 5 ?ظرSات أساسSة Sجب حفظ?ا ^ف?.?ا جSدا< ""اختبار ا"??ائS.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="bg-white rounded-xl p-4 border border-slate-200 flex items-start gap-3">
                                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 shrink-0">
                                                        <CheckCircle size={20} />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-bold text-slate-800 text-sm mb-1">اتطبS,ات اع."Sة</h5>
                                                        <p className="text-xs text-slate-500 leading-relaxed">
                                                            س?,^. بتطبS, .ا تع".?ا? فS 3 تجارب ع."Sة تفاعSة.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeUnitTab === 'lessons' && (
                                        <div className="space-y-4">
                                            {MOCK_UNIT_LESSONS.map((lesson) => (
                                                <div key={lesson.id} className="group bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-4 hover:border-mint-400 hover:shadow-lg transition-all cursor-pointer">
                                                    <div className="relative w-32 h-20 bg-slate-800 rounded-xl overflow-hidden shrink-0 shadow-md">
                                                        <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                                                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                                <Play size={20} className="text-white ml-1" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-mint-600 transition-colors">
                                                            {lesson.title}
                                                        </h4>
                                                        <div className="flex items-center gap-3 text-sm text-slate-500">
                                                            <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
                                                                <PlayCircle size={14} /> {lesson.duration}
                                                            </span>
                                                            <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
                                                                <Video size={14} /> فSدS^
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {activeUnitTab === 'resources' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {MOCK_UNIT_RESOURCES.map((resource) => (
                                                <div key={resource.id} className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4 hover:shadow-lg transition-shadow cursor-pointer group">
                                                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                                                        <FileText size={24} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-slate-800 mb-1">{resource.title}</h4>
                                                        <p className="text-sm text-slate-500">{resource.size}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {activeUnitTab === 'community' && (
                                        <div className="space-y-4">
                                            {MOCK_UNIT_DISCUSSIONS.map((disc) => (
                                                <div key={disc.id} className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-mint-300 hover:shadow-md transition-all cursor-pointer">
                                                    <h4 className="font-bold text-slate-800 text-lg mb-2">{disc.title}</h4>
                                                    <div className="flex items-center justify-between text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-slate-600">
                                                                {disc.author[0]}
                                                            </div>
                                                            <span className="text-slate-500">{disc.author}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-mint-600 font-bold bg-mint-50 px-2 py-1 rounded-lg">
                                                            <MessageSquare size={14} />
                                                            {disc.replies} رد^د
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <button className="w-full py-4 bg-white border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold hover:border-mint-500 hover:text-mint-600 hover:bg-mint-50 transition-all flex items-center justify-center gap-2">
                                                <MessageSquare size={20} />
                                                أضف سؤاا< جدSدا< ح^" ?ذ? ا"^حدة
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Other Tabs content (Library, Community, AI) */}
            {activeMainTab === 'library' && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 p-2">
                        <Search className="text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="ابحث ع? fتاب أ^ ."ف..."
                            className="flex-1 outline-none text-sm"
                        />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition-all cursor-pointer">
                                <div className="w-full aspect-[3/4] bg-slate-100 rounded-lg mb-3 flex items-center justify-center">
                                    <Book size={32} className="text-slate-300" />
                                </div>
                                <h3 className="font-bold text-sm text-slate-800 mb-1">fتاب ا".ادة ا".درسS</h3>
                                <p className="text-xs text-slate-500">^زارة اتربSة</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ... other tabs similar as before ... */}

            {activeMainTab === 'community' && (
                <div className="space-y-4">
                    {/* Header */}
                    <div className="bg-mint-50 border border-mint-200 rounded-xl p-4 flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-mint-800">.جت.ع {subject.name}</h3>
                            <p className="text-sm text-mint-600">
                                {subjectPosts.length > 0
                                    ? `${subjectPosts.length} .?ش^ر .تع", ب?ذ? ا".ادة`
                                    : '?ا,شO اسأO ^شارf .ع"^.اتf .ع ز."ائf'
                                }
                            </p>
                        </div>
                        <Link to="/community" className="px-4 py-2 bg-mint-600 text-white rounded-lg font-bold text-sm hover:bg-mint-700">
                            اذ?اب "".جت.ع اعا.
                        </Link>
                    </div>

                    {/* Posts List */}
                    {subjectPosts.length > 0 ? (
                        <div className="space-y-4">
                            {subjectPosts.map(post => (
                                <div
                                    key={post.id}
                                    className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-mint-300 hover:shadow-lg transition-all cursor-pointer group"
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Author Avatar */}
                                        <div className="w-12 h-12 bg-mint-100 rounded-full flex items-center justify-center text-mint-700 font-bold text-lg shrink-0">
                                            {post.author.charAt(0)}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            {/* Title */}
                                            <h4 className="font-bold text-lg text-slate-800 mb-2 group-hover:text-mint-600 transition-colors truncate">
                                                {post.title}
                                            </h4>

                                            {/* Content Preview */}
                                            <p className="text-slate-500 text-sm line-clamp-2 mb-3">
                                                {post.content}
                                            </p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {post.tags.slice(0, 3).map(tag => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-bold"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Meta */}
                                            <div className="flex items-center justify-between text-xs text-slate-400">
                                                <div className="flex items-center gap-4">
                                                    <span className="flex items-center gap-1">
                                                        <MessageSquare size={14} />
                                                        {post.replies} رد^د
                                                    </span>
                                                    <span className="inline-flex items-center gap-1"><Eye size={14} /> {post.views}</span>
                                                    <span className="inline-flex items-center gap-1"><ThumbsUp size={14} /> {post.upvotes}</span>
                                                </div>
                                                <span>{post.timestamp}</span>
                                            </div>
                                        </div>

                                        {/* Status Badges */}
                                        <div className="flex flex-col gap-2 items-end shrink-0">
                                            {post.isSolved && (
                                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
                                                    <CheckCircle size={12} /> ت. اح"
                                                </span>
                                            )}
                                            {post.isPinned && (
                                                <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold inline-flex items-center gap-1">
                                                    <Pin size={12} /> .ثبت
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* View More Link */}
                            <Link
                                to="/community"
                                className="block text-center py-4 bg-white border border-dashed border-slate-300 rounded-2xl text-mint-600 font-bold hover:border-mint-400 hover:bg-mint-50 transition-all"
                            >
                                عرض ا".زSد فS ا".جت.ع اعا. ?'
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                            <Users size={48} className="mx-auto text-slate-300 mb-3" />
                            <p className="text-slate-500 font-bold mb-2">"ا ت^جد ?,اشات .تع",ة ب? {subject.name} حاSا<</p>
                            <p className="text-sm text-slate-400 mb-4">f? أ^" .? Sبدأ ?,اشا< فS ?ذ? ا".ادة!</p>
                            <Link
                                to="/community"
                                className="inline-block px-6 py-2 bg-mint-600 text-white rounded-xl font-bold hover:bg-mint-700 transition-colors"
                            >
                                ابدأ ?,اشا< جدSدا<
                            </Link>
                        </div>
                    )}
                </div>
            )}

            {activeMainTab === 'ai' && (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
                    <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BrainCircuit size={40} className="text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">.ع". {subject.name} اذfS</h2>
                    <p className="text-slate-500 max-w-md mx-auto mb-6">
                        "دS .عرفة fا."ة ب.??ج {subject.name} ""صف {subject.grade}. اسأ"?S أS سؤا" أ^ اطب .?S شرح درس .عS?!
                    </p>
                    <Link
                        to="/ai"
                        state={{ subject: subject.name }}
                        className="px-8 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 shadow-lg shadow-purple-600/20 inline-flex items-center gap-2"
                    >
                        ابدأ ا".حادثة اآ? <ArrowRight size={18} />
                    </Link>
                </div>
            )}
        </div>
    );
};

// Helper Icon for RTL arrow
const ChevronLeftIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M15 18l-6-6 6-6" />
    </svg>
);

export default SubjectPage;



