-- Insert a sample user into the profiles table
INSERT INTO profiles (id, username, full_name, website, plan_id, created_at, updated_at)
VALUES (
  'demo-user-123',
  'johndoe',
  'John Doe',
  'https://johndoe.dev',
  'free',
  NOW(),
  NOW()
);

-- Insert sample projects
INSERT INTO projects (id, user_id, title, description, url, screenshot_url, status, created_at, updated_at)
VALUES 
(
  'project-1',
  'demo-user-123',
  'E-commerce Platform',
  'A full-stack e-commerce platform built with modern technologies. Features include user authentication, payment processing, and admin dashboard.',
  'https://mystore.example.com',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
  'LIVE',
  NOW(),
  NOW()
),
(
  'project-2',
  'demo-user-123',
  'Task Management App',
  'A collaborative task management application with real-time updates, team collaboration features, and project tracking.',
  'https://taskapp.example.com',
  'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
  'LIVE',
  NOW(),
  NOW()
),
(
  'project-3',
  'demo-user-123',
  'Weather Dashboard',
  'A beautiful weather dashboard showing current conditions, forecasts, and weather maps with a clean, responsive design.',
  'https://weather.example.com',
  'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop',
  'IN PROGRESS',
  NOW(),
  NOW()
);

-- Insert project technologies relationships
INSERT INTO project_technologies (project_id, technology_id)
VALUES 
-- E-commerce Platform technologies
('project-1', (SELECT id FROM technologies WHERE name = 'React' LIMIT 1)),
('project-1', (SELECT id FROM technologies WHERE name = 'Node.js' LIMIT 1)),
('project-1', (SELECT id FROM technologies WHERE name = 'PostgreSQL' LIMIT 1)),
('project-1', (SELECT id FROM technologies WHERE name = 'Stripe' LIMIT 1)),

-- Task Management App technologies
('project-2', (SELECT id FROM technologies WHERE name = 'Vue.js' LIMIT 1)),
('project-2', (SELECT id FROM technologies WHERE name = 'Express.js' LIMIT 1)),
('project-2', (SELECT id FROM technologies WHERE name = 'MongoDB' LIMIT 1)),
('project-2', (SELECT id FROM technologies WHERE name = 'Socket.io' LIMIT 1)),

-- Weather Dashboard technologies
('project-3', (SELECT id FROM technologies WHERE name = 'Next.js' LIMIT 1)),
('project-3', (SELECT id FROM technologies WHERE name = 'TypeScript' LIMIT 1)),
('project-3', (SELECT id FROM technologies WHERE name = 'Tailwind CSS' LIMIT 1));
