import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render section with proper structure', () => {
    const section = fixture.debugElement.query(By.css('.about-section'));
    expect(section).toBeTruthy();
    expect(section.nativeElement.getAttribute('role')).toBe('region');
    expect(section.nativeElement.getAttribute('aria-labelledby')).toBe('about-title');
  });

  it('should display default title when no custom title provided', () => {
    const titleElement = fixture.debugElement.query(By.css('#about-title'));
    expect(titleElement.nativeElement.textContent.trim()).toBe('Sobre SportAgentoos');
  });

  it('should display custom title when provided', () => {
    fixture.componentRef.setInput('title', 'Custom About Title');
    fixture.detectChanges();
    
    const titleElement = fixture.debugElement.query(By.css('#about-title'));
    expect(titleElement.nativeElement.textContent.trim()).toBe('Custom About Title');
  });

  it('should display default subtitle when no custom subtitle provided', () => {
    const subtitleElement = fixture.debugElement.query(By.css('.section-subtitle'));
    expect(subtitleElement.nativeElement.textContent).toContain('Revolucionamos la gestión deportiva');
  });

  it('should display custom subtitle when provided', () => {
    fixture.componentRef.setInput('subtitle', 'Custom subtitle text');
    fixture.detectChanges();
    
    const subtitleElement = fixture.debugElement.query(By.css('.section-subtitle'));
    expect(subtitleElement.nativeElement.textContent.trim()).toBe('Custom subtitle text');
  });

  it('should render about content with mission and vision', () => {
    const aboutContent = fixture.debugElement.query(By.css('.about-content'));
    expect(aboutContent).toBeTruthy();
    
    const missionCard = fixture.debugElement.query(By.css('.mission-card'));
    const visionCard = fixture.debugElement.query(By.css('.vision-card'));
    
    expect(missionCard).toBeTruthy();
    expect(visionCard).toBeTruthy();
  });

  it('should display all default testimonials', () => {
    const testimonialCards = fixture.debugElement.queryAll(By.css('.testimonial-card'));
    expect(testimonialCards.length).toBeGreaterThan(0);
    
    // Should have at least the default testimonials
    expect(testimonialCards.length).toBeGreaterThanOrEqual(3);
  });

  it('should render custom testimonials when provided', () => {
    const customTestimonials = [
      {
        name: 'Test User 1',
        role: 'Test Coach',
        content: 'Test testimonial content 1',
        rating: 5,
        avatar: '👤'
      },
      {
        name: 'Test User 2', 
        role: 'Test Manager',
        content: 'Test testimonial content 2',
        rating: 4,
        avatar: '👥'
      }
    ];

    fixture.componentRef.setInput('testimonials', customTestimonials);
    fixture.detectChanges();

    const testimonialCards = fixture.debugElement.queryAll(By.css('.testimonial-card'));
    expect(testimonialCards.length).toBe(2);

    const firstTestimonial = testimonialCards[0];
    expect(firstTestimonial.query(By.css('.testimonial-name')).nativeElement.textContent.trim()).toBe('Test User 1');
    expect(firstTestimonial.query(By.css('.testimonial-role')).nativeElement.textContent.trim()).toBe('Test Coach');
    expect(firstTestimonial.query(By.css('.testimonial-content')).nativeElement.textContent.trim()).toBe('"Test testimonial content 1"');
  });

  it('should render star ratings for testimonials', () => {
    const testimonialCards = fixture.debugElement.queryAll(By.css('.testimonial-card'));
    
    testimonialCards.forEach(card => {
      const rating = card.query(By.css('.testimonial-rating'));
      expect(rating).toBeTruthy();
      
      const stars = card.queryAll(By.css('.star'));
      expect(stars.length).toBe(5); // Should always show 5 stars
    });
  });

  it('should have proper grid layout classes', () => {
    const aboutGrid = fixture.debugElement.query(By.css('.about-grid'));
    const testimonialsGrid = fixture.debugElement.query(By.css('.testimonials-grid'));
    
    expect(aboutGrid).toBeTruthy();
    expect(testimonialsGrid).toBeTruthy();
  });

  it('should show mission and vision icons', () => {
    const missionIcon = fixture.debugElement.query(By.css('.mission-card .about-icon'));
    const visionIcon = fixture.debugElement.query(By.css('.vision-card .about-icon'));
    
    expect(missionIcon).toBeTruthy();
    expect(visionIcon).toBeTruthy();
  });

  it('should have testimonial avatars', () => {
    const testimonialCards = fixture.debugElement.queryAll(By.css('.testimonial-card'));
    
    testimonialCards.forEach(card => {
      const avatar = card.query(By.css('.testimonial-avatar'));
      expect(avatar).toBeTruthy();
    });
  });

  it('should have proper accessibility attributes', () => {
    const section = fixture.debugElement.query(By.css('.about-section'));
    expect(section.nativeElement.getAttribute('role')).toBe('region');
    expect(section.nativeElement.getAttribute('aria-labelledby')).toBe('about-title');
    
    const testimonials = fixture.debugElement.query(By.css('.testimonials-container'));
    expect(testimonials.nativeElement.getAttribute('role')).toBe('region');
    expect(testimonials.nativeElement.getAttribute('aria-labelledby')).toBe('testimonials-title');
  });

  it('should handle empty testimonials array gracefully', () => {
    fixture.componentRef.setInput('testimonials', []);
    fixture.detectChanges();

    const testimonialCards = fixture.debugElement.queryAll(By.css('.testimonial-card'));
    expect(testimonialCards.length).toBe(0);
    
    // Should still render the testimonials container
    const testimonialsContainer = fixture.debugElement.query(By.css('.testimonials-container'));
    expect(testimonialsContainer).toBeTruthy();
  });

  it('should toggle testimonials section visibility', () => {
    // Test with showTestimonials = false
    fixture.componentRef.setInput('showTestimonials', false);
    fixture.detectChanges();

    let testimonialsContainer = fixture.debugElement.query(By.css('.testimonials-container'));
    expect(testimonialsContainer).toBeFalsy();

    // Test with showTestimonials = true
    fixture.componentRef.setInput('showTestimonials', true);
    fixture.detectChanges();

    testimonialsContainer = fixture.debugElement.query(By.css('.testimonials-container'));
    expect(testimonialsContainer).toBeTruthy();
  });

  it('should have responsive design classes', () => {
    const section = fixture.debugElement.query(By.css('.about-section'));
    expect(section.nativeElement.classList).toContain('about-section');

    const container = fixture.debugElement.query(By.css('.container'));
    expect(container).toBeTruthy();
  });

  it('should render background decorations', () => {
    const background = fixture.debugElement.query(By.css('.about-background'));
    expect(background).toBeTruthy();
    
    const decorations = fixture.debugElement.queryAll(By.css('.bg-decoration'));
    expect(decorations.length).toBeGreaterThan(0);
  });

  it('should use default SportAgentoos content', () => {
    const missionCard = fixture.debugElement.query(By.css('.mission-card'));
    const visionCard = fixture.debugElement.query(By.css('.vision-card'));
    
    expect(missionCard.query(By.css('.about-title')).nativeElement.textContent).toContain('Misión');
    expect(visionCard.query(By.css('.about-title')).nativeElement.textContent).toContain('Visión');
    
    const missionContent = missionCard.query(By.css('.about-description')).nativeElement.textContent;
    const visionContent = visionCard.query(By.css('.about-description')).nativeElement.textContent;
    
    expect(missionContent).toContain('SportAgentoos');
    expect(visionContent).toContain('entrenador');
  });
});
