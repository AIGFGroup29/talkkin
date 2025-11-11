/*
  # Remove Unused Indexes from Waitlist Table

  1. Changes
    - Drop `idx_waitlist_email` index (unused, email already has unique constraint)
    - Drop `idx_waitlist_created_at` index (unused, table has minimal queries)

  ## Notes
  - The email column already has a unique constraint which creates its own index
  - These indexes were not being utilized based on query patterns
  - Removing unused indexes improves write performance and reduces storage
*/

-- Drop unused indexes
DROP INDEX IF EXISTS idx_waitlist_email;
DROP INDEX IF EXISTS idx_waitlist_created_at;
