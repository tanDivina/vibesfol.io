-- Add Substack and Amazon Gear List URL columns to the profiles table
ALTER TABLE profiles
ADD COLUMN substack_url TEXT,
ADD COLUMN amazon_gear_list_url TEXT;

-- Add some sample data for the new columns for our demo user
UPDATE profiles
SET 
  substack_url = 'https://johndoe.substack.com',
  amazon_gear_list_url = 'https://www.amazon.com/shop/johndoe'
WHERE username = 'demo';
