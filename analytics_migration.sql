-- Analytics tables for tracking portfolio engagement

-- Portfolio views table
CREATE TABLE IF NOT EXISTS portfolio_views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    visitor_ip TEXT,
    visitor_country TEXT,
    visitor_city TEXT,
    user_agent TEXT,
    referrer TEXT,
    page_path TEXT NOT NULL,
    session_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project clicks table
CREATE TABLE IF NOT EXISTS project_clicks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    visitor_ip TEXT,
    visitor_country TEXT,
    visitor_city TEXT,
    user_agent TEXT,
    referrer TEXT,
    click_type TEXT NOT NULL, -- 'view_project', 'visit_link', 'view_screenshot'
    session_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Social link clicks table
CREATE TABLE IF NOT EXISTS social_clicks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    visitor_ip TEXT,
    visitor_country TEXT,
    visitor_city TEXT,
    user_agent TEXT,
    referrer TEXT,
    platform TEXT NOT NULL, -- 'github', 'linkedin', 'twitter', 'medium', 'gumroad', 'substack', 'amazon', 'whatsapp', 'website'
    session_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact form submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    visitor_ip TEXT,
    visitor_country TEXT,
    visitor_city TEXT,
    user_agent TEXT,
    referrer TEXT,
    contact_method TEXT NOT NULL, -- 'email', 'whatsapp', 'contact_form'
    session_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_portfolio_views_user_id ON portfolio_views(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_views_created_at ON portfolio_views(created_at);
CREATE INDEX IF NOT EXISTS idx_portfolio_views_session_id ON portfolio_views(session_id);

CREATE INDEX IF NOT EXISTS idx_project_clicks_project_id ON project_clicks(project_id);
CREATE INDEX IF NOT EXISTS idx_project_clicks_user_id ON project_clicks(user_id);
CREATE INDEX IF NOT EXISTS idx_project_clicks_created_at ON project_clicks(created_at);
CREATE INDEX IF NOT EXISTS idx_project_clicks_session_id ON project_clicks(session_id);

CREATE INDEX IF NOT EXISTS idx_social_clicks_user_id ON social_clicks(user_id);
CREATE INDEX IF NOT EXISTS idx_social_clicks_created_at ON social_clicks(created_at);
CREATE INDEX IF NOT EXISTS idx_social_clicks_platform ON social_clicks(platform);
CREATE INDEX IF NOT EXISTS idx_social_clicks_session_id ON social_clicks(session_id);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_user_id ON contact_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_session_id ON contact_submissions(session_id);

-- Enable Row Level Security
ALTER TABLE portfolio_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own analytics" ON portfolio_views
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own project analytics" ON project_clicks
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own social analytics" ON social_clicks
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own contact analytics" ON contact_submissions
    FOR SELECT USING (auth.uid() = user_id);

-- Allow anonymous users to insert analytics data
CREATE POLICY "Allow anonymous analytics tracking" ON portfolio_views
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous project tracking" ON project_clicks
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous social tracking" ON social_clicks
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous contact tracking" ON contact_submissions
    FOR INSERT WITH CHECK (true);
