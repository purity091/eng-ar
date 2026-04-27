import React from 'react';
import { useNotifications } from '../contexts/NotificationContext';
import { Bell, X, Check, Trash2, Info, Trophy, AlertTriangle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotificationsPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { notifications, markAsRead, markAllAsRead, clearNotifications, unreadCount } = useNotifications();
    const navigate = useNavigate();

    const getIcon = (type: string) => {
        switch (type) {
            case 'achievement': return <Trophy size={18} className="text-amber-500" />;
            case 'success': return <CheckCircle size={18} className="text-green-500" />;
            case 'warning': return <AlertTriangle size={18} className="text-orange-500" />;
            case 'error': return <X size={18} className="text-red-500" />;
            default: return <Info size={18} className="text-blue-500" />;
        }
    };

    const getBgColor = (type: string) => {
        switch (type) {
            case 'achievement': return 'bg-amber-50';
            case 'success': return 'bg-green-50';
            case 'warning': return 'bg-orange-50';
            case 'error': return 'bg-red-50';
            default: return 'bg-blue-50';
        }
    };

    return (
        <div className="absolute left-4 top-16 md:left-auto md:right-20 md:top-20 w-80 md:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-fade-in font-cairo" dir="rtl">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <Bell size={20} className="text-slate-700" />
                    <h3 className="font-bold text-slate-800">الإشعارات</h3>
                    {unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {unreadCount} جديد
                        </span>
                    )}
                </div>
                <div className="flex gap-1">
                    {notifications.length > 0 && (
                        <>
                            <button
                                onClick={markAllAsRead}
                                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500"
                                title="تحديد الكل كمقروء"
                            >
                                <Check size={16} />
                            </button>
                            <button
                                onClick={clearNotifications}
                                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-red-500"
                                title="مسح الكل"
                            >
                                <Trash2 size={16} />
                            </button>
                        </>
                    )}
                    <button
                        onClick={onClose}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                        <Bell size={40} className="mb-3 opacity-20" />
                        <p className="text-sm font-bold">لا توجد إشعارات حالياً</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-50">
                        {notifications.map(notification => (
                            <div
                                key={notification.id}
                                onClick={() => {
                                    markAsRead(notification.id);
                                    if (notification.link) {
                                        navigate(notification.link);
                                        onClose();
                                    }
                                }}
                                className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer relative ${!notification.isRead ? 'bg-mint-50/30' : ''
                                    }`}
                            >
                                {!notification.isRead && (
                                    <div className="absolute top-4 left-4 w-2 h-2 bg-red-500 rounded-full" />
                                )}
                                <div className="flex gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${getBgColor(notification.type)}`}>
                                        {getIcon(notification.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className={`text-sm font-bold mb-1 ${!notification.isRead ? 'text-slate-900' : 'text-slate-600'
                                            }`}>
                                            {notification.title}
                                        </h4>
                                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                                            {notification.message}
                                        </p>
                                        <p className="text-[10px] text-slate-400 mt-2">
                                            {new Date(notification.timestamp).toLocaleString('ar-EG')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationsPanel;
