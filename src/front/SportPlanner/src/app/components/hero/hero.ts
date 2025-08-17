import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  
  // Estado de navegación para mostrar loading
  readonly isNavigating = signal(false);
  
  /**
   * Maneja la navegación "Comenzar Gratis" - redirige a registro
   */
  onStartFree(): void {
    this.handleNavigation('register');
  }
  
  /**
   * Maneja la navegación "Ver Demo" - redirige a login
   */
  onViewDemo(): void {
    this.handleNavigation('login');
  }
  
  /**
   * Maneja la navegación basada en el estado de autenticación
   * @param action - 'register' para registro, 'login' para demo/login
   */
  private async handleNavigation(action: 'register' | 'login'): Promise<void> {
    try {
      this.isNavigating.set(true);
      
      // Verificar si el usuario ya está autenticado
      const isAuthenticated = this.authService.isAuthenticated();
      
      if (isAuthenticated) {
        // Usuario autenticado, redirigir al dashboard
        await this.router.navigate(['/dashboard']);
      } else {
        // Usuario no autenticado, redirigir a auth con el tab correspondiente
        const tab = action === 'register' ? 'register' : 'login';
        await this.router.navigate(['/auth'], { 
          queryParams: { tab } 
        });
      }
    } catch (error) {
      console.error('Error durante la navegación:', error);
      // En caso de error, intentar navegar a auth sin query params
      try {
        await this.router.navigate(['/auth']);
      } catch (fallbackError) {
        console.error('Error en navegación de fallback:', fallbackError);
      }
    } finally {
      this.isNavigating.set(false);
    }
  }
}
