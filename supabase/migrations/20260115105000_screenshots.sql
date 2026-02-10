-- Create storage bucket for feedback screenshots
INSERT INTO storage.buckets (id, name, public)
VALUES ('feedback-screenshots', 'feedback-screenshots', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policy: Allow public uploads to the feedback-screenshots bucket
CREATE POLICY "Allow public uploads" ON storage.objects
    FOR INSERT
    TO public
    WITH CHECK (bucket_id = 'feedback-screenshots');

-- RLS policy: Allow public read access to screenshots
CREATE POLICY "Allow public read" ON storage.objects
    FOR SELECT
    TO public
    USING (bucket_id = 'feedback-screenshots');

-- RLS policy: Allow authenticated users to delete screenshots
CREATE POLICY "Allow authenticated delete" ON storage.objects
    FOR DELETE
    TO authenticated
    USING (bucket_id = 'feedback-screenshots');
