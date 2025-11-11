/*
  # Document Leaked Password Protection Requirement

  1. Security Enhancement
    - Enable HaveIBeenPwned password leak detection
    - Prevent users from using compromised passwords

  ## Implementation Required
  
  Leaked Password Protection must be enabled in the Supabase Dashboard:
  
  1. Navigate to: Authentication > Providers > Email
  2. Scroll to "Security and protection" section  
  3. Enable "Leaked Password Protection"
  4. Click "Save"
  
  This feature checks passwords against the HaveIBeenPwned database during:
  - User signup (auth.signUp)
  - Password changes (auth.updateUser)
  - Password resets
  
  ## Benefits
  - Prevents use of compromised passwords from known data breaches
  - Enhances overall account security
  - No additional code changes required in the application
  - Privacy-preserving (uses k-anonymity model)

  ## Notes
  - This cannot be enabled via SQL migration
  - Must be configured through Supabase Dashboard
  - Feature is available on all Supabase plans
  - Once enabled, affects all new signups and password changes
*/

-- Create a table to track security configurations as documentation
CREATE TABLE IF NOT EXISTS public.security_config_docs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  feature text NOT NULL,
  status text NOT NULL,
  configuration_location text NOT NULL,
  notes text,
  updated_at timestamptz DEFAULT now()
);

-- Document the leaked password protection requirement
INSERT INTO public.security_config_docs (feature, status, configuration_location, notes)
VALUES (
  'Leaked Password Protection',
  'MANUAL_CONFIGURATION_REQUIRED',
  'Supabase Dashboard > Authentication > Providers > Email > Security and protection',
  'Enable HaveIBeenPwned password leak detection to prevent users from using compromised passwords. This is a dashboard-only setting and cannot be enabled via SQL.'
)
ON CONFLICT DO NOTHING;

-- Enable RLS on the documentation table
ALTER TABLE public.security_config_docs ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can view security configuration docs
CREATE POLICY "Authenticated users can view security docs"
  ON public.security_config_docs
  FOR SELECT
  TO authenticated
  USING (true);
