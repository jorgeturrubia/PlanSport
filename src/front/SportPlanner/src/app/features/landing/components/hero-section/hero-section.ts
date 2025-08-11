import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faFutbol, 
  faBasketballBall, 
  faSwimmer, 
  faRunning, 
  faVolleyballBall,
  faDumbbell,
  faArrowRight,
  faPlayCircle,
  faCheck,
  faStar,
  faUsers,
  faTrophy
} from '@fortawesome/free-solid-svg-icons';

import { ScrollService } from '../../services/scroll';
import { landingAnimations } from '../../animations/landing.animations';

interface SportIcon {
  icon: any;
  color: string;
  name: string;
}

interface Badge {
  icon: any;
  text: string;
  value: string;
  color: string;
}

@Component({
  selector: 'app-hero-section',
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    landingAnimations.fadeInUp,
    landingAnimations.fadeInLeft,
    landingAnimations.fadeInRight,
    landingAnimations.scaleIn,
    landingAnimations.pulse
  ],
  host: {
    class: 'block'
  }
})
export class HeroSection {
  private readonly scrollService = inject(ScrollService);
  
  // Iconos principales
  readonly faArrowRight = faArrowRight;
  readonly faPlayCircle = faPlayCircle;
  readonly faCheck = faCheck;
  readonly faStar = faStar;
  readonly faUsers = faUsers;
  readonly faTrophy = faTrophy;
  
  // Iconos de deportes
  readonly sports: SportIcon[] = [
    { icon: faFutbol, color: 'text-green-500', name: 'Fútbol' },
    { icon: faBasketballBall, color: 'text-orange-500', name: 'Baloncesto' },
    { icon: faSwimmer, color: 'text-blue-500', name: 'Natación' },
    { icon: faRunning, color: 'text-red-500', name: 'Atletismo' },
    { icon: faVolleyballBall, color: 'text-yellow-500', name: 'Voleibol' },
    { icon: faDumbbell, color: 'text-purple-500', name: 'Gimnasio' }
  ];
  
  // Badges flotantes animados
  readonly badges: Badge[] = [
    { 
      icon: this.faUsers, 
      text: 'Entrenadores activos',
      value: '5,000+',
      color: 'bg-blue-500'
    },
    { 
      icon: this.faStar, 
      text: 'Valoración promedio',
      value: '4.8/5',
      color: 'bg-yellow-500'
    },
    { 
      icon: this.faTrophy, 
      text: 'Planificaciones creadas',
      value: '50,000+',
      color: 'bg-green-500'
    }
  ];
  
  // Estado para animaciones
  readonly isVisible = signal(true);
  
  // Texto animado
  readonly animatedText = computed(() => {
    return this.isVisible() ? 'fadeInUp' : '';
  });
  
  /**
   * Navega a la sección de características
   */
  scrollToFeatures(): void {
    this.scrollService.scrollToSection('features');
  }
  
  /**
   * Navega a la sección de planes
   */
  scrollToPlans(): void {
    this.scrollService.scrollToSection('subscriptions');
  }
  
  /**
   * Abre video demo (placeholder)
   */
  playDemo(): void {
    // TODO: Implementar modal de video o redirección
    console.log('Reproducir video demo');
    alert('Video demo próximamente disponible');
  }
}
