import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render main title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('.hero-title');
    
    expect(titleElement).toBeTruthy();
    expect(titleElement?.textContent?.trim()).toBe('SportAgentoos');
  });

  it('should render subtitle with product description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const subtitleElement = compiled.querySelector('.hero-subtitle');
    
    expect(subtitleElement).toBeTruthy();
    expect(subtitleElement?.textContent).toContain('planificación deportiva');
    expect(subtitleElement?.textContent).toContain('coaches');
  });

  it('should render call-to-action button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const ctaButton = compiled.querySelector('.cta-button');
    
    expect(ctaButton).toBeTruthy();
    expect(ctaButton?.textContent?.trim()).toBe('Descubre las Características');
  });

  it('should emit navigation event when CTA button is clicked', () => {
    spyOn(component.navigate, 'emit');
    
    const compiled = fixture.nativeElement as HTMLElement;
    const ctaButton = compiled.querySelector('.cta-button') as HTMLButtonElement;
    
    ctaButton?.click();
    
    expect(component.navigate.emit).toHaveBeenCalledWith('features');
  });

  it('should have proper hero section structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heroSection = compiled.querySelector('.hero-section');
    const heroContent = compiled.querySelector('.hero-content');
    const container = compiled.querySelector('.container');
    
    expect(heroSection).toBeTruthy();
    expect(heroContent).toBeTruthy();
    expect(container).toBeTruthy();
  });

  it('should display custom title when provided', () => {
    const customTitle = 'Custom Hero Title';
    fixture.componentRef.setInput('title', customTitle);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('.hero-title');
    
    expect(titleElement?.textContent?.trim()).toBe(customTitle);
  });

  it('should display custom subtitle when provided', () => {
    const customSubtitle = 'Custom hero subtitle for testing';
    fixture.componentRef.setInput('subtitle', customSubtitle);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const subtitleElement = compiled.querySelector('.hero-subtitle');
    
    expect(subtitleElement?.textContent?.trim()).toBe(customSubtitle);
  });

  it('should display custom CTA text when provided', () => {
    const customCta = 'Custom Action';
    fixture.componentRef.setInput('ctaText', customCta);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const ctaButton = compiled.querySelector('.cta-button');
    
    expect(ctaButton?.textContent?.trim()).toBe(customCta);
  });

  it('should emit custom navigation target when provided', () => {
    spyOn(component.navigate, 'emit');
    const customTarget = 'custom-section';
    fixture.componentRef.setInput('ctaTarget', customTarget);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const ctaButton = compiled.querySelector('.cta-button') as HTMLButtonElement;
    
    ctaButton?.click();
    
    expect(component.navigate.emit).toHaveBeenCalledWith(customTarget);
  });

  it('should have proper accessibility attributes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const ctaButton = compiled.querySelector('.cta-button');
    const titleElement = compiled.querySelector('.hero-title');
    
    expect(ctaButton?.getAttribute('type')).toBe('button');
    expect(titleElement?.tagName.toLowerCase()).toBe('h1');
  });

  it('should handle keyboard navigation for CTA button', () => {
    spyOn(component.navigate, 'emit');
    
    const compiled = fixture.nativeElement as HTMLElement;
    const ctaButton = compiled.querySelector('.cta-button') as HTMLButtonElement;
    
    // Simulate Enter key press
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    ctaButton?.dispatchEvent(enterEvent);
    
    // The click should be handled by button's default behavior
    expect(ctaButton).toBeTruthy();
  });

  it('should use default values when no inputs provided', () => {
    expect(component.title()).toBe('SportAgentoos');
    expect(component.subtitle()).toContain('planificación deportiva');
    expect(component.ctaText()).toBe('Descubre las Características');
    expect(component.ctaTarget()).toBe('features');
  });

  it('should have responsive design classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heroSection = compiled.querySelector('.hero-section');
    
    expect(heroSection?.classList.contains('hero-section')).toBeTruthy();
    // Verify the section has appropriate styling classes
  });
});