import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faStore, 
  faStar, 
  faDownload, 
  faShare, 
  faAward,
  faFilter,
  faSearch,
  faUser,
  faClock,
  faFutbol,
  faBasketballBall,
  faSwimmer,
  faFireAlt,
  faHeart,
  faEye
} from '@fortawesome/free-solid-svg-icons';

import { landingAnimations } from '../../animations/landing.animations';

interface Planning {
  id: number;
  title: string;
  author: string;
  sport: string;
  sportIcon: any;
  rating: number;
  downloads: number;
  views: number;
  likes: number;
  category: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  duration: string;
  image: string;
  isFeatured?: boolean;
  isNew?: boolean;
}

interface Statistic {
  icon: any;
  value: string;
  label: string;
  color: string;
}

@Component({
  selector: 'app-marketplace-section',
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  templateUrl: './marketplace-section.html',
  styleUrl: './marketplace-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    landingAnimations.fadeInUp,
    landingAnimations.fadeInLeft,
    landingAnimations.fadeInRight,
    landingAnimations.scaleIn
  ],
  host: {
    class: 'block'
  }
})
export class MarketplaceSection {
  // Iconos
  readonly faStore = faStore;
  readonly faStar = faStar;
  readonly faDownload = faDownload;
  readonly faShare = faShare;
  readonly faAward = faAward;
  readonly faFilter = faFilter;
  readonly faSearch = faSearch;
  readonly faUser = faUser;
  readonly faClock = faClock;
  readonly faFireAlt = faFireAlt;
  readonly faHeart = faHeart;
  readonly faEye = faEye;
  
  // Estado
  readonly selectedCategory = signal<string>('all');
  
  // Estadísticas del marketplace
  readonly statistics: Statistic[] = [
    {
      icon: this.faStore,
      value: '10,000+',
      label: 'Planificaciones',
      color: 'text-blue-600'
    },
    {
      icon: this.faUser,
      value: '5,000+',
      label: 'Entrenadores',
      color: 'text-green-600'
    },
    {
      icon: this.faDownload,
      value: '100K+',
      label: 'Descargas',
      color: 'text-purple-600'
    },
    {
      icon: this.faStar,
      value: '4.8',
      label: 'Valoración Media',
      color: 'text-yellow-600'
    }
  ];
  
  // Planificaciones de ejemplo
  readonly featuredPlannings: Planning[] = [
    {
      id: 1,
      title: 'Pretemporada Completa - Fútbol Sub-17',
      author: 'Carlos Rodríguez',
      sport: 'Fútbol',
      sportIcon: faFutbol,
      rating: 4.9,
      downloads: 1250,
      views: 5420,
      likes: 342,
      category: 'Pretemporada',
      difficulty: 'Intermedio',
      duration: '8 semanas',
      image: 'assets/planning-1.jpg',
      isFeatured: true,
      isNew: false
    },
    {
      id: 2,
      title: 'Entrenamiento de Velocidad - Natación',
      author: 'María González',
      sport: 'Natación',
      sportIcon: faSwimmer,
      rating: 4.7,
      downloads: 892,
      views: 3200,
      likes: 215,
      category: 'Velocidad',
      difficulty: 'Avanzado',
      duration: '12 semanas',
      image: 'assets/planning-2.jpg',
      isFeatured: false,
      isNew: true
    },
    {
      id: 3,
      title: 'Fundamentos del Baloncesto - Iniciación',
      author: 'Juan Martínez',
      sport: 'Baloncesto',
      sportIcon: faBasketballBall,
      rating: 4.8,
      downloads: 2100,
      views: 8900,
      likes: 567,
      category: 'Fundamentos',
      difficulty: 'Principiante',
      duration: '16 semanas',
      image: 'assets/planning-3.jpg',
      isFeatured: true,
      isNew: false
    }
  ];
  
  // Categorías populares
  readonly categories = [
    { value: 'all', label: 'Todas', count: 10000 },
    { value: 'pretemporada', label: 'Pretemporada', count: 1543 },
    { value: 'fundamentos', label: 'Fundamentos', count: 2341 },
    { value: 'velocidad', label: 'Velocidad', count: 892 },
    { value: 'fuerza', label: 'Fuerza', count: 1205 },
    { value: 'tactica', label: 'Táctica', count: 1876 }
  ];
  
  /**
   * Genera las estrellas para el rating
   */
  getRatingStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return Array(fullStars).fill(1)
      .concat(hasHalfStar ? [0.5] : [])
      .concat(Array(emptyStars).fill(0));
  }
  
  /**
   * Obtiene el color del badge de dificultad
   */
  getDifficultyColor(difficulty: string): string {
    const colors: { [key: string]: string } = {
      'Principiante': 'bg-green-100 text-green-700',
      'Intermedio': 'bg-yellow-100 text-yellow-700',
      'Avanzado': 'bg-red-100 text-red-700'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-700';
  }
  
  /**
   * Filtra planificaciones por categoría
   */
  filterByCategory(category: string): void {
    this.selectedCategory.set(category);
  }
}
