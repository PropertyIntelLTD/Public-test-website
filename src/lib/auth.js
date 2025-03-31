
import { supabase } from '@/lib/supabase';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      session: null,
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, session: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export const initAuth = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    useAuthStore.getState().setSession(session);
    useAuthStore.getState().setUser(session.user);
  }

  supabase.auth.onAuthStateChange((_event, session) => {
    useAuthStore.getState().setSession(session);
    useAuthStore.getState().setUser(session?.user ?? null);
  });
};

export const signInWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signUpWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const useAuth = () => {
  const { user, session, signOut } = useAuthStore();
  return { user, session, signOut };
};
