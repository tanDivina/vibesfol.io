-- ### Professional Features ###

-- 1. Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    client_name TEXT NOT NULL,
    client_title TEXT,
    client_company TEXT,
    testimonial_text TEXT NOT NULL,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Client Portal Table
CREATE TABLE IF NOT EXISTS public.client_portals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    client_name TEXT NOT NULL,
    client_email TEXT,
    project_description TEXT,
    access_token TEXT NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Contact Forms Table (re-using from analytics migration for consistency)
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    visitor_name TEXT,
    visitor_email TEXT NOT NULL,
    message TEXT NOT NULL,
    visitor_ip TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ### RLS Policies for New Tables ###

-- 4. Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_portals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS policies
-- Testimonials
CREATE POLICY "Users can manage their own testimonials" ON public.testimonials
    FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Allow public read access to published testimonials" ON public.testimonials
    FOR SELECT USING (is_published = TRUE);

-- Client Portals
CREATE POLICY "Users can manage their own client portals" ON public.client_portals
    FOR ALL USING (auth.uid() = user_id);

-- Contact Submissions
CREATE POLICY "Users can manage their own contact submissions" ON public.contact_submissions
    FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Allow public to submit contact forms" ON public.contact_submissions
    FOR INSERT WITH CHECK (true);

-- ### Indexes for Performance ###
CREATE INDEX IF NOT EXISTS idx_testimonials_user_id ON public.testimonials(user_id);
CREATE INDEX IF NOT EXISTS idx_client_portals_user_id ON public.client_portals(user_id);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_user_id ON public.contact_submissions(user_id);
