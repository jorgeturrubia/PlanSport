import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';
import { signal } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render SportAgentoos brand', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const brandElement = compiled.querySelector('.brand-name');
    
    expect(brandElement).toBeTruthy();
    expect(brandElement?.textContent?.trim()).toBe('SportAgentoos');
  });

  it('should render navigation menu with all items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navItems = compiled.querySelectorAll('.nav-item');
    
    expect(navItems.length).toBe(3);
    
    const navTexts = Array.from(navItems).map(item => item.textContent?.trim());
    expect(navTexts).toContain('Características');
    expect(navTexts).toContain('Suscripciones');
    expect(navTexts).toContain('Opiniones');
  });

  it('should render login and register buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const loginBtn = compiled.querySelector('.login-btn');
    const registerBtn = compiled.querySelector('.register-btn');
    
    expect(loginBtn).toBeTruthy();
    expect(registerBtn).toBeTruthy();
    expect(loginBtn?.textContent?.trim()).toBe('Login');
    expect(registerBtn?.textContent?.trim()).toBe('Register');
  });

  it('should emit navigation event when nav item is clicked', () => {
    spyOn(component.navigate, 'emit');
    
    const compiled = fixture.nativeElement as HTMLElement;
    const featuresButton = compiled.querySelector('[data-testid="nav-features"]') as HTMLButtonElement;
    
    featuresButton?.click();
    
    expect(component.navigate.emit).toHaveBeenCalledWith('features');
  });

  it('should emit login event when login button is clicked', () => {
    spyOn(component.loginClicked, 'emit');
    
    const compiled = fixture.nativeElement as HTMLElement;
    const loginBtn = compiled.querySelector('.login-btn') as HTMLButtonElement;
    
    loginBtn?.click();
    
    expect(component.loginClicked.emit).toHaveBeenCalled();
  });

  it('should emit register event when register button is clicked', () => {
    spyOn(component.registerClicked, 'emit');
    
    const compiled = fixture.nativeElement as HTMLElement;
    const registerBtn = compiled.querySelector('.register-btn') as HTMLButtonElement;
    
    registerBtn?.click();
    
    expect(component.registerClicked.emit).toHaveBeenCalled();
  });

  it('should highlight active navigation item', () => {
    // Use component inputs to set the active section
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [HeaderComponent]
    });
    
    const newFixture = TestBed.createComponent(HeaderComponent);
    const newComponent = newFixture.componentInstance;
    
    newFixture.componentRef.setInput('activeSection', 'features');
    newFixture.detectChanges();
    
    const compiled = newFixture.nativeElement as HTMLElement;
    const featuresButton = compiled.querySelector('[data-testid="nav-features"]');
    
    expect(featuresButton?.classList.contains('active')).toBeTruthy();
  });

  it('should update active section when different nav item is highlighted', () => {
    // Test with different active sections using setInput
    fixture.componentRef.setInput('activeSection', 'features');
    fixture.detectChanges();
    
    let featuresButton = fixture.nativeElement.querySelector('[data-testid="nav-features"]');
    let subscriptionsButton = fixture.nativeElement.querySelector('[data-testid="nav-subscriptions"]');
    
    expect(featuresButton?.classList.contains('active')).toBeTruthy();
    expect(subscriptionsButton?.classList.contains('active')).toBeFalsy();
    
    // Change active section to 'subscriptions'
    fixture.componentRef.setInput('activeSection', 'subscriptions');
    fixture.detectChanges();
    
    featuresButton = fixture.nativeElement.querySelector('[data-testid="nav-features"]');
    subscriptionsButton = fixture.nativeElement.querySelector('[data-testid="nav-subscriptions"]');
    
    expect(featuresButton?.classList.contains('active')).toBeFalsy();
    expect(subscriptionsButton?.classList.contains('active')).toBeTruthy();
  });

  it('should have fixed positioning for header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const header = compiled.querySelector('.header');
    
    expect(header).toBeTruthy();
    // We'll verify this through CSS classes and styling
  });

  it('should show brand name as clickable element', () => {
    spyOn(component.brandClicked, 'emit');
    
    const compiled = fixture.nativeElement as HTMLElement;
    const brandElement = compiled.querySelector('.brand-name') as HTMLElement;
    
    brandElement?.click();
    
    expect(component.brandClicked.emit).toHaveBeenCalled();
  });

  it('should handle keyboard navigation for accessibility', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navButtons = compiled.querySelectorAll('.nav-link');
    
    navButtons.forEach(button => {
      expect(button.getAttribute('type')).toBe('button');
    });
  });

  it('should provide navigation menu items as input', () => {
    const expectedItems = [
      { id: 'features', label: 'Características' },
      { id: 'subscriptions', label: 'Suscripciones' },
      { id: 'testimonials', label: 'Opiniones' }
    ];
    
    fixture.componentRef.setInput('navigationItems', expectedItems);
    fixture.detectChanges();
    
    expect(component.navigationItems()).toEqual(expectedItems);
  });
});