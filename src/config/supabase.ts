import { createClient } from '@supabase/supabase-js';

// Supabase Configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return supabaseUrl !== 'https://placeholder.supabase.co' &&
    supabaseAnonKey !== 'placeholder-key';
};

// Create Supabase client (will work in demo mode without real credentials)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'x-application-name': 'readmint',
    },
  },
});

// Helper function to get current country from subdomain
export const getCurrentCountry = (): string => {
  if (typeof window === 'undefined') return 'eg'; // Default for SSR

  const hostname = window.location.hostname;
  const parts = hostname.split('.');

  // Check if subdomain exists (e.g., sa.readmint.com)
  if (parts.length >= 3) {
    return parts[0]; // Return subdomain (sa, eg, ae, etc.)
  }

  // Default to Egypt for localhost or readmint.com
  return 'eg';
};

// Helper to get country-specific data
export const getCountryContext = () => {
  const country = getCurrentCountry();
  return {
    country,
    locale: country === 'sa' ? 'ar-SA' : country === 'eg' ? 'ar-EG' : 'ar-AE',
    currency: country === 'sa' ? 'SAR' : country === 'eg' ? 'EGP' : 'AED',
  };
};
