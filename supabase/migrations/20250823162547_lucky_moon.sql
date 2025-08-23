/*
  # Add Missing Profile Columns

  1. New Columns Added
    - `bio` (text) - User biography/description
    - `github_url` (text) - GitHub profile URL
    - `linkedin_url` (text) - LinkedIn profile URL
    - `twitter_url` (text) - Twitter profile URL
    - `instagram_url` (text) - Instagram profile URL
    - `username` (text, unique) - Unique username for portfolio URLs
    - `portfolio_theme` (text) - Selected portfolio theme
    - `youtube_url` (text) - YouTube channel URL
    - `availability` (text) - Availability status for work
    - `location` (text) - User location
    - `is_featured` (boolean) - Whether user is featured
    - `contact_form_enabled` (boolean) - Contact form enabled status
    - `contact_form_title` (text) - Custom contact form title
    - `contact_form_description` (text) - Custom contact form description
    - `contact_email_notifications` (boolean) - Email notification preference
    - `seo_title` (text) - Custom SEO title
    - `seo_description` (text) - Custom SEO description
    - `seo_image_url` (text) - Custom SEO image URL
    - `seo_keywords` (text) - SEO keywords
    - `custom_domain` (text) - Custom domain name
    - `custom_domain_verified` (boolean) - Domain verification status
    - `custom_domain_verification_token` (text) - Domain verification token
    - `analytics_enabled` (boolean) - Analytics tracking enabled

  2. Indexes
    - Index on username for faster lookups

  3. Security
    - All existing RLS policies remain unchanged
*/

-- Add bio and social links columns
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS github_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS linkedin_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS twitter_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS instagram_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS username TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS portfolio_theme TEXT DEFAULT 'modern';

-- Add YouTube and other social platforms
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS youtube_url TEXT;

-- Add community and discovery features
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS availability TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;

-- Add contact form settings
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS contact_form_enabled BOOLEAN DEFAULT TRUE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS contact_form_title TEXT DEFAULT 'Get In Touch';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS contact_form_description TEXT DEFAULT 'I''d love to hear from you! Send me a message and I''ll get back to you as soon as possible.';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS contact_email_notifications BOOLEAN DEFAULT TRUE;

-- Add SEO and social sharing settings
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS seo_image_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS seo_keywords TEXT;

-- Add custom domain settings
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS custom_domain TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS custom_domain_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS custom_domain_verification_token TEXT;

-- Add analytics settings
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS analytics_enabled BOOLEAN DEFAULT TRUE;

-- Create unique constraint on username if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'profiles_username_key' 
    AND table_name = 'profiles'
  ) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_username_key UNIQUE (username);
  END IF;
END $$;

-- Create index on username for faster lookups if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);