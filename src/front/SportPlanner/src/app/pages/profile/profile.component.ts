import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../features/auth/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="profile-container">
      <header class="profile-header">
        <h1>Mi Perfil</h1>
        <p>Gestiona tu información personal y configuración de cuenta</p>
      </header>
      
      <main class="profile-content">
        <div class="profile-card">
          <div class="profile-avatar">
            <div class="avatar-placeholder">
              {{ getInitials() }}
            </div>
            <button class="change-avatar-btn">Cambiar foto</button>
          </div>
          
          <div class="profile-info">
            <h2>{{ user()?.firstName }} {{ user()?.lastName }}</h2>
            <p class="user-email">{{ user()?.email }}</p>
            <span class="user-role">{{ getRoleLabel() }}</span>
          </div>
        </div>
        
        <div class="profile-form-section">
          <h3>Información Personal</h3>
          <form [formGroup]="profileForm" class="profile-form">
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">Nombre</label>
                <input
                  id="firstName"
                  type="text"
                  formControlName="firstName"
                  class="form-input"
                />
              </div>
              
              <div class="form-group">
                <label for="lastName">Apellido</label>
                <input
                  id="lastName"
                  type="text"
                  formControlName="lastName"
                  class="form-input"
                />
              </div>
            </div>
            
            <div class="form-group">
              <label for="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                formControlName="email"
                class="form-input"
                readonly
              />
            </div>
            
            <div class="form-actions">
              <button type="button" class="btn-secondary">Cancelar</button>
              <button type="submit" class="btn-primary">Guardar cambios</button>
            </div>
          </form>
        </div>
        
        <div class="profile-actions">
          <h3>Acciones de cuenta</h3>
          <div class="actions-list">
            <button class="action-item">Cambiar contraseña</button>
            <button class="action-item">Configuración de privacidad</button>
            <button class="action-item danger" (click)="logout()">Cerrar sesión</button>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 800px;
      margin: 0 auto;
      padding: var(--spacing-6);
    }
    
    .profile-header {
      text-align: center;
      margin-bottom: var(--spacing-8);
    }
    
    .profile-header h1 {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-gray-900);
      margin: 0 0 var(--spacing-2) 0;
    }
    
    .profile-header p {
      font-size: var(--font-size-base);
      color: var(--color-gray-600);
      margin: 0;
    }
    
    .profile-card {
      background: white;
      padding: var(--spacing-6);
      border-radius: var(--border-radius-lg);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      margin-bottom: var(--spacing-6);
      display: flex;
      align-items: center;
      gap: var(--spacing-6);
    }
    
    .profile-avatar {
      text-align: center;
    }
    
    .avatar-placeholder {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: var(--color-primary-100);
      color: var(--color-primary-700);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-semibold);
      margin-bottom: var(--spacing-2);
    }
    
    .change-avatar-btn {
      background: none;
      border: 1px solid var(--color-gray-300);
      color: var(--color-gray-700);
      padding: var(--spacing-1) var(--spacing-3);
      border-radius: var(--border-radius-md);
      font-size: var(--font-size-sm);
      cursor: pointer;
    }
    
    .profile-info h2 {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-semibold);
      color: var(--color-gray-900);
      margin: 0 0 var(--spacing-1) 0;
    }
    
    .user-email {
      font-size: var(--font-size-base);
      color: var(--color-gray-600);
      margin: 0 0 var(--spacing-2) 0;
    }
    
    .user-role {
      background: var(--color-blue-100);
      color: var(--color-blue-700);
      padding: var(--spacing-1) var(--spacing-2);
      border-radius: var(--border-radius-sm);
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-medium);
      text-transform: uppercase;
    }
    
    .profile-form-section,
    .profile-actions {
      background: white;
      padding: var(--spacing-6);
      border-radius: var(--border-radius-lg);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      margin-bottom: var(--spacing-6);
    }
    
    .profile-form-section h3,
    .profile-actions h3 {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      color: var(--color-gray-900);
      margin: 0 0 var(--spacing-4) 0;
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-4);
    }
    
    .form-group {
      margin-bottom: var(--spacing-4);
    }
    
    .form-group label {
      display: block;
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      color: var(--color-gray-700);
      margin-bottom: var(--spacing-2);
    }
    
    .form-input {
      width: 100%;
      padding: var(--spacing-3);
      border: 1px solid var(--color-gray-300);
      border-radius: var(--border-radius-md);
      font-size: var(--font-size-base);
      box-sizing: border-box;
    }
    
    .form-input:focus {
      outline: none;
      border-color: var(--color-primary-500);
      box-shadow: 0 0 0 3px var(--color-primary-100);
    }
    
    .form-input[readonly] {
      background: var(--color-gray-50);
      color: var(--color-gray-500);
    }
    
    .form-actions {
      display: flex;
      gap: var(--spacing-3);
      justify-content: flex-end;
      margin-top: var(--spacing-6);
    }
    
    .btn-primary,
    .btn-secondary {
      padding: var(--spacing-3) var(--spacing-4);
      border-radius: var(--border-radius-md);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-medium);
      cursor: pointer;
      border: none;
    }
    
    .btn-primary {
      background: var(--color-primary-600);
      color: white;
    }
    
    .btn-primary:hover {
      background: var(--color-primary-700);
    }
    
    .btn-secondary {
      background: white;
      color: var(--color-gray-700);
      border: 1px solid var(--color-gray-300);
    }
    
    .btn-secondary:hover {
      background: var(--color-gray-50);
    }
    
    .actions-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2);
    }
    
    .action-item {
      background: none;
      border: none;
      padding: var(--spacing-3);
      text-align: left;
      border-radius: var(--border-radius-md);
      cursor: pointer;
      font-size: var(--font-size-base);
      color: var(--color-gray-700);
    }
    
    .action-item:hover {
      background: var(--color-gray-50);
    }
    
    .action-item.danger {
      color: var(--color-error-600);
    }
    
    .action-item.danger:hover {
      background: var(--color-error-50);
    }
  `]
})
export class ProfileComponent {
  private readonly fb = inject(FormBuilder);
  readonly authService = inject(AuthService);
  
  readonly user = this.authService.user;
  
  readonly profileForm = this.fb.nonNullable.group({
    firstName: [this.user()?.firstName || '', Validators.required],
    lastName: [this.user()?.lastName || '', Validators.required],
    email: [{ value: this.user()?.email || '', disabled: true }]
  });
  
  getInitials(): string {
    const user = this.user();
    if (!user) return 'U';
    
    const firstInitial = user.firstName?.charAt(0)?.toUpperCase() || '';
    const lastInitial = user.lastName?.charAt(0)?.toUpperCase() || '';
    
    return firstInitial + lastInitial || 'U';
  }
  
  getRoleLabel(): string {
    const role = this.user()?.role;
    switch (role) {
      case 'admin': return 'Administrador';
      case 'coach': return 'Entrenador';
      case 'user': return 'Usuario';
      default: return 'Usuario';
    }
  }
  
  logout(): void {
    this.authService.logout();
  }
}