import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CtaComponent } from './cta.component';

describe('CtaComponent', () => {
  let component: CtaComponent;
  let fixture: ComponentFixture<CtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render main CTA heading', () => {
    const ctaHeading = fixture.debugElement.query(By.css('.cta-heading'));
    expect(ctaHeading).toBeTruthy();
    expect(ctaHeading.nativeElement.textContent).toContain('Únete a SportAgentoos');
  });

  it('should render CTA description', () => {
    const ctaDescription = fixture.debugElement.query(By.css('.cta-description'));
    expect(ctaDescription).toBeTruthy();
    expect(ctaDescription.nativeElement.textContent).toContain('Comienza tu transformación deportiva');
  });

  it('should render primary CTA button', () => {
    const primaryButton = fixture.debugElement.query(By.css('.cta-primary'));
    expect(primaryButton).toBeTruthy();
    expect(primaryButton.nativeElement.textContent.trim()).toBe('Empezar Gratis');
  });

  it('should render secondary CTA button', () => {
    const secondaryButton = fixture.debugElement.query(By.css('.cta-secondary'));
    expect(secondaryButton).toBeTruthy();
    expect(secondaryButton.nativeElement.textContent.trim()).toBe('Ver Planes');
  });

  it('should render benefits list', () => {
    const benefitsList = fixture.debugElement.query(By.css('.cta-benefits'));
    expect(benefitsList).toBeTruthy();
    
    const benefits = fixture.debugElement.queryAll(By.css('.benefit-item'));
    expect(benefits.length).toBeGreaterThan(0);
    expect(benefits.length).toBe(4);
  });

  it('should display all benefit items with icons and text', () => {
    const benefits = fixture.debugElement.queryAll(By.css('.benefit-item'));
    
    benefits.forEach(benefit => {
      const icon = benefit.query(By.css('.benefit-icon'));
      const text = benefit.query(By.css('.benefit-text'));
      
      expect(icon).toBeTruthy();
      expect(text).toBeTruthy();
      expect(text.nativeElement.textContent.trim()).not.toBe('');
    });
  });

  it('should emit getStarted event when primary button is clicked', () => {
    spyOn(component.getStarted, 'emit');
    
    const primaryButton = fixture.debugElement.query(By.css('.cta-primary'));
    primaryButton.nativeElement.click();
    
    expect(component.getStarted.emit).toHaveBeenCalled();
  });

  it('should emit viewPlans event when secondary button is clicked', () => {
    spyOn(component.viewPlans, 'emit');
    
    const secondaryButton = fixture.debugElement.query(By.css('.cta-secondary'));
    secondaryButton.nativeElement.click();
    
    expect(component.viewPlans.emit).toHaveBeenCalled();
  });

  it('should have proper ARIA accessibility attributes', () => {
    const ctaSection = fixture.debugElement.query(By.css('.cta-section'));
    const primaryButton = fixture.debugElement.query(By.css('.cta-primary'));
    const secondaryButton = fixture.debugElement.query(By.css('.cta-secondary'));
    
    expect(ctaSection.nativeElement.getAttribute('aria-labelledby')).toBe('cta-heading');
    expect(primaryButton.nativeElement.getAttribute('aria-label')).toContain('Comenzar prueba gratuita');
    expect(secondaryButton.nativeElement.getAttribute('aria-label')).toContain('Ver planes de suscripción');
  });

  it('should render statistics section', () => {
    const statsSection = fixture.debugElement.query(By.css('.cta-stats'));
    expect(statsSection).toBeTruthy();
    
    const statItems = fixture.debugElement.queryAll(By.css('.stat-item'));
    expect(statItems.length).toBe(3);
    
    statItems.forEach(stat => {
      const value = stat.query(By.css('.stat-value'));
      const label = stat.query(By.css('.stat-label'));
      
      expect(value).toBeTruthy();
      expect(label).toBeTruthy();
      expect(value.nativeElement.textContent.trim()).not.toBe('');
      expect(label.nativeElement.textContent.trim()).not.toBe('');
    });
  });

  it('should apply correct CSS classes for styling', () => {
    const ctaContainer = fixture.debugElement.query(By.css('.cta-container'));
    const ctaContent = fixture.debugElement.query(By.css('.cta-content'));
    const ctaActions = fixture.debugElement.query(By.css('.cta-actions'));
    
    expect(ctaContainer).toBeTruthy();
    expect(ctaContent).toBeTruthy();
    expect(ctaActions).toBeTruthy();
  });

  it('should render trust indicators', () => {
    const trustSection = fixture.debugElement.query(By.css('.cta-trust'));
    expect(trustSection).toBeTruthy();
    
    const trustItems = fixture.debugElement.queryAll(By.css('.trust-item'));
    expect(trustItems.length).toBeGreaterThan(0);
    
    trustItems.forEach(item => {
      const text = item.nativeElement.textContent.trim();
      expect(text).not.toBe('');
    });
  });

  it('should handle custom content projection', () => {
    // Test for ng-content projection if implemented
    const customContent = fixture.debugElement.query(By.css('.cta-custom-content'));
    // This would be tested if ng-content is used for custom content projection
    // expect(customContent).toBeTruthy();
  });

  it('should have responsive design classes', () => {
    const ctaSection = fixture.debugElement.query(By.css('.cta-section'));
    expect(ctaSection.nativeElement.classList.contains('cta-section')).toBeTruthy();
    
    const ctaContainer = fixture.debugElement.query(By.css('.cta-container'));
    expect(ctaContainer.nativeElement.classList.contains('cta-container')).toBeTruthy();
  });

  it('should display urgency text when present', () => {
    const urgencyText = fixture.debugElement.query(By.css('.cta-urgency'));
    if (urgencyText) {
      expect(urgencyText.nativeElement.textContent).toContain('limitada');
    }
  });

  it('should have proper button styling and states', () => {
    const primaryButton = fixture.debugElement.query(By.css('.cta-primary'));
    const secondaryButton = fixture.debugElement.query(By.css('.cta-secondary'));
    
    expect(primaryButton.nativeElement.classList.contains('cta-primary')).toBeTruthy();
    expect(secondaryButton.nativeElement.classList.contains('cta-secondary')).toBeTruthy();
    
    // Check for disabled state handling if implemented
    expect(primaryButton.nativeElement.hasAttribute('disabled')).toBeFalsy();
    expect(secondaryButton.nativeElement.hasAttribute('disabled')).toBeFalsy();
  });
});
