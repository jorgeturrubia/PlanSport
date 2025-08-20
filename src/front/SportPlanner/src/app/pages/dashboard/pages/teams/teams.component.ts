import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlus, heroMagnifyingGlass, heroTrash, heroPencil, heroXMark } from '@ng-icons/heroicons/outline';
import { TeamsService } from '../../services/teams.service';
import { Team, CreateTeamRequest, UpdateTeamRequest, SPORT_LABELS, TEAM_COLORS, COLOR_OPTIONS, SPORT_OPTIONS } from '../../interfaces/team.interface';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIcon
  ],
  providers: [
    provideIcons({ heroPlus, heroMagnifyingGlass, heroTrash, heroPencil, heroXMark })
  ],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Equipos</h1>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Administra tus equipos deportivos
          </p>
        </div>
        <button
          (click)="openCreateModal()"
          class="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          <ng-icon name="heroPlus" class="w-5 h-5 mr-2"></ng-icon>
          Nuevo Equipo
        </button>
      </div>

      <!-- Filters and Search -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div class="flex flex-col sm:flex-row gap-4">
          <!-- Search -->
          <div class="flex-1">
            <div class="relative">
              <ng-icon name="heroMagnifyingGlass" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"></ng-icon>
              <input
                type="text"
                [(ngModel)]="searchTerm"
                placeholder="Buscar equipos..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
            </div>
          </div>
          
          <!-- Sport Filter -->
          <div class="sm:w-48">
            <select
              [(ngModel)]="selectedSport"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Todos los deportes</option>
              <option *ngFor="let sport of availableSports" [value]="sport.value">
                {{ sport.label }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="teamsService.loading()" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>

      <!-- Error State -->
      <div *ngIf="teamsService.error()" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p class="text-red-800 dark:text-red-200">{{ teamsService.error() }}</p>
      </div>

      <!-- Teams Grid -->
      <div *ngIf="!teamsService.loading() && filteredTeams().length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let team of filteredTeams()" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <!-- Team Header -->
          <div class="p-6 pb-4">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <div 
                  class="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold"
                  [style.background-color]="team.color"
                >
                  {{ team.name.charAt(0).toUpperCase() }}
                </div>
                <div class="ml-3">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ team.name }}</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ getSportLabel(team.sport) }}</p>
                </div>
              </div>
              
              <!-- Actions Menu -->
              <div class="flex space-x-2">
                <button
                  (click)="openEditModal(team)"
                  class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  title="Editar equipo"
                >
                  <ng-icon name="heroPencil" class="w-4 h-4"></ng-icon>
                </button>
                <button
                  (click)="confirmDelete(team)"
                  class="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  title="Eliminar equipo"
                >
                  <ng-icon name="heroTrash" class="w-4 h-4"></ng-icon>
                </button>
              </div>
            </div>
            
            <!-- Team Stats -->
            <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <ng-icon name="heroUsers" class="w-4 h-4 mr-1"></ng-icon>
              <span>{{ team.playersCount }} jugadores</span>
            </div>
            
            <!-- Description -->
            <p *ngIf="team.description" class="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {{ team.description }}
            </p>
          </div>
          
          <!-- Team Footer -->
          <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 rounded-b-lg">
            <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Creado: {{ formatDate(team.createdAt) }}</span>
              <span>Actualizado: {{ formatDate(team.updatedAt) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="!teamsService.loading() && filteredTeams().length === 0" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
        <ng-icon name="heroUsers" class="w-16 h-16 text-gray-400 mx-auto mb-4"></ng-icon>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {{ searchTerm() || selectedSport() ? 'No se encontraron equipos' : '¡Crea tu primer equipo!' }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          {{ searchTerm() || selectedSport() ? 'Intenta ajustar los filtros de búsqueda.' : 'Los equipos te ayudarán a organizar y gestionar a tus jugadores.' }}
        </p>
        <button
          *ngIf="!searchTerm() && !selectedSport()"
          (click)="openCreateModal()"
          class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          <ng-icon name="heroPlus" class="w-5 h-5 mr-2"></ng-icon>
          Crear Primer Equipo
        </button>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div *ngIf="showModal()" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div class="p-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {{ editingTeam() ? 'Editar Equipo' : 'Crear Nuevo Equipo' }}
          </h2>
          
          <form (ngSubmit)="saveTeam()" #teamFormRef="ngForm">
            <!-- Team Name -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nombre del Equipo *
              </label>
              <input
                type="text"
                [(ngModel)]="teamForm.name"
                name="name"
                required
                maxlength="50"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ej: Leones FC"
              >
            </div>
            
            <!-- Sport -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Deporte *
              </label>
              <select
                [(ngModel)]="teamForm.sport"
                name="sport"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Selecciona un deporte</option>
                <option *ngFor="let sport of availableSports" [value]="sport.value">
                  {{ sport.label }}
                </option>
              </select>
            </div>
            
            <!-- Category -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categoría *
              </label>
              <input
                type="text"
                [(ngModel)]="teamForm.category"
                name="category"
                required
                maxlength="30"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ej: Senior, Junior, Infantil"
              >
            </div>
            
            <!-- Color -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Color del Equipo
              </label>
              <div class="flex flex-wrap gap-2">
                <button
                  *ngFor="let color of availableColors"
                  type="button"
                  (click)="teamForm.color = color.value"
                  class="w-8 h-8 rounded-full border-2 transition-all"
                  [style.background-color]="color.bg"
                  [class.border-gray-900]="teamForm.color === color.value"
                  [class.border-gray-300]="teamForm.color !== color.value"
                  [class.scale-110]="teamForm.color === color.value"
                ></button>
              </div>
            </div>
            
            <!-- Players Count -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Número de Jugadores
              </label>
              <input
                type="number"
                [(ngModel)]="teamForm.playersCount"
                name="playersCount"
                min="0"
                max="50"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="0"
              >
            </div>
            
            <!-- Description -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descripción
              </label>
              <textarea
                [(ngModel)]="teamForm.description"
                name="description"
                rows="3"
                maxlength="200"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Descripción opcional del equipo..."
              ></textarea>
            </div>
            
            <!-- Actions -->
            <div class="flex justify-end space-x-3">
              <button
                type="button"
                (click)="closeModal()"
                class="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                [disabled]="!teamFormRef.valid || teamsService.loading()"
                class="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
              >
                {{ editingTeam() ? 'Actualizar' : 'Crear' }} Equipo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div *ngIf="showDeleteModal()" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div class="p-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Confirmar Eliminación
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            ¿Estás seguro de que deseas eliminar el equipo "{{ teamToDelete()?.name }}"? Esta acción no se puede deshacer.
          </p>
          <div class="flex justify-end space-x-3">
            <button
              (click)="closeDeleteModal()"
              class="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              (click)="deleteTeam()"
              [disabled]="teamsService.loading()"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TeamsComponent {
  teamsService = inject(TeamsService);

  // Los iconos ya están importados directamente

  // Search and filters
  searchTerm = signal('');
  selectedSport = signal('');

  // Modal states
  showModal = signal(false);
  showDeleteModal = signal(false);
  editingTeam = signal<Team | null>(null);
  teamToDelete = signal<Team | null>(null);

  // Form data
  teamForm = {
    name: '',
    sport: '',
    category: '',
    color: COLOR_OPTIONS[0].value,
    playersCount: 0,
    description: ''
  };

  // Available options
  availableSports = Object.entries(SPORT_LABELS).map(([value, label]) => ({ value, label }));
  availableColors = COLOR_OPTIONS;

  // Computed properties
  filteredTeams = computed(() => {
    const teams = this.teamsService.teams();
    const search = this.searchTerm().toLowerCase();
    const sport = this.selectedSport();

    return teams.filter(team => {
      const matchesSearch = !search || 
        team.name.toLowerCase().includes(search) ||
        team.description?.toLowerCase().includes(search);
      
      const matchesSport = !sport || team.sport === sport;
      
      return matchesSearch && matchesSport;
    });
  });

  constructor() {
    // Load teams on component initialization
    this.teamsService.loadTeams();
  }

  // Modal methods
  openCreateModal(): void {
    this.editingTeam.set(null);
    this.resetForm();
    this.showModal.set(true);
  }

  openEditModal(team: Team): void {
    this.editingTeam.set(team);
    this.teamForm = {
      name: team.name,
      sport: team.sport,
      category: team.category,
      color: team.color,
      playersCount: team.playersCount,
      description: team.description || ''
    };
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.editingTeam.set(null);
    this.resetForm();
  }

  confirmDelete(team: Team): void {
    this.teamToDelete.set(team);
    this.showDeleteModal.set(true);
  }

  closeDeleteModal(): void {
    this.showDeleteModal.set(false);
    this.teamToDelete.set(null);
  }

  // CRUD operations
  async saveTeam(): Promise<void> {
    const editingTeam = this.editingTeam();
    
    if (editingTeam) {
      // Update existing team
      const updateRequest: UpdateTeamRequest = {
        name: this.teamForm.name,
        sport: this.teamForm.sport as any,
        category: this.teamForm.category,
        color: this.teamForm.color,
        playersCount: this.teamForm.playersCount,
        description: this.teamForm.description || undefined
      };
      
      await this.teamsService.updateTeam(editingTeam.id, updateRequest);
    } else {
      // Create new team
      const createRequest: CreateTeamRequest = {
        name: this.teamForm.name,
        sport: this.teamForm.sport as any,
        category: this.teamForm.category,
        color: this.teamForm.color,
        playersCount: this.teamForm.playersCount,
        description: this.teamForm.description || undefined
      };
      
      await this.teamsService.createTeam(createRequest);
    }
    
    this.closeModal();
  }

  async deleteTeam(): Promise<void> {
    const team = this.teamToDelete();
    if (team) {
      await this.teamsService.deleteTeam(team.id);
      this.closeDeleteModal();
    }
  }

  // Utility methods
  resetForm(): void {
    this.teamForm = {
      name: '',
      sport: '',
      category: '',
      color: COLOR_OPTIONS[0].value,
      playersCount: 0,
      description: ''
    };
  }

  getSportLabel(sport: string): string {
    return SPORT_LABELS[sport as keyof typeof SPORT_LABELS] || sport;
  }

  formatDate(date: string | Date): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}