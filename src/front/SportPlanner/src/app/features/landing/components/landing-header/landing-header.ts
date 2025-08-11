import { Component, ChangeDetectionStrategy, inject, signal, computed, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faBars, 
  faTimes, 
  faFutbol,
  faSignInAlt, 
  faUserPlus,
  faHome,
  faRocket,
  faStore,
  faCrown
} from '@fortawesome/free-solid-svg-icons';

import { ScrollService } from '../../services/scroll';
import { landingAnimations } from '../../animations/landing.animations';

interface NavItem {
  label: string;
  href: string;
  icon?: any;
}

@Component({
  selector: 'app-landing-header',
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  templateUrl: './landing-header.html',
  styleUrl: './landing-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [landingAnimations.slideMenu, landingAnimations.rotate],
  host: {
    class: 'block'
  }
})
export class LandingHeader implements OnInit {
  private readonly scrollService = inject(ScrollService);
  private readonly destroyRef = inject(DestroyRef);
  
  // Iconos
  readonly faBars = faBars;
  readonly faTimes = faTimes;
  readonly faFutbol = faFutbol;
  readonly faSignInAlt = faSignInAlt;
  readonly faUserPlus = faUserPlus;
  readonly faHome = faHome;
  readonly faRocket = faRocket;
  readonly faStore = faStore;
  readonly faCrown = faCrown;
  
  // Estado del menú móvil
  readonly mobileMenuOpen = signal(false);
  
  // Estado del header (transparente o sólido)
  readonly isScrolled = signal(false);
  
  // Sección activa
  readonly activeSection = signal('hero');
  
  // Items de navegación
  readonly navItems: NavItem[] = [
    { label: 'Inicio', href: '#hero', icon: this.faHome },
    { label: 'Características', href: '#features', icon: this.faRocket },
    { label: 'Marketplace', href: '#marketplace', icon: this.faStore },
    { label: 'Planes', href: '#subscriptions', icon: this.faCrown }
  ];
  
  // Computed para el estado del menú
  readonly menuState = computed(() => 
    this.mobileMenuOpen() ? 'open' : 'closed'
  );
  
  // Computed para las clases del header
  readonly headerClasses = computed(() => {
    const base = 'fixed top-0 left-0 right-0 z-50 transition-all duration-300';
    const scrolled = this.isScrolled() 
      ? 'bg-white shadow-md' 
      : 'bg-transparent';
    return `${base} ${scrolled}`;
  });
  
  ngOnInit(): void {
    // Observar cambios de scroll
    this.scrollService.hasScrolledPastHero()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(scrolled => {
        this.isScrolled.set(scrolled);
      });
    
    // Observar sección activa
    this.scrollService.activeSection$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(section => {
        this.activeSection.set(section);
      });
  }
  
  /**
   * Navega a una sección específica
   */
  navigateToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    this.scrollService.scrollToSection(sectionId.replace('#', ''));
    this.closeMobileMenu();
  }
  
  /**
   * Alterna el menú móvil
   */
  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(state => !state);
    
    // Prevenir scroll del body cuando el menú está abierto
    if (this.mobileMenuOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
  
  /**
   * Cierra el menú móvil
   */
  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
    document.body.style.overflow = '';
  }
  
  /**
   * Verifica si un enlace está activo
   */
  isLinkActive(href: string): boolean {
    const sectionId = href.replace('#', '');
    return this.activeSection() === sectionId;
  }
  
  /**
   * Maneja la navegación por teclado
   */
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.mobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }
}
