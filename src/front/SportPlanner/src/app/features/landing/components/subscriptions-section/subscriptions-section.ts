import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { 
  faEnvelope, 
  faCheck, 
  faBell, 
  faGift, 
  faUsers, 
  faChartLine, 
  faShield,
  faArrowRight,
  faStar,
  faHeart,
  faRocket,
  faCrown
} from '@fortawesome/free-solid-svg-icons';
import { ScrollService } from '../../services/scroll';

interface NewsletterBenefit {
  icon: any;
  title: string;
  description: string;
}

interface SubscriptionTier {
  name: string;
  description: string;
  benefits: string[];
  icon: any;
  color: string;
}

@Component({
  selector: 'app-subscriptions-section',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './subscriptions-section.html',
  styleUrl: './subscriptions-section.css'
})
export class SubscriptionsSectionComponent {
  private router = inject(Router);
  private scrollService = inject(ScrollService);

  // Font Awesome icons
  faEnvelope = faEnvelope;
  faCheck = faCheck;
  faBell = faBell;
  faGift = faGift;
  faUsers = faUsers;
  faChartLine = faChartLine;
  faShield = faShield;
  faArrowRight = faArrowRight;
  faStar = faStar;
  faHeart = faHeart;
  faRocket = faRocket;
  faCrown = faCrown;

  // Form data
  email: string = '';
  isSubscribing: boolean = false;
  subscriptionSuccess: boolean = false;
  subscriptionError: string = '';

  newsletterBenefits: NewsletterBenefit[] = [
    {
      icon: faBell,
      title: 'Actualizaciones Exclusivas',
      description: 'Sé el primero en conocer nuevas funcionalidades y mejoras'
    },
    {
      icon: faGift,
      title: 'Contenido Premium',
      description: 'Acceso a guías, plantillas y recursos exclusivos para suscriptores'
    },
    {
      icon: faChartLine,
      title: 'Insights Deportivos',
      description: 'Análisis y tendencias del mundo del entrenamiento deportivo'
    },
    {
      icon: faUsers,
      title: 'Comunidad Exclusiva',
      description: 'Conecta con otros entrenadores y comparte experiencias'
    }
  ];

  subscriptionTiers: SubscriptionTier[] = [
    {
      name: 'Newsletter Básico',
      description: 'Recibe actualizaciones mensuales sobre SportPlanner',
      benefits: [
        'Actualizaciones de producto',
        'Tips de entrenamiento',
        'Casos de éxito',
        'Eventos y webinars'
      ],
      icon: faEnvelope,
      color: 'blue'
    },
    {
      name: 'Insights Pro',
      description: 'Contenido avanzado para entrenadores profesionales',
      benefits: [
        'Todo lo del Newsletter Básico',
        'Análisis de tendencias deportivas',
        'Guías técnicas exclusivas',
        'Acceso anticipado a funciones',
        'Descuentos especiales'
      ],
      icon: faStar,
      color: 'purple'
    },
    {
      name: 'Comunidad Elite',
      description: 'Acceso completo a nuestra comunidad de expertos',
      benefits: [
        'Todo lo de Insights Pro',
        'Acceso a foro privado',
        'Sesiones Q&A con expertos',
        'Networking con profesionales',
        'Certificaciones exclusivas'
      ],
      icon: faCrown,
      color: 'gold'
    }
  ];

  async subscribeToNewsletter(): Promise<void> {
    if (!this.email || !this.isValidEmail(this.email)) {
      this.subscriptionError = 'Por favor, introduce un email válido';
      return;
    }

    this.isSubscribing = true;
    this.subscriptionError = '';

    try {
      // Simulate API call
      await this.simulateSubscription();
      this.subscriptionSuccess = true;
      this.email = '';
    } catch (error) {
      this.subscriptionError = 'Error al suscribirse. Por favor, inténtalo de nuevo.';
    } finally {
      this.isSubscribing = false;
    }
  }

  private async simulateSubscription(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  goToRegister(): void {
    this.router.navigate(['/auth/register']);
  }

  resetForm(): void {
    this.subscriptionSuccess = false;
    this.subscriptionError = '';
  }

  getColorClasses(color: string): { bg: string; text: string; border: string } {
    const colorMap: { [key: string]: { bg: string; text: string; border: string } } = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
      gold: { bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-200' }
    };
    return colorMap[color] || colorMap['blue'];
  }

  trackByBenefit(index: number, benefit: NewsletterBenefit): string {
    return benefit.title;
  }

  trackByTier(index: number, tier: SubscriptionTier): string {
    return tier.name;
  }

  trackByTierBenefit(index: number, benefit: string): string {
    return benefit;
  }
}
