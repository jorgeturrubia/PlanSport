import { Injectable, inject } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabase.url, 
      environment.supabase.anonKey
    );
  }

  get client(): SupabaseClient {
    return this.supabase;
  }

  /**
   * Test connection to Supabase
   */
  async testConnection(): Promise<{ connected: boolean; error?: string }> {
    try {
      const { data, error } = await this.supabase
        .from('test_table')
        .select('*')
        .limit(1);
      
      if (error) {
        // If table doesn't exist, that's still a successful connection
        if (error.message.includes('does not exist')) {
          return { connected: true };
        }
        return { connected: false, error: error.message };
      }
      
      return { connected: true };
    } catch (error) {
      return { 
        connected: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Get current session
   */
  async getSession() {
    const { data: { session } } = await this.supabase.auth.getSession();
    return session;
  }

  /**
   * Get current user
   */
  async getUser() {
    const { data: { user } } = await this.supabase.auth.getUser();
    return user;
  }

  /**
   * Sign in with email and password
   */
  async signIn(email: string, password: string) {
    return await this.supabase.auth.signInWithPassword({
      email,
      password
    });
  }

  /**
   * Sign up with email and password
   */
  async signUp(email: string, password: string) {
    return await this.supabase.auth.signUp({
      email,
      password
    });
  }

  /**
   * Sign out
   */
  async signOut() {
    return await this.supabase.auth.signOut();
  }

  /**
   * Get Supabase configuration info
   */
  getConfig() {
    return {
      url: environment.supabase.url,
      hasAnonKey: !!environment.supabase.anonKey,
      anonKeyLength: environment.supabase.anonKey?.length || 0
    };
  }
}
