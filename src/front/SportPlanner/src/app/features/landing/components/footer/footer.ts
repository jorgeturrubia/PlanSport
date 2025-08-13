import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faFutbol, 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt, 
  faHeart, 
  faArrowUp 
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebook, 
  faTwitter, 
  faInstagram, 
  faLinkedin,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import { ScrollService } from '../../services/scroll';

interface FooterLink {
  label: string;
  href?: string;
  action?: () => void;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  icon: any;
  href: string;
  label: string;
  color: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {
  private router = inject(Router);
  private scrollService = inject(ScrollService);

  // Font Awesome icons
  faFutbol = faFutbol;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faMapMarkerAlt = faMapMarkerAlt;
  faArrowUp = faArrowUp;
  faHeart = faHeart;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faLinkedin = faLinkedin;
  faYoutube = faYoutube;

  currentYear = new Date().getFullYear();

  footerSections: FooterSection[] = [
    {
      title: 'Producto',
      links: [
        { label: 'Características', action: () => this.scrollToSection('features') },
        { label: 'Planes y Precios', action: () => this.scrollToSection('marketplace') },
        { label: 'Integraciones', href: '#' },
        { label: 'API', href: '#' },
        { label: 'Seguridad', href: '#' }
      ]
    },
    {
      title: 'Recursos',
      links: [
        { label: 'Centro de Ayuda', href: '#' },
        { label: 'Documentación', href: '#' },
        { label: 'Guías de Entrenamiento', href: '#' },
        { label: 'Webinars', href: '#' },
        { label: 'Blog', href: '#' }
      ]
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Sobre Nosotros', href: '#' },
        { label: 'Carreras', href: '#' },
        { label: 'Prensa', href: '#' },
        { label: 'Contacto', href: '#' },
        { label: 'Socios', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Términos de Servicio', href: '#' },
        { label: 'Política de Privacidad', href: '#' },
        { label: 'Política de Cookies', href: '#' },
        { label: 'GDPR', href: '#' },
        { label: 'Licencias', href: '#' }
      ]
    }
  ];

  socialLinks: SocialLink[] = [
    {
      icon: faFacebook,
      href: 'https://facebook.com/sportplanner',
      label: 'Facebook',
      color: 'hover:text-blue-600'
    },
    {
      icon: faTwitter,
      href: 'https://twitter.com/sportplanner',
      label: 'Twitter',
      color: 'hover:text-blue-400'
    },
    {
      icon: faInstagram,
      href: 'https://instagram.com/sportplanner',
      label: 'Instagram',
      color: 'hover:text-pink-600'
    },
    {
      icon: faLinkedin,
      href: 'https://linkedin.com/company/sportplanner',
      label: 'LinkedIn',
      color: 'hover:text-blue-700'
    },
    {
      icon: faYoutube,
      href: 'https://youtube.com/sportplanner',
      label: 'YouTube',
      color: 'hover:text-red-600'
    }
  ];

  contactInfo = {
    email: 'hola@sportplanner.com',
    phone: '+34 900 123 456',
    address: 'Madrid, España'
  };

  scrollToSection(sectionId: string): void {
    this.scrollService.scrollToElement(sectionId);
  }

  scrollToTop(): void {
    this.scrollService.scrollToTop();
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  handleLinkClick(link: FooterLink): void {
    if (link.action) {
      link.action();
    } else if (link.href && link.href !== '#') {
      window.open(link.href, '_blank');
    }
  }

  trackBySection(index: number, section: FooterSection): string {
    return section.title;
  }

  trackByLink(index: number, link: FooterLink): string {
    return link.label;
  }

  trackBySocial(index: number, social: SocialLink): string {
    return social.label;
  }
}
