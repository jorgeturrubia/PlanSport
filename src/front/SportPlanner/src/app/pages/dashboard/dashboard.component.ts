import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <header class="dashboard-header">
        <h1>Dashboard</h1>
        <p>Bienvenido a tu panel de control de PlanSport</p>
      </header>
      
      <main class="dashboard-content">
        <div class="stats-grid">
          <div class="stat-card">
            <h3>Entrenamientos</h3>
            <p class="stat-number">12</p>
            <p class="stat-label">Esta semana</p>
          </div>
          
          <div class="stat-card">
            <h3>Progreso</h3>
            <p class="stat-number">85%</p>
            <p class="stat-label">Objetivos cumplidos</p>
          </div>
          
          <div class="stat-card">
            <h3>Tiempo</h3>
            <p class="stat-number">8.5h</p>
            <p class="stat-label">Total entrenado</p>
          </div>
        </div>
        
        <div class="quick-actions">
          <h2>Acciones rápidas</h2>
          <div class="actions-grid">
            <button class="action-btn">Nuevo Entrenamiento</button>
            <button class="action-btn">Ver Progreso</button>
            <button class="action-btn">Configurar Objetivos</button>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--spacing-6);
    }
    
    .dashboard-header {
      text-align: center;
      margin-bottom: var(--spacing-8);
    }
    
    .dashboard-header h1 {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-gray-900);
      margin: 0 0 var(--spacing-2) 0;
    }
    
    .dashboard-header p {
      font-size: var(--font-size-lg);
      color: var(--color-gray-600);
      margin: 0;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--spacing-6);
      margin-bottom: var(--spacing-8);
    }
    
    .stat-card {
      background: white;
      padding: var(--spacing-6);
      border-radius: var(--border-radius-lg);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    
    .stat-card h3 {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      color: var(--color-gray-700);
      margin: 0 0 var(--spacing-3) 0;
    }
    
    .stat-number {
      font-size: var(--font-size-3xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-primary-600);
      margin: 0 0 var(--spacing-1) 0;
    }
    
    .stat-label {
      font-size: var(--font-size-sm);
      color: var(--color-gray-500);
      margin: 0;
    }
    
    .quick-actions h2 {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-semibold);
      color: var(--color-gray-900);
      margin: 0 0 var(--spacing-4) 0;
    }
    
    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--spacing-4);
    }
    
    .action-btn {
      background: var(--color-primary-600);
      color: white;
      border: none;
      padding: var(--spacing-4) var(--spacing-6);
      border-radius: var(--border-radius-md);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-medium);
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    
    .action-btn:hover {
      background: var(--color-primary-700);
    }
  `]
})
export class DashboardComponent {

}