import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-features',
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturesComponent {
  // Default features based on SportAgentoos mission
  private readonly defaultFeatures: Feature[] = [
    {
      icon: '🤖',
      title: 'Generación Automática',
      description: 'Genera entrenamientos completos automáticamente basados en las características de tu equipo, objetivos y disponibilidad.'
    },
    {
      icon: '🌐',
      title: 'Marketplace Colaborativo',
      description: 'Accede a una plataforma donde coaches comparten y califican metodologías de entrenamiento probadas.'
    },
    {
      icon: '🏢',
      title: 'Multi-tenant',
      description: 'Perfecto para clubs deportivos que manejan múltiples equipos con gestión centralizada y datos separados.'
    },
    {
      icon: '⚡',
      title: 'Ahorro de Tiempo',
      description: 'Reduce en un 80% el tiempo de preparación de entrenamientos con planificación automática inteligente.'
    },
    {
      icon: '📊',
      title: 'Análisis Avanzado',
      description: 'Obtén insights detallados sobre el rendimiento del equipo y la efectividad de los entrenamientos.'
    },
    {
      icon: '🎯',
      title: 'Personalización Total',
      description: 'Adapta cada sesión a las necesidades específicas de tu deporte, nivel y objetivos del equipo.'
    },
    {
      icon: '💬',
      title: 'Colaboración en Tiempo Real',
      description: 'Comparte planes, recibe feedback y colabora con tu equipo técnico en tiempo real.'
    },
    {
      icon: '📱',
      title: 'Acceso Móvil',
      description: 'Accede a tus planes desde cualquier dispositivo, en el campo o donde estés.'
    }
  ];

  // Input signals for component configuration
  title = input<string>('Características');
  subtitle = input<string>('Todo lo que necesitas para gestionar tu equipo deportivo de manera eficiente');
  features = input<Feature[]>(this.defaultFeatures);
  showHeader = input<boolean>(true);
  maxColumns = input<number>(4); // For responsive grid

  /**
   * Generates the slot selector for a feature's action content
   */
  getFeatureSlotSelector(featureTitle: string): string {
    return `[slot=action-${featureTitle.replace(/\s+/g, '-').toLowerCase()}]`;
  }
}
