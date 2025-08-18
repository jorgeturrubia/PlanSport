import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../../../features/auth/services/auth.service';
import { AuthUser } from '../../../../features/auth/models/auth.interfaces';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule
  ],
  template: `
    <div class="space-y-6">
      <!-- Welcome Header -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ¡Bienvenido, {{ currentUser()?.firstName || 'Usuario' }}!
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Aquí tienes un resumen de tu actividad deportiva
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Total Teams -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <lucide-icon name="users" class="w-6 h-6 text-green-600 dark:text-green-400"></lucide-icon>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Equipos</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ totalTeams() }}</p>
            </div>
          </div>
        </div>

        <!-- Total Players -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <lucide-icon name="target" class="w-6 h-6 text-blue-600 dark:text-blue-400"></lucide-icon>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Jugadores</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ totalPlayers() }}</p>
            </div>
          </div>
        </div>

        <!-- Upcoming Trainings -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                <lucide-icon name="calendar" class="w-6 h-6 text-yellow-600 dark:text-yellow-400"></lucide-icon>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Entrenamientos</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">0</p>
            </div>
          </div>
        </div>

        <!-- Performance -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <lucide-icon name="trending-up" class="w-6 h-6 text-purple-600 dark:text-purple-400"></lucide-icon>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Rendimiento</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">85%</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Acciones Rápidas
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button 
            routerLink="/dashboard/teams"
            class="flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <lucide-icon name="users" class="w-5 h-5 mr-2"></lucide-icon>
            Gestionar Equipos
          </button>
          
          <button 
            class="flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            disabled
          >
            <lucide-icon name="calendar" class="w-5 h-5 mr-2"></lucide-icon>
            Programar Entrenamiento
          </button>
          
          <button 
            class="flex items-center justify-center px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            disabled
          >
            <lucide-icon name="trending-up" class="w-5 h-5 mr-2"></lucide-icon>
            Ver Estadísticas
          </button>
        </div>
      </div>

      <!-- Recent Teams -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6" *ngIf="recentTeams().length > 0">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Equipos Recientes
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            *ngFor="let team of recentTeams()" 
            class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div class="flex items-center mb-2">
              <div 
                class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                [style.background-color]="team.color"
              >
                {{ team.name.charAt(0).toUpperCase() }}
              </div>
              <h3 class="ml-3 text-sm font-medium text-gray-900 dark:text-white">{{ team.name }}</h3>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">{{ team.sport | titlecase }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ team.playersCount }} jugadores</p>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div 
        *ngIf="totalTeams() === 0" 
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center"
      >
        <lucide-icon name="users" class="w-16 h-16 text-gray-400 mx-auto mb-4"></lucide-icon>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          ¡Comienza creando tu primer equipo!
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Los equipos te ayudarán a organizar y gestionar a tus jugadores de manera eficiente.
        </p>
        <button 
          routerLink="/dashboard/teams"
          class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          <lucide-icon name="users" class="w-5 h-5 mr-2"></lucide-icon>
          Crear Primer Equipo
        </button>
      </div>
    </div>
  `
})
export class DashboardHomeComponent {
  private teamsService = inject(TeamsService);
  private authService = inject(AuthService);

  // No need to reassign icons as they are already imported with the correct names

  // Computed properties
  currentUser = computed(() => this.authService.user());
  teams = computed(() => this.teamsService.teams());
  
  totalTeams = computed(() => this.teams().length);
  totalPlayers = computed(() => 
    this.teams().reduce((total, team) => total + team.playersCount, 0)
  );
  
  recentTeams = computed(() => 
    this.teams()
      .sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 3)
  );
}