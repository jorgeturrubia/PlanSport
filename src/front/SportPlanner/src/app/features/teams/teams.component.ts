import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <h1 class="text-3xl font-bold text-gray-900">Teams</h1>
            <nav class="flex space-x-4">
              <a routerLink="/dashboard" class="text-gray-600 hover:text-gray-900">Dashboard</a>
              <a routerLink="/profile" class="text-gray-600 hover:text-gray-900">Profile</a>
              <button (click)="logout()" class="text-red-600 hover:text-red-900">Logout</button>
            </nav>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <!-- Create Team Button -->
          <div class="mb-6">
            <button (click)="createTeam()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create New Team
            </button>
          </div>

          <!-- Teams Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @if (teams.length === 0) {
              <div class="col-span-full text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">No teams</h3>
                <p class="mt-1 text-sm text-gray-500">Get started by creating a new team.</p>
              </div>
            }
            
            @for (team of teams; track team.id) {
              <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">{{ team.name }}</h3>
                  <div class="mt-2 max-w-xl text-sm text-gray-500">
                    <p>{{ team.description }}</p>
                  </div>
                  <div class="mt-3">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {{ team.members }} members
                    </span>
                  </div>
                  <div class="mt-5">
                    <button (click)="viewTeam(team.id)" class="text-blue-600 hover:text-blue-900 text-sm font-medium">
                      View details →
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </main>
    </div>
  `,
  styles: []
})
export class TeamsComponent {
  teams: any[] = []; // Replace with proper Team interface

  createTeam() {
    console.log('Create team clicked');
    // Implement team creation logic
  }

  viewTeam(teamId: string) {
    console.log('View team:', teamId);
    // Navigate to team details
  }

  logout() {
    console.log('Logout clicked');
    // Implement logout logic
  }
}
