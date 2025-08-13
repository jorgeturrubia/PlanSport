import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <!-- Header -->
      <header class="bg-white dark:bg-gray-800 shadow dark:shadow-gray-900/50 transition-colors">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <nav class="flex space-x-4">
              <a routerLink="/teams" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Teams</a>
              <a routerLink="/profile" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Profile</a>
              <button (click)="logout()" class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors">Logout</button>
            </nav>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-lg h-96 transition-colors">
            <div class="flex items-center justify-center h-full">
              <div class="text-center">
                <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4 transition-colors">Welcome to SportPlanner</h2>
                <p class="text-gray-500 dark:text-gray-400 transition-colors">Your sports management dashboard</p>
                
                <!-- Quick Stats -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow dark:shadow-gray-900/50 transition-colors">
                    <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Teams</h3>
                    <p class="text-3xl font-bold text-blue-600 dark:text-blue-400">0</p>
                  </div>
                  <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow dark:shadow-gray-900/50 transition-colors">
                    <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Events</h3>
                    <p class="text-3xl font-bold text-green-600 dark:text-green-400">0</p>
                  </div>
                  <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow dark:shadow-gray-900/50 transition-colors">
                    <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Players</h3>
                    <p class="text-3xl font-bold text-purple-600 dark:text-purple-400">0</p>
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
