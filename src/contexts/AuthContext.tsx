import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import { AuthUser, AuthResult, RegistrationData, Credentials } from '../types';
import { getCurrentCountry } from '../config/supabase';

interface AuthContextType {
    // State
    user: AuthUser | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    signUp: (data: RegistrationData) => Promise<AuthResult>;
    signIn: (credentials: Credentials) => Promise<AuthResult>;
    signOut: () => Promise<void>;
    clearError: () => void;

    // Derived State
    isAuthenticated: boolean;
    isConfigured: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Error messages in Arabic
const ERROR_MESSAGES: Record<string, string> = {
    'invalid_email': 'البريد الإلكتروني غير صالح',
    'weak_password': 'كلمة المرور ضعيفة جداً (8 أحرف على الأقل)',
    'user_already_registered': 'البريد الإلكتروني مسجل بالفعل',
    'invalid_credentials': 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
    'email_not_confirmed': 'يرجى تأكيد البريد الإلكتروني أولاً',
    'password_mismatch': 'كلمات المرور غير متطابقة',
    'network_error': 'خطأ في الاتصال، يرجى المحاولة لاحقاً',
    'unknown_error': 'حدث خطأ غير متوقع',
};

const getErrorMessage = (error: any): string => {
    if (!error) return ERROR_MESSAGES.unknown_error;

    const errorMessage = error.message?.toLowerCase() || '';

    if (errorMessage.includes('email') && errorMessage.includes('invalid')) {
        return ERROR_MESSAGES.invalid_email;
    }
    if (errorMessage.includes('password') && (errorMessage.includes('weak') || errorMessage.includes('short'))) {
        return ERROR_MESSAGES.weak_password;
    }
    if (errorMessage.includes('already registered') || errorMessage.includes('already exists')) {
        return ERROR_MESSAGES.user_already_registered;
    }
    if (errorMessage.includes('invalid login') || errorMessage.includes('invalid credentials')) {
        return ERROR_MESSAGES.invalid_credentials;
    }
    if (errorMessage.includes('email not confirmed')) {
        return ERROR_MESSAGES.email_not_confirmed;
    }
    if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        return ERROR_MESSAGES.network_error;
    }

    return ERROR_MESSAGES.unknown_error;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const isConfigured = isSupabaseConfigured();

    // Map Supabase user to our AuthUser type
    const mapUser = (supabaseUser: any): AuthUser | null => {
        if (!supabaseUser) return null;
        return {
            id: supabaseUser.id,
            email: supabaseUser.email || '',
            emailVerified: supabaseUser.email_confirmed_at !== null,
            createdAt: supabaseUser.created_at || new Date().toISOString(),
        };
    };

    // Check for existing session on mount
    useEffect(() => {
        const checkSession = async () => {
            if (!isConfigured) {
                setIsLoading(false);
                return;
            }

            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                if (error) throw error;
                setUser(session ? mapUser(session.user) : null);
            } catch (err) {
                console.error('Session check failed:', err);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkSession();

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session ? mapUser(session.user) : null);

                if (event === 'SIGNED_IN' && session?.user) {
                    // Ensure profile exists
                    await ensureProfileExists(session.user);
                }
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, [isConfigured]);

    // Create profile if it doesnt exist
    const ensureProfileExists = async (supabaseUser: any) => {
        if (!isConfigured) return;

        try {
            const { data: existingProfile } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', supabaseUser.id)
                .single();

            if (!existingProfile) {
                const countryId = getCurrentCountry();
                await supabase.from('profiles').insert({
                    id: supabaseUser.id,
                    email: supabaseUser.email,
                    role: 'student',
                    full_name: supabaseUser.user_metadata?.full_name || '',
                    assigned_country_id: countryId,
                    created_at: new Date().toISOString(),
                });
            }
        } catch (err) {
            console.error('Profile creation error:', err);
        }
    };

    // Sign Up
    const signUp = useCallback(async (data: RegistrationData): Promise<AuthResult> => {
        setError(null);
        setIsLoading(true);

        // Validate passwords match
        if (data.password !== data.confirmPassword) {
            setError(ERROR_MESSAGES.password_mismatch);
            setIsLoading(false);
            return { success: false, error: ERROR_MESSAGES.password_mismatch };
        }

        // Validate password strength
        if (data.password.length < 8) {
            setError(ERROR_MESSAGES.weak_password);
            setIsLoading(false);
            return { success: false, error: ERROR_MESSAGES.weak_password };
        }

        if (!isConfigured) {
            // Demo mode - simulate success
            const mockUser: AuthUser = {
                id: `mock-${Date.now()}`,
                email: data.email,
                emailVerified: true,
                createdAt: new Date().toISOString(),
            };
            setUser(mockUser);
            setIsLoading(false);
            return { success: true, user: mockUser };
        }

        try {
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        full_name: data.fullName,
                    },
                },
            });

            if (authError) throw authError;

            const mappedUser = mapUser(authData.user);
            setUser(mappedUser);
            setIsLoading(false);
            return { success: true, user: mappedUser || undefined };
        } catch (err: any) {
            const errorMsg = getErrorMessage(err);
            setError(errorMsg);
            setIsLoading(false);
            return { success: false, error: errorMsg };
        }
    }, [isConfigured]);

    // Sign In
    const signIn = useCallback(async (credentials: Credentials): Promise<AuthResult> => {
        setError(null);
        setIsLoading(true);

        if (!isConfigured) {
            // Demo mode - simulate success
            const mockUser: AuthUser = {
                id: `mock-${Date.now()}`,
                email: credentials.email,
                emailVerified: true,
                createdAt: new Date().toISOString(),
            };
            setUser(mockUser);
            setIsLoading(false);
            return { success: true, user: mockUser };
        }

        try {
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email: credentials.email,
                password: credentials.password,
            });

            if (authError) throw authError;

            const mappedUser = mapUser(authData.user);
            setUser(mappedUser);
            setIsLoading(false);
            return { success: true, user: mappedUser || undefined };
        } catch (err: any) {
            const errorMsg = getErrorMessage(err);
            setError(errorMsg);
            setIsLoading(false);
            return { success: false, error: errorMsg };
        }
    }, [isConfigured]);

    // Sign Out
    const signOut = useCallback(async () => {
        setError(null);

        if (isConfigured) {
            try {
                await supabase.auth.signOut();
            } catch (err) {
                console.error('Sign out error:', err);
            }
        }

        setUser(null);
    }, [isConfigured]);

    // Clear error
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            error,
            signUp,
            signIn,
            signOut,
            clearError,
            isAuthenticated: !!user,
            isConfigured,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

