import React, { useState } from 'react';
import { 
    Video, 
    VideoOff, 
    Mic, 
    MicOff, 
    MessageCircle, 
    Hand, 
    Star, 
    X, 
    ChevronLeft, 
    ChevronRight, 
    Sparkles, 
    Smile, 
    Flag,
    Trophy,
    Volume2,
    Users
} from 'lucide-react';

const ClassroomPage: React.FC = () => {
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [stars, setStars] = useState(12);

    return (
        <div className="h-screen bg-slate-950 text-white font-sans overflow-hidden flex flex-col" dir="rtl">
            {/* Class Header */}
            <header className="h-20 bg-slate-900 border-b border-white/5 px-8 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Sparkles size={20} />
                        </div>
                        <div>
                            <div className="text-sm font-black">المستوى التأسيسي - الحصة الرابعة</div>
                            <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">موضوع اليوم: My Family</div>
                        </div>
                    </div>
                    <div className="h-8 w-[1px] bg-white/10 hidden md:block" />
                    <div className="hidden md:flex items-center gap-3 text-emerald-400">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        <span className="text-xs font-black">اتصال مستقر جداً</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-2 border border-white/5">
                        <Star size={16} fill="#F59E0B" className="text-amber-500" />
                        <span className="text-sm font-black">{stars} نجوم</span>
                    </div>
                    <button className="h-10 w-10 rounded-xl bg-rose-500/20 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all">
                        <X size={20} />
                    </button>
                </div>
            </header>

            {/* Main Classroom Area */}
            <main className="flex-1 flex gap-4 p-4 min-h-0">
                
                {/* Left: Interactive Board */}
                <div className="flex-1 bg-white rounded-[2.5rem] relative overflow-hidden flex flex-col">
                    {/* Slide Area */}
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-slate-900">
                        <div className="relative mb-12">
                            <div className="absolute -inset-10 bg-indigo-100 rounded-full blur-3xl opacity-50" />
                            <div className="relative h-64 w-64 bg-slate-50 rounded-[3rem] border-4 border-slate-100 flex items-center justify-center text-8xl shadow-2xl">
                                🏠
                            </div>
                        </div>
                        <h2 className="text-6xl font-black mb-4 tracking-tight">House</h2>
                        <p className="text-2xl font-bold text-slate-400">"This is my <span className="text-indigo-600">house</span>."</p>
                    </div>

                    {/* Interaction Tools */}
                    <div className="absolute top-8 left-8 flex flex-col gap-3">
                        <button className="h-12 w-12 rounded-2xl bg-white shadow-xl border border-slate-100 flex items-center justify-center text-slate-600 hover:text-indigo-600 transition-all">
                            <Volume2 size={24} />
                        </button>
                        <button className="h-12 w-12 rounded-2xl bg-white shadow-xl border border-slate-100 flex items-center justify-center text-slate-600 hover:text-indigo-600 transition-all">
                            <Smile size={24} />
                        </button>
                    </div>

                    {/* Board Controls */}
                    <div className="h-20 bg-slate-50 border-t border-slate-100 px-8 flex items-center justify-between shrink-0">
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className={`h-2 w-8 rounded-full ${i === 1 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
                            ))}
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center text-slate-400 hover:text-indigo-600">
                                <ChevronRight size={20} />
                            </button>
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">شريحة 1 / 12</span>
                            <button className="h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center text-slate-400 hover:text-indigo-600">
                                <ChevronLeft size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right: Video Feeds & Chat */}
                <div className="w-[400px] flex flex-col gap-4 shrink-0">
                    
                    {/* Teacher Video (Main) */}
                    <div className="h-[300px] bg-slate-900 rounded-[2.5rem] relative overflow-hidden group">
                        {/* Placeholder for video */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-slate-900 flex items-center justify-center">
                            <div className="text-center space-y-4">
                                <div className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-md mx-auto flex items-center justify-center">
                                    <Users size={32} />
                                </div>
                                <div className="text-sm font-black">المعلمة إيما (Emma)</div>
                            </div>
                        </div>
                        <div className="absolute bottom-6 right-6 flex items-center gap-2 rounded-xl bg-slate-950/50 px-3 py-1.5 backdrop-blur-md border border-white/10">
                            <Flag size={14} className="text-indigo-400" />
                            <span className="text-[10px] font-black uppercase tracking-widest">لندن، بريطانيا</span>
                        </div>
                    </div>

                    {/* Student Video (Small) */}
                    <div className="h-[200px] bg-slate-900 rounded-[2.5rem] relative overflow-hidden border-4 border-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                        <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                            <div className="text-center space-y-2">
                                <div className="h-12 w-12 rounded-full bg-indigo-500/20 mx-auto flex items-center justify-center text-indigo-400">
                                    <Star size={20} />
                                </div>
                                <div className="text-xs font-black">أنت (عمر فهد)</div>
                            </div>
                        </div>
                        <div className="absolute top-4 left-4 h-6 w-12 bg-emerald-500 rounded-lg flex items-center justify-center text-[10px] font-black">
                            مباشر
                        </div>
                    </div>

                    {/* Chat/Activity Panel */}
                    <div className="flex-1 bg-white/5 rounded-[2.5rem] border border-white/5 p-6 flex flex-col min-h-0">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                                <MessageCircle size={16} />
                                المحادثة المباشرة
                            </h3>
                            <button className="text-xs font-bold text-indigo-400 hover:underline">عرض الكل</button>
                        </div>
                        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                            <div className="space-y-1">
                                <div className="text-[10px] font-black text-indigo-400">Teacher Emma</div>
                                <div className="bg-white/10 p-3 rounded-2xl text-xs font-medium inline-block">Great job, Omar! 🌟</div>
                            </div>
                            <div className="text-center py-2">
                                <div className="inline-block bg-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-[10px] font-black">
                                    المعلمة أرسلت لك نجمة تشجيعية!
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="اكتب رسالة..." 
                                className="w-full bg-white/10 rounded-2xl py-3 px-4 text-xs font-bold outline-none border border-white/5 focus:border-indigo-500 transition-all"
                            />
                        </div>
                    </div>
                </div>
            </main>

            {/* Class Footer (Controls) */}
            <footer className="h-24 bg-slate-900 border-t border-white/5 px-8 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setIsMuted(!isMuted)}
                        className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all ${isMuted ? 'bg-rose-500 text-white' : 'bg-white/5 text-white hover:bg-white/10'}`}
                    >
                        {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                    </button>
                    <button 
                        onClick={() => setIsVideoOff(!isVideoOff)}
                        className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all ${isVideoOff ? 'bg-rose-500 text-white' : 'bg-white/5 text-white hover:bg-white/10'}`}
                    >
                        {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-3 rounded-[2rem] bg-indigo-600 px-8 py-4 font-black transition-all hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/20">
                        <Hand size={20} />
                        ارفع يدك للمشاركة
                    </button>
                    <button className="h-14 w-14 rounded-2xl bg-white/5 text-white flex items-center justify-center hover:bg-white/10 transition-all">
                        <Smile size={24} />
                    </button>
                </div>

                <div className="hidden lg:flex items-center gap-6">
                    <div className="text-left">
                        <div className="text-[10px] font-black text-white/40 uppercase">الوقت المتبقي</div>
                        <div className="text-xl font-black text-white">12:45</div>
                    </div>
                    <div className="h-12 w-[1px] bg-white/10" />
                    <button className="flex items-center gap-2 text-rose-500 font-black text-sm">
                        إنهاء الحصة
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ClassroomPage;
