/*
  # Fix Waitlist RLS Policy

  1. Changes
    - Drop existing restrictive INSERT policy
    - Create new policy allowing public access for INSERT operations
    - This allows anyone (authenticated or not) to join the waitlist

  ## Security Note
  - The policy uses `TO public` which covers both anonymous and authenticated users
  - Only INSERT operations are allowed publicly
  - SELECT operations remain restricted to authenticated users (admins)
*/

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Anyone can join waitlist" ON waitlist;

-- Create new policy that allows public INSERT access
CREATE POLICY "Anyone can join waitlist"
  ON waitlist
  FOR INSERT
  TO public
  WITH CHECK (true);
