-- Add initials column to feedback table
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS initials TEXT;
