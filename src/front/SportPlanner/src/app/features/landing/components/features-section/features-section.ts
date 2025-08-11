import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faRocket, 
  faUsers, 
  faChartLine, 
  faCalendarAlt, 
  faTasks, 
  faClock,
  faArrowRight,
  faMobileAlt,
  faCloud,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';

import { landingAnimations } from '../../animations/landing.animations';

interface Feature {
  icon: any;
  title: string;
  description: string;
  color: string;
  benefits: string[];
}

@Component({
  selector: 'app-features-section',
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  templateUrl: './features-section.html',
  styleUrl: './features-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    landingAnimations.fadeInUp,
    landingAnimations.scaleIn,
    landingAnimations.listAnimation
  ],
  host: {
    class: 'block'
  }
})
export class FeaturesSection {
  // Iconos adicionales
  readonly faArrowRight = faArrowRight;
  
  // Características principales
  readonly features: Feature[] = [
    {
      icon: faRocket,
      title: 'Inicio Rápido',
      description: 'Crea tu primera planificación en menos de 5 minutos con plantillas predefinidas.',
      color: 'bg-purple-500',
      benefits: ['Plantillas probadas', 'Setup guiado', 'Sin curva de aprendizaje']
    },
    {
      icon: faUsers,
      title: 'Gestión de Equipos',
      description: 'Administra múltiples equipos, jugadores y categorías desde un solo lugar.',
      color: 'bg-blue-500',
      benefits: ['Equipos ilimitados', 'Control de asistencia', 'Estadísticas por jugador']
    },
    {
      icon: faChartLine,
      title: 'Análisis Avanzado',
      description: 'Visualiza el progreso con métricas detalladas y reportes personalizados.',
      color: 'bg-green-500',
      benefits: ['Dashboards en tiempo real', 'Exportación de datos', 'Insights automáticos']
    },
    {
      icon: faCalendarAlt,
      title: 'Calendario Inteligente',
      description: 'Programa entrenamientos automáticamente según disponibilidad y objetivos.',
      color: 'bg-indigo-500',
      benefits: ['Sincronización automática', 'Notificaciones', 'Vista múltiple']
    },
    {
      icon: faTasks,
      title: 'Objetivos Flexibles',
      description: 'Define y ajusta objetivos por categoría con seguimiento del cumplimiento.',
      color: 'bg-yellow-500',
      benefits: ['Categorización completa', 'Progreso visual', 'Ajuste dinámico']
    },
    {
      icon: faClock,
      title: 'Ejecución en Vivo',
      description: 'Cronómetro integrado y vista dinámica para dirigir entrenamientos.',
      color: 'bg-red-500',
      benefits: ['Cronómetro inteligente', 'Modo presentación', 'Control táctil']
    }
  ];
  
  // Características adicionales (para mostrar en badges)
  readonly additionalFeatures = [
    { icon: faMobileAlt, text: 'App Móvil' },
    { icon: faCloud, text: 'Sincronización en la nube' },
    { icon: faShieldAlt, text: 'Datos seguros' }
  ];
  
  /**
   * Obtiene el índice de animación para stagger effect
   */
  getAnimationDelay(index: number): string {
    return `${index * 100}ms`;
  }
  
  /**
   * Obtiene las clases de color para el icono
   */
  getIconColorClasses(color: string): string {
    const colorMap: { [key: string]: string } = {
      'bg-purple-500': 'text-purple-500 bg-purple-100',
      'bg-blue-500': 'text-blue-500 bg-blue-100',
      'bg-green-500': 'text-green-500 bg-green-100',
      'bg-indigo-500': 'text-indigo-500 bg-indigo-100',
      'bg-yellow-500': 'text-yellow-500 bg-yellow-100',
      'bg-red-500': 'text-red-500 bg-red-100'
    };
    return colorMap[color] || 'text-gray-500 bg-gray-100';
  }
}
