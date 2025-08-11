import { Component, ChangeDetectionStrategy, inject, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// Componentes de sección
import { LandingHeader } from '../components/landing-header/landing-header';
import { HeroSection } from '../components/hero-section/hero-section';
import { FeaturesSection } from '../components/features-section/features-section';
import { MarketplaceSection } from '../components/marketplace-section/marketplace-section';
import { SubscriptionsSection } from '../components/subscriptions-section/subscriptions-section';
import { Footer } from '../components/footer/footer';

// Servicios
import { ScrollService } from '../services/scroll';

@Component({
  selector: 'app-landing',
  imports: [
    CommonModule,
    RouterModule,
    LandingHeader,
    HeroSection,
    FeaturesSection,
    MarketplaceSection,
    SubscriptionsSection,
    Footer
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block min-h-screen'
  }
})
export class Landing implements OnInit {
  private readonly scrollService = inject(ScrollService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    // Inicializar observador de secciones para navegación activa
    this.scrollService.initSectionObserver();
    
    // Escuchar cambios de sección activa
    this.scrollService.activeSection$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((section: string) => {
        // Se usará para actualizar la navegación activa
        console.log('Sección activa:', section);
      });
  }
}
