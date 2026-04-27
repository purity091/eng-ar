import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Bell, Home, LogOut, Menu, Shield, Users, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { sidebarSections } from '../constants/platformData';

const AdminLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser, logout, selectedCountry } = useApp();
    const [open, setOpen] = useState(false);

    const Sidebar = () => (
        <div className="flex h-full flex-col bg-slate-950 text-white">
            <div className="border-b border-white/10 p-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 font-bold">R</div>
                    <div>
                        <div className="text-xl font-bold">إدارة Readmint</div>
                        <div className="text-xs text-white/50">لوحة تشغيل المنصة</div>
                    </div>
                </div>
            </div>

            <nav className="flex-1 space-y-2 p-4">
                {sidebarSections.admin.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 rounded-2xl px-4 py-3 font-bold transition-colors ${location.pathname === item.path ? 'bg-white text-slate-950' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
                    >
                        <Shield size={18} />
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="border-t border-white/10 p-4">
                <div className="mb-4 flex items-center gap-3 rounded-2xl bg-white/5 p-3">
                    <img src={currentUser?.avatarUrl} alt={currentUser?.name} className="h-11 w-11 rounded-full object-cover" />
                    <div className="min-w-0">
                        <div className="truncate font-bold">{currentUser?.name}</div>
                        <div className="text-xs text-white/50">{selectedCountry.name}</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <Link to="/" className="flex items-center justify-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-bold text-white">
                        <Home size={14} />
                        المنصة
                    </Link>
                    <button
                        onClick={() => {
                            logout();
                            navigate('/join');
                        }}
                        className="flex items-center justify-center gap-2 rounded-xl bg-red-500/10 px-3 py-2 text-sm font-bold text-red-200"
                    >
                        <LogOut size={14} />
                        خروج
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-slate-100" dir="rtl">
            <aside className="hidden w-80 lg:block">
                <Sidebar />
            </aside>

            {open && <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}

            <aside className={`fixed right-0 top-0 z-50 h-full w-80 transition-transform lg:hidden ${open ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between border-b border-white/10 bg-slate-950 px-4 py-3 text-white">
                    <div className="font-bold">القائمة</div>
                    <button onClick={() => setOpen(false)} className="rounded-lg p-2 hover:bg-white/10">
                        <X size={18} />
                    </button>
                </div>
                <Sidebar />
            </aside>

            <div className="flex flex-1 flex-col">
                <header className="border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur lg:px-6">
                    <div className="mx-auto flex max-w-7xl items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button onClick={() => setOpen(true)} className="rounded-xl p-2 hover:bg-slate-100 lg:hidden">
                                <Menu size={22} />
                            </button>
                            <div>
                                <div className="text-lg font-bold text-slate-900">لوحة العمليات</div>
                                <div className="text-sm text-slate-500">إدارة الطلاب والمعلمين والجداول والمناهج</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-slate-100 p-2 text-slate-600"><Bell size={18} /></div>
                            <div className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-bold text-slate-700">{selectedCountry.flag} {selectedCountry.name}</div>
                            <div className="rounded-xl bg-slate-950 px-3 py-2 text-sm font-bold text-white">
                                <Users size={14} className="ml-1 inline" />
                                الإدارة
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 lg:p-6">
                    <div className="mx-auto max-w-7xl">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
