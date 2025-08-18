import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Team, CreateTeamRequest, UpdateTeamRequest } from '../interfaces/team.interface';
import { environment } from '../../../../environments/environment';

export interface TeamsState {
  teams: Team[];
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private http = inject(HttpClient);
  private readonly API_BASE = `${environment.apiUrl}/teams`;

  // State signals
  private state = signal<TeamsState>({
    teams: [],
    loading: false,
    error: null
  });

  // Public readonly signals
  teams = signal<Team[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {
    this.loadTeams();
  }

  // Load all teams
  loadTeams(): void {
    this.setLoading(true);
    this.clearError();

    this.http.get<Team[]>(this.API_BASE)
      .pipe(
        catchError(this.handleError.bind(this)),
        finalize(() => this.setLoading(false))
      )
      .subscribe({
        next: (teams) => {
          this.teams.set(teams);
        },
        error: (error) => {
          this.setError('Error al cargar los equipos');
          console.error('Error loading teams:', error);
        }
      });
  }

  // Create new team
  createTeam(teamData: CreateTeamRequest): void {
    this.setLoading(true);
    this.clearError();

    this.http.post<Team>(this.API_BASE, teamData)
      .pipe(
        catchError(this.handleError.bind(this)),
        finalize(() => this.setLoading(false))
      )
      .subscribe({
        next: (newTeam) => {
          // Optimistic update
          this.teams.update(teams => [...teams, newTeam]);
        },
        error: (error) => {
          this.setError('Error al crear el equipo');
          console.error('Error creating team:', error);
        }
      });
  }

  // Update existing team
  updateTeam(teamId: string, teamData: UpdateTeamRequest): void {
    this.setLoading(true);
    this.clearError();

    this.http.put<Team>(`${this.API_BASE}/${teamId}`, teamData)
      .pipe(
        catchError(this.handleError.bind(this)),
        finalize(() => this.setLoading(false))
      )
      .subscribe({
        next: (updatedTeam) => {
          // Optimistic update
          this.teams.update(teams => 
            teams.map(team => 
              team.id === teamId ? updatedTeam : team
            )
          );
        },
        error: (error) => {
          this.setError('Error al actualizar el equipo');
          console.error('Error updating team:', error);
        }
      });
  }

  // Delete team
  deleteTeam(teamId: string): void {
    this.setLoading(true);
    this.clearError();

    this.http.delete(`${this.API_BASE}/${teamId}`)
      .pipe(
        catchError(this.handleError.bind(this)),
        finalize(() => this.setLoading(false))
      )
      .subscribe({
        next: () => {
          // Optimistic update
          this.teams.update(teams => 
            teams.filter(team => team.id !== teamId)
          );
        },
        error: (error) => {
          this.setError('Error al eliminar el equipo');
          console.error('Error deleting team:', error);
        }
      });
  }

  // Get team by ID
  getTeamById(teamId: string): Team | undefined {
    return this.teams().find(team => team.id === teamId);
  }

  // Private helper methods
  private setLoading(loading: boolean): void {
    this.loading.set(loading);
  }

  private setError(error: string): void {
    this.error.set(error);
  }

  private clearError(): void {
    this.error.set(null);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error inesperado';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'Datos inválidos';
          break;
        case 401:
          errorMessage = 'No autorizado';
          break;
        case 403:
          errorMessage = 'Acceso denegado';
          break;
        case 404:
          errorMessage = 'Recurso no encontrado';
          break;
        case 500:
          errorMessage = 'Error interno del servidor';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }
    
    return throwError(() => errorMessage);
  }

  refreshTeams(): void {
    this.loadTeams();
  }
}