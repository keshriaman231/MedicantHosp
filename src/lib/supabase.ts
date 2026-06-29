/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient } from '@supabase/supabase-js';

// Retrieve environment variables in Vite
const metaEnv = (import.meta as any).env || {};
const supabaseUrl = metaEnv.VITE_SUPABASE_URL;
const supabaseAnonKey = metaEnv.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'YOUR_SUPABASE_URL');

// Setup real client if configured
let realSupabase: any = null;
if (isSupabaseConfigured) {
  try {
    realSupabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
  }
}

// Simulated local fallback client using LocalStorage for smooth offline testing
const mockAuthListeners: Array<(event: string, session: any) => void> = [];

const triggerAuthChange = (event: string, session: any) => {
  mockAuthListeners.forEach(cb => cb(event, session));
};

const getMockUser = () => {
  const userJson = localStorage.getItem('medicant_mock_user');
  return userJson ? JSON.parse(userJson) : null;
};

const mockSupabase = {
  auth: {
    signUp: async ({ email, password, options }: { email: string; password?: string; options?: any }) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const users = JSON.parse(localStorage.getItem('medicant_mock_users_db') || '[]');
      if (users.some((u: any) => u.email === email)) {
        return { data: { user: null }, error: { message: 'User already exists.' } };
      }

      const newUser = {
        id: 'mock-usr-' + Math.random().toString(36).substring(2, 11),
        email,
        created_at: new Date().toISOString(),
        user_metadata: options?.data || {}
      };

      users.push({ ...newUser, password });
      localStorage.setItem('medicant_mock_users_db', JSON.stringify(users));

      // Auto sign in on sign up for simplicity
      localStorage.setItem('medicant_mock_user', JSON.stringify(newUser));
      triggerAuthChange('SIGNED_IN', { user: newUser });

      return { data: { user: newUser, session: { user: newUser } }, error: null };
    },

    signInWithPassword: async ({ email, password }: { email: string; password?: string }) => {
      await new Promise(resolve => setTimeout(resolve, 800));

      const users = JSON.parse(localStorage.getItem('medicant_mock_users_db') || '[]');
      // Default credentials fallback for Ramesh Mahto
      if (email === 'ramesh.mahto@gmail.com' && !users.some((u: any) => u.email === email)) {
        const defaultUser = {
          id: 'MHR-2025-1082',
          email: 'ramesh.mahto@gmail.com',
          created_at: new Date().toISOString(),
          user_metadata: { name: 'Shri Ramesh Mahto', phone: '+91 99340 10245' }
        };
        users.push({ ...defaultUser, password: 'password' });
        localStorage.setItem('medicant_mock_users_db', JSON.stringify(users));
      }

      const matchedUser = users.find((u: any) => u.email === email && (!password || u.password === password));
      if (!matchedUser) {
        return { data: { user: null, session: null }, error: { message: 'Invalid login credentials.' } };
      }

      const { password: _, ...userWithoutPassword } = matchedUser;
      localStorage.setItem('medicant_mock_user', JSON.stringify(userWithoutPassword));
      triggerAuthChange('SIGNED_IN', { user: userWithoutPassword });

      return { data: { user: userWithoutPassword, session: { user: userWithoutPassword } }, error: null };
    },

    signOut: async () => {
      localStorage.removeItem('medicant_mock_user');
      triggerAuthChange('SIGNED_OUT', null);
      return { error: null };
    },

    getUser: async () => {
      const u = getMockUser();
      return { data: { user: u }, error: null };
    },

    getSession: async () => {
      const u = getMockUser();
      return { data: { session: u ? { user: u } : null }, error: null };
    },

    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      mockAuthListeners.push(callback);
      const u = getMockUser();
      // Initial trigger
      setTimeout(() => {
        callback(u ? 'SIGNED_IN' : 'INITIAL_SESSION', u ? { user: u } : null);
      }, 0);
      return {
        data: {
          subscription: {
            unsubscribe: () => {
              const index = mockAuthListeners.indexOf(callback);
              if (index !== -1) mockAuthListeners.splice(index, 1);
            }
          }
        }
      };
    },

    resetPasswordForEmail: async (email: string, options?: { redirectTo?: string }) => {
      await new Promise(resolve => setTimeout(resolve, 800));
      const users = JSON.parse(localStorage.getItem('medicant_mock_users_db') || '[]');
      const userExists = users.some((u: any) => u.email === email) || email === 'ramesh.mahto@gmail.com';
      if (!userExists) {
        return { data: null, error: { message: 'User with this email address was not found in our medical registry.' } };
      }
      return { data: {}, error: null };
    },

    updateUser: async (attributes: { password?: string; data?: any }) => {
      await new Promise(resolve => setTimeout(resolve, 800));
      const currentUser = getMockUser();
      if (!currentUser) {
        return { data: { user: null }, error: { message: "Auth session missing. Please verify link integrity." } };
      }
      const users = JSON.parse(localStorage.getItem('medicant_mock_users_db') || '[]');
      const userIndex = users.findIndex((u: any) => u.email === currentUser.email);
      if (userIndex !== -1) {
        if (attributes.password) {
          users[userIndex].password = attributes.password;
        }
        if (attributes.data) {
          users[userIndex].user_metadata = { ...users[userIndex].user_metadata, ...attributes.data };
        }
        localStorage.setItem('medicant_mock_users_db', JSON.stringify(users));
        const { password: _, ...userWithoutPassword } = users[userIndex];
        localStorage.setItem('medicant_mock_user', JSON.stringify(userWithoutPassword));
        triggerAuthChange('USER_UPDATED', { user: userWithoutPassword });
        return { data: { user: userWithoutPassword }, error: null };
      }
      return { data: { user: null }, error: { message: "User account could not be located in database." } };
    }
  },

  from: (table: string) => {
    return {
      insert: async (rows: any[]) => {
        await new Promise(resolve => setTimeout(resolve, 600));
        const dbKey = `medicant_mock_table_${table}`;
        const currentData = JSON.parse(localStorage.getItem(dbKey) || '[]');
        
        const newRows = rows.map(r => ({
          id: 'mock-id-' + Math.random().toString(36).substring(2, 11),
          created_at: new Date().toISOString(),
          ...r
        }));

        localStorage.setItem(dbKey, JSON.stringify([...currentData, ...newRows]));
        return { data: newRows, error: null };
      },

      select: (columns: string = '*') => {
        const dbKey = `medicant_mock_table_${table}`;
        let data = JSON.parse(localStorage.getItem(dbKey) || '[]');

        // Quick chaining implementation
        const chain = {
          data,
          error: null,
          eq: function(column: string, value: any) {
            this.data = this.data.filter((row: any) => row[column] === value);
            return this;
          },
          order: function(column: string, { ascending = true } = {}) {
            this.data = [...this.data].sort((a: any, b: any) => {
              if (a[column] < b[column]) return ascending ? -1 : 1;
              if (a[column] > b[column]) return ascending ? 1 : -1;
              return 0;
            });
            return this;
          },
          then: function(onfulfilled: any) {
            return Promise.resolve({ data: this.data, error: this.error }).then(onfulfilled);
          }
        };
        return chain;
      }
    };
  }
};

// Export active client: real if keys exist, fallback if they don't
export const supabase = isSupabaseConfigured ? realSupabase : (mockSupabase as any);
