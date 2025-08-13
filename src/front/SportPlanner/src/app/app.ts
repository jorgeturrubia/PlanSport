import { Component, signal, inject } from '@angular/core'; // Added inject
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service'; // Import AuthService
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf/ngClass

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule], // Added CommonModule
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('SportPlanner');
  private readonly authService = inject(AuthService); // Inject AuthService

  readonly isLoadingAuth = this.authService.isLoading; // Expose isLoading from AuthService
}

