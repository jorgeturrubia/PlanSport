import { Injectable, signal } from '@angular/core';
import { Team, CreateTeamRequest, UpdateTeamRequest, Sport, TeamColor } from '../interfaces/team.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  // Signal para almacenar los equipos
  private _teams = signal<Team[]>([]);
  
  // Signal de solo lectura para exponer los equipos
  readonly teams = this._teams.asReadonly();
  
  // Signal para el estado de carga
  private _loading = signal(false);
  readonly loading = this._loading.asReadonly();
  
  // Signal para errores
  private _error = signal<string | null>(null);
  readonly error = this._error.asReadonly();

  constructor() {
    this.loadInitialData();
  }

  /**
   * Carga los equipos iniciales (datos mock)
   */
  async loadTeams(): Promise<void> {
    this._loading.set(true);
    this._error.set(null);
    
    try {
      // Simular llamada a API
      await this.delay(500);
      
      const mockTeams = this.getMockTeams();
      this._teams.set(mockTeams);
    } catch (error) {
      this._error.set('Error al cargar los equipos');
      console.error('Error loading teams:', error);
    } finally {
      this._loading.set(false);
    }
  }

  /**
   * Crea un nuevo equipo
   */
  async createTeam(request: CreateTeamRequest): Promise<Team> {
    this._loading.set(true);
    this._error.set(null);
    
    try {
      // Simular llamada a API
      await this.delay(300);
      
      const newTeam: Team = {
        id: this.generateId(),
        ...request,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // Actualizar la lista de equipos
      this._teams.update(teams => [...teams, newTeam]);
      
      return newTeam;
    } catch (error) {
      this._error.set('Error al crear el equipo');
      console.error('Error creating team:', error);
      throw error;
    } finally {
      this._loading.set(false);
    }
  }

  /**
   * Actualiza un equipo existente
   */
  async updateTeam(id: string, request: UpdateTeamRequest): Promise<Team> {
    this._loading.set(true);
    this._error.set(null);
    
    try {
      // Simular llamada a API
      await this.delay(300);
      
      const updatedTeam: Team = {
        id,
        ...request,
        createdAt: this.getTeamById(id)?.createdAt || new Date(),
        updatedAt: new Date()
      };
      
      // Actualizar la lista de equipos
      this._teams.update(teams => 
        teams.map(team => team.id === id ? updatedTeam : team)
      );
      
      return updatedTeam;
    } catch (error) {
      this._error.set('Error al actualizar el equipo');
      console.error('Error updating team:', error);
      throw error;
    } finally {
      this._loading.set(false);
    }
  }

  /**
   * Elimina un equipo
   */
  async deleteTeam(id: string): Promise<void> {
    this._loading.set(true);
    this._error.set(null);
    
    try {
      // Simular llamada a API
      await this.delay(300);
      
      // Remover el equipo de la lista
      this._teams.update(teams => teams.filter(team => team.id !== id));
    } catch (error) {
      this._error.set('Error al eliminar el equipo');
      console.error('Error deleting team:', error);
      throw error;
    } finally {
      this._loading.set(false);
    }
  }

  /**
   * Obtiene un equipo por ID
   */
  getTeamById(id: string): Team | undefined {
    return this._teams().find(team => team.id === id);
  }

  /**
   * Filtra equipos por término de búsqueda
   */
  searchTeams(searchTerm: string): Team[] {
    if (!searchTerm.trim()) {
      return this._teams();
    }
    
    const term = searchTerm.toLowerCase();
    return this._teams().filter(team => 
      team.name.toLowerCase().includes(term) ||
      team.sport.toLowerCase().includes(term) ||
      team.category.toLowerCase().includes(term)
    );
  }

  /**
   * Filtra equipos por deporte
   */
  filterTeamsBySport(sport: Sport | ''): Team[] {
    if (!sport) {
      return this._teams();
    }
    
    return this._teams().filter(team => team.sport === sport);
  }

  // Métodos privados
  private loadInitialData(): void {
    // Cargar datos iniciales si no hay equipos
    if (this._teams().length === 0) {
      this.loadTeams();
    }
  }

  private generateId(): string {
    return 'team_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private getMockTeams(): Team[] {
    return [
      {
        id: 'team_1',
        name: 'Leones FC',
        sport: 'football',
        category: 'Senior',
        color: 'blue',
        playersCount: 25,
        description: 'Equipo de fútbol senior masculino',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: 'team_2',
        name: 'Águilas Basketball',
        sport: 'basketball',
        category: 'Juvenil',
        color: 'red',
        playersCount: 12,
        description: 'Equipo de baloncesto juvenil mixto',
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01')
      },
      {
        id: 'team_3',
        name: 'Tiburones Natación',
        sport: 'swimming',
        category: 'Infantil',
        color: 'teal',
        playersCount: 18,
        description: 'Equipo de natación infantil',
        createdAt: new Date('2024-02-10'),
        updatedAt: new Date('2024-02-10')
      },
      {
        id: 'team_4',
        name: 'Panteras Voleibol',
        sport: 'volleyball',
        category: 'Senior',
        color: 'purple',
        playersCount: 14,
        description: 'Equipo de voleibol femenino senior',
        createdAt: new Date('2024-02-20'),
        updatedAt: new Date('2024-02-20')
      }
    ];
  }
}