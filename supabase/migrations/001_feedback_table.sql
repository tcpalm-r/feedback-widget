-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    app_id TEXT NOT NULL,
    type TEXT,
    message TEXT NOT NULL,
    elements JSONB,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- RLS policy: Allow public INSERT (anyone can submit feedback)
CREATE POLICY "Allow public insert" ON feedback
    FOR INSERT
    TO public
    WITH CHECK (true);

-- RLS policy: Allow authenticated SELECT (only authenticated users can view feedback)
CREATE POLICY "Allow authenticated select" ON feedback
    FOR SELECT
    TO authenticated
    USING (true);

-- Create index on app_id for faster queries
CREATE INDEX IF NOT EXISTS idx_feedback_app_id ON feedback(app_id);

-- Create index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at DESC);
