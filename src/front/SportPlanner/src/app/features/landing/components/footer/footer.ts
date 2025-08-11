import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faFutbol,
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt,
  faArrowUp,
  faHome,
  faUsers,
  faCalendarAlt,
  faChartLine,
  faStore,
  faQuestionCircle,
  faFileContract,
  faShieldAlt,
  faBook,
  faBlog,
  faHeadset,
  faHeart
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';

import { landingAnimations } from '../../animations/landing.animations';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

@Component({
  selector: 'app-footer',
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [landingAnimations.fadeInUp],
  host: {
    class: 'block'
  }
})
export class Footer {
  // Iconos principales
  readonly faFutbol = faFutbol;
  readonly faEnvelope = faEnvelope;
  readonly faPhone = faPhone;
  readonly faMapMarkerAlt = faMapMarkerAlt;
  readonly faArrowUp = faArrowUp;
  readonly faHeart = faHeart;
  readonly faShieldAlt = faShieldAlt;
  
  // Iconos de redes sociales
  readonly faFacebook = faFacebook;
  readonly faTwitter = faTwitter;
  readonly faInstagram = faInstagram;
  readonly faLinkedin = faLinkedin;
  readonly faYoutube = faYoutube;
  
  // Iconos de navegación
  readonly navigationIcons = {
    faHome,
    faUsers,
    faCalendarAlt,
    faChartLine,
    faStore,
    faQuestionCircle,
    faFileContract,
    faShieldAlt,
    faBook,
    faBlog,
    faHeadset
  };
  
  // Año actual para copyright
  readonly currentYear = new Date().getFullYear();
  
  // Secciones del footer
  readonly footerSections: FooterSection[] = [
    {
      title: 'Producto',
      links: [
        { label: 'Características', href: '#features' },
        { label: 'Marketplace', href: '#marketplace' },
        { label: 'Planes y Precios', href: '#subscriptions' },
        { label: 'Actualizaciones', href: '/updates' },
        { label: 'Roadmap', href: '/roadmap' }
      ]
    },
    {
      title: 'Recursos',
      links: [
        { label: 'Centro de Ayuda', href: '/help' },
        { label: 'Documentación', href: '/docs' },
        { label: 'Blog', href: '/blog' },
        { label: 'Tutoriales', href: '/tutorials' },
        { label: 'API', href: '/api-docs' }
      ]
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Sobre Nosotros', href: '/about' },
        { label: 'Contacto', href: '/contact' },
        { label: 'Prensa', href: '/press' },
        { label: 'Carreras', href: '/careers' },
        { label: 'Partners', href: '/partners' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Términos de Servicio', href: '/terms' },
        { label: 'Política de Privacidad', href: '/privacy' },
        { label: 'Cookies', href: '/cookies' },
        { label: 'GDPR', href: '/gdpr' },
        { label: 'Licencias', href: '/licenses' }
      ]
    }
  ];
  
  // Información de contacto
  readonly contactInfo = {
    email: 'info@plansport.com',
    phone: '+34 900 123 456',
    address: 'Madrid, España'
  };
  
  // Redes sociales
  readonly socialLinks = [
    { icon: this.faFacebook, href: 'https://facebook.com/plansport', label: 'Facebook' },
    { icon: this.faTwitter, href: 'https://twitter.com/plansport', label: 'Twitter' },
    { icon: this.faInstagram, href: 'https://instagram.com/plansport', label: 'Instagram' },
    { icon: this.faLinkedin, href: 'https://linkedin.com/company/plansport', label: 'LinkedIn' },
    { icon: this.faYoutube, href: 'https://youtube.com/@plansport', label: 'YouTube' }
  ];
  
  /**
   * Scroll al inicio de la página
   */
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  /**
   * Navega a una sección interna
   */
  navigateToSection(event: Event, href: string): void {
    if (href.startsWith('#')) {
      event.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}
