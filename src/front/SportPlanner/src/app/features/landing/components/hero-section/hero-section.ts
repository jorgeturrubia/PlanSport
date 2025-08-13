import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faFutbol,
  faBasketballBall,
  faSwimmer,
  faRunning,
  faVolleyballBall,
  faArrowRight,
  faPlayCircle,
  faCheck
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class HeroSectionComponent {
  constructor(private readonly router: Router) {}
  
  // Font Awesome icons
  faFutbol = faFutbol;
  faBasketballBall = faBasketballBall;
  faSwimmer = faSwimmer;
  faRunning = faRunning;
  faVolleyballBall = faVolleyballBall;
  faArrowRight = faArrowRight;
  faPlayCircle = faPlayCircle;
  faCheck = faCheck;
  
  // Sports icons for floating animation
  sportsIcons = [
    { icon: faFutbol, label: 'Fútbol', delay: '0s' },
    { icon: faBasketballBall, label: 'Baloncesto', delay: '0.5s' },
    { icon: faSwimmer, label: 'Natación', delay: '1s' },
    { icon: faRunning, label: 'Atletismo', delay: '1.5s' },
    { icon: faVolleyballBall, label: 'Voleibol', delay: '2s' }
  ];
  
  // Key features for badges
  keyFeatures = [
    'Planificación Inteligente',
    'Análisis de Rendimiento',
    'Gestión de Equipos'
  ];

  /**
   * Navigates to register page
   */
  goToRegister(): void {
    this.router.navigate(['/auth/register']);
  }

  /**
   * Scrolls to features section
   */
  learnMore(): void {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * Generate random position for floating icons
   */
  getRandomPosition(): number {
    return Math.random() * 80 + 10; // Random between 10% and 90%
  }

  /**
   * TrackBy function for sports icons
   */
  trackBySport(index: number, sport: any): string {
    return sport.name || index.toString();
  }
}
