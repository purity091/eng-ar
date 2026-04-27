import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error' | 'achievement';
    isRead: boolean;
    timestamp: Date;
    link?: string;
}

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void;
    clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        // Load notifications from local storage on mount
        const saved = localStorage.getItem('readmint_notifications');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Convert string timestamps back to Date objects
                const hydrated = parsed.map((n: any) => ({
                    ...n,
                    timestamp: new Date(n.timestamp)
                }));
                setNotifications(hydrated);
            } catch (error) {
                console.error('Failed to parse notifications', error);
            }
        } else {
            // Add some dummy notifications for demonstration
            addNotification({
                title: '.رحبا< بf فS Readmint!',
                message: '?ت.?? "f تجربة تعS.Sة ..تعة ^.فSدة.',
                type: 'info'
            });
            addNotification({
                title: '.ساب,ة جدSدة',
                message: 'ا?ط",ت .ساب,ة ارSاضSات اfبر?O شارf اآ? ^اربح ج^ائز ,S.ة!',
                type: 'achievement',
                link: '/competitions'
            });
        }
    }, []);

    useEffect(() => {
        // Save to local storage whenever notifications change
        localStorage.setItem('readmint_notifications', JSON.stringify(notifications));
    }, [notifications]);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const addNotification = (n: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
        const newNotification: Notification = {
            id: crypto.randomUUID(),
            timestamp: new Date(),
            isRead: false,
            ...n
        };
        setNotifications(prev => [newNotification, ...prev]);
    };

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, isRead: true } : n)
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    return (
        <NotificationContext.Provider value={{
            notifications,
            unreadCount,
            markAsRead,
            markAllAsRead,
            addNotification,
            clearNotifications
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};



