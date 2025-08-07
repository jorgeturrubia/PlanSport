import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { FeaturesComponent } from '../../shared/components/features/features.component';
import { AboutComponent } from '../../shared/components/about/about.component';
import { CtaComponent } from '../../components/cta/cta.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

describe('LandingPageComponent', () => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render main landing page sections', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check that all main sections are present
    expect(compiled.querySelector('#hero-section')).toBeTruthy();
    expect(compiled.querySelector('#features-section')).toBeTruthy();
    expect(compiled.querySelector('#about-section')).toBeTruthy();
    expect(compiled.querySelector('#cta-section')).toBeTruthy();
    expect(compiled.querySelector('#subscriptions-section')).toBeTruthy();
    expect(compiled.querySelector('#testimonials-section')).toBeTruthy();
  });

  it('should have features component', () => {
    const featuresComponent = fixture.debugElement.query(By.directive(FeaturesComponent));
    expect(featuresComponent).toBeTruthy();
  });

  it('should have about component', () => {
    const aboutComponent = fixture.debugElement.query(By.directive(AboutComponent));
    expect(aboutComponent).toBeTruthy();
  });

  it('should have hero component', () => {
    const heroComponent = fixture.debugElement.query(By.directive(HeroComponent));
    expect(heroComponent).toBeTruthy();
  });

  it('should have header component', () => {
    const headerComponent = fixture.debugElement.query(By.directive(HeaderComponent));
    expect(headerComponent).toBeTruthy();
  });

  it('should have cta component', () => {
    const ctaComponent = fixture.debugElement.query(By.directive(CtaComponent));
    expect(ctaComponent).toBeTruthy();
  });

  it('should have footer component', () => {
    const footerComponent = fixture.debugElement.query(By.directive(FooterComponent));
    expect(footerComponent).toBeTruthy();
  });

  it('should have footer element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const footer = compiled.querySelector('footer');
    
    expect(footer).toBeTruthy();
  });

  it('should scroll to section when navigation is clicked', () => {
    spyOn(window, 'scrollTo');
    const element = document.createElement('div');
    element.id = 'features-section';
    spyOn(document, 'getElementById').and.returnValue(element);
    
    component.scrollToSection('features');
    
    expect(document.getElementById).toHaveBeenCalledWith('features-section');
  });

  it('should handle smooth scrolling to sections', () => {
    const mockElement = {
      getBoundingClientRect: jasmine.createSpy('getBoundingClientRect').and.returnValue({
        top: 500
      })
    } as any;
    spyOn(document, 'getElementById').and.returnValue(mockElement);
    spyOn(window, 'scrollTo');
    
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0
    });
    
    component.scrollToSection('features');
    
    expect(window.scrollTo).toHaveBeenCalled();
  });

  it('should update active section on scroll', () => {
    component.activeSection.set('hero');
    
    component.updateActiveSection('features');
    
    expect(component.activeSection()).toBe('features');
  });

  it('should pass navigation items to header component', () => {
    const headerComponent = fixture.debugElement.query(By.directive(HeaderComponent));
    const headerComponentInstance = headerComponent.componentInstance as HeaderComponent;
    
    expect(headerComponentInstance.navigationItems()).toEqual(component.navigationItems);
  });

  it('should pass active section to header component', () => {
    component.activeSection.set('features');
    fixture.detectChanges();
    
    const headerComponent = fixture.debugElement.query(By.directive(HeaderComponent));
    const headerComponentInstance = headerComponent.componentInstance as HeaderComponent;
    
    expect(headerComponentInstance.activeSection()).toBe('features');
  });

  it('should handle navigation events from header', () => {
    spyOn(component, 'scrollToSection');
    
    const headerComponent = fixture.debugElement.query(By.directive(HeaderComponent));
    const headerComponentInstance = headerComponent.componentInstance as HeaderComponent;
    
    headerComponentInstance.navigate.emit('features');
    
    expect(component.scrollToSection).toHaveBeenCalledWith('features');
  });

  it('should show placeholder behavior for login button', () => {
    spyOn(console, 'log');
    
    component.handleLogin();
    
    expect(console.log).toHaveBeenCalledWith('Login functionality - Coming soon!');
  });

  it('should show placeholder behavior for register button', () => {
    spyOn(console, 'log');
    
    component.handleRegister();
    
    expect(console.log).toHaveBeenCalledWith('Register functionality - Coming soon!');
  });

  it('should handle brand click to scroll to hero section', () => {
    spyOn(component, 'scrollToSection');
    
    component.handleBrandClick();
    
    expect(component.scrollToSection).toHaveBeenCalledWith('hero');
  });

  it('should handle login events from header', () => {
    spyOn(component, 'handleLogin');
    
    const headerComponent = fixture.debugElement.query(By.directive(HeaderComponent));
    const headerComponentInstance = headerComponent.componentInstance as HeaderComponent;
    
    headerComponentInstance.loginClicked.emit();
    
    expect(component.handleLogin).toHaveBeenCalled();
  });

  it('should handle register events from header', () => {
    spyOn(component, 'handleRegister');
    
    const headerComponent = fixture.debugElement.query(By.directive(HeaderComponent));
    const headerComponentInstance = headerComponent.componentInstance as HeaderComponent;
    
    headerComponentInstance.registerClicked.emit();
    
    expect(component.handleRegister).toHaveBeenCalled();
  });

  it('should handle brand click events from header', () => {
    spyOn(component, 'handleBrandClick');
    
    const headerComponent = fixture.debugElement.query(By.directive(HeaderComponent));
    const headerComponentInstance = headerComponent.componentInstance as HeaderComponent;
    
    headerComponentInstance.brandClicked.emit();
    
    expect(component.handleBrandClick).toHaveBeenCalled();
  });

  it('should handle navigation events from footer', () => {
    spyOn(component, 'scrollToSection');
    
    const footerComponent = fixture.debugElement.query(By.directive(FooterComponent));
    const footerComponentInstance = footerComponent.componentInstance as FooterComponent;
    
    footerComponentInstance.navigate.emit('about');
    
    expect(component.scrollToSection).toHaveBeenCalledWith('about');
  });

  it('should handle get started events from CTA component', () => {
    spyOn(component, 'handleGetStarted');
    
    const ctaComponent = fixture.debugElement.query(By.directive(CtaComponent));
    const ctaComponentInstance = ctaComponent.componentInstance as CtaComponent;
    
    ctaComponentInstance.getStarted.emit();
    
    expect(component.handleGetStarted).toHaveBeenCalled();
  });

  it('should handle view plans events from CTA component', () => {
    spyOn(component, 'handleViewPlans');
    
    const ctaComponent = fixture.debugElement.query(By.directive(CtaComponent));
    const ctaComponentInstance = ctaComponent.componentInstance as CtaComponent;
    
    ctaComponentInstance.viewPlans.emit();
    
    expect(component.handleViewPlans).toHaveBeenCalled();
  });

  it('should show placeholder behavior for get started CTA', () => {
    spyOn(console, 'log');
    
    component.handleGetStarted();
    
    expect(console.log).toHaveBeenCalledWith('Get Started CTA clicked - Redirecting to signup');
  });

  it('should handle view plans CTA and scroll to subscriptions', () => {
    spyOn(console, 'log');
    spyOn(component, 'scrollToSection');
    
    component.handleViewPlans();
    
    expect(console.log).toHaveBeenCalledWith('View Plans CTA clicked - Redirecting to pricing');
    expect(component.scrollToSection).toHaveBeenCalledWith('subscriptions');
  });
});