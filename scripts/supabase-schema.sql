-- Users table
CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    age INTEGER,
    gender VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User profiles table
CREATE TABLE user_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    bio TEXT,
    address TEXT,
    profile_image TEXT,
    skills TEXT[],
    education TEXT,
    experience TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    portfolio_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resume analysis table
CREATE TABLE resume_analysis (
    analysis_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    analysis_summary TEXT,
    score INTEGER,
    ats_score INTEGER,
    resume_data JSONB,
    suggestions TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mock interview sessions table
CREATE TABLE mock_interviews (
    interview_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    questions_answers JSONB,
    final_score INTEGER,
    feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat history table
CREATE TABLE chat_history (
    chat_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    messages JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_resume_analysis_user_id ON resume_analysis(user_id);
CREATE INDEX idx_mock_interviews_user_id ON mock_interviews(user_id);
CREATE INDEX idx_chat_history_user_id ON chat_history(user_id);

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE mock_interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view own profile" ON user_profiles FOR ALL USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can view own analysis" ON resume_analysis FOR ALL USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can view own interviews" ON mock_interviews FOR ALL USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can view own chats" ON chat_history FOR ALL USING (auth.uid()::text = user_id::text);
