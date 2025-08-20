import { Component, inject, HostListener, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { NavigationService } from '../../services/navigation.service';
import { AuthService } from '../../features/auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgIcon],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit, OnDestroy {
  private navigationService = inject(NavigationService);
  private router = inject(Router);
  private authService = inject(AuthService);
  
  // Icon references for template  
  readonly MenuIcon = 'heroBars3';
  readonly XIcon = 'heroXMark';
  
  isMobileMenuOpen = false;
  activeSection = '';
  private activeSection$ = new Subscription();
  
  // Loading state for navigation
  isNavigating = signal(false);
  
  ngOnInit(): void {
    // Subscribe to active section changes
    this.activeSection$ = this.navigationService.activeSection$.subscribe(
      section => this.activeSection = section
    );
  }
  
  ngOnDestroy(): void {
    this.activeSection$.unsubscribe();
  }
  
  menuItems = [
    { label: 'Inicio', section: 'hero' },
    { label: 'Características', section: 'caracteristicas' },
    { label: 'Precios', section: 'suscripciones' },
    { label: 'Marketplace', section: 'marketplace' },
    { label: 'Reseñas', section: 'reviews' }
  ];
  
  navigateToSection(section: string): void {
    this.navigationService.scrollToSection(section);
    this.isMobileMenuOpen = false;
  }
  
  isActiveSection(section: string): boolean {
    return this.activeSection === section;
  }
  
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  
  onLogin(): void {
    this.handleNavigation('login');
  }
  
  onRegister(): void {
    this.handleNavigation('register');
  }
  
  /**
   * Maneja el click en el logo para navegar al home apropiado
   */
  onLogoClick(): void {
    this.handleHomeNavigation();
  }
  
  /**
   * Navega al home apropiado según el estado de autenticación
   */
  private async handleHomeNavigation(): Promise<void> {
    try {
      this.isNavigating.set(true);
      
      // Si el usuario está autenticado, ir al dashboard
      if (this.authService.isAuthenticated()) {
        await this.router.navigate(['/dashboard']);
      } else {
        // Si no está autenticado, ir a la landing page
        await this.router.navigate(['/']);
      }
      
    } catch (error) {
      console.error('Error en navegación del logo:', error);
      // Navegación de fallback a la raíz
      await this.router.navigate(['/']);
    } finally {
      this.isNavigating.set(false);
    }
  }
  
  /**
   * Maneja la navegación basada en el estado de autenticación
   */
  private async handleNavigation(action: 'login' | 'register'): Promise<void> {
    try {
      this.isNavigating.set(true);
      
      // Si el usuario ya está autenticado, ir al dashboard
      if (this.authService.isAuthenticated()) {
        await this.router.navigate(['/dashboard']);
        return;
      }
      
      // Si no está autenticado, ir a la página de auth con el tab correspondiente
      const tab = action === 'register' ? 'register' : 'login';
      await this.router.navigate(['/auth'], { queryParams: { tab } });
      
    } catch (error) {
      console.error('Error en navegación:', error);
      // Navegación de fallback
      await this.router.navigate(['/auth']);
    } finally {
      this.isNavigating.set(false);
    }
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const header = target.closest('header');
    
    // Close mobile menu if clicking outside the header
    if (!header && this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
    }
  }
  
  @HostListener('window:scroll')
  onScroll(): void {
    this.navigationService.updateActiveSection();
  }
}
