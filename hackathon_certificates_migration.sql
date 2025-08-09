-- ### Hackathon Certificates Feature ###

-- 1. Hackathons Table
CREATE TABLE IF NOT EXISTS public.hackathons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    organizer TEXT,
    website TEXT,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Hackathon Certificates Table
CREATE TABLE IF NOT EXISTS public.hackathon_certificates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    hackathon_id UUID NOT NULL REFERENCES public.hackathons(id) ON DELETE CASCADE,
    project_name TEXT,
    project_description TEXT,
    certificate_url TEXT,
    award TEXT, -- e.g., 'Winner', 'Finalist', 'Participant'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ### RLS Policies for New Tables ###

-- 3. Enable RLS
ALTER TABLE public.hackathons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hackathon_certificates ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies
-- Hackathons
CREATE POLICY "Allow public read access to all hackathons" ON public.hackathons
    FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to insert new hackathons" ON public.hackathons
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Hackathon Certificates
CREATE POLICY "Users can manage their own hackathon certificates" ON public.hackathon_certificates
    FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Allow public read access to all hackathon certificates" ON public.hackathon_certificates
    FOR SELECT USING (true);

-- ### Indexes for Performance ###
CREATE INDEX IF NOT EXISTS idx_hackathons_name ON public.hackathons(name);
CREATE INDEX IF NOT EXISTS idx_hackathon_certificates_user_id ON public.hackathon_certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_hackathon_certificates_hackathon_id ON public.hackathon_certificates(hackathon_id);
