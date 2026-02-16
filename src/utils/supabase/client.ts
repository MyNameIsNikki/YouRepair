import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

const supabaseUrl = `https://${projectId}.supabase.co`;

// Create a singleton Supabase client
export const supabase = createClient(supabaseUrl, publicAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// ============================================
// AUTH HELPERS
// ============================================

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Sign in error:', error);
    throw new Error(error.message);
  }

  // Store access token for API calls
  if (data.session?.access_token) {
    localStorage.setItem('access_token', data.session.access_token);
  }

  return data;
}

/**
 * Sign out current user
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Sign out error:', error);
    throw new Error(error.message);
  }

  // Clear stored access token
  localStorage.removeItem('access_token');
}

/**
 * Get current session
 */
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Get session error:', error);
    return null;
  }

  // Update stored access token if session exists
  if (data.session?.access_token) {
    localStorage.setItem('access_token', data.session.access_token);
  }

  return data.session;
}

/**
 * Get current user
 */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user || null;
}

/**
 * Sign in with OAuth provider (Google, Github, etc.)
 * Note: Provider must be configured in Supabase Dashboard
 * See: https://supabase.com/docs/guides/auth/social-login
 */
export async function signInWithProvider(provider: 'google' | 'github' | 'facebook') {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: window.location.origin,
    },
  });

  if (error) {
    console.error(`Sign in with ${provider} error:`, error);
    throw new Error(error.message);
  }

  return data;
}

/**
 * Listen to auth state changes
 */
export function onAuthStateChange(callback: (session: any) => void) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      // Update stored access token
      if (session?.access_token) {
        localStorage.setItem('access_token', session.access_token);
      } else {
        localStorage.removeItem('access_token');
      }
      
      callback(session);
    }
  );

  // Return unsubscribe function
  return () => {
    subscription.unsubscribe();
  };
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated() {
  const session = await getSession();
  return !!session;
}

/**
 * Reset password for email
 */
export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) {
    console.error('Reset password error:', error);
    throw new Error(error.message);
  }
}

/**
 * Update password for authenticated user
 */
export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.error('Update password error:', error);
    throw new Error(error.message);
  }
}
