import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SupabaseService } from './supabase.service';
import { User } from '@supabase/supabase-js';

export interface AuthResult {
  success: boolean;
  user?: User | null;
  error?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();
  private userProfileSubject = new BehaviorSubject<UserProfile | null>(null);
  public userProfile$: Observable<UserProfile | null> = this.userProfileSubject.asObservable();

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {
    this.initializeAuth();
  }

  /**
   * Initialize authentication state
   */
  private async initializeAuth(): Promise<void> {
    try {
      const session = await this.supabaseService.getSession();
      if (session?.user) {
        this.userSubject.next(session.user);
      }

      // Listen for auth state changes (only if client is available)
      if (this.supabaseService.client?.auth) {
        this.supabaseService.client.auth.onAuthStateChange((event, session) => {
          if (event === 'SIGNED_IN' && session?.user) {
            this.userSubject.next(session.user);
          } else if (event === 'SIGNED_OUT') {
            this.userSubject.next(null);
          }
        });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
    }
  }

  /**
   * Register a new user with auto-login
   */
  async register(email: string, password: string, fullName?: string): Promise<AuthResult> {
    try {
      const { data, error } = await this.supabaseService.signUp(email, password);
      
      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        // Create user profile if full name is provided
        if (fullName) {
          await this.createUserProfile(data.user.id, email, fullName);
        }
        
        this.userSubject.next(data.user);
        return { success: true, user: data.user };
      }

      return { success: false, error: 'Registration failed' };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Registration failed' 
      };
    }
  }

  /**
   * Login user with email and password
   */
  async login(email: string, password: string): Promise<AuthResult> {
    try {
      const { data, error } = await this.supabaseService.signIn(email, password);
      
      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        this.userSubject.next(data.user);
        return { success: true, user: data.user };
      }

      return { success: false, error: 'Login failed' };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      };
    }
  }

  /**
   * Logout user with session cleanup
   */
  async logout(): Promise<AuthResult> {
    try {
      const { error } = await this.supabaseService.signOut();
      
      if (error) {
        return { success: false, error: error.message };
      }

      this.userSubject.next(null);
      this.router.navigate(['/auth']);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Logout failed' 
      };
    }
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.userSubject.value !== null;
  }

  /**
   * Get user profile from database
   */
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      if (!this.supabaseService.client) {
        return null;
      }
      
      const { data, error } = await this.supabaseService.client
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  /**
   * Create user profile in database
   */
  private async createUserProfile(userId: string, email: string, fullName: string): Promise<void> {
    try {
      if (!this.supabaseService.client) {
        return;
      }
      
      const { error } = await this.supabaseService.client
        .from('user_profiles')
        .insert({
          id: userId,
          email: email,
          full_name: fullName,
          created_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error creating user profile:', error);
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  }

  /**
   * Update user profile
   */
  async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<boolean> {
    try {
      if (!this.supabaseService.client) {
        return false;
      }
      
      const { error } = await this.supabaseService.client
        .from('user_profiles')
        .update(updates)
        .eq('id', userId);

      if (error) {
        console.error('Error updating user profile:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
  }

  /**
   * Reset password
   */
  async resetPassword(email: string): Promise<AuthResult> {
    try {
      if (!this.supabaseService.client?.auth) {
        return { success: false, error: 'Authentication not available' };
      }
      
      const { error } = await this.supabaseService.client.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Password reset failed' 
      };
    }
  }

  /**
   * Get current access token
   * @returns Observable with access token or null
   */
  getAccessToken(): Observable<string | null> {
    if (!this.supabaseService.client?.auth) {
      return of(null);
    }
    
    return from(this.supabaseService.client.auth.getSession()).pipe(
      map(({ data: { session } }) => session?.access_token || null),
      catchError(() => of(null))
    );
  }
}