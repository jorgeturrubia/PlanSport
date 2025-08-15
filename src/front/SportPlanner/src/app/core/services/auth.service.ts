import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SupabaseClient, createClient, Session } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabase: SupabaseClient;
  private sessionSubject = new BehaviorSubject<Session|null>(null);

  constructor(private router: Router) {
    this.supabase = createClient(
      'https://YOUR_SUPABASE_URL',
      'YOUR_SUPABASE_ANON_KEY'
    );
    this.loadSession();
  }

  private loadSession() {
    const session = this.supabase.auth.getSession();
    this.sessionSubject.next(session);
    session.then((res) => {
      this.sessionSubject.next(res.data.session);
      if (!res.data.session) {
        this.router.navigate(['/auth']);
      }
    });
  }

  getSession() {
    return this.sessionSubject.asObservable();
  }

  isAuthenticated() {
    return !!this.sessionSubject.value;
  }

  async login(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (data.session) {
      this.sessionSubject.next(data.session);
      this.router.navigate(['/dashboard']);
    } else {
      throw error;
    }
  }

  async register(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({ email, password });
    if (data.session) {
      this.sessionSubject.next(data.session);
      this.router.navigate(['/dashboard']);
    } else if (data.user && !data.session) {
      // Puede requerir confirmación de email
      // En un MVP podrías forzar re-login tras registro
    }
    if (error) throw error;
  }

  logout() {
    this.supabase.auth.signOut();
    this.sessionSubject.next(null);
    this.router.navigate(['/auth']);
  }

  // Autologin tras registro
  async autoLogin(email: string, password: string) {
    await this.login(email, password);
  }
}

