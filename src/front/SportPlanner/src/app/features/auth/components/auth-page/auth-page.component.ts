import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <!-- Header con logo -->
        <div class="auth-header">
          <div class="logo">
            <h1 class="logo-text">PlanSport</h1>
          </div>
        </div>

        <!-- Navegación de tabs -->
        <div class="tab-navigation">
          <button
            type="button"
            class="tab-button"
            [class.active]="activeTab() === 'login'"
            (click)="setActiveTab('login')"
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            class="tab-button"
            [class.active]="activeTab() === 'register'"
            (click)="setActiveTab('register')"
          >
            Registrarse
          </button>
        </div>

        <!-- Contenido del tab activo -->
        <div class="tab-content">
          @if (activeTab() === 'login') {
            <app-login></app-login>
          } @else {
            <app-register></app-register>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-primary-100) 100%);
      padding: var(--spacing-4);
    }

    .auth-card {
      background: white;
      border-radius: var(--border-radius-lg);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      width: 100%;
      max-width: 400px;
      padding: var(--spacing-8);
    }

    .auth-header {
      text-align: center;
      margin-bottom: var(--spacing-8);
    }

    .logo {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .logo-text {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-primary-600);
      margin: 0;
    }

    .tab-navigation {
      display: flex;
      background: var(--color-gray-100);
      border-radius: var(--border-radius-lg);
      padding: var(--spacing-1);
      margin-bottom: var(--spacing-6);
    }

    .tab-button {
      flex: 1;
      padding: var(--spacing-3) var(--spacing-4);
      border: none;
      background: transparent;
      border-radius: var(--border-radius-md);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      color: var(--color-gray-600);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .tab-button:hover {
      color: var(--color-gray-900);
    }

    .tab-button.active {
      background: white;
      color: var(--color-primary-600);
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    }

    .tab-content {
      animation: fadeIn 0.3s ease-in-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Responsive design */
    @media (max-width: 480px) {
      .auth-container {
        padding: var(--spacing-2);
      }

      .auth-card {
        padding: var(--spacing-6);
      }

      .logo-text {
        font-size: var(--font-size-xl);
      }
    }
  `]
})
export class AuthPageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly authService = inject(AuthService);

  readonly activeTab = signal<'login' | 'register'>('login');

  ngOnInit(): void {
    // Leer el tab inicial desde query params
    this.route.queryParams.subscribe(params => {
      const tab = params['tab'];
      if (tab === 'register') {
        this.activeTab.set('register');
      } else {
        this.activeTab.set('login');
      }
    });
  }

  /**
   * Cambia el tab activo y actualiza la URL
   */
  setActiveTab(tab: 'login' | 'register'): void {
    this.activeTab.set(tab);
    
    // Actualizar query params sin recargar la página
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab },
      queryParamsHandling: 'merge'
    });
  }
}