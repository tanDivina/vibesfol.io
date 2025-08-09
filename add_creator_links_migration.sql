-- Add Medium and Gumroad URL columns to the profiles table
ALTER TABLE profiles
ADD COLUMN medium_url TEXT,
ADD COLUMN gumroad_url TEXT;

-- Add some sample data for the new columns for our demo user
UPDATE profiles
SET 
  medium_url = 'https://medium.com/@johndoe',
  gumroad_url = 'https://johndoe.gumroad.com'
WHERE username = 'demo';
