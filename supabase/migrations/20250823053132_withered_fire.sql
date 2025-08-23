/*
  # Fix missing username column in profiles table

  1. Database Schema Fix
    - Add missing `username` column to `profiles` table
    - Add unique constraint for usernames
    - Create index for faster username lookups

  2. Data Migration
    - Update existing profiles with sample usernames where missing
*/

-- Add username column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'username'
  ) THEN
    ALTER TABLE profiles ADD COLUMN username TEXT UNIQUE;
  END IF;
END $$;

-- Create index on username for faster lookups if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);

-- Update any existing profiles without usernames to have a default username
UPDATE profiles 
SET username = LOWER(REPLACE(full_name, ' ', '')) || '_' || SUBSTRING(id::text, 1, 8)
WHERE username IS NULL AND full_name IS NOT NULL;

-- For profiles without full_name, use a generic username
UPDATE profiles 
SET username = 'user_' || SUBSTRING(id::text, 1, 8)
WHERE username IS NULL;