/*
  # Add bio column to profiles table

  1. Schema Changes
    - Add `bio` column to `profiles` table (TEXT type)
    - This column will store user biography/description text

  2. Notes
    - Column is nullable to allow gradual migration
    - No default value to avoid unnecessary data
*/

-- Add bio column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio TEXT;