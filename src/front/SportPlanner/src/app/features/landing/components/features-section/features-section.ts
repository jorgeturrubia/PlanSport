import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faUsers, 
  faChartLine, 
  faTrophy, 
  faCalendarAlt, 
  faUserFriends, 
  faBrain, 
  faClipboardList, 
  faRocket,
  faCog,
  faHeart,
  faArrowRight,
  faMobile,
  faShield
} from '@fortawesome/free-solid-svg-icons';
import { ScrollService } from '../../services/scroll';

interface Feature {
  icon: any;
  title: string;
  description: string;
  benefits: string[];
  color: string;
}

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './features-section.html',
  styleUrl: './features-section.css'
})
export class FeaturesSectionComponent {
  private scrollService = inject(ScrollService);

  // Font Awesome icons
  faCalendarAlt = faCalendarAlt;
  faChartLine = faChartLine;
  faUsers = faUsers;
  faBrain = faBrain;
  faMobile = faMobile;
  faShield = faShield;
  faRocket = faRocket;
  faCog = faCog;
  faHeart = faHeart;
  faArrowRight = faArrowRight;

  features: Feature[] = [
    {
      icon: faCalendarAlt,
      title: 'Planificación Inteligente',
      description: 'Crea planes de entrenamiento personalizados con IA que se adaptan automáticamente al progreso de cada atleta.',
      benefits: [
        'Algoritmos de IA avanzados',
        'Adaptación automática',
        'Periodización científica',
        'Objetivos personalizados'
      ],
      color: 'blue'
    },
    {
      icon: faChartLine,
      title: 'Análisis de Rendimiento',
      description: 'Monitorea el progreso en tiempo real con métricas avanzadas y visualizaciones interactivas.',
      benefits: [
        'Métricas en tiempo real',
        'Gráficos interactivos',
        'Comparativas históricas',
        'Predicciones de rendimiento'
      ],
      color: 'green'
    },
    {
      icon: faUsers,
      title: 'Gestión de Equipos',
      description: 'Administra múltiples atletas y equipos desde una plataforma centralizada con roles y permisos.',
      benefits: [
        'Gestión centralizada',
        'Roles y permisos',
        'Comunicación integrada',
        'Seguimiento grupal'
      ],
      color: 'purple'
    },
    {
      icon: faBrain,
      title: 'IA Deportiva',
      description: 'Inteligencia artificial especializada en deportes que optimiza entrenamientos y previene lesiones.',
      benefits: [
        'Prevención de lesiones',
        'Optimización automática',
        'Recomendaciones personalizadas',
        'Aprendizaje continuo'
      ],
      color: 'orange'
    },
    {
      icon: faMobile,
      title: 'App Móvil',
      description: 'Accede a todos tus entrenamientos desde cualquier dispositivo con sincronización en tiempo real.',
      benefits: [
        'Acceso multiplataforma',
        'Sincronización automática',
        'Modo offline',
        'Notificaciones inteligentes'
      ],
      color: 'indigo'
    },
    {
      icon: faShield,
      title: 'Seguridad Avanzada',
      description: 'Protección de datos de nivel empresarial con encriptación y cumplimiento de normativas internacionales.',
      benefits: [
        'Encriptación end-to-end',
        'Cumplimiento GDPR',
        'Backups automáticos',
        'Auditorías de seguridad'
      ],
      color: 'red'
    }
  ];

  mainBenefits = [
    {
      icon: faRocket,
      title: 'Mejora del 40%',
      description: 'en el rendimiento deportivo'
    },
    {
      icon: faCog,
      title: 'Ahorro del 60%',
      description: 'en tiempo de planificación'
    },
    {
      icon: faHeart,
      title: 'Reducción del 50%',
      description: 'en riesgo de lesiones'
    }
  ];

  scrollToMarketplace(): void {
    this.scrollService.scrollToElement('marketplace');
  }

  getColorClasses(color: string): { bg: string; text: string; border: string } {
    const colorMap: { [key: string]: { bg: string; text: string; border: string } } = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
      green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-200' },
      red: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-200' }
    };
    return colorMap[color] || colorMap['blue'];
  }

  trackByFeature(index: number, feature: Feature): string {
    return feature.title;
  }

  trackByBenefit(index: number, benefit: any): string {
    return benefit.title || index.toString();
  }
}
