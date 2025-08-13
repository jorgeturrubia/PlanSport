import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { 
  faCheck, 
  faTimes, 
  faStar, 
  faUsers, 
  faInfinity, 
  faCrown, 
  faRocket, 
  faShield, 
  faHeadset, 
  faChartLine,
  faArrowRight,
  faBolt,
  faQuoteLeft
} from '@fortawesome/free-solid-svg-icons';
import { ScrollService } from '../../services/scroll';

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  period: string;
  popular?: boolean;
  features: PlanFeature[];
  limitations: string[];
  buttonText: string;
  buttonStyle: string;
  maxUsers: number | string;
  support: string;
  badge?: string;
}

interface PlanFeature {
  name: string;
  included: boolean;
  description?: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

@Component({
  selector: 'app-marketplace-section',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './marketplace-section.html',
  styleUrl: './marketplace-section.css'
})
export class MarketplaceSectionComponent {
  private router = inject(Router);
  private scrollService = inject(ScrollService);

  // Font Awesome icons
  faCheck = faCheck;
  faTimes = faTimes;
  faStar = faStar;
  faUsers = faUsers;
  faInfinity = faInfinity;
  faCrown = faCrown;
  faRocket = faRocket;
  faShield = faShield;
  faHeadset = faHeadset;
  faChartLine = faChartLine;
  faArrowRight = faArrowRight;
  faBolt = faBolt;

  pricingPlans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfecto para entrenadores individuales',
      price: 0,
      period: 'mes',
      features: [
        { name: 'Hasta 5 atletas', included: true },
        { name: 'Planes básicos de entrenamiento', included: true },
        { name: 'Métricas básicas', included: true },
        { name: 'App móvil', included: true },
        { name: 'Soporte por email', included: true },
        { name: 'Análisis avanzado con IA', included: false },
        { name: 'Gestión de equipos', included: false },
        { name: 'Integraciones', included: false },
        { name: 'Soporte prioritario', included: false }
      ],
      limitations: [
        'Máximo 5 atletas',
        'Funciones básicas únicamente',
        'Soporte limitado'
      ],
      buttonText: 'Comenzar Gratis',
      buttonStyle: 'bg-gray-600 hover:bg-gray-700 text-white',
      maxUsers: 5,
      support: 'Email'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Ideal para entrenadores profesionales',
      price: 29,
      originalPrice: 49,
      period: 'mes',
      popular: true,
      badge: 'Más Popular',
      features: [
        { name: 'Hasta 50 atletas', included: true },
        { name: 'Planes avanzados con IA', included: true },
        { name: 'Análisis completo de rendimiento', included: true },
        { name: 'Gestión de equipos', included: true },
        { name: 'App móvil premium', included: true },
        { name: 'Integraciones básicas', included: true },
        { name: 'Soporte prioritario', included: true },
        { name: 'Reportes personalizados', included: true },
        { name: 'API access', included: false }
      ],
      limitations: [
        'Máximo 50 atletas',
        'Integraciones limitadas'
      ],
      buttonText: 'Prueba 14 días gratis',
      buttonStyle: 'bg-blue-600 hover:bg-blue-700 text-white',
      maxUsers: 50,
      support: 'Chat y Email'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Para organizaciones deportivas grandes',
      price: 99,
      period: 'mes',
      features: [
        { name: 'Atletas ilimitados', included: true },
        { name: 'IA avanzada personalizada', included: true },
        { name: 'Análisis predictivo', included: true },
        { name: 'Gestión multi-equipo', included: true },
        { name: 'Todas las integraciones', included: true },
        { name: 'API completa', included: true },
        { name: 'Soporte 24/7', included: true },
        { name: 'Onboarding personalizado', included: true },
        { name: 'SLA garantizado', included: true }
      ],
      limitations: [],
      buttonText: 'Contactar Ventas',
      buttonStyle: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white',
      maxUsers: 'Ilimitado',
      support: '24/7 Dedicado'
    }
  ];

  testimonials: Testimonial[] = [
    {
      name: 'Carlos Mendoza',
      role: 'Entrenador Principal',
      company: 'FC Barcelona Academy',
      content: 'SportPlanner ha revolucionado completamente nuestra forma de entrenar. Los análisis de IA nos han ayudado a mejorar el rendimiento de nuestros jugadores en un 40%.',
      rating: 5,
      avatar: 'CM'
    },
    {
      name: 'Ana García',
      role: 'Directora Técnica',
      company: 'Real Madrid Femenino',
      content: 'La plataforma es increíblemente intuitiva. Hemos reducido el tiempo de planificación en un 60% y nuestras atletas están más motivadas que nunca.',
      rating: 5,
      avatar: 'AG'
    },
    {
      name: 'Miguel Torres',
      role: 'Preparador Físico',
      company: 'Selección Nacional',
      content: 'El análisis predictivo de lesiones ha sido un game-changer. Hemos reducido las lesiones en un 50% desde que usamos SportPlanner.',
      rating: 5,
      avatar: 'MT'
    }
  ];

  stats = [
    { value: '10,000+', label: 'Entrenadores Activos' },
    { value: '50,000+', label: 'Atletas Entrenando' },
    { value: '1M+', label: 'Entrenamientos Completados' },
    { value: '98%', label: 'Satisfacción del Cliente' }
  ];

  selectPlan(planId: string): void {
    if (planId === 'enterprise') {
      // Redirect to contact form or sales
      this.scrollService.scrollToElement('contact');
    } else {
      // Redirect to registration with plan parameter
      this.router.navigate(['/register'], { queryParams: { plan: planId } });
    }
  }

  scrollToSubscriptions(): void {
    this.scrollService.scrollToElement('subscriptions');
  }

  trackByPlan(index: number, plan: PricingPlan): string {
    return plan.id;
  }

  trackByFeature(index: number, feature: PlanFeature): string {
    return feature.name;
  }

  trackByTestimonial(index: number, testimonial: Testimonial): string {
    return testimonial.name;
  }

  getStarArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
