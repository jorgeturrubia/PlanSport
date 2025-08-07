import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FeaturesComponent } from './features.component';

describe('FeaturesComponent', () => {
  let component: FeaturesComponent;
  let fixture: ComponentFixture<FeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render section header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const sectionTitle = compiled.querySelector('.section-title');
    const sectionSubtitle = compiled.querySelector('.section-subtitle');
    
    expect(sectionTitle).toBeTruthy();
    expect(sectionSubtitle).toBeTruthy();
    expect(sectionTitle?.textContent?.trim()).toBe('Características');
  });

  it('should render all feature cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const featureCards = compiled.querySelectorAll('.feature-card');
    
    expect(featureCards.length).toBeGreaterThan(0);
    expect(featureCards.length).toBe(component.features().length);
  });

  it('should render feature card with icon, title and description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const firstFeatureCard = compiled.querySelector('.feature-card');
    const featureIcon = firstFeatureCard?.querySelector('.feature-icon');
    const featureTitle = firstFeatureCard?.querySelector('.feature-title');
    const featureDescription = firstFeatureCard?.querySelector('.feature-description');
    
    expect(featureIcon).toBeTruthy();
    expect(featureTitle).toBeTruthy();
    expect(featureDescription).toBeTruthy();
  });

  it('should display custom title when provided', () => {
    const customTitle = 'Nuestras Características';
    fixture.componentRef.setInput('title', customTitle);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const sectionTitle = compiled.querySelector('.section-title');
    
    expect(sectionTitle?.textContent?.trim()).toBe(customTitle);
  });

  it('should display custom subtitle when provided', () => {
    const customSubtitle = 'Todo lo que necesitas para tu equipo';
    fixture.componentRef.setInput('subtitle', customSubtitle);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const sectionSubtitle = compiled.querySelector('.section-subtitle');
    
    expect(sectionSubtitle?.textContent?.trim()).toBe(customSubtitle);
  });

  it('should render custom features when provided', () => {
    const customFeatures = [
      {
        icon: '⚽',
        title: 'Custom Feature 1',
        description: 'Custom description 1'
      },
      {
        icon: '🏆',
        title: 'Custom Feature 2', 
        description: 'Custom description 2'
      }
    ];
    
    fixture.componentRef.setInput('features', customFeatures);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const featureCards = compiled.querySelectorAll('.feature-card');
    const firstFeatureTitle = compiled.querySelector('.feature-title');
    
    expect(featureCards.length).toBe(2);
    expect(firstFeatureTitle?.textContent?.trim()).toBe('Custom Feature 1');
  });

  it('should have proper grid layout for features', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const featuresGrid = compiled.querySelector('.features-grid');
    
    expect(featuresGrid).toBeTruthy();
    expect(featuresGrid?.classList.contains('features-grid')).toBeTruthy();
  });

  it('should render all SportAgentoos features by default', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const featureCards = compiled.querySelectorAll('.feature-card');
    
    // Check that default features include key SportAgentoos functionality
    const featureTitles = Array.from(featureCards).map(card => 
      card.querySelector('.feature-title')?.textContent?.trim()
    );
    
    expect(featureTitles).toContain('Generación Automática');
    expect(featureTitles).toContain('Marketplace Colaborativo');
    expect(featureTitles).toContain('Multi-tenant');
  });

  it('should have responsive design classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const featuresSection = compiled.querySelector('.features-section');
    const featuresGrid = compiled.querySelector('.features-grid');
    
    expect(featuresSection).toBeTruthy();
    expect(featuresGrid).toBeTruthy();
  });

  it('should render icons for each feature', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const featureIcons = compiled.querySelectorAll('.feature-icon');
    const featureCards = compiled.querySelectorAll('.feature-card');
    
    expect(featureIcons.length).toBe(featureCards.length);
    
    // Check that each icon has content
    featureIcons.forEach(icon => {
      expect(icon.textContent?.trim().length).toBeGreaterThan(0);
    });
  });

  it('should have proper accessibility attributes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const featuresSection = compiled.querySelector('.features-section');
    const sectionTitle = compiled.querySelector('.section-title');
    
    expect(featuresSection?.getAttribute('role')).toBe('region');
    expect(sectionTitle?.tagName.toLowerCase()).toBe('h2');
  });

  it('should handle empty features array gracefully', () => {
    fixture.componentRef.setInput('features', []);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const featureCards = compiled.querySelectorAll('.feature-card');
    const featuresGrid = compiled.querySelector('.features-grid');
    
    expect(featureCards.length).toBe(0);
    expect(featuresGrid).toBeTruthy(); // Grid should still exist
  });

  it('should use default features when no custom features provided', () => {
    expect(component.features().length).toBeGreaterThan(0);
    expect(component.features().length).toBe(8); // 8 default features
    
    // Check some key features are included
    const featureTitles = component.features().map(f => f.title);
    expect(featureTitles).toContain('Generación Automática');
    expect(featureTitles).toContain('Marketplace Colaborativo');
  });
});