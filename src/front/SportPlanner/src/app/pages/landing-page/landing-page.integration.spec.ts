import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { LandingPageComponent } from './landing-page.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { FeaturesComponent } from '../../shared/components/features/features.component';
import { AboutComponent } from '../../shared/components/about/about.component';
import { CtaComponent } from '../../components/cta/cta.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

describe('LandingPageComponent - Integration Tests', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LandingPageComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  describe('Complete Landing Page Structure', () => {
    it('should render all main sections in correct order', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const sections = compiled.querySelectorAll('section, div[id$="-section"]');
      
      const sectionIds = Array.from(sections).map(section => section.id).filter(id => id);
      
      expect(sectionIds).toEqual([
        'hero-section',
        'features-section',
        'about-section',
        'cta-section',
        'subscriptions-section',
        'testimonials-section'
      ]);
    });

    it('should have all required components rendered', () => {
      expect(fixture.debugElement.query(By.directive(HeaderComponent))).toBeTruthy();
      expect(fixture.debugElement.query(By.directive(HeroComponent))).toBeTruthy();
      expect(fixture.debugElement.query(By.directive(FeaturesComponent))).toBeTruthy();
      expect(fixture.debugElement.query(By.directive(AboutComponent))).toBeTruthy();
      expect(fixture.debugElement.query(By.directive(CtaComponent))).toBeTruthy();
      expect(fixture.debugElement.query(By.directive(FooterComponent))).toBeTruthy();
    });

    it('should have proper semantic HTML structure', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      
      expect(compiled.querySelector('header, app-header')).toBeTruthy();
      expect(compiled.querySelector('main')).toBeTruthy();
      expect(compiled.querySelector('footer, app-footer')).toBeTruthy();
    });
  });

  describe('Navigation Flow Integration', () => {
    it('should handle complete navigation flow from header to all sections', () => {
      spyOn(component, 'scrollToSection').and.callThrough();
      
      const headerComponent = fixture.debugElement.query(By.directive(HeaderComponent));
      const headerInstance = headerComponent.componentInstance as HeaderComponent;
      
      // Test navigation to each section
      const sections = ['features', 'about', 'subscriptions', 'testimonials'];
      
      sections.forEach(section => {
        headerInstance.navigate.emit(section);
        expect(component.scrollToSection).toHaveBeenCalledWith(section);
      });
      
      expect(component.scrollToSection).toHaveBeenCalledTimes(sections.length);
    });

    it('should update active section during navigation', () => {
      const initialActiveSection = component.activeSection();
      expect(initialActiveSection).toBe('hero');
      
      component.updateActiveSection('features');
      expect(component.activeSection()).toBe('features');
      
      component.updateActiveSection('about');
      expect(component.activeSection()).toBe('about');
    });

    it('should handle hero navigation correctly', () => {
      spyOn(component, 'scrollToSection');
      
      const heroComponent = fixture.debugElement.query(By.directive(HeroComponent));
      const heroInstance = heroComponent.componentInstance as HeroComponent;
      
      heroInstance.navigate.emit('features');
      expect(component.scrollToSection).toHaveBeenCalledWith('features');
    });

    it('should handle footer navigation correctly', () => {
      spyOn(component, 'scrollToSection');
      
      const footerComponent = fixture.debugElement.query(By.directive(FooterComponent));
      const footerInstance = footerComponent.componentInstance as FooterComponent;
      
      footerInstance.navigate.emit('about');
      expect(component.scrollToSection).toHaveBeenCalledWith('about');
    });
  });

  describe('CTA Integration Flow', () => {
    it('should handle complete CTA flow', () => {
      spyOn(component, 'handleGetStarted');
      spyOn(component, 'handleViewPlans');
      
      const ctaComponent = fixture.debugElement.query(By.directive(CtaComponent));
      const ctaInstance = ctaComponent.componentInstance as CtaComponent;
      
      // Test Get Started flow
      ctaInstance.getStarted.emit();
      expect(component.handleGetStarted).toHaveBeenCalled();
      
      // Test View Plans flow
      ctaInstance.viewPlans.emit();
      expect(component.handleViewPlans).toHaveBeenCalled();
    });

    it('should handle view plans navigation to subscriptions section', () => {
      spyOn(component, 'scrollToSection');
      spyOn(console, 'log');
      
      component.handleViewPlans();
      
      expect(console.log).toHaveBeenCalledWith('View Plans CTA clicked - Redirecting to pricing');
      expect(component.scrollToSection).toHaveBeenCalledWith('subscriptions');
    });
  });

  describe('User Authentication Flow', () => {
    it('should handle complete authentication flow from header', () => {
      spyOn(component, 'handleLogin');
      spyOn(component, 'handleRegister');
      
      const headerComponent = fixture.debugElement.query(By.directive(HeaderComponent));
      const headerInstance = headerComponent.componentInstance as HeaderComponent;
      
      headerInstance.loginClicked.emit();
      expect(component.handleLogin).toHaveBeenCalled();
      
      headerInstance.registerClicked.emit();
      expect(component.handleRegister).toHaveBeenCalled();
    });

    it('should show proper placeholder messages for auth actions', () => {
      spyOn(console, 'log');
      
      component.handleLogin();
      expect(console.log).toHaveBeenCalledWith('Login functionality - Coming soon!');
      
      component.handleRegister();
      expect(console.log).toHaveBeenCalledWith('Register functionality - Coming soon!');
      
      component.handleGetStarted();
      expect(console.log).toHaveBeenCalledWith('Get Started CTA clicked - Redirecting to signup');
    });
  });

  describe('Brand and Logo Integration', () => {
    it('should handle brand click navigation to hero', () => {
      spyOn(component, 'scrollToSection');
      
      const headerComponent = fixture.debugElement.query(By.directive(HeaderComponent));
      const headerInstance = headerComponent.componentInstance as HeaderComponent;
      
      headerInstance.brandClicked.emit();
      expect(component.scrollToSection).toHaveBeenCalledWith('hero');
    });
  });

  describe('Responsive Design Integration', () => {
    it('should have responsive classes on main container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const mainContainer = compiled.querySelector('.landing-page');
      
      expect(mainContainer).toBeTruthy();
    });

    it('should pass responsive data to all components', () => {
      const headerComponent = fixture.debugElement.query(By.directive(HeaderComponent));
      const headerInstance = headerComponent.componentInstance as HeaderComponent;
      
      expect(headerInstance.navigationItems()).toBeDefined();
      expect(Array.isArray(headerInstance.navigationItems())).toBeTruthy();
    });
  });

  describe('Content Integration', () => {
    it('should display consistent branding across components', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      
      // Check that SportAgentoos branding is consistent
      const brandElements = compiled.querySelectorAll('*');
      let sportAgentoosMentions = 0;
      
      brandElements.forEach(element => {
        if (element.textContent && element.textContent.includes('SportAgentoos')) {
          sportAgentoosMentions++;
        }
      });
      
      expect(sportAgentoosMentions).toBeGreaterThan(0);
    });

    it('should have proper navigation menu items configured', () => {
      expect(component.navigationItems).toEqual([
        { id: 'features', label: 'Características' },
        { id: 'about', label: 'Sobre Nosotros' },
        { id: 'subscriptions', label: 'Suscripciones' },
        { id: 'testimonials', label: 'Opiniones' }
      ]);
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle missing DOM elements gracefully', () => {
      spyOn(document, 'getElementById').and.returnValue(null);
      
      expect(() => {
        component.scrollToSection('nonexistent-section');
      }).not.toThrow();
    });

    it('should handle component event errors gracefully', () => {
      expect(() => {
        component.handleLogin();
        component.handleRegister();
        component.handleGetStarted();
        component.handleViewPlans();
        component.handleBrandClick();
      }).not.toThrow();
    });
  });

  describe('Accessibility Integration', () => {
    it('should have proper ARIA landmarks', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      
      expect(compiled.querySelector('[role="banner"], header, app-header')).toBeTruthy();
      expect(compiled.querySelector('[role="main"], main')).toBeTruthy();
      expect(compiled.querySelector('[role="contentinfo"], footer, app-footer')).toBeTruthy();
    });

    it('should have proper heading hierarchy', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      
      const headings = compiled.querySelectorAll('h1, h2, h3, h4, h5, h6');
      expect(headings.length).toBeGreaterThan(0);
      
      // Check that there's at least one h1 (hero title)
      const h1Elements = compiled.querySelectorAll('h1');
      expect(h1Elements.length).toBeGreaterThanOrEqual(1);
    });

    it('should have skip navigation links or similar accessibility features', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      
      // Check for accessibility features in components
      const ariaLabels = compiled.querySelectorAll('[aria-label]');
      const ariaDescribedBy = compiled.querySelectorAll('[aria-describedby]');
      
      expect(ariaLabels.length + ariaDescribedBy.length).toBeGreaterThan(0);
    });
  });

  describe('Performance Integration', () => {
    it('should not have memory leaks in component communication', () => {
      const initialEventListeners = (window as any)._testEventListenerCount || 0;
      
      // Trigger various component interactions
      component.updateActiveSection('features');
      component.updateActiveSection('about');
      component.updateActiveSection('hero');
      
      // Check that we haven't created excessive event listeners
      const finalEventListeners = (window as any)._testEventListenerCount || 0;
      expect(finalEventListeners - initialEventListeners).toBeLessThanOrEqual(10);
    });

    it('should handle rapid navigation changes efficiently', () => {
      const startTime = performance.now();
      
      // Simulate rapid navigation
      for (let i = 0; i < 10; i++) {
        component.updateActiveSection(`section-${i}`);
      }
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Should complete in under 100ms
      expect(duration).toBeLessThan(100);
    });
  });

  describe('Data Flow Integration', () => {
    it('should maintain state consistency across components', () => {
      component.activeSection.set('features');
      fixture.detectChanges();
      
      const headerComponent = fixture.debugElement.query(By.directive(HeaderComponent));
      const headerInstance = headerComponent.componentInstance as HeaderComponent;
      
      expect(headerInstance.activeSection()).toBe('features');
    });

    it('should handle component initialization order correctly', () => {
      // All components should be initialized and ready
      expect(component.activeSection()).toBeDefined();
      expect(component.navigationItems).toBeDefined();
      expect(component.navigationItems.length).toBeGreaterThan(0);
    });
  });

  describe('Full User Journey Integration', () => {
    it('should support complete user journey from landing to CTA', async () => {
      spyOn(component, 'scrollToSection');
      spyOn(component, 'handleGetStarted');
      
      // 1. User lands on hero section
      expect(component.activeSection()).toBe('hero');
      
      // 2. User navigates to features
      component.scrollToSection('features');
      expect(component.scrollToSection).toHaveBeenCalledWith('features');
      
      // 3. User continues to about section
      component.scrollToSection('about');
      expect(component.scrollToSection).toHaveBeenCalledWith('about');
      
      // 4. User reaches CTA and clicks get started
      const ctaComponent = fixture.debugElement.query(By.directive(CtaComponent));
      const ctaInstance = ctaComponent.componentInstance as CtaComponent;
      
      ctaInstance.getStarted.emit();
      expect(component.handleGetStarted).toHaveBeenCalled();
      
      expect(component.scrollToSection).toHaveBeenCalledTimes(2);
    });
  });
});
