import { UserRole, Action, Resource, UserScope, UserRoleEnum, AdminProfile } from '../types';

/**
 * Role Hierarchy Levels
 * Higher number = more privilege
 */
const ROLE_LEVELS: Record<UserRole, number> = {
    [UserRoleEnum.PLATFORM_OWNER]: 100,
    [UserRoleEnum.GLOBAL_SUPER_ADMIN]: 90,
    [UserRoleEnum.COUNTRY_ADMIN]: 80,
    [UserRoleEnum.STAGE_ADMIN]: 70,
    [UserRoleEnum.ACADEMIC_ADMIN]: 60,
    [UserRoleEnum.TEACHER]: 50,
    [UserRoleEnum.MODERATOR]: 40,
    [UserRoleEnum.STUDENT]: 10,
};

/**
 * Permission Matrix
 * Defines what actions each role can perform on specific resources.
 * This is the baseline; scopes further restrict this.
 */
const PERMISSIONS: Record<UserRole, Partial<Record<Resource, Action[]>>> = {
    [UserRoleEnum.PLATFORM_OWNER]: {
        users: ['view', 'create', 'edit', 'delete', 'manage'],
        content: ['view', 'create', 'edit', 'delete', 'publish', 'archive', 'approve', 'manage'],
        settings: ['view', 'edit', 'manage'],
        reports: ['view', 'manage'],
        applications: ['view', 'approve', 'manage'],
        competitions: ['view', 'create', 'edit', 'delete', 'manage']
    },
    [UserRoleEnum.GLOBAL_SUPER_ADMIN]: {
        users: ['view', 'create', 'edit', 'delete', 'manage'],
        content: ['view', 'create', 'edit', 'delete', 'publish', 'archive', 'approve', 'manage'],
        settings: ['view', 'edit', 'manage'],
        reports: ['view', 'manage'],
        applications: ['view', 'approve', 'manage'],
        competitions: ['view', 'create', 'edit', 'delete', 'manage']
    },
    [UserRoleEnum.COUNTRY_ADMIN]: {
        users: ['view', 'create', 'edit', 'delete'],
        content: ['view', 'create', 'edit', 'delete', 'publish', 'approve'],
        settings: ['view', 'edit'],
        reports: ['view'],
        applications: ['view', 'approve'],
        competitions: ['view', 'create', 'edit', 'delete']
    },
    [UserRoleEnum.STAGE_ADMIN]: {
        users: ['view'],
        content: ['view', 'create', 'edit', 'delete', 'publish', 'approve'],
        reports: ['view'],
        competitions: ['view', 'create', 'edit']
    },
    [UserRoleEnum.ACADEMIC_ADMIN]: {
        content: ['view', 'create', 'edit', 'delete', 'approve'],
        competitions: ['view']
    },
    [UserRoleEnum.TEACHER]: {
        content: ['view', 'create', 'edit'], // Edit own content only (enforced by RLS/logic)
        competitions: ['view']
    },
    [UserRoleEnum.MODERATOR]: {
        content: ['view', 'approve', 'archive'],
        competitions: ['view']
    },
    [UserRoleEnum.STUDENT]: {
        content: ['view'],
        competitions: ['view']
    }
};

/**
 * Check if a user has a specific role or higher.
 */
export const hasRole = (userRole: UserRole, requiredRole: UserRole): boolean => {
    return ROLE_LEVELS[userRole] >= ROLE_LEVELS[requiredRole];
};

/**
 * Check if a user has permission to perform an action on a resource.
 * This checks the static matrix.
 */
export const hasPermission = (userRole: UserRole, resource: Resource, action: Action): boolean => {
    const rolePermissions = PERMISSIONS[userRole];
    if (!rolePermissions) return false;

    const resourceActions = rolePermissions[resource];
    if (!resourceActions) return false;

    return resourceActions.includes(action) || resourceActions.includes('manage');
};

/**
 * Check if user has access to a specific scope.
 * 
 * @param user The user profile
 * @param targetScope The scope of the resource being accessed
 */
export const canAccessScope = (user: AdminProfile, targetScope: UserScope): boolean => {
    // Platform Owner and Global Admin have global access
    if (user.role === UserRoleEnum.PLATFORM_OWNER || user.role === UserRoleEnum.GLOBAL_SUPER_ADMIN) {
        return true;
    }

    // Check Country Scope
    if (targetScope.countryId && targetScope.countryId !== 'ALL') {
        if (user.assignedCountryId && user.assignedCountryId !== 'ALL' && user.assignedCountryId !== targetScope.countryId) {
            return false;
        }
    }

    // Check Stage Scope (if user has stage restriction)
    if (targetScope.stage && user.assignedStage) {
        if (user.assignedStage !== targetScope.stage) {
            return false;
        }
    }

    // Check Subject Scope (if user has subject restriction)
    if (targetScope.subjects && targetScope.subjects.length > 0 && user.assignedSubjects && user.assignedSubjects.length > 0) {
        // Must match at least one subject
        const hasMatch = targetScope.subjects.some(sub => user.assignedSubjects?.includes(sub));
        if (!hasMatch) return false;
    }

    return true;
};

/**
 * Combined check: Has Permission AND Access Scope
 */
export const canPerformAction = (
    user: AdminProfile,
    resource: Resource,
    action: Action,
    targetScope?: UserScope
): boolean => {
    if (!hasPermission(user.role, resource, action)) {
        return false;
    }

    if (targetScope) {
        return canAccessScope(user, targetScope);
    }

    return true;
};
