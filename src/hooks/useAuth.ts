import { useState, useEffect } from 'react';
import { 
  signIn, 
  signOut, 
  getCurrentUser, 
  onAuthStateChange,
  isAuthenticated as checkAuth,
  signInWithProvider 
} from '../utils/supabase/client';
import { authAPI } from '../utils/api';

interface User {
  id: string;
  email: string;
  name?: string;
  userType: 'customer' | 'foreman';
  profile?: any;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check current session on mount
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          // Get full user profile
          const profile = await authAPI.getProfile();
          setUser(profile);
        }
      } catch (err) {
        console.error('Error loading user:', err);
        setError(err instanceof Error ? err.message : 'Failed to load user');
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    // Subscribe to auth changes
    const unsubscribe = onAuthStateChange(async (session) => {
      if (session?.user) {
        try {
          const profile = await authAPI.getProfile();
          setUser(profile);
        } catch (err) {
          console.error('Error loading profile on auth change:', err);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      await signIn(email, password);
      // User will be updated by onAuthStateChange
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithProvider = async (provider: 'google' | 'github' | 'facebook') => {
    try {
      setError(null);
      setLoading(true);
      await signInWithProvider(provider);
      // User will be updated after redirect
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to sign in with ${provider}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign out');
      throw err;
    }
  };

  const isAuthenticated = async () => {
    return await checkAuth();
  };

  return {
    user,
    loading,
    error,
    login,
    loginWithProvider,
    logout,
    isAuthenticated,
  };
}