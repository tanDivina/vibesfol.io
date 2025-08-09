-- Advanced Portfolio Features Migration
-- This migration adds support for SEO settings, custom domains, and more.

-- 1. SEO and Social Sharing Settings
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS seo_title VARCHAR(255);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS seo_description VARCHAR(500);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS seo_image_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS seo_keywords TEXT; -- Comma-separated keywords

-- Add a trigger to automatically generate default SEO values if they are empty
CREATE OR REPLACE FUNCTION set_default_seo_values()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.seo_title IS NULL OR NEW.seo_title = '' THEN
        NEW.seo_title = NEW.full_name || ' | Developer Portfolio';
    END IF;
    IF NEW.seo_description IS NULL OR NEW.seo_description = '' THEN
        NEW.seo_description = NEW.bio;
    END IF;
    IF NEW.seo_image_url IS NULL OR NEW.seo_image_url = '' THEN
        NEW.seo_image_url = NEW.avatar_url;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_default_seo_on_profile_insert ON profiles;
CREATE TRIGGER set_default_seo_on_profile_insert
BEFORE INSERT ON profiles
FOR EACH ROW
EXECUTE FUNCTION set_default_seo_values();

DROP TRIGGER IF EXISTS set_default_seo_on_profile_update ON profiles;
CREATE TRIGGER set_default_seo_on_profile_update
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION set_default_seo_values();


-- 2. Custom Domain Settings
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS custom_domain VARCHAR(255) UNIQUE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS custom_domain_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS custom_domain_verification_token UUID DEFAULT gen_random_uuid();

-- Add index for custom domain lookups
CREATE INDEX IF NOT EXISTS idx_profiles_custom_domain ON profiles(custom_domain);


-- 3. Advanced Analytics
-- (The existing analytics system can be expanded upon in the application logic)
-- For now, we can add a setting to enable/disable analytics tracking for privacy-conscious users.
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS analytics_enabled BOOLEAN DEFAULT TRUE;


-- Note: Implementation for custom domain verification and proxying will be handled
-- in the application and infrastructure layers (e.g., using a Vercel or Cloudflare worker).
-- This migration only sets up the database schema to store the necessary information.
