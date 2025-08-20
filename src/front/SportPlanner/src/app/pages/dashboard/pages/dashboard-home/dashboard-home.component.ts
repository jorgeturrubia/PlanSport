import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../features/auth/services/auth.service';
import { AuthUser } from '../../../../features/auth/models/auth.interfaces';
import { TeamsService } from '../../services/teams.service';
import { StatisticsCardComponent } from '../../../../shared/components/statistics-card/statistics-card.component';
import { SportIconComponent } from '../../../../shared/components/sport-icon/sport-icon.component';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    StatisticsCardComponent,
    SportIconComponent
  ],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent {
  private teamsService = inject(TeamsService);
  private authService = inject(AuthService);
  private router = inject(Router);

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

  // Expose Math for template
  Math = Math;

  onTeamsClick(): void {
    this.router.navigate(['/dashboard/teams']);
  }

  getTeamColorTheme(color: string): 'green' | 'blue' | 'purple' | 'amber' | 'red' | 'indigo' | 'gray' {
    // Map team colors to theme colors
    const colorMap: { [key: string]: 'green' | 'blue' | 'purple' | 'amber' | 'red' | 'indigo' | 'gray' } = {
      '#ef4444': 'red',
      '#f97316': 'amber',
      '#22c55e': 'green',
      '#3b82f6': 'blue',
      '#8b5cf6': 'purple',
      '#6366f1': 'indigo'
    };
    return colorMap[color] || 'gray';
  }
}