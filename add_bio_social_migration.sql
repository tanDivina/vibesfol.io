-- Add bio and social links to profiles table
ALTER TABLE profiles 
ADD COLUMN bio TEXT,
ADD COLUMN github_url TEXT,
ADD COLUMN linkedin_url TEXT,
ADD COLUMN twitter_url TEXT,
ADD COLUMN username TEXT UNIQUE,
ADD COLUMN portfolio_theme TEXT DEFAULT 'modern';

-- Create index on username for faster lookups
CREATE INDEX idx_profiles_username ON profiles(username);
