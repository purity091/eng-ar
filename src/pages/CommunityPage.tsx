import React, { useState, useEffect } from 'react';
import {
    MessageSquare, Search, Plus, Pin, Lock, Trash2, Flag, Eye, ThumbsUp, ThumbsDown,
    AlertTriangle, Award, Trophy, TrendingUp, CheckCircle, Star, Bell, BellOff, Filter,
    ArrowRight, Share2, MoreVertical, Reply, CornerDownRight, Hash, Clock,
    Check, X as XIcon, Edit3, Save, AlertCircle
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { usePermissions } from '../hooks/usePermissions';
import { MOCK_COMMUNITY_POSTS, CommunityPost } from '../constants/communityData';
import NewPostModal from '../components/community/NewPostModal';
import { calculateLevel } from '../utils/gamification';

// Mock Replies Data
const MOCK_REPLIES = [
    { id: 'r1', author: 'سارة محمد', role: 'student', content: 'شكراً لك على هذا الطرح المفيد! فعلاً هذه النقاط ساعدتني كثيراً في فهم الدرس.', time: 'منذ ساعتين', avatar: 'S', level: 5 },
    { id: 'r2', author: 'خالد علي', role: 'student', content: 'هل يمكن توضيح النقطة الثالثة أكثر؟ ما زلت أواجه صعوبة في استيعاب المعادلة الأخيرة.', time: 'منذ ساعة', avatar: 'K', level: 3 },
    { id: 'r3', author: 'المشرف الأكاديمي', role: 'admin', content: 'أحسنت! تم تثبيت الموضوع لأهميته ولجودته العالية. يرجى من الجميع الاطلاع عليه.', time: 'منذ 30 دقيقة', avatar: 'A', level: 20, isBestAnswer: true }
];

const CommunityPage: React.FC = () => {
    const { selectedCountry, userProfile, currentUser, isAdmin } = useApp();
    const { hasPermission, canAccessContent } = usePermissions();

    // UI State
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterTab, setFilterTab] = useState<'all' | 'questions' | 'solved' | 'pinned' | 'following' | 'pending'>('all');
    const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'unanswered'>('recent');

    // Editing State (For Admins/Authors)
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ title: '', content: '' });

    // Data State
    const [posts, setPosts] = useState<CommunityPost[]>(() => {
        try {
            const saved = localStorage.getItem('community_posts');
            // Merge mock data ensuring we have the new fields if local storage is stale
            const parsed = saved ? JSON.parse(saved) : MOCK_COMMUNITY_POSTS;
            return parsed.length > 0 ? parsed : MOCK_COMMUNITY_POSTS;
        } catch (e) {
            return MOCK_COMMUNITY_POSTS;
        }
    });

    const [followedPosts, setFollowedPosts] = useState<Set<string>>(() => {
        try {
            const saved = localStorage.getItem('followed_posts');
            return saved ? new Set(JSON.parse(saved)) : new Set();
        } catch (e) {
            return new Set();
        }
    });

    useEffect(() => {
        localStorage.setItem('community_posts', JSON.stringify(posts));
    }, [posts]);

    // Derived Data
    const activePost = posts.find(p => p.id === selectedPostId);

    // Initialize Edit Form when active post changes
    useEffect(() => {
        if (activePost) {
            setEditForm({ title: activePost.title, content: activePost.content });
            setIsEditing(false);
        }
    }, [activePost]);

    const filteredPosts = posts.filter(post => {
        // 1. Permission & Status Filter
        // - Admins see everything
        // - Users see APPROVED posts OR their own PENDING posts
        const isMyPost = currentUser?.name === post.author; // Need ID check in real app
        if (!isAdmin && post.status !== 'approved' && !isMyPost) return false;

        // - Logic for 'Pending' Tab (Admin only)
        if (filterTab === 'pending') return post.status === 'pending';
        // - If not in pending tab, usually hide pending posts from main list unless its my own
        if (filterTab !== 'pending' && post.status === 'pending' && !isMyPost) return false;


        // 2. Search Filter
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        // 3. Country Filter
        const matchesCountry = canAccessContent(post.countryId);

        // 4. Tab Filter
        let matchesFilter = true;
        if (filterTab === 'questions') matchesFilter = !post.isSolved && post.replies === 0;
        if (filterTab === 'solved') matchesFilter = post.isSolved;
        if (filterTab === 'pinned') matchesFilter = post.isPinned;
        if (filterTab === 'following') matchesFilter = followedPosts.has(post.id);

        return matchesSearch && matchesCountry && matchesFilter;
    }).sort((a, b) => {
        // Pending posts first for admins in 'pending' tab
        if (filterTab === 'pending') return 0;

        if (sortBy === 'popular') return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
        if (sortBy === 'unanswered') return a.replies - b.replies;

        // Pinned posts first
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return 0; // Default exact order or timestamp in real DB
    });

    // --- Actions ---

    const handleNewPost = (postData: CommunityPost) => {
        // Logic: Admins post directly, Students post to 'pending'
        const newPost: CommunityPost = {
            ...postData,
            status: isAdmin ? 'approved' : 'pending',
            id: Date.now().toString() // Simple ID generation
        };
        setPosts([newPost, ...posts]);

        if (!isAdmin) {
            alert('تم إرسال منشورك للمراجعة. سيظهر للجميع بعد موافقة المشرفين.');
        }
    };

    const handleVote = (postId: string, voteType: 'up' | 'down') => {
        setPosts(posts.map(p => {
            if (p.id === postId) {
                return {
                    ...p,
                    upvotes: voteType === 'up' ? p.upvotes + 1 : p.upvotes,
                    downvotes: voteType === 'down' ? p.downvotes + 1 : p.downvotes
                };
            }
            return p;
        }));
    };

    const handleApprove = (postId: string) => {
        setPosts(posts.map(p => p.id === postId ? { ...p, status: 'approved' } : p));
        alert('تم نشر الموضوع بنجاح');
    };

    const handleReject = (postId: string) => {
        if (confirm('هل أنت متأكد من رفض هذا المنشور؟')) {
            setPosts(posts.map(p => p.id === postId ? { ...p, status: 'rejected' } : p));
            setSelectedPostId(null); // Return to list
        }
    };

    const handleSaveImprovement = (postId: string) => {
        // Save edits and Auto-Approve
        setPosts(posts.map(p => p.id === postId ? {
            ...p,
            title: editForm.title,
            content: editForm.content,
            status: 'approved', // Auto approve on edit
            adminNote: 'تم تحسين المحتوى بواسطة المشرف'
        } : p));
        setIsEditing(false);
        alert('تم حفظ التعديلات ونشر الموضوع');
    };

    const handleTogglePin = (postId: string) => {
        if (!hasPermission('content', 'manage')) return alert('ليس لديك صلاحية');
        setPosts(posts.map(p => p.id === postId ? { ...p, isPinned: !p.isPinned } : p));
    };

    const handleDelete = (postId: string) => {
        if (!hasPermission('content', 'delete')) return alert('ليس لديك صلاحية');
        if (window.confirm('حذف المنشور؟')) {
            setPosts(posts.filter(p => p.id !== postId));
            if (selectedPostId === postId) setSelectedPostId(null);
        }
    };

    // --- RENDER: POST DETAIL VIEW ---
    if (activePost) {
        // Check if viewing a pending post
        const isPending = activePost.status === 'pending';

        return (
            <div className="animate-fade-in relative min-h-screen pb-20">
                {/* Moderation Banner */}
                {isPending && isAdmin && (
                    <div className="bg-amber-50 border-b border-amber-200 px-6 py-4 sticky top-0 z-20 shadow-sm flex items-center justify-between animate-pulse-slow">
                        <div className="flex items-center gap-3 text-amber-800">
                            <AlertCircle className="fill-amber-100" />
                            <div>
                                <h3 className="font-bold">هذا المنشور بانتظار المراجعة</h3>
                                <p className="text-xs">يرجى التحقق من المحتوى قبل النشر للعامة.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {!isEditing && (
                                <>
                                    <button onClick={() => handleApprove(activePost.id)} className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 flex items-center gap-2">
                                        <Check size={18} /> قبول ونشر
                                    </button>
                                    <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2">
                                        <Edit3 size={18} /> تحسين
                                    </button>
                                    <button onClick={() => handleReject(activePost.id)} className="px-4 py-2 bg-red-100 text-red-600 rounded-lg font-bold hover:bg-red-200 flex items-center gap-2">
                                        <XIcon size={18} /> رفض
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Hero / Header */}
                <div className="bg-slate-900 text-white -mx-6 -mt-6 px-6 pt-8 pb-12 mb-8 shadow-xl relative overflow-hidden">
                    <div className="max-w-5xl mx-auto relative z-10">
                        <button
                            onClick={() => setSelectedPostId(null)}
                            className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors font-bold text-sm"
                        >
                            <ArrowRight size={18} /> العودة للمناقشات
                        </button>

                        {isEditing ? (
                            <div className="space-y-4 max-w-3xl">
                                <label className="text-xs font-bold text-slate-400">تعديل العنوان</label>
                                <input
                                    value={editForm.title}
                                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white font-bold text-2xl focus:border-mint-500 outline-none"
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-3">
                                        {activePost.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-mint-300 border border-white/10">
                                                #{tag}
                                            </span>
                                        ))}
                                        {activePost.status === 'pending' && <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-bold border border-amber-500/20">قيد المراجعة</span>}
                                        {activePost.isSolved && <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold border border-green-500/20"><CheckCircle size={12} className="inline ml-1" /> محلول</span>}
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2">{activePost.title}</h1>
                                </div>

                                {!isEditing && activePost.status === 'approved' && (
                                    <div className="flex items-center gap-3">
                                        <button className="px-4 py-2 bg-mint-600 hover:bg-mint-700 text-white rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-mint-600/30">
                                            <Reply size={18} /> رد عالموضوع
                                        </button>
                                        <button onClick={() => setFollowedPosts(prev => { const n = new Set(prev); if (n.has(activePost.id)) n.delete(activePost.id); else n.add(activePost.id); return n; })} className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all border ${followedPosts.has(activePost.id) ? 'bg-mint-500/20 border-mint-500/50 text-mint-400' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}`}>
                                            {followedPosts.has(activePost.id) ? <Bell size={18} /> : <BellOff size={18} />}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 px-4">
                    {/* Main Content Stream */}
                    <div className="lg:col-span-9 space-y-8">

                        {/* Original Post */}
                        <div className="flex gap-4 group">
                            <div className="flex-shrink-0 flex flex-col items-center gap-2">
                                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold text-lg shadow-sm border-2 border-white">
                                    {activePost.author[0]}
                                </div>
                                <div className="w-0.5 h-full bg-slate-100 group-last:hidden"></div>
                            </div>

                            <div className="flex-1 pb-8">
                                <div className={`bg-white rounded-2xl border shadow-sm p-6 relative ${isEditing ? 'border-blue-300 ring-2 ring-blue-100' : 'border-slate-200'}`}>

                                    {!isEditing && (
                                        <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-3">
                                            <div>
                                                <span className="font-bold text-slate-800 text-lg ml-2">{activePost.author}</span>
                                                <span className="text-xs text-slate-400 flex items-center gap-1 inline-flex">
                                                    <Clock size={12} /> {activePost.timestamp}
                                                </span>
                                            </div>
                                            {isAdmin && !isPending && (
                                                <button onClick={() => setIsEditing(true)} className="p-2 hover:bg-slate-100 rounded text-slate-500" title="تعديل">
                                                    <Edit3 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    )}

                                    {isEditing ? (
                                        <div className="space-y-4">
                                            <textarea
                                                value={editForm.content}
                                                onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                                                className="w-full min-h-[200px] p-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-mint-500 outline-none text-lg leading-relaxed"
                                            />
                                            <div className="flex justify-end gap-3 pt-2">
                                                <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg font-bold">إلغاء</button>
                                                <button onClick={() => handleSaveImprovement(activePost.id)} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2">
                                                    <Save size={18} /> حفظ ونشر
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="prose prose-slate max-w-none text-slate-900 leading-relaxed text-lg whitespace-pre-line">
                                            {activePost.content}
                                        </div>
                                    )}

                                    {!isEditing && activePost.adminNote && (
                                        <div className="mt-4 p-3 bg-blue-50 text-blue-800 text-sm rounded-lg flex items-center gap-2">
                                            <CheckCircle size={14} /> {activePost.adminNote}
                                        </div>
                                    )}

                                    {!isEditing && (
                                        <div className="mt-6 flex items-center gap-4 pt-4 border-t border-slate-50">
                                            <button onClick={() => handleVote(activePost.id, 'up')} className="flex items-center gap-1 text-slate-500 hover:text-mint-600 font-bold px-3 py-1 rounded-lg hover:bg-mint-50 transition-colors">
                                                <ThumbsUp size={18} /> <span>أعجبني ({activePost.upvotes})</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Replies Stream (Only show if approved or user is admin) */}
                        {(activePost.status === 'approved' || isAdmin) && (
                            <>
                                <div className="flex items-center gap-4 my-8 pl-16">
                                    <div className="h-px bg-slate-200 flex-1"></div>
                                    <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                                        الردود
                                    </span>
                                    <div className="h-px bg-slate-200 flex-1"></div>
                                </div>
                                {MOCK_REPLIES.map((reply, idx) => (
                                    <div key={reply.id} className="flex gap-4 group">
                                        <div className="flex-shrink-0 flex flex-col items-center gap-2">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-sm border-2 border-white text-sm ${reply.role === 'admin' ? 'bg-mint-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                                                {reply.avatar}
                                            </div>
                                            {idx !== MOCK_REPLIES.length - 1 && <div className="w-0.5 h-full bg-slate-100"></div>}
                                        </div>
                                        <div className="flex-1 pb-6">
                                            <div className={`rounded-2xl p-5 relative border ${reply.isBestAnswer ? 'bg-green-50 border-green-200' : 'bg-white border-slate-100'}`}>
                                                {reply.isBestAnswer && <div className="absolute -top-3 left-4 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1"><Award size={12} /> أفضل إجابة</div>}
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`font-bold text-sm ${reply.role === 'admin' ? 'text-mint-700' : 'text-slate-800'}`}>{reply.author}</span>
                                                        {reply.role === 'admin' && <span className="bg-mint-100 text-mint-700 text-[10px] px-1.5 py-0.5 rounded font-bold">مشرف</span>}
                                                        <span className="text-xs text-slate-400">• {reply.time}</span>
                                                    </div>
                                                </div>
                                                <p className="text-slate-700 leading-relaxed text-sm">{reply.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-4 space-y-6">
                            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">معلومات</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">الحالة</span>
                                        <span className={`font-bold ${activePost.status === 'approved' ? 'text-green-600' : activePost.status === 'rejected' ? 'text-red-600' : 'text-amber-500'}`}>
                                            {activePost.status === 'approved' ? 'منشور' : activePost.status === 'rejected' ? 'مرفوض' : 'بانتظار المراجعة'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">المشاهدات</span>
                                        <span className="font-bold text-slate-800">{activePost.views}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {!isEditing && activePost.status === 'approved' && (
                    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 shadow-2xl lg:pl-80 z-20">
                        <div className="max-w-4xl mx-auto flex items-center gap-4">
                            <div className="w-10 h-10 bg-mint-100 rounded-full flex items-center justify-center text-mint-700 font-bold shrink-0">
                                {userProfile?.name ? userProfile.name[0] : 'U'}
                            </div>
                            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-500 text-sm hover:bg-white transition-colors cursor-text ring-1 ring-transparent focus-within:ring-mint-500 focus-within:border-mint-500">
                                اكتب رداً...
                            </div>
                            <button className="p-3 bg-mint-600 text-white rounded-xl hover:bg-mint-700 transition-colors shadow-lg">
                                <CornerDownRight size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // --- RENDER: LIST VIEW ---
    return (
        <div className="space-y-6">
            {/* Header section same as before */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2"><MessageSquare className="text-mint-600" /> مجتمع Readmint</h1>
                    <p className="text-slate-500 mt-1">ساحة النقاش وتبادل الخبرات</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-3 bg-mint-600 text-white rounded-xl font-bold hover:bg-mint-700 transition-colors flex items-center gap-2 shadow-lg shadow-mint-600/20"
                >
                    <Plus size={20} /> منشور جديد
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
                    {[
                        { key: 'all' as const, label: 'الكل' },
                        { key: 'questions' as const, label: 'أسئلة' },
                        { key: 'solved' as const, label: 'محلولة' },
                        { key: 'pinned' as const, label: 'مثبتة' },
                        { key: 'following' as const, label: 'متابَعة' },
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setFilterTab(tab.key)}
                            className={`px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${filterTab === tab.key ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
                        >
                            {tab.label}
                        </button>
                    ))}

                    {/* Admin Only Pending Tab */}
                    {isAdmin && (
                        <button
                            onClick={() => setFilterTab('pending')}
                            className={`px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition-all flex items-center gap-2 ${filterTab === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-white text-amber-600 hover:bg-amber-50'}`}
                        >
                            <AlertCircle size={16} /> المراجعة ({posts.filter(p => p.status === 'pending').length})
                        </button>
                    )}
                </div>

                <div className="relative flex-1 md:w-64 w-full">
                    <Search className="absolute right-3 top-3 text-slate-400" size={16} />
                    <input type="text" placeholder="بحث..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pr-9 pl-4 text-sm focus:outline-none focus:border-mint-500" />
                </div>
            </div>

            {/* List */}
            <div className="grid gap-3">
                {filteredPosts.map(post => {
                    const isPending = post.status === 'pending';
                    return (
                        <div
                            key={post.id}
                            onClick={() => setSelectedPostId(post.id)}
                            className={`group bg-white rounded-xl border p-4 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-4 ${isPending ? 'border-amber-200 bg-amber-50/30' : 'border-slate-100'}`}
                        >
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold shrink-0">{post.author[0]}</div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-slate-800 text-base mb-1 truncate group-hover:text-mint-700">{post.title}</h3>
                                    {isPending && <span className="text-[10px] bg-amber-100 text-amber-700 px-2 rounded-full font-bold">مراجعة</span>}
                                </div>
                                <div className="flex items-center gap-3 text-xs text-slate-400">
                                    <span className="font-bold text-slate-500">{post.author}</span>
                                    <span>•</span>
                                    <span>{post.timestamp}</span>
                                    {post.tags.slice(0, 2).map(tag => <span key={tag} className="px-1.5 py-0.5 bg-slate-50 rounded text-slate-500">#{tag}</span>)}
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-slate-400 text-xs font-bold shrink-0">
                                <div className="flex flex-col items-center gap-0.5 bg-slate-50 px-3 py-1 rounded-lg min-w-[50px]">
                                    <MessageSquare size={14} className="text-slate-300 group-hover:text-slate-500" />
                                    <span>{post.replies}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {filteredPosts.length === 0 && <div className="text-center py-20 text-slate-400"><p className="font-bold">لا توجد نتائج</p></div>}
            </div>

            <NewPostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleNewPost} />
        </div>
    );
};

export default CommunityPage;

