/*
  # Initial Database Schema Setup

  1. New Tables
    - `profiles` - User profile information with basic fields
    - `stripe_customers` - Stripe customer ID mapping for billing
    - `contact_requests` - Contact form submissions from marketing site

  2. Security
    - Enable RLS on all tables
    - Add policies for user data access
    - Set up storage policies for avatar uploads

  3. Triggers
    - Auto-create profile when user signs up

  4. Storage
    - Create avatars bucket for profile pictures
*/

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  full_name text,
  company_name text,
  avatar_url text,
  website text
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles (using DO blocks to handle existing policies)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' AND policyname = 'Profiles are viewable by self.'
  ) THEN
    CREATE POLICY "Profiles are viewable by self." ON profiles
      FOR SELECT USING (auth.uid() = id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' AND policyname = 'Users can insert their own profile.'
  ) THEN
    CREATE POLICY "Users can insert their own profile." ON profiles
      FOR INSERT WITH CHECK (auth.uid() = id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' AND policyname = 'Users can update own profile.'
  ) THEN
    CREATE POLICY "Users can update own profile." ON profiles
      FOR UPDATE USING (auth.uid() = id);
  END IF;
END $$;

-- Create Stripe customers table if it doesn't exist
CREATE TABLE IF NOT EXISTS stripe_customers (
  user_id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  stripe_customer_id text unique
);

-- Enable RLS on stripe_customers
ALTER TABLE stripe_customers ENABLE ROW LEVEL SECURITY;

-- Create contact requests table if it doesn't exist
CREATE TABLE IF NOT EXISTS contact_requests (
  id uuid primary key default gen_random_uuid(),
  updated_at timestamp with time zone,
  first_name text,
  last_name text,
  email text,
  phone text,
  company_name text,
  message_body text
);

-- Enable RLS on contact_requests
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- Create the trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
  END IF;
END $$;

-- Create storage bucket if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'avatars'
  ) THEN
    INSERT INTO storage.buckets (id, name) VALUES ('avatars', 'avatars');
  END IF;
END $$;

-- Create storage policies if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' AND policyname = 'Avatar images are publicly accessible.'
  ) THEN
    CREATE POLICY "Avatar images are publicly accessible." ON storage.objects
      FOR SELECT USING (bucket_id = 'avatars');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' AND policyname = 'Anyone can upload an avatar.'
  ) THEN
    CREATE POLICY "Anyone can upload an avatar." ON storage.objects
      FOR INSERT WITH CHECK (bucket_id = 'avatars');
  END IF;
END $$;