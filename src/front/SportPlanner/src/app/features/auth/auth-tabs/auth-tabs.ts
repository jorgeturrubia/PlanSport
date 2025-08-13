import { Component, inject, signal, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink, ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-auth-tabs',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, FontAwesomeModule],
  templateUrl: './auth-tabs.html',
  styleUrl: './auth-tabs.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthTabsComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  
  // Icons
  readonly faSignInAlt = faSignInAlt;
  readonly faUserPlus = faUserPlus;
  
  // Signals
  readonly activeTab = signal<'login' | 'register'>('login');
  
  ngOnInit(): void {
    // Set initial active tab based on current route
    const currentPath = this.router.url;
    if (currentPath.includes('/register')) {
      this.activeTab.set('register');
    } else {
      this.activeTab.set('login');
    }
  }
  
  switchTab(tab: 'login' | 'register'): void {
    this.activeTab.set(tab);
    this.router.navigate(['/auth', tab]);
  }
  
  // Keyboard navigation for tabs
  onKeyDown(event: KeyboardEvent, tab: 'login' | 'register'): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.switchTab(tab);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const newTab = tab === 'login' ? 'register' : 'login';
      this.switchTab(newTab);
    }
  }
}
