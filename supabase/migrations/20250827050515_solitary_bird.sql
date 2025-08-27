/*
  # Initial Database Schema Setup

  1. New Tables
    - `profiles` - User profile information with social links and portfolio settings
    - `stripe_customers` - Stripe customer ID mapping for billing
    - `contact_requests` - Contact form submissions from marketing site

  2. Security
    - Enable RLS on all tables
    - Add policies for user data access control
    - Set up storage policies for avatar uploads

  3. Triggers
    - Auto-create profile when user signs up
    - Handle user metadata from auth providers

  4. Storage
    - Create avatars bucket for profile pictures
    - Set up public access policies
*/

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  full_name text,
  company_name text,
  avatar_url text,
  website text,
  unsubscribed boolean NOT NULL DEFAULT false,
  planId text,
  whatsapp_number text,
  medium_url text,
  gumroad_url text,
  substack_url text,
  amazon_gear_list_url text,
  username text,
  bio text,
  github_url text,
  linkedin_url text,
  twitter_url text,
  instagram_url text,
  portfolio_theme text DEFAULT 'modern',
  youtube_url text,
  availability text,
  location text,
  is_featured boolean DEFAULT false,
  contact_form_enabled boolean DEFAULT true,
  contact_form_title text DEFAULT 'Get In Touch',
  contact_form_description text DEFAULT 'I''d love to hear from you! Send me a message and I''ll get back to you as soon as possible.',
  contact_email_notifications boolean DEFAULT true,
  seo_title text,
  seo_description text,
  seo_image_url text,
  seo_keywords text,
  custom_domain text,
  custom_domain_verified boolean DEFAULT false,
  custom_domain_verification_token text,
  analytics_enabled boolean DEFAULT true
);

-- Add unique constraint on username if it doesn't exist
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

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'Profiles are viewable by self'
  ) THEN
    CREATE POLICY "Profiles are viewable by self" ON profiles
      FOR SELECT USING (auth.uid() = id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'Users can insert their own profile'
  ) THEN
    CREATE POLICY "Users can insert their own profile" ON profiles
      FOR INSERT WITH CHECK (auth.uid() = id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'Users can update own profile'
  ) THEN
    CREATE POLICY "Users can update own profile" ON profiles
      FOR UPDATE USING (auth.uid() = id);
  END IF;
END $$;

-- Create indexes for profiles if they don't exist
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_availability ON profiles(availability);
CREATE INDEX IF NOT EXISTS idx_profiles_is_featured ON profiles(is_featured);
CREATE INDEX IF NOT EXISTS idx_profiles_custom_domain ON profiles(custom_domain);

-- Create stripe_customers table if it doesn't exist
CREATE TABLE IF NOT EXISTS stripe_customers (
  user_id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  stripe_customer_id text unique
);

-- Enable RLS on stripe_customers
ALTER TABLE stripe_customers ENABLE ROW LEVEL SECURITY;

-- Create contact_requests table if it doesn't exist
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

-- Create projects table if it doesn't exist
CREATE TABLE IF NOT EXISTS projects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  url text,
  description text,
  screenshot_url text,
  status text not null default 'LIVE' check (status in ('LIVE', 'IN PROGRESS', 'DEMO')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create technologies table if it doesn't exist
CREATE TABLE IF NOT EXISTS technologies (
  id uuid default gen_random_uuid() primary key,
  name text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on technologies
ALTER TABLE technologies ENABLE ROW LEVEL SECURITY;

-- Create project_technologies join table if it doesn't exist
CREATE TABLE IF NOT EXISTS project_technologies (
  project_id uuid references projects on delete cascade not null,
  technology_id uuid references technologies on delete cascade not null,
  primary key (project_id, technology_id)
);

-- Enable RLS on project_technologies
ALTER TABLE project_technologies ENABLE ROW LEVEL SECURITY;

-- Create handle_new_user function if it doesn't exist
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
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
  END IF;
END $$;

-- Create storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name)
VALUES ('avatars', 'avatars')
ON CONFLICT (id) DO NOTHING;

-- Create storage policies if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND schemaname = 'storage'
    AND policyname = 'Avatar images are publicly accessible.'
  ) THEN
    CREATE POLICY "Avatar images are publicly accessible." ON storage.objects
      FOR SELECT USING (bucket_id = 'avatars');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND schemaname = 'storage'
    AND policyname = 'Anyone can upload an avatar.'
  ) THEN
    CREATE POLICY "Anyone can upload an avatar." ON storage.objects
      FOR INSERT WITH CHECK (bucket_id = 'avatars');
  END IF;
END $$;

-- Insert initial technologies if they don't exist
INSERT INTO technologies (name) VALUES
  ('React'), ('Next.js'), ('Svelte'), ('SvelteKit'), ('TypeScript'), ('JavaScript'),
  ('Tailwind CSS'), ('CSS'), ('HTML'), ('Node.js'), ('Express'), ('PostgreSQL'),
  ('Supabase'), ('Firebase'), ('Vercel'), ('Netlify'), ('AWS'), ('Docker'),
  ('Kubernetes'), ('GraphQL'), ('REST API'), ('MongoDB'), ('MySQL'), ('SQLite'),
  ('Redis'), ('Jest'), ('Cypress'), ('Playwright'), ('Vitest'),
  ('ESLint'), ('Prettier'), ('Git'), ('GitHub'), ('GitLab'), ('Bitbucket'),
  ('Figma'), ('Adobe XD'), ('Sketch'), ('InVision'), ('Trello'), ('Asana'),
  ('Jira'), ('Slack'), ('Discord'), ('Notion'), ('Linear'), ('Postman'),
  ('Insomnia'), ('VS Code'), ('WebStorm'), ('IntelliJ'), ('Sublime Text'),
  ('Vim'), ('Emacs'), ('Linux'), ('macOS'), ('Windows'), ('Vue.js'), ('Angular'),
  ('Python'), ('Django'), ('Flask'), ('Express.js'), ('Socket.io'), ('Stripe')
ON CONFLICT (name) DO NOTHING;