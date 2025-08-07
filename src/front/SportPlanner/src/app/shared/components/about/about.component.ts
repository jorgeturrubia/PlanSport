import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
  // Default testimonials for SportAgentoos
  private readonly defaultTestimonials: Testimonial[] = [
    {
      name: 'Carlos Mendoza',
      role: 'Entrenador Principal - FC Barcelona Academy',
      content: 'SportAgentoos ha transformado completamente cómo planificamos nuestros entrenamientos. El tiempo que antes dedicábamos a crear sesiones ahora lo invertimos en perfeccionar la técnica con los jugadores.',
      rating: 5,
      avatar: '👨‍🏫'
    },
    {
      name: 'María González',
      role: 'Directora Técnica - Club Atlético Madrid',
      content: 'La función de marketplace nos ha permitido acceder a metodologías de entrenamiento de clase mundial. Nuestros equipos han mejorado significativamente su rendimiento.',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'Roberto Silva',
      role: 'Preparador Físico - Real Sociedad',
      content: 'El análisis automático de datos nos proporciona insights que antes tardábamos semanas en obtener. Es como tener un asistente técnico 24/7.',
      rating: 5,
      avatar: '👨‍💻'
    },
    {
      name: 'Ana Rodríguez',
      role: 'Entrenadora - Valencia CF Femenino',
      content: 'La personalización de entrenamientos por jugadora individual ha sido un game-changer. Cada atleta recibe exactamente lo que necesita para su desarrollo.',
      rating: 5,
      avatar: '👩‍🏫'
    },
    {
      name: 'David López',
      role: 'Coordinador de Cantera - Athletic Bilbao',
      content: 'Gestionar 15 equipos diferentes era un caos antes de SportAgentoos. Ahora tenemos todo centralizado y cada equipo mantiene su identidad única.',
      rating: 5,
      avatar: '👨‍👦‍👦'
    }
  ];

  // Input signals for component configuration
  title = input<string>('Sobre SportAgentoos');
  subtitle = input<string>('Revolucionamos la gestión deportiva con tecnología de vanguardia y la sabiduría colectiva de los mejores entrenadores del mundo');
  testimonials = input<Testimonial[]>(this.defaultTestimonials);
  showTestimonials = input<boolean>(true);

  /**
   * Generates array of stars for rating display
   */
  getStarsArray(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, index) => index < rating);
  }

  /**
   * Gets the mission content
   */
  getMissionContent(): string {
    return `SportAgentoos nace de la pasión por el deporte y la tecnología. 
    Nuestra misión es empoderar a entrenadores y clubs deportivos con herramientas 
    inteligentes que automatizan la planificación y optimizan el rendimiento, 
    permitiendo que se enfoquen en lo que realmente importa: desarrollar atletas excepcionales.`;
  }

  /**
   * Gets the vision content
   */
  getVisionContent(): string {
    return `Visualizamos un futuro donde cada entrenador, sin importar su nivel o recursos, 
    tenga acceso a las mejores metodologías de entrenamiento del mundo. Queremos ser 
    la plataforma que democratice el conocimiento deportivo y acelere el desarrollo 
    del deporte a nivel global.`;
  }
}
