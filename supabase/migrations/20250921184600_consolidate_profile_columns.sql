/*
  # Consolidate Missing Profile Columns

  This migration consolidates several previous partial migrations into a single, comprehensive one.
  It adds all the missing columns that are referenced in the application but may not exist
  in the current database schema due to a previously failed migration.

  The original failed migration was '20250823053344_broken_fountain.sql'. This file corrects
  the syntax error in that migration and includes all its intended changes.

  This script is idempotent and can be safely run on databases that are in a partially migrated state.

  1. Missing Columns Added
     - `username` (text, unique) - for portfolio URLs
     - `bio` (text) - user biography/description
     - `github_url` (text) - GitHub profile link
     - `linkedin_url` (text) - LinkedIn profile link
     - `twitter_url` (text) - Twitter profile link
     - `instagram_url` (text) - Instagram profile link
     - `portfolio_theme` (text) - selected portfolio theme
     - `availability` (text) - availability status
     - `location` (text) - user location
     - `is_featured` (boolean) - featured user flag
     - `youtube_url` (text) - YouTube channel link
     - `contact_form_enabled` (boolean) - contact form toggle
     - `contact_form_title` (text) - contact form title
     - `contact_form_description` (text) - contact form description
     - `contact_email_notifications` (boolean) - email notification preference
     - `seo_title` (text) - SEO page title
     - `seo_description` (text) - SEO meta description
     - `seo_image_url` (text) - SEO social sharing image
     - `seo_keywords` (text) - SEO keywords
     - `custom_domain` (text) - custom domain setting
     - `custom_domain_verified` (boolean) - domain verification status
     - `custom_domain_verification_token` (uuid) - verification token
     - `analytics_enabled` (boolean) - analytics tracking preference

  2. Indexes Added
     - Index on username for fast lookups
     - Index on custom_domain for domain routing

  3. Sample Data
     - Updates existing profiles with sample usernames
*/

-- Add all missing columns to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS username TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS github_url TEXT,
ADD COLUMN IF NOT EXISTS linkedin_url TEXT,
ADD COLUMN IF NOT EXISTS twitter_url TEXT,
ADD COLUMN IF NOT EXISTS instagram_url TEXT,
ADD COLUMN IF NOT EXISTS portfolio_theme TEXT DEFAULT 'modern',
ADD COLUMN IF NOT EXISTS availability TEXT,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS youtube_url TEXT,
ADD COLUMN IF NOT EXISTS contact_form_enabled BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS contact_form_title TEXT DEFAULT 'Get In Touch',
ADD COLUMN IF NOT EXISTS contact_form_description TEXT DEFAULT 'I''d love to hear from you! Send me a message and I''ll get back to you as soon as possible.',
ADD COLUMN IF NOT EXISTS contact_email_notifications BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS seo_title TEXT,
ADD COLUMN IF NOT EXISTS seo_description TEXT,
ADD COLUMN IF NOT EXISTS seo_image_url TEXT,
ADD COLUMN IF NOT EXISTS seo_keywords TEXT,
ADD COLUMN IF NOT EXISTS custom_domain TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS custom_domain_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS custom_domain_verification_token UUID DEFAULT gen_random_uuid(),
ADD COLUMN IF NOT EXISTS analytics_enabled BOOLEAN DEFAULT TRUE;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_custom_domain ON profiles(custom_domain);
CREATE INDEX IF NOT EXISTS idx_profiles_availability ON profiles(availability);
CREATE INDEX IF NOT EXISTS idx_profiles_is_featured ON profiles(is_featured);

-- Generate usernames for existing profiles that don't have one
UPDATE profiles 
SET username = LOWER(REGEXP_REPLACE(COALESCE(full_name, 'user'), '[^a-zA-Z0-9]', '', 'g')) || '_' || SUBSTRING(id::text, 1, 8)
WHERE username IS NULL AND full_name IS NOT NULL;

-- For profiles without full_name, use a generic username
UPDATE profiles 
SET username = 'user_' || SUBSTRING(id::text, 1, 8)
WHERE username IS NULL;

-- Add some sample bio data for existing demo profiles
UPDATE profiles 
SET bio = 'Full-stack developer passionate about creating beautiful, functional web applications. I love working with modern technologies and building solutions that make a difference.'
WHERE username LIKE 'john%' OR username LIKE 'demo%';
