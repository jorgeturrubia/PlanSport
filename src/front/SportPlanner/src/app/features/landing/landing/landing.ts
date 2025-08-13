import { Component, OnInit, OnDestroy, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { LandingHeaderComponent } from '../components/landing-header/landing-header';
import { HeroSectionComponent } from '../components/hero-section/hero-section';
import { FeaturesSectionComponent } from '../components/features-section/features-section';
import { MarketplaceSectionComponent } from '../components/marketplace-section/marketplace-section';
import { SubscriptionsSectionComponent } from '../components/subscriptions-section/subscriptions-section';
import { FooterComponent } from '../components/footer/footer';
import { ScrollService } from '../services/scroll';

@Component({
  selector: 'app-landing',
  imports: [
    LandingHeaderComponent,
    HeroSectionComponent,
    FeaturesSectionComponent,
    MarketplaceSectionComponent,
    SubscriptionsSectionComponent,
    FooterComponent
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit, OnDestroy {
  private readonly scrollService = inject(ScrollService);
  
  // Sections to observe
  private readonly sectionIds = ['hero', 'features', 'marketplace', 'subscriptions'];
  
  // Current active section signal
  currentSection = this.scrollService.currentSection;

  ngOnInit(): void {
    this.initSectionObserver();
  }

  ngOnDestroy(): void {
    this.scrollService.disconnectObserver();
  }

  /**
   * Handles navigation to specific section
   * @param sectionId - The ID of the section to scroll to
   */
  onScrollToSection(sectionId: string): void {
    this.scrollService.scrollToElement(sectionId);
  }

  /**
   * Initializes the intersection observer for section tracking
   */
  private initSectionObserver(): void {
    // Wait for DOM to be ready
    setTimeout(() => {
      this.scrollService.initSectionObserver(this.sectionIds);
    }, 100);
  }
}
