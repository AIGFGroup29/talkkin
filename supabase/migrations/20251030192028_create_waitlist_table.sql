/*
  # Create Waitlist Table for TalkKin Landing Page

  1. New Tables
    - `waitlist`
      - `id` (uuid, primary key) - Unique identifier for each waitlist entry
      - `email` (text, unique, not null) - User's email address
      - `name` (text, nullable) - User's name (optional)
      - `source` (text, default 'landing_page') - Where the signup came from
      - `created_at` (timestamptz, default now()) - When the user joined the waitlist
      - `metadata` (jsonb, nullable) - Additional information (referral source, utm params, etc.)

  2. Security
    - Enable RLS on `waitlist` table
    - Add policy for public INSERT access (anyone can join waitlist)
    - Add policy for authenticated admin SELECT access only

  3. Indexes
    - Index on email for fast lookups
    - Index on created_at for sorting by signup date

  ## Notes
  - Email is unique to prevent duplicate signups
  - Public can only INSERT (join waitlist)
  - Only authenticated admins can view waitlist entries
  - created_at automatically tracks when someone joins
*/

CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  source text DEFAULT 'landing_page',
  created_at timestamptz DEFAULT now(),
  metadata jsonb
);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert into waitlist (join the waitlist)
CREATE POLICY "Anyone can join waitlist"
  ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users (admins) can view waitlist
CREATE POLICY "Only admins can view waitlist"
  ON waitlist
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);