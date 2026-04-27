import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { canPerformAction } from '../../utils/permissions';
import { Resource, Action, UserScope } from '../../types';

interface PermissionGuardProps {
    children: React.ReactNode;
    resource: Resource;
    action: Action;
    scope?: UserScope;
    fallback?: React.ReactNode;
}

/**
 * PermissionGuard
 * 
 * Conditionally renders children if the current user has the required permission
 * and access to the optional scope.
 * 
 * Usage:
 * <PermissionGuard resource="content" action="create">
 *   <CreateButton />
 * </PermissionGuard>
 */
const PermissionGuard: React.FC<PermissionGuardProps> = ({
    children,
    resource,
    action,
    scope,
    fallback = null
}) => {
    const { currentUser } = useApp();

    // If no user, deny access (or rely on parent auth guard, but safer to deny)
    if (!currentUser) {
        return <>{fallback}</>;
    }

    const hasAccess = canPerformAction(currentUser, resource, action, scope);

    if (!hasAccess) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
};

export default PermissionGuard;
