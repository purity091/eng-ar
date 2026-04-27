import { useApp } from '../contexts/AppContext';
import { AdminProfile, Action, Resource, UserScope, UserRole } from '../types';

export const usePermissions = () => {
    const { currentUser, checkPermission, checkScope, checkRole } = useApp();

    return {
        // Core Checks
        hasPermission: (resource: Resource, action: Action, scope?: UserScope) => checkPermission(resource, action, scope),
        checkRole,
        checkScope,

        // Helpers for common checks
        canManageUser: (targetUser: AdminProfile) => {
            // Must have permission to manage users
            if (!checkPermission('users', 'manage')) return false;

            // Platform Owner manages everyone
            if (currentUser?.role === 'platform_owner') return true;

            // Country Admin manages their country
            if (currentUser?.role === 'country_admin') {
                return currentUser.assignedCountryId === targetUser.assignedCountryId;
            }

            return false;
        },

        canAccessContent: (contentCountryId: string) => {
            return checkScope({ countryId: contentCountryId });
        },

        getAccessibleCountries: () => {
            if (!currentUser) return [];
            if (currentUser.assignedCountryId === 'ALL') return ['eg', 'sa', 'ae', 'ALL'];
            return [currentUser.assignedCountryId!];
        }
    };
};
