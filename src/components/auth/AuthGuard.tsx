import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AuthGuardProps {
    children?: React.ReactNode;
    requireAuth?: boolean;
    redirectTo?: string;
}

/**
 * AuthGuard - Protects routes that require authentication
 * 
 * Usage:
 * <Route element={<AuthGuard />}>
 *   <Route path="/profile" element={<ProfilePage />} />
 * </Route>
 */
const AuthGuard: React.FC<AuthGuardProps> = ({
    children,
    requireAuth = true,
    redirectTo = '/auth/login'
}) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // Show loading state while checking auth
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mint-50 via-white to-mint-100">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl animate-pulse">
                        <BookOpen className="text-white" size={32} />
                    </div>
                    <p className="text-slate-500 font-bold font-outfit">Loading your experience...</p>
                </div>
            </div>
        );
    }

    // Require authentication but user is not authenticated
    if (requireAuth && !isAuthenticated) {
        // Save the attempted URL for redirecting after login
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    // Dont require auth (e.g., login page) but user IS authenticated
    if (!requireAuth && isAuthenticated) {
        // Redirect to home or saved location
        const from = (location.state as any)?.from?.pathname || '/';
        return <Navigate to={from} replace />;
    }

    // Render children or outlet
    return children ? <>{children}</> : <Outlet />;
};

export default AuthGuard;

