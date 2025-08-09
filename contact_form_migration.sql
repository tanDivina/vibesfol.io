-- Contact Form System Migration
-- This migration adds support for contact forms on public portfolios

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    portfolio_user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    sender_name VARCHAR(255) NOT NULL,
    sender_email VARCHAR(255) NOT NULL,
    sender_company VARCHAR(255),
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    is_starred BOOLEAN DEFAULT FALSE,
    replied_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_portfolio_user_id ON contact_submissions(portfolio_user_id);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_is_read ON contact_submissions(is_read);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_is_starred ON contact_submissions(is_starred);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for contact_submissions
-- Portfolio owners can view their own contact submissions
CREATE POLICY "Users can view their own contact submissions" ON contact_submissions
    FOR SELECT USING (portfolio_user_id = auth.uid());

-- Portfolio owners can update their own contact submissions (mark as read, starred, etc.)
CREATE POLICY "Users can update their own contact submissions" ON contact_submissions
    FOR UPDATE USING (portfolio_user_id = auth.uid());

-- Portfolio owners can delete their own contact submissions
CREATE POLICY "Users can delete their own contact submissions" ON contact_submissions
    FOR DELETE USING (portfolio_user_id = auth.uid());

-- Anyone can insert contact submissions (public contact forms)
CREATE POLICY "Anyone can submit contact forms" ON contact_submissions
    FOR INSERT WITH CHECK (true);

-- Add contact form settings to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS contact_form_enabled BOOLEAN DEFAULT TRUE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS contact_form_title VARCHAR(255) DEFAULT 'Get In Touch';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS contact_form_description TEXT DEFAULT 'I''d love to hear from you! Send me a message and I''ll get back to you as soon as possible.';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS contact_email_notifications BOOLEAN DEFAULT TRUE;

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_contact_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_contact_submissions_updated_at ON contact_submissions;
CREATE TRIGGER update_contact_submissions_updated_at
    BEFORE UPDATE ON contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_contact_submissions_updated_at();

-- Insert sample data for testing
INSERT INTO contact_submissions (portfolio_user_id, sender_name, sender_email, sender_company, subject, message, is_read, is_starred)
SELECT 
    p.id,
    'John Smith',
    'john.smith@example.com',
    'Tech Startup Inc.',
    'Interested in collaboration',
    'Hi! I came across your portfolio and I''m really impressed with your work. I''d love to discuss a potential collaboration opportunity. Could we schedule a call this week?',
    false,
    false
FROM profiles p
WHERE p.username = 'johndoe'
LIMIT 1;

INSERT INTO contact_submissions (portfolio_user_id, sender_name, sender_email, subject, message, is_read, is_starred)
SELECT 
    p.id,
    'Sarah Johnson',
    'sarah@designstudio.com',
    'Freelance Project Opportunity',
    'Hello! We have an exciting web development project and think you''d be a perfect fit. The project involves building a modern e-commerce platform with React and Node.js. Are you available for freelance work?',
    true,
    true
FROM profiles p
WHERE p.username = 'johndoe'
LIMIT 1;

INSERT INTO contact_submissions (portfolio_user_id, sender_name, sender_email, sender_company, subject, message, is_read)
SELECT 
    p.id,
    'Mike Chen',
    'mike.chen@techcorp.com',
    'TechCorp Solutions',
    'Job Opportunity - Senior Developer',
    'Hi there! I''m a recruiter at TechCorp Solutions and we have an exciting senior developer position that matches your skill set perfectly. Would you be interested in learning more about this opportunity?',
    false
FROM profiles p
WHERE p.username = 'johndoe'
LIMIT 1;
