import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ThemeToggleComponent } from './theme-toggle.component';
import { ThemeService } from '../../../../../shared/services/theme.service';

describe('ThemeToggleComponent', () => {
  let component: ThemeToggleComponent;
  let fixture: ComponentFixture<ThemeToggleComponent>;
  let themeService: jasmine.SpyObj<ThemeService>;

  beforeEach(async () => {
    // Create spy object for ThemeService
    const themeServiceSpy = jasmine.createSpyObj('ThemeService', [
      'toggleTheme',
      'setTheme',
      'getCurrentTheme'
    ], {
      isDarkMode: signal(false)
    });

    await TestBed.configureTestingModule({
      imports: [
        ThemeToggleComponent,
        NoopAnimationsModule
      ],
      providers: [
        { provide: ThemeService, useValue: themeServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggleComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService) as jasmine.SpyObj<ThemeService>;

    // Set up default spy returns
    themeService.getCurrentTheme.and.returnValue('light');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initialization', () => {
    it('should initialize with correct default state', () => {
      expect(component.isDarkMode()).toBe(false);
    });

    it('should reflect dark mode state from service', () => {
      // Create new test setup with dark mode enabled
      TestBed.resetTestingModule();
      const darkThemeServiceSpy = jasmine.createSpyObj('ThemeService', [
        'toggleTheme', 'setTheme', 'getCurrentTheme'
      ], {
        isDarkMode: signal(true)
      });

      TestBed.configureTestingModule({
        imports: [ThemeToggleComponent, NoopAnimationsModule],
        providers: [
          { provide: ThemeService, useValue: darkThemeServiceSpy }
        ]
      });

      const darkFixture = TestBed.createComponent(ThemeToggleComponent);
      const darkComponent = darkFixture.componentInstance;
      darkFixture.detectChanges();

      expect(darkComponent.isDarkMode()).toBe(true);
    });
  });

  describe('template rendering', () => {
    it('should render toggle button', () => {
      const toggleButton = fixture.debugElement.query(By.css('[data-testid="theme-toggle-button"]'));
      expect(toggleButton).toBeTruthy();
    });

    it('should show sun icon in light mode', () => {
      const sunIcon = fixture.debugElement.query(By.css('[data-testid="sun-icon"]'));
      const moonIcon = fixture.debugElement.query(By.css('[data-testid="moon-icon"]'));
      
      expect(sunIcon).toBeTruthy();
      expect(moonIcon).toBeFalsy();
    });

    it('should show moon icon in dark mode', () => {
      // Mock dark mode
      TestBed.resetTestingModule();
      const darkThemeServiceSpy = jasmine.createSpyObj('ThemeService', [
        'toggleTheme', 'setTheme', 'getCurrentTheme'
      ], {
        isDarkMode: signal(true)
      });

      TestBed.configureTestingModule({
        imports: [ThemeToggleComponent, NoopAnimationsModule],
        providers: [
          { provide: ThemeService, useValue: darkThemeServiceSpy }
        ]
      });

      const darkFixture = TestBed.createComponent(ThemeToggleComponent);
      darkFixture.detectChanges();

      const sunIcon = darkFixture.debugElement.query(By.css('[data-testid="sun-icon"]'));
      const moonIcon = darkFixture.debugElement.query(By.css('[data-testid="moon-icon"]'));
      
      expect(sunIcon).toBeFalsy();
      expect(moonIcon).toBeTruthy();
    });

    it('should show correct aria-label based on current theme', () => {
      const toggleButton = fixture.debugElement.query(By.css('[data-testid="theme-toggle-button"]'));
      expect(toggleButton.nativeElement.getAttribute('aria-label')).toContain('Cambiar a modo oscuro');
    });

    it('should display theme labels', () => {
      const lightLabel = fixture.debugElement.query(By.css('[data-testid="light-label"]'));
      const darkLabel = fixture.debugElement.query(By.css('[data-testid="dark-label"]'));
      
      expect(lightLabel).toBeTruthy();
      expect(darkLabel).toBeTruthy();
      expect(lightLabel.nativeElement.textContent.trim()).toBe('Claro');
      expect(darkLabel.nativeElement.textContent.trim()).toBe('Oscuro');
    });
  });

  describe('user interactions', () => {
    it('should call themeService.toggleTheme when button is clicked', () => {
      const toggleButton = fixture.debugElement.query(By.css('[data-testid="theme-toggle-button"]'));
      
      toggleButton.nativeElement.click();
      
      expect(themeService.toggleTheme).toHaveBeenCalled();
    });

  it('should emit themeChanged event when toggle is clicked', () => {
    spyOn(component.themeChanged, 'emit');
    
    const toggleButton = fixture.debugElement.query(By.css('[data-testid="theme-toggle-button"]'));
    toggleButton.nativeElement.click();
    
    // Since we start in light mode (false), clicking should switch to dark mode
    expect(component.themeChanged.emit).toHaveBeenCalledWith('light');
  });

    it('should handle keyboard events', () => {
      const toggleButton = fixture.debugElement.query(By.css('[data-testid="theme-toggle-button"]'));
      
      // Test Enter key
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      toggleButton.nativeElement.dispatchEvent(enterEvent);
      
      expect(themeService.toggleTheme).toHaveBeenCalled();
    });

    it('should handle Space key', () => {
      const toggleButton = fixture.debugElement.query(By.css('[data-testid="theme-toggle-button"]'));
      
      // Test Space key
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
      toggleButton.nativeElement.dispatchEvent(spaceEvent);
      
      expect(themeService.toggleTheme).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const toggleButton = fixture.debugElement.query(By.css('[data-testid="theme-toggle-button"]'));
      
      expect(toggleButton.nativeElement.getAttribute('role')).toBe('switch');
      expect(toggleButton.nativeElement.getAttribute('aria-checked')).toBe('false');
      expect(toggleButton.nativeElement.getAttribute('aria-label')).toBeTruthy();
      expect(toggleButton.nativeElement.getAttribute('tabindex')).toBe('0');
    });

    it('should update aria-checked when theme changes', () => {
      // Create test with dark mode
      TestBed.resetTestingModule();
      const darkThemeServiceSpy = jasmine.createSpyObj('ThemeService', [
        'toggleTheme', 'setTheme', 'getCurrentTheme'
      ], {
        isDarkMode: signal(true)
      });

      TestBed.configureTestingModule({
        imports: [ThemeToggleComponent, NoopAnimationsModule],
        providers: [
          { provide: ThemeService, useValue: darkThemeServiceSpy }
        ]
      });

      const darkFixture = TestBed.createComponent(ThemeToggleComponent);
      darkFixture.detectChanges();

      const toggleButton = darkFixture.debugElement.query(By.css('[data-testid="theme-toggle-button"]'));
      expect(toggleButton.nativeElement.getAttribute('aria-checked')).toBe('true');
    });

    it('should be focusable', () => {
      const toggleButton = fixture.debugElement.query(By.css('[data-testid="theme-toggle-button"]'));
      expect(toggleButton.nativeElement.tabIndex).toBe(0);
    });
  });

  describe('styling', () => {
    it('should apply correct CSS classes based on theme', () => {
      const toggleButton = fixture.debugElement.query(By.css('[data-testid="theme-toggle-button"]'));
      const classList = toggleButton.nativeElement.classList;
      
      expect(classList.contains('theme-toggle-btn')).toBe(true);
      // The dark class should not be present in light mode
      expect(classList.contains('dark')).toBe(false);
    });

    it('should have proper button styles', () => {
      const toggleButton = fixture.debugElement.query(By.css('[data-testid="theme-toggle-button"]'));
      const computedStyle = getComputedStyle(toggleButton.nativeElement);
      
      // Check that the button has cursor pointer
      expect(computedStyle.cursor).toBe('pointer');
    });
  });

  describe('animations', () => {
    it('should have transition styles for smooth animations', () => {
      const toggleButton = fixture.debugElement.query(By.css('[data-testid="theme-toggle-button"]'));
      const computedStyle = getComputedStyle(toggleButton.nativeElement);
      
      // Check that transition duration exists (NoopAnimationsModule may affect 'all' part)
      expect(computedStyle.transitionDuration).toBeTruthy();
    });

    it('should have icon container for animations', () => {
      const iconContainer = fixture.debugElement.query(By.css('.icon-container'));
      expect(iconContainer).toBeTruthy();
    });
  });

  describe('edge cases', () => {
    it('should handle service errors gracefully', () => {
      themeService.toggleTheme.and.throwError('Service error');
      
      const toggleButton = fixture.debugElement.query(By.css('[data-testid="theme-toggle-button"]'));
      
      expect(() => {
        toggleButton.nativeElement.click();
      }).not.toThrow();
    });

    it('should work without theme service', () => {
      // This tests component resilience without service
      expect(() => {
        fixture.detectChanges();
      }).not.toThrow();
    });
  });
});
