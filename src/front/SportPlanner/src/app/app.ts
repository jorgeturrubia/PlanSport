import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { ThemeService } from './core/services/theme';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule], // Added CommonModule
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('SportPlanner');
  private readonly authService = inject(AuthService);
  private readonly themeService = inject(ThemeService);

  readonly isLoadingAuth = this.authService.isLoading;

  ngOnInit(): void {
    // El ThemeService se auto-inicializa en su constructor
    // pero podemos acceder a su estado si necesitamos
    console.log('Tema actual:', this.themeService.theme());
  }
}

