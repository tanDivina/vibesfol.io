-- Add WhatsApp field to profiles table
ALTER TABLE profiles ADD COLUMN whatsapp_number TEXT;

-- Add comment for documentation
COMMENT ON COLUMN profiles.whatsapp_number IS 'WhatsApp phone number for contact';
