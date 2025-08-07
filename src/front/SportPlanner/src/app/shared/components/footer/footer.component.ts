import { Component, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NavigationLink {
  id: string;
  label: string;
  href?: string;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  ariaLabel: string;
}

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  // Output events
  navigate = output<string>();

  // Navigation links for the footer
  navigationLinks: NavigationLink[] = [
    { id: 'hero', label: 'Inicio' },
    { id: 'features', label: 'Características' },
    { id: 'about', label: 'Sobre Nosotros' },
    { id: 'testimonials', label: 'Testimonios' }
  ];

  // Legal and policy links
  legalLinks: NavigationLink[] = [
    { id: 'privacy', label: 'Política de Privacidad', href: '/privacy' },
    { id: 'terms', label: 'Términos de Servicio', href: '/terms' },
    { id: 'cookies', label: 'Política de Cookies', href: '/cookies' },
    { id: 'gdpr', label: 'Protección de Datos', href: '/gdpr' }
  ];

  // Support and help links
  supportLinks: NavigationLink[] = [
    { id: 'help', label: 'Centro de Ayuda', href: '/help' },
    { id: 'contact', label: 'Contacto', href: '/contact' },
    { id: 'documentation', label: 'Documentación', href: '/docs' },
    { id: 'api', label: 'API', href: '/api-docs' }
  ];

  // Social media links
  socialLinks: SocialLink[] = [
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/company/sportagentoos',
      icon: '💼',
      ariaLabel: 'Síguenos en LinkedIn'
    },
    {
      platform: 'Twitter',
      url: 'https://twitter.com/sportagentoos',
      icon: '🐦',
      ariaLabel: 'Síguenos en Twitter'
    },
    {
      platform: 'Facebook',
      url: 'https://facebook.com/sportagentoos',
      icon: '📘',
      ariaLabel: 'Síguenos en Facebook'
    },
    {
      platform: 'Instagram',
      url: 'https://instagram.com/sportagentoos',
      icon: '📸',
      ariaLabel: 'Síguenos en Instagram'
    },
    {
      platform: 'YouTube',
      url: 'https://youtube.com/@sportagentoos',
      icon: '📺',
      ariaLabel: 'Síguenos en YouTube'
    }
  ];

  /**
   * Handles navigation to internal sections
   * @param sectionId The section to navigate to
   */
  handleNavigate(sectionId: string): void {
    this.navigate.emit(sectionId);
  }

  /**
   * Handles clicking on any footer link
   * @param event The click event
   * @param linkId The link identifier
   */
  handleLinkClick(event: Event, linkId?: string): void {
    // For now, we'll prevent default behavior for internal navigation
    // In the future, this could handle analytics tracking
    if (linkId && this.navigationLinks.some(link => link.id === linkId)) {
      event.preventDefault();
      this.handleNavigate(linkId);
    }
  }

  /**
   * Gets the current year for copyright notice
   * @returns Current year
   */
  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  /**
   * Gets the company description
   * @returns Company description text
   */
  getCompanyDescription(): string {
    return 'La plataforma líder para la gestión deportiva inteligente. Revolucionamos la forma en que los entrenadores planifican, ejecutan y analizan sus entrenamientos.';
  }

  /**
   * Gets contact email
   * @returns Company contact email
   */
  getContactEmail(): string {
    return 'hola@sportagentoos.com';
  }

  /**
   * Gets newsletter description
   * @returns Newsletter subscription description
   */
  getNewsletterDescription(): string {
    return 'Mantente al día con las últimas novedades, tips de entrenamiento y actualizaciones de SportAgentoos.';
  }
}
