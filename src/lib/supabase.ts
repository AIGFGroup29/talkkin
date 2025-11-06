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

export interface SignUpData {
  firstName: string;
  email: string;
  password: string;
}

export const signUp = async ({ firstName, email, password }: SignUpData) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
      },
    },
  });

  if (error) {
    if (error.message.includes('already registered')) {
      throw new Error('This email is already registered. Please log in instead.');
    }
    throw new Error(error.message || 'Failed to create account. Please try again.');
  }

  return data;
};

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
    },
  });

  if (error) {
    throw new Error(error.message || 'Failed to sign in with Google. Please try again.');
  }

  return data;
};

export interface SignInData {
  email: string;
  password: string;
}

export const signIn = async ({ email, password }: SignInData) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      throw new Error('Invalid email or password. Please try again.');
    }
    throw new Error(error.message || 'Failed to sign in. Please try again.');
  }

  return data;
};
