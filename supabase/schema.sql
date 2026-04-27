-- 1. Create Role Enumeration (If not exists)
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM (
        'platform_owner',
        'global_super_admin',
        'country_admin',
        'stage_admin',
        'academic_admin',
        'teacher',
        'moderator',
        'student'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Create Profiles Table (Extends Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role user_role DEFAULT 'student',
  
  -- Scopes (ABAC Attributes)
  assigned_country_id TEXT, -- 'ALL' or 'eg', 'sa' etc.
  assigned_stage TEXT,      -- 'Primary', 'Secondary'
  assigned_subjects TEXT[], -- Array of strings e.g. ['Math', 'Physics']
  
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_active TIMESTAMPTZ
);

-- 3. Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies

-- Policy: Users can read their own profile
CREATE POLICY "Users can read own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

-- Policy: Users can update their own profile (limited fields typically, but open for now)
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Policy: Platform Owners and Global Admins can read all profiles
CREATE POLICY "Admins read all profiles" 
ON public.profiles FOR SELECT 
USING (
  auth.uid() IN (
    SELECT id FROM public.profiles 
    WHERE role IN ('platform_owner', 'global_super_admin')
  )
);

-- Policy: Country Admins can read/manage profiles in their country
CREATE POLICY "Country admins manage country scope" 
ON public.profiles FOR ALL 
USING (
  auth.uid() IN (
    SELECT id FROM public.profiles 
    WHERE role = 'country_admin' 
    AND assigned_country_id = profiles.assigned_country_id
  )
);

-- Policy: Teachers can read student profiles in their country (Simplified for now)
CREATE POLICY "Teachers read country students" 
ON public.profiles FOR SELECT 
USING (
  auth.uid() IN (
    SELECT id FROM public.profiles 
    WHERE role = 'teacher' 
    AND assigned_country_id = profiles.assigned_country_id
  )
  AND role = 'student'
);
