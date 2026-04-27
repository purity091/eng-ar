import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[]; // If empty, just requires authentication
    requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    allowedRoles = [],
    requireAdmin = false
}) => {
    const { isAuthenticated, currentUser, isAdmin } = useApp();
    const location = useLocation();

    // 1. Check Authentication
    if (!isAuthenticated) {
        return <Navigate to="/join" state={{ from: location }} replace />;
    }

    // 2. Check Admin Requirement
    if (requireAdmin && !isAdmin) {
        return (
            <div className="flex h-screen items-center justify-center flex-col gap-4">
                <h1 className="text-4xl font-bold text-red-500">403</h1>
                <p className="text-slate-600 font-bold">عذراً، هذه الصفحة مخصصة لمديري النظام فقط.</p>
                <button onClick={() => window.history.back()} className="text-mint-600 underline">العودة للخلف</button>
            </div>
        );
    }

    // 3. Check Specific Roles (if provided)
    if (allowedRoles.length > 0 && currentUser && !allowedRoles.includes(currentUser.role)) {
        return (
            <div className="flex h-screen items-center justify-center flex-col gap-4">
                <h1 className="text-4xl font-bold text-orange-500">403</h1>
                <p className="text-slate-600 font-bold">غير مصرح لك بدخول هذه الصفحة.</p>
                <p className="text-sm text-slate-400">الدور الحالي: {currentUser.role}</p>
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
