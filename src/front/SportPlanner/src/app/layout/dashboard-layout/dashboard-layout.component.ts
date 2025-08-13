import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavigationService } from '../../core/services/navigation.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    SidebarComponent
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
  host: {
    class: 'block min-h-screen'
  }
})
export class DashboardLayoutComponent implements OnInit {
  private readonly navigationService = inject(NavigationService);
  private readonly authService = inject(AuthService);
  
  // Signals
  readonly isSidebarOpen = this.navigationService.isSidebarOpen;
  readonly isMobile = this.navigationService.isMobile;
  readonly isAuthenticated = this.authService.isAuthenticated;
  
  ngOnInit(): void {
    // Check authentication status
    if (!this.isAuthenticated()) {
      console.log('User not authenticated in dashboard layout');
    }
  }
}
