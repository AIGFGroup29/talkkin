import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface WaitlistEntry {
  email: string;
  name?: string;
  source?: string;
}

export const joinWaitlist = async (entry: WaitlistEntry) => {
  const { error } = await supabase
    .from('waitlist')
    .insert([
      {
        email: entry.email,
        name: entry.name,
        source: entry.source || 'landing_page',
      },
    ]);

  if (error) {
    if (error.code === '23505') {
      throw new Error('This email is already on our waitlist!');
    }
    throw new Error(error.message || 'Failed to join waitlist. Please try again.');
  }

  return true;
};
