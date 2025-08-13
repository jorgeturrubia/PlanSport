import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
            <nav class="flex space-x-4">
              <a routerLink="/teams" class="text-gray-600 hover:text-gray-900">Teams</a>
              <a routerLink="/profile" class="text-gray-600 hover:text-gray-900">Profile</a>
              <button (click)="logout()" class="text-red-600 hover:text-red-900">Logout</button>
            </nav>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="border-4 border-dashed border-gray-200 rounded-lg h-96">
            <div class="flex items-center justify-center h-full">
              <div class="text-center">
                <h2 class="text-2xl font-semibold text-gray-700 mb-4">Welcome to SportPlanner</h2>
                <p class="text-gray-500">Your sports management dashboard</p>
                
                <!-- Quick Stats -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-lg font-semibold text-gray-700">Teams</h3>
                    <p class="text-3xl font-bold text-blue-600">0</p>
                  </div>
                  <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-lg font-semibold text-gray-700">Events</h3>
                    <p class="text-3xl font-bold text-green-600">0</p>
                  </div>
                  <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-lg font-semibold text-gray-700">Players</h3>
                    <p class="text-3xl font-bold text-purple-600">0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: []
})
export class DashboardComponent {
  logout() {
    // Implement logout logic here
    console.log('Logout clicked');
    // You'll need to inject AuthService and Router to handle logout properly
  }
}
