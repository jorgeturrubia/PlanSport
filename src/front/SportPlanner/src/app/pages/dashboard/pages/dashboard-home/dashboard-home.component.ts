import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule, Users, Target, Calendar, TrendingUp } from 'lucide-angular';
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

      <!-- Modern Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Total Teams -->
        <div class="group relative overflow-hidden bg-gradient-to-br from-green-500/10 to-green-600/10 dark:from-green-400/10 dark:to-green-500/10 backdrop-blur-sm border border-green-200/20 dark:border-green-400/20 rounded-xl p-6 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
          <div class="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-sm font-medium text-green-600 dark:text-green-400 mb-1">Total Equipos</p>
                <p class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ totalTeams() }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">+2 este mes</p>
              </div>
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-green-500/20 dark:bg-green-400/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <lucide-icon name="users" class="w-6 h-6 text-green-600 dark:text-green-400"></lucide-icon>
                </div>
              </div>
            </div>
            <div class="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style="width: 75%"></div>
            </div>
          </div>
        </div>

        <!-- Total Players -->
        <div class="group relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-600/10 dark:from-blue-400/10 dark:to-blue-500/10 backdrop-blur-sm border border-blue-200/20 dark:border-blue-400/20 rounded-xl p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
          <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">Total Jugadores</p>
                <p class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ totalPlayers() }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ totalTeams() > 0 ? 'En ' + totalTeams() + ' equipos' : 'Sin equipos' }}</p>
              </div>
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-500/20 dark:bg-blue-400/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <lucide-icon name="target" class="w-6 h-6 text-blue-600 dark:text-blue-400"></lucide-icon>
                </div>
              </div>
            </div>
            <div class="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" [style.width]="Math.min(totalPlayers() * 5, 100) + '%'"></div>
            </div>
          </div>
        </div>

        <!-- Upcoming Trainings -->
        <div class="group relative overflow-hidden bg-gradient-to-br from-amber-500/10 to-amber-600/10 dark:from-amber-400/10 dark:to-amber-500/10 backdrop-blur-sm border border-amber-200/20 dark:border-amber-400/20 rounded-xl p-6 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300">
          <div class="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-sm font-medium text-amber-600 dark:text-amber-400 mb-1">Entrenamientos</p>
                <p class="text-3xl font-bold text-gray-900 dark:text-white mb-2">0</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Próximamente</p>
              </div>
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-amber-500/20 dark:bg-amber-400/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <lucide-icon name="calendar" class="w-6 h-6 text-amber-600 dark:text-amber-400"></lucide-icon>
                </div>
              </div>
            </div>
            <div class="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full" style="width: 0%"></div>
            </div>
          </div>
        </div>

        <!-- Performance -->
        <div class="group relative overflow-hidden bg-gradient-to-br from-purple-500/10 to-purple-600/10 dark:from-purple-400/10 dark:to-purple-500/10 backdrop-blur-sm border border-purple-200/20 dark:border-purple-400/20 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
          <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">Rendimiento</p>
                <p class="text-3xl font-bold text-gray-900 dark:text-white mb-2">85%</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">+5% vs mes anterior</p>
              </div>
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-purple-500/20 dark:bg-purple-400/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <lucide-icon name="trending-up" class="w-6 h-6 text-purple-600 dark:text-purple-400"></lucide-icon>
                </div>
              </div>
            </div>
            <div class="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" style="width: 85%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Quick Actions -->
      <div class="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6">
        <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Acciones Rápidas</h2>
            <div class="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
              <lucide-icon name="zap" class="w-4 h-4 text-green-600 dark:text-green-400"></lucide-icon>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button 
              routerLink="/dashboard/teams"
              class="group relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="relative z-10 flex items-center justify-center">
                <lucide-icon name="users" class="w-5 h-5 mr-2"></lucide-icon>
                Gestionar Equipos
              </div>
            </button>
            
            <button 
              class="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              disabled
            >
              <div class="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="relative z-10 flex items-center justify-center">
                <lucide-icon name="calendar" class="w-5 h-5 mr-2"></lucide-icon>
                Programar Entrenamiento
              </div>
              <div class="absolute top-2 right-2">
                <span class="inline-flex items-center px-2 py-1 rounded-md bg-blue-800/50 text-xs font-medium text-blue-100">
                  Pronto
                </span>
              </div>
            </button>
            
            <button 
              class="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              disabled
            >
              <div class="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="relative z-10 flex items-center justify-center">
                <lucide-icon name="trending-up" class="w-5 h-5 mr-2"></lucide-icon>
                Ver Estadísticas
              </div>
              <div class="absolute top-2 right-2">
                <span class="inline-flex items-center px-2 py-1 rounded-md bg-purple-800/50 text-xs font-medium text-purple-100">
                  Pronto
                </span>
              </div>
            </button>
          </div>
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