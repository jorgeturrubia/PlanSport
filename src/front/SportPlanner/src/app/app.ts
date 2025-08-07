import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SupabaseService } from './core/services/supabase.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  title = 'SportPlanner';
  
  private http = inject(HttpClient);
  private supabaseService = inject(SupabaseService);
  
  backendStatus: any = null;
  supabaseStatus: any = null;
  frontendSupabaseStatus: any = null;
  loading = true;

  async ngOnInit() {
    await this.checkConnections();
  }

  async checkConnections() {
    try {
      // Test backend API
      this.http.get(`${environment.apiUrl}/../health`).subscribe({
        next: (data) => {
          this.backendStatus = { success: true, data };
        },
        error: (error) => {
          this.backendStatus = { success: false, error: error.message };
        }
      });

      // Test backend Supabase configuration
      this.http.get(`${environment.apiUrl}/../health/supabase`).subscribe({
        next: (data) => {
          this.supabaseStatus = { success: true, data };
        },
        error: (error) => {
          this.supabaseStatus = { success: false, error: error.message };
        }
      });

      // Test frontend Supabase connection
      try {
        const connectionResult = await this.supabaseService.testConnection();
        const config = this.supabaseService.getConfig();
        
        this.frontendSupabaseStatus = {
          success: connectionResult.connected,
          data: {
            connected: connectionResult.connected,
            config: config,
            error: connectionResult.error
          }
        };
      } catch (error) {
        this.frontendSupabaseStatus = {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }

      this.loading = false;
    } catch (error) {
      console.error('Error checking connections:', error);
      this.loading = false;
    }
  }
}
