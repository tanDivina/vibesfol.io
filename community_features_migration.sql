-- ### Community & Discovery Features ###

-- 1. Add columns to profiles table for discoverability
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS availability TEXT, -- e.g., 'available_for_hire', 'open_to_offers', 'not_available'
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS youtube_url TEXT; -- Add YouTube social link

-- 2. Create a table for general-purpose tags (skills, interests, etc.)
CREATE TABLE IF NOT EXISTS public.tags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create a join table for profiles and tags (many-to-many)
CREATE TABLE IF NOT EXISTS public.profile_tags (
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
    PRIMARY KEY (profile_id, tag_id)
);

-- ### "Vibecoded With" Feature ###

-- 4. Add columns to the project_technologies join table to support collaborators
ALTER TABLE public.project_technologies
ADD COLUMN IF NOT EXISTS collaborator_name TEXT,
ADD COLUMN IF NOT EXISTS collaborator_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL;

-- 5. Insert the "vibecoded" tag into the technologies table if it doesn't exist
INSERT INTO public.technologies (name)
VALUES ('vibecoded')
ON CONFLICT (name) DO NOTHING;

-- ### RLS Policies for New Tables ###

-- 6. Enable RLS for new tables
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_tags ENABLE ROW LEVEL SECURITY;

-- 7. Create RLS policies for tags
-- Allow anyone to read all tags
CREATE POLICY "Allow read access to all users" ON public.tags
    FOR SELECT USING (true);
-- Allow authenticated users to insert new tags (e.g., if a skill is not in the list)
CREATE POLICY "Allow authenticated users to insert" ON public.tags
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 8. Create RLS policies for profile_tags
-- Allow users to view all profile-tag associations (needed for the discover page)
CREATE POLICY "Allow read access to all users" ON public.profile_tags
    FOR SELECT USING (true);
-- Allow users to manage their own tags
CREATE POLICY "Users can manage their own tags" ON public.profile_tags
    FOR ALL USING (auth.uid() = profile_id);

-- ### Indexes for Performance ###
CREATE INDEX IF NOT EXISTS idx_profiles_availability ON public.profiles(availability);
CREATE INDEX IF NOT EXISTS idx_profiles_is_featured ON public.profiles(is_featured);
CREATE INDEX IF NOT EXISTS idx_tags_name ON public.tags(name);
CREATE INDEX IF NOT EXISTS idx_profile_tags_profile_id ON public.profile_tags(profile_id);
CREATE INDEX IF NOT EXISTS idx_profile_tags_tag_id ON public.profile_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_project_technologies_collaborator_user_id ON public.project_technologies(collaborator_user_id);
