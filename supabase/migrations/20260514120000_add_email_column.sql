-- Add email column to feedback table for apps that collect email instead of initials
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS email TEXT;
