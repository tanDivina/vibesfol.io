-- Gamification System Migration
-- This adds achievements, portfolio scores, and leaderboard functionality

-- Achievements table to store available achievements
CREATE TABLE IF NOT EXISTS achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'portfolio', 'projects', 'social', 'engagement'
    points INTEGER NOT NULL DEFAULT 0,
    requirement_type VARCHAR(50) NOT NULL, -- 'count', 'boolean', 'streak'
    requirement_value INTEGER, -- threshold for count-based achievements
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User achievements - tracks which achievements users have earned
CREATE TABLE IF NOT EXISTS user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    progress INTEGER DEFAULT 0, -- for tracking progress towards achievement
    UNIQUE(user_id, achievement_id)
);

-- Portfolio scores - calculated scores for gamification
CREATE TABLE IF NOT EXISTS portfolio_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    total_score INTEGER NOT NULL DEFAULT 0,
    completion_percentage INTEGER NOT NULL DEFAULT 0,
    projects_score INTEGER NOT NULL DEFAULT 0,
    profile_score INTEGER NOT NULL DEFAULT 0,
    social_score INTEGER NOT NULL DEFAULT 0,
    engagement_score INTEGER NOT NULL DEFAULT 0,
    achievement_points INTEGER NOT NULL DEFAULT 0,
    last_calculated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Activity streaks for tracking user engagement
CREATE TABLE IF NOT EXISTS user_streaks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    streak_type VARCHAR(50) NOT NULL, -- 'login', 'update', 'project_add'
    current_streak INTEGER NOT NULL DEFAULT 0,
    longest_streak INTEGER NOT NULL DEFAULT 0,
    last_activity_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, streak_type)
);

-- Leaderboard entries for monthly/weekly rankings
CREATE TABLE IF NOT EXISTS leaderboard_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    period_type VARCHAR(20) NOT NULL, -- 'weekly', 'monthly', 'all_time'
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    rank_position INTEGER NOT NULL,
    score INTEGER NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'overall', 'projects', 'engagement'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default achievements
INSERT INTO achievements (name, description, icon, category, points, requirement_type, requirement_value) VALUES
-- Portfolio Completion Achievements
('Welcome Aboard', 'Complete your basic profile information', '👋', 'portfolio', 10, 'boolean', 1),
('Profile Master', 'Fill out all profile sections including bio and social links', '⭐', 'portfolio', 25, 'boolean', 1),
('Portfolio Complete', 'Achieve 100% portfolio completion', '🏆', 'portfolio', 50, 'boolean', 1),

-- Project Achievements
('First Steps', 'Add your first project to your portfolio', '🚀', 'projects', 15, 'count', 1),
('Getting Started', 'Add 3 projects to your portfolio', '📈', 'projects', 30, 'count', 3),
('Project Pro', 'Add 5 projects to your portfolio', '💼', 'projects', 50, 'count', 5),
('Portfolio Powerhouse', 'Add 10 projects to your portfolio', '🔥', 'projects', 100, 'count', 10),
('Tech Explorer', 'Use 5 different technologies across your projects', '🔧', 'projects', 40, 'count', 5),
('Full Stack', 'Use 10 different technologies across your projects', '⚡', 'projects', 75, 'count', 10),

-- Social Proof Achievements
('First Impression', 'Receive your first testimonial', '💬', 'social', 20, 'count', 1),
('Social Proof', 'Collect 5 testimonials', '🌟', 'social', 50, 'count', 5),
('Testimonial Champion', 'Collect 10 testimonials', '👑', 'social', 100, 'count', 10),
('Hackathon Hero', 'Add your first hackathon certificate', '🏅', 'social', 25, 'count', 1),
('Competition King', 'Add 5 hackathon certificates', '🏆', 'social', 75, 'count', 5),

-- Engagement Achievements
('Active Developer', 'Log in for 7 consecutive days', '📅', 'engagement', 30, 'streak', 7),
('Dedicated Builder', 'Log in for 30 consecutive days', '🔥', 'engagement', 100, 'streak', 30),
('Portfolio Perfectionist', 'Update your portfolio 5 times in a month', '✨', 'engagement', 40, 'count', 5),
('Trendsetter', 'Be among the first 100 users to join', '🌟', 'engagement', 200, 'boolean', 1),

-- Special Achievements
('Screenshot Master', 'Generate 10 project screenshots', '📸', 'projects', 35, 'count', 10),
('Client Connector', 'Create your first client portal', '🤝', 'projects', 60, 'count', 1),
('Analytics Enthusiast', 'Check your portfolio analytics 10 times', '📊', 'engagement', 25, 'count', 10);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_scores_user_id ON portfolio_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_user_streaks_user_id ON user_streaks(user_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_entries_period ON leaderboard_entries(period_type, period_start, period_end);
CREATE INDEX IF NOT EXISTS idx_leaderboard_entries_rank ON leaderboard_entries(rank_position);

-- Enable RLS (Row Level Security)
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_entries ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Achievements are public (everyone can see available achievements)
CREATE POLICY "Achievements are viewable by everyone" ON achievements FOR SELECT USING (true);

-- Users can only see their own achievements and scores
CREATE POLICY "Users can view their own achievements" ON user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own achievements" ON user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own scores" ON portfolio_scores FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own scores" ON portfolio_scores FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own streaks" ON user_streaks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own streaks" ON user_streaks FOR ALL USING (auth.uid() = user_id);

-- Leaderboards are public (everyone can see rankings)
CREATE POLICY "Leaderboards are viewable by everyone" ON leaderboard_entries FOR SELECT USING (true);
CREATE POLICY "System can manage leaderboard entries" ON leaderboard_entries FOR ALL USING (true);
