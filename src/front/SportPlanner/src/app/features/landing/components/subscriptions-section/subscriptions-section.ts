import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faCrown, 
  faGem, 
  faCheck, 
  faTimes,
  faRocket,
  faUsers,
  faInfinity,
  faChartLine,
  faDatabase,
  faHeadset,
  faMobile,
  faCloudUploadAlt,
  faShieldAlt,
  faStar
} from '@fortawesome/free-solid-svg-icons';

import { landingAnimations } from '../../animations/landing.animations';

interface PlanFeature {
  text: string;
  included: boolean;
  tooltip?: string;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  icon: any;
  price: number;
  currency: string;
  period: string;
  description: string;
  isPopular: boolean;
  color: string;
  features: PlanFeature[];
  maxTeams?: number;
  maxPlayers?: number;
  maxTrainings?: number;
}

@Component({
  selector: 'app-subscriptions-section',
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  templateUrl: './subscriptions-section.html',
  styleUrl: './subscriptions-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    landingAnimations.fadeInUp,
    landingAnimations.scaleIn,
    landingAnimations.pulse
  ],
  host: {
    class: 'block'
  }
})
export class SubscriptionsSection {
  // Iconos
  readonly faCheck = faCheck;
  readonly faTimes = faTimes;
  readonly faStar = faStar;
  readonly faInfinity = faInfinity;
  
  // Estado
  readonly billingPeriod = signal<'monthly' | 'annual'>('monthly');
  
  // Planes de suscripción
  readonly plans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Gratuito',
      icon: faRocket,
      price: 0,
      currency: '€',
      period: 'mes',
      description: 'Perfecto para empezar y probar la plataforma',
      isPopular: false,
      color: 'gray',
      maxTeams: 1,
      maxPlayers: 20,
      maxTrainings: 15,
      features: [
        { text: '1 equipo', included: true },
        { text: 'Hasta 20 jugadores', included: true },
        { text: '15 entrenamientos/mes', included: true },
        { text: 'Plantillas básicas', included: true },
        { text: 'Reportes básicos', included: true },
        { text: 'Soporte por email', included: true },
        { text: 'Acceso al marketplace', included: false },
        { text: 'Personalización avanzada', included: false },
        { text: 'Exportación de datos', included: false },
        { text: 'API access', included: false }
      ]
    },
    {
      id: 'coach',
      name: 'Entrenador',
      icon: faGem,
      price: 19.99,
      currency: '€',
      period: 'mes',
      description: 'Todo lo que necesitas para gestionar tus equipos profesionalmente',
      isPopular: true,
      color: 'blue',
      maxTeams: 5,
      maxPlayers: undefined,
      maxTrainings: undefined,
      features: [
        { text: 'Hasta 5 equipos', included: true },
        { text: 'Jugadores ilimitados', included: true },
        { text: 'Entrenamientos ilimitados', included: true },
        { text: 'Acceso completo al marketplace', included: true },
        { text: 'Personalización avanzada', included: true },
        { text: 'Análisis y métricas detalladas', included: true },
        { text: 'Exportación de datos (Excel, PDF)', included: true },
        { text: 'Soporte prioritario', included: true },
        { text: 'App móvil completa', included: true },
        { text: 'Modo multi-usuario', included: false }
      ]
    },
    {
      id: 'club',
      name: 'Club',
      icon: faCrown,
      price: 49.99,
      currency: '€',
      period: 'mes',
      description: 'Solución completa para clubes y academias deportivas',
      isPopular: false,
      color: 'purple',
      maxTeams: undefined,
      maxPlayers: undefined,
      maxTrainings: undefined,
      features: [
        { text: 'Equipos ilimitados', included: true },
        { text: 'Jugadores ilimitados', included: true },
        { text: 'Entrenamientos ilimitados', included: true },
        { text: 'Todo del plan Entrenador', included: true },
        { text: 'Modo director deportivo', included: true },
        { text: 'Gestión multi-usuario', included: true },
        { text: 'API access completo', included: true },
        { text: 'Branding personalizado', included: true },
        { text: 'Soporte 24/7 dedicado', included: true },
        { text: 'Formación y onboarding', included: true }
      ]
    }
  ];
  
  // Características adicionales
  readonly additionalFeatures = [
    { icon: faCloudUploadAlt, text: 'Backup automático en la nube' },
    { icon: faShieldAlt, text: 'Seguridad SSL y encriptación' },
    { icon: faMobile, text: 'Apps nativas iOS y Android' },
    { icon: faHeadset, text: 'Soporte en español' }
  ];
  
  /**
   * Cambia el periodo de facturación
   */
  toggleBillingPeriod(): void {
    this.billingPeriod.update(period => 
      period === 'monthly' ? 'annual' : 'monthly'
    );
  }
  
  /**
   * Calcula el precio con descuento anual
   */
  getPrice(plan: SubscriptionPlan): number {
    if (this.billingPeriod() === 'annual' && plan.price > 0) {
      // 20% descuento en pago anual
      return Math.round(plan.price * 0.8 * 100) / 100;
    }
    return plan.price;
  }
  
  /**
   * Obtiene el texto del periodo
   */
  getPeriodText(): string {
    return this.billingPeriod() === 'monthly' ? '/mes' : '/mes (pago anual)';
  }
  
  /**
   * Obtiene las clases de color para el plan
   */
  getPlanColorClasses(color: string, isPopular: boolean): string {
    if (isPopular) {
      return 'border-blue-500 shadow-xl';
    }
    
    const colorMap: { [key: string]: string } = {
      'gray': 'border-gray-300',
      'blue': 'border-blue-500',
      'purple': 'border-purple-500'
    };
    return colorMap[color] || 'border-gray-300';
  }
  
  /**
   * Obtiene el color del botón
   */
  getButtonColorClasses(color: string): string {
    const colorMap: { [key: string]: string } = {
      'gray': 'bg-gray-600 hover:bg-gray-700',
      'blue': 'bg-blue-600 hover:bg-blue-700',
      'purple': 'bg-purple-600 hover:bg-purple-700'
    };
    return colorMap[color] || 'bg-gray-600 hover:bg-gray-700';
  }
}
