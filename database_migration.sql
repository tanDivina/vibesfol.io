-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  full_name text,
  company_name text,
  avatar_url text,
  website text,
  unsubscribed boolean NOT NULL DEFAULT false,
  planId text
);
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles
  enable row level security;

create policy "Profiles are viewable by self." on profiles
  for select using (auth.uid() = id);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Create Stripe Customer Table
-- One stripe customer per user (PK enforced)
-- Limit RLS policies -- mostly only server side access
create table stripe_customers (
  user_id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  stripe_customer_id text unique
);
alter table stripe_customers enable row level security;

-- Create a table for "Contact Us" form submissions
-- Limit RLS policies -- only server side access
create table contact_requests (
  id uuid primary key default gen_random_uuid(),
  updated_at timestamp with time zone,
  first_name text,
  last_name text,
  email text,
  phone text,
  company_name text,
  message_body text
);
alter table contact_requests enable row level security;

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Set up Storage!
insert into storage.buckets (id, name)
  values ('avatars', 'avatars');

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage#policy-examples for more details.
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');

-- Create Projects Table
create table projects (
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
alter table projects enable row level security;

-- Create Technologies Table
create table technologies (
  id uuid default gen_random_uuid() primary key,
  name text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table technologies enable row level security;

-- Create Project_Technologies Join Table
create table project_technologies (
  project_id uuid references projects on delete cascade not null,
  technology_id uuid references technologies on delete cascade not null,
  primary key (project_id, technology_id)
);
alter table project_technologies enable row level security;

-- Insert initial technologies
insert into technologies (name) values
  ('React'), ('Next.js'), ('Svelte'), ('SvelteKit'), ('TypeScript'), ('JavaScript'),
  ('Tailwind CSS'), ('CSS'), ('HTML'), ('Node.js'), ('Express'), ('PostgreSQL'),
  ('Supabase'), ('Firebase'), ('Vercel'), ('Netlify'), ('AWS'), ('Docker'),
  ('Kubernetes'), ('GraphQL'), ('REST API'), ('MongoDB'), ('MySQL'), ('SQLite'),
  ('Redis'), ('GraphQL'), ('Jest'), ('Cypress'), ('Playwright'), ('Vitest'),
  ('ESLint'), ('Prettier'), ('Git'), ('GitHub'), ('GitLab'), ('Bitbucket'),
  ('Figma'), ('Adobe XD'), ('Sketch'), ('InVision'), ('Trello'), ('Asana'),
  ('Jira'), ('Slack'), ('Discord'), ('Notion'), ('Linear'), ('Postman'),
  ('Insomnia'), ('VS Code'), ('WebStorm'), ('IntelliJ'), ('Sublime Text'),
  ('Vim'), ('Emacs'), ('Linux'), ('macOS'), ('Windows');
