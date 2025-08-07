import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render footer with proper structure', () => {
    const footer = fixture.debugElement.query(By.css('.footer'));
    expect(footer).toBeTruthy();
    expect(footer.nativeElement.tagName.toLowerCase()).toBe('footer');
  });

  it('should display company logo and name', () => {
    const brand = fixture.debugElement.query(By.css('.footer-brand'));
    expect(brand).toBeTruthy();
    
    const logo = brand.query(By.css('.brand-logo'));
    const name = brand.query(By.css('.brand-name'));
    
    expect(logo).toBeTruthy();
    expect(name).toBeTruthy();
    expect(name.nativeElement.textContent).toContain('SportAgentoos');
  });

  it('should display company description', () => {
    const description = fixture.debugElement.query(By.css('.company-description'));
    expect(description).toBeTruthy();
    expect(description.nativeElement.textContent).toContain('plataforma');
  });

  it('should render navigation links', () => {
    const navSection = fixture.debugElement.query(By.css('.footer-nav'));
    expect(navSection).toBeTruthy();
    
    const navLinks = navSection.queryAll(By.css('.nav-link'));
    expect(navLinks.length).toBeGreaterThan(0);
    
    // Check some expected navigation items
    const linkTexts = navLinks.map(link => link.nativeElement.textContent.trim());
    expect(linkTexts).toContain('Inicio');
    expect(linkTexts).toContain('Características');
    expect(linkTexts).toContain('Sobre Nosotros');
  });

  it('should render legal links', () => {
    const legalSection = fixture.debugElement.query(By.css('.footer-legal'));
    expect(legalSection).toBeTruthy();
    
    const legalLinks = legalSection.queryAll(By.css('.legal-link'));
    expect(legalLinks.length).toBeGreaterThan(0);
    
    // Check for expected legal pages
    const linkTexts = legalLinks.map(link => link.nativeElement.textContent.trim());
    expect(linkTexts).toContain('Política de Privacidad');
    expect(linkTexts).toContain('Términos de Servicio');
  });

  it('should render support links', () => {
    const supportSection = fixture.debugElement.query(By.css('.footer-support'));
    expect(supportSection).toBeTruthy();
    
    const supportLinks = supportSection.queryAll(By.css('.support-link'));
    expect(supportLinks.length).toBeGreaterThan(0);
    
    // Check for expected support pages
    const linkTexts = supportLinks.map(link => link.nativeElement.textContent.trim());
    expect(linkTexts).toContain('Centro de Ayuda');
    expect(linkTexts).toContain('Contacto');
  });

  it('should display social media links', () => {
    const socialSection = fixture.debugElement.query(By.css('.footer-social'));
    expect(socialSection).toBeTruthy();
    
    const socialLinks = socialSection.queryAll(By.css('.social-link'));
    expect(socialLinks.length).toBeGreaterThan(0);
    
    // Each social link should have an icon
    socialLinks.forEach(link => {
      const icon = link.query(By.css('.social-icon'));
      expect(icon).toBeTruthy();
    });
  });

  it('should display copyright information', () => {
    const copyright = fixture.debugElement.query(By.css('.footer-copyright'));
    expect(copyright).toBeTruthy();
    
    const copyrightText = copyright.nativeElement.textContent;
    expect(copyrightText).toContain('SportAgentoos');
    expect(copyrightText).toContain(new Date().getFullYear().toString());
  });

  it('should have proper responsive layout classes', () => {
    const container = fixture.debugElement.query(By.css('.footer-container'));
    expect(container).toBeTruthy();
    
    const grid = fixture.debugElement.query(By.css('.footer-grid'));
    expect(grid).toBeTruthy();
  });

  it('should have section headers', () => {
    const headers = fixture.debugElement.queryAll(By.css('.footer-section-title'));
    expect(headers.length).toBeGreaterThan(0);
    
    const headerTexts = headers.map(header => header.nativeElement.textContent.trim());
    expect(headerTexts).toContain('Navegación');
    expect(headerTexts).toContain('Legal');
    expect(headerTexts).toContain('Soporte');
  });

  it('should handle link click events', () => {
    spyOn(component, 'handleLinkClick');
    
    const firstNavLink = fixture.debugElement.query(By.css('.nav-link'));
    firstNavLink.nativeElement.click();
    
    expect(component.handleLinkClick).toHaveBeenCalled();
  });

  it('should have proper accessibility attributes', () => {
    const footer = fixture.debugElement.query(By.css('.footer'));
    expect(footer.nativeElement.getAttribute('role')).toBe('contentinfo');
    
    const socialLinks = fixture.debugElement.queryAll(By.css('.social-link'));
    socialLinks.forEach(link => {
      expect(link.nativeElement.getAttribute('aria-label')).toBeTruthy();
    });
  });

  it('should have newsletter subscription section', () => {
    const newsletter = fixture.debugElement.query(By.css('.footer-newsletter'));
    expect(newsletter).toBeTruthy();
    
    const title = newsletter.query(By.css('.newsletter-title'));
    expect(title).toBeTruthy();
    expect(title.nativeElement.textContent).toContain('Newsletter');
    
    const description = newsletter.query(By.css('.newsletter-description'));
    expect(description).toBeTruthy();
  });

  it('should display contact information', () => {
    const contact = fixture.debugElement.query(By.css('.footer-contact'));
    expect(contact).toBeTruthy();
    
    const email = contact.query(By.css('.contact-email'));
    expect(email).toBeTruthy();
    expect(email.nativeElement.textContent).toContain('@');
  });

  it('should render background decorations', () => {
    const background = fixture.debugElement.query(By.css('.footer-background'));
    expect(background).toBeTruthy();
  });

  it('should have proper link structure for SEO', () => {
    const allLinks = fixture.debugElement.queryAll(By.css('a'));
    
    allLinks.forEach(link => {
      // Each link should have proper attributes
      const href = link.nativeElement.getAttribute('href');
      expect(href).toBeTruthy();
      
      // External links should have proper rel attributes
      if (href.startsWith('http')) {
        expect(link.nativeElement.getAttribute('rel')).toContain('noopener');
      }
    });
  });

  it('should emit navigation events', () => {
    spyOn(component.navigate, 'emit');
    
    component.handleNavigate('features');
    
    expect(component.navigate.emit).toHaveBeenCalledWith('features');
  });

  it('should return current year correctly', () => {
    expect(component.getCurrentYear()).toBe(new Date().getFullYear());
  });

  it('should have hover effects on interactive elements', () => {
    const links = fixture.debugElement.queryAll(By.css('.nav-link, .social-link, .legal-link, .support-link'));
    
    links.forEach(link => {
      // Check that links have classes that would enable hover effects
      const classes = link.nativeElement.className;
      expect(classes).toBeTruthy();
    });
  });

  it('should display proper social media platforms', () => {
    const socialLinks = fixture.debugElement.queryAll(By.css('.social-link'));
    
    // Should have links to major platforms
    expect(socialLinks.length).toBeGreaterThanOrEqual(3);
    
    const socialPlatforms = socialLinks.map(link => 
      link.nativeElement.getAttribute('aria-label').toLowerCase()
    );
    
    expect(socialPlatforms.some(platform => platform.includes('linkedin'))).toBeTruthy();
    expect(socialPlatforms.some(platform => platform.includes('twitter'))).toBeTruthy();
  });
});
