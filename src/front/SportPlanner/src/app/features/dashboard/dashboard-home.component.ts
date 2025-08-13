import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faUsers, 
  faCalendarAlt, 
  faStopwatch, 
  faTrophy,
  faArrowRight,
  faChartLine,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../core/services/auth.service';

interface DashboardCard {
  title: string;
  value: string | number;
  icon: any;
  color: string;
  link: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  template: `
    <div class="space-y-6">
      <!-- Welcome Header -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h1 class="text-2xl font-bold text-gray-900">
          ¡Bienvenido, {{ userName() }}! 👋
        </h1>
        <p class="mt-2 text-gray-600">
          Este es tu panel de control. Aquí podrás gestionar tus equipos, planificaciones y entrenamientos.
        </p>
      </div>
      
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        @for (card of dashboardCards; track card.title) {
          <div class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-600">{{ card.title }}</p>
                <p class="mt-2 text-3xl font-bold text-gray-900">{{ card.value }}</p>
                
                @if (card.trend) {
                  <div class="mt-2 flex items-center text-sm">
                    <span [class.text-green-600]="card.trend.isPositive"
                          [class.text-red-600]="!card.trend.isPositive">
                      {{ card.trend.isPositive ? '+' : '-' }}{{ card.trend.value }}%
                    </span>
                    <span class="ml-1 text-gray-500">vs mes anterior</span>
                  </div>
                }
              </div>
              
              <div [class]="'p-3 rounded-full ' + card.color">
                <fa-icon [icon]="card.icon" class="h-6 w-6 text-white"></fa-icon>
              </div>
            </div>
            
            <a [routerLink]="card.link" 
               class="mt-4 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700">
              Ver más
              <fa-icon [icon]="faArrowRight" class="ml-1 h-3 w-3"></fa-icon>
            </a>
          </div>
        }
      </div>
      
      <!-- Quick Actions -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button routerLink="/teams/new" 
                  class="flex items-center justify-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200">
            <fa-icon [icon]="faUsers" class="h-5 w-5 text-gray-400"></fa-icon>
            <span class="font-medium text-gray-700">Crear Nuevo Equipo</span>
          </button>
          
          <button routerLink="/planning/new" 
                  class="flex items-center justify-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200">
            <fa-icon [icon]="faCalendarAlt" class="h-5 w-5 text-gray-400"></fa-icon>
            <span class="font-medium text-gray-700">Nueva Planificación</span>
          </button>
          
          <button routerLink="/training/new" 
                  class="flex items-center justify-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200">
            <fa-icon [icon]="faStopwatch" class="h-5 w-5 text-gray-400"></fa-icon>
            <span class="font-medium text-gray-700">Nuevo Entrenamiento</span>
          </button>
        </div>
      </div>
      
      <!-- Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Upcoming Trainings -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Próximos Entrenamientos</h2>
          <div class="space-y-3">
            @for (training of upcomingTrainings; track training.id) {
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p class="font-medium text-gray-900">{{ training.team }}</p>
                    <p class="text-sm text-gray-500">{{ training.date }} - {{ training.time }}</p>
                  </div>
                </div>
                <button class="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  Ver detalles
                </button>
              </div>
            }
          </div>
        </div>
        
        <!-- Recent Achievements -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Logros Recientes</h2>
          <div class="space-y-3">
            @for (achievement of recentAchievements; track achievement.id) {
              <div class="flex items-start gap-3 p-3">
                <fa-icon [icon]="faCheckCircle" class="h-5 w-5 text-green-500 mt-0.5"></fa-icon>
                <div class="flex-1">
                  <p class="font-medium text-gray-900">{{ achievement.title }}</p>
                  <p class="text-sm text-gray-500">{{ achievement.description }}</p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .text-primary-600 {
      color: #059669;
    }
    
    .text-primary-700 {
      color: #047857;
    }
    
    .hover\\:text-primary-700:hover {
      color: #047857;
    }
    
    .border-primary-500 {
      border-color: #10b981;
    }
    
    .hover\\:border-primary-500:hover {
      border-color: #10b981;
    }
    
    .bg-primary-50 {
      background-color: #ecfdf5;
    }
    
    .hover\\:bg-primary-50:hover {
      background-color: #ecfdf5;
    }
  `]
})
export class DashboardHomeComponent {
  private readonly authService = inject(AuthService);
  
  // Icons
  readonly faUsers = faUsers;
  readonly faCalendarAlt = faCalendarAlt;
  readonly faStopwatch = faStopwatch;
  readonly faTrophy = faTrophy;
  readonly faArrowRight = faArrowRight;
  readonly faChartLine = faChartLine;
  readonly faCheckCircle = faCheckCircle;
  
  // User info
  readonly userName = computed(() => {
    const user = this.authService.currentUser();
    return user?.fullName?.split(' ')[0] || user?.email?.split('@')[0] || 'Usuario';
  });
  
  // Dashboard cards data
  readonly dashboardCards: DashboardCard[] = [
    {
      title: 'Equipos Activos',
      value: 3,
      icon: faUsers,
      color: 'bg-blue-500',
      link: '/teams',
      trend: { value: 10, isPositive: true }
    },
    {
      title: 'Planificaciones',
      value: 7,
      icon: faCalendarAlt,
      color: 'bg-green-500',
      link: '/planning',
      trend: { value: 5, isPositive: true }
    },
    {
      title: 'Entrenamientos',
      value: 24,
      icon: faStopwatch,
      color: 'bg-purple-500',
      link: '/training',
      trend: { value: 15, isPositive: true }
    },
    {
      title: 'Objetivos Cumplidos',
      value: '85%',
      icon: faTrophy,
      color: 'bg-yellow-500',
      link: '/objectives',
      trend: { value: 3, isPositive: false }
    }
  ];
  
  // Mock data for upcoming trainings
  readonly upcomingTrainings = [
    { id: 1, team: 'Equipo Sub-15', date: 'Hoy', time: '17:00' },
    { id: 2, team: 'Equipo Sub-17', date: 'Mañana', time: '16:00' },
    { id: 3, team: 'Equipo Sub-15', date: 'Jueves', time: '17:00' }
  ];
  
  // Mock data for recent achievements
  readonly recentAchievements = [
    { 
      id: 1, 
      title: 'Planificación Completada', 
      description: 'Sub-15 completó el 100% de los objetivos semanales' 
    },
    { 
      id: 2, 
      title: 'Nuevo Record', 
      description: '30 entrenamientos completados este mes' 
    },
    { 
      id: 3, 
      title: 'Mejora en Asistencia', 
      description: '95% de asistencia promedio en la última semana' 
    }
  ];
}
