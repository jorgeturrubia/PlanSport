import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './header.component';
import { LayoutService } from '../../../../shared/services/layout.service';
import { ThemeService } from '../../../../shared/services/theme.service';

describe('HeaderComponent (Dashboard)', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let layoutService: jasmine.SpyObj<LayoutService>;
  let themeService: jasmine.SpyObj<ThemeService>;

  beforeEach(async () => {
    // Create spy objects for services
    const layoutServiceSpy = jasmine.createSpyObj('LayoutService', [
      'toggleSidebar',
      'expandSidebar',
      'collapseSidebar',
      'isMobileView',
      'isDesktopView'
    ], {
      isSidebarExpanded: signal(true)
    });

    const themeServiceSpy = jasmine.createSpyObj('ThemeService', [
      'toggleTheme',
      'setTheme',
      'getCurrentTheme'
    ], {
      isDarkMode: signal(false)
    });

    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        NoopAnimationsModule
      ],
      providers: [
        { provide: LayoutService, useValue: layoutServiceSpy },
        { provide: ThemeService, useValue: themeServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    layoutService = TestBed.inject(LayoutService) as jasmine.SpyObj<LayoutService>;
    themeService = TestBed.inject(ThemeService) as jasmine.SpyObj<ThemeService>;

    // Set up default spy returns
    layoutService.isMobileView.and.returnValue(false);
    layoutService.isDesktopView.and.returnValue(true);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initialization', () => {
    it('should have default user data', () => {
      expect(component.userName()).toBe('Usuario');
      expect(component.userEmail()).toBe('');
      expect(component.userInitials()).toBe('US');
    });

    it('should set title to "Dashboard" by default', () => {
      expect(component.title()).toBe('Dashboard');
    });
  });

  describe('user inputs', () => {
    it('should accept user name input', () => {
      component.userName.set('Jorge Turrubia');
      expect(component.userName()).toBe('Jorge Turrubia');
    });

    it('should accept user email input', () => {
      component.userEmail.set('jorge@example.com');
      expect(component.userEmail()).toBe('jorge@example.com');
    });

    it('should accept custom title', () => {
      component.title.set('Mi Dashboard');
      expect(component.title()).toBe('Mi Dashboard');
    });

    it('should update user initials when name changes', () => {
      component.userName.set('Jorge Turrubia');
      expect(component.userInitials()).toBe('JT');
      
      component.userName.set('Ana María García');
      expect(component.userInitials()).toBe('AM');
      
      component.userName.set('Carlos');
      expect(component.userInitials()).toBe('CA');
    });
  });

  describe('template rendering', () => {
    beforeEach(() => {
      component.userName.set('Jorge Turrubia');
      component.userEmail.set('jorge@example.com');
      component.title.set('Dashboard Principal');
      fixture.detectChanges();
    });

    it('should display user information on left side', () => {
      const userInfo = fixture.debugElement.query(By.css('[data-testid="user-info"]'));
      expect(userInfo).toBeTruthy();
      
      const userInitials = fixture.debugElement.query(By.css('[data-testid="user-initials"]'));
      expect(userInitials.nativeElement.textContent.trim()).toBe('JT');
      
      const userName = fixture.debugElement.query(By.css('[data-testid="user-name"]'));
      expect(userName.nativeElement.textContent.trim()).toBe('Jorge Turrubia');
      
      const userEmail = fixture.debugElement.query(By.css('[data-testid="user-email"]'));
      expect(userEmail.nativeElement.textContent.trim()).toBe('jorge@example.com');
    });

    it('should display page title in center', () => {
      const titleElement = fixture.debugElement.query(By.css('[data-testid="page-title"]'));
      expect(titleElement).toBeTruthy();
      expect(titleElement.nativeElement.textContent.trim()).toBe('Dashboard Principal');
    });

    it('should show sidebar toggle button', () => {
      const toggleButton = fixture.debugElement.query(By.css('[data-testid="sidebar-toggle"]'));
      expect(toggleButton).toBeTruthy();
    });

    it('should NOT show logout button directly in header', () => {
      const logoutButton = fixture.debugElement.query(By.css('[data-testid="logout-button"]'));
      expect(logoutButton).toBeFalsy();
    });
  });

  describe('sidebar integration', () => {
    it('should call layoutService.toggleSidebar when toggle button is clicked', () => {
      const toggleButton = fixture.debugElement.query(By.css('[data-testid="sidebar-toggle"]'));
      
      toggleButton.nativeElement.click();
      
      expect(layoutService.toggleSidebar).toHaveBeenCalled();
    });

    it('should show correct icon based on sidebar state', () => {
      // Test when sidebar is expanded (default state is true)
      fixture.detectChanges();
      
      const collapseIcon = fixture.debugElement.query(By.css('[data-testid="sidebar-collapse-icon"]'));
      expect(collapseIcon).toBeTruthy();

      // Create a new test setup with collapsed sidebar
      TestBed.resetTestingModule();
      const collapsedLayoutServiceSpy = jasmine.createSpyObj('LayoutService', [
        'toggleSidebar', 'expandSidebar', 'collapseSidebar', 'isMobileView', 'isDesktopView'
      ], {
        isSidebarExpanded: signal(false)
      });
      
      TestBed.configureTestingModule({
        imports: [HeaderComponent, NoopAnimationsModule],
        providers: [
          { provide: LayoutService, useValue: collapsedLayoutServiceSpy },
          { provide: ThemeService, useValue: themeService }
        ]
      });

      const collapsedFixture = TestBed.createComponent(HeaderComponent);
      collapsedLayoutServiceSpy.isMobileView.and.returnValue(false);
      collapsedLayoutServiceSpy.isDesktopView.and.returnValue(true);
      collapsedFixture.detectChanges();
      
      const expandIcon = collapsedFixture.debugElement.query(By.css('[data-testid="sidebar-expand-icon"]'));
      expect(expandIcon).toBeTruthy();
    });
  });

  describe('responsive behavior', () => {
    it('should hide user details on mobile', async () => {
      // Create a new test setup with mobile view
      TestBed.resetTestingModule();
      const mobileLayoutServiceSpy = jasmine.createSpyObj('LayoutService', [
        'toggleSidebar', 'expandSidebar', 'collapseSidebar', 'isMobileView', 'isDesktopView'
      ], {
        isSidebarExpanded: signal(true)
      });
      
      mobileLayoutServiceSpy.isMobileView.and.returnValue(true);
      mobileLayoutServiceSpy.isDesktopView.and.returnValue(false);
      
      TestBed.configureTestingModule({
        imports: [HeaderComponent, NoopAnimationsModule],
        providers: [
          { provide: LayoutService, useValue: mobileLayoutServiceSpy },
          { provide: ThemeService, useValue: themeService }
        ]
      });

      const mobileFixture = TestBed.createComponent(HeaderComponent);
      const mobileComponent = mobileFixture.componentInstance;
      mobileFixture.detectChanges();

      const userDetails = mobileFixture.debugElement.query(By.css('[data-testid="user-details"]'));
      expect(userDetails).toBeTruthy();
      expect(userDetails.nativeElement).toHaveClass('hidden');
    });

    it('should show user details on desktop', () => {
      // Default setup is already desktop, test should pass
      const userDetails = fixture.debugElement.query(By.css('[data-testid="user-details"]'));
      expect(userDetails).toBeTruthy();
      expect(userDetails.nativeElement).not.toHaveClass('hidden');
    });
  });

  describe('accessibility', () => {
    it('should have proper ARIA labels', () => {
      const toggleButton = fixture.debugElement.query(By.css('[data-testid="sidebar-toggle"]'));
      expect(toggleButton.nativeElement.getAttribute('aria-label')).toBeTruthy();
      
      const userButton = fixture.debugElement.query(By.css('[data-testid="user-button"]'));
      expect(userButton.nativeElement.getAttribute('aria-label')).toBeTruthy();
    });

    it('should have proper roles', () => {
      const header = fixture.debugElement.query(By.css('header'));
      expect(header.nativeElement.getAttribute('role')).toBe('banner');
    });

    it('should support keyboard navigation', () => {
      const toggleButton = fixture.debugElement.query(By.css('[data-testid="sidebar-toggle"]'));
      const userButton = fixture.debugElement.query(By.css('[data-testid="user-button"]'));
      
      // Both buttons should be focusable
      expect(toggleButton.nativeElement.tabIndex).not.toBe(-1);
      expect(userButton.nativeElement.tabIndex).not.toBe(-1);
    });
  });

  describe('styling', () => {
    it('should apply correct Tailwind classes', () => {
      const header = fixture.debugElement.query(By.css('header'));
      const headerClasses = header.nativeElement.className;
      
      // Should have basic header styling
      expect(headerClasses).toContain('bg-background');
      expect(headerClasses).toContain('border-b');
      expect(headerClasses).toContain('border-border');
    });

    it('should apply theme classes correctly', () => {
      const header = fixture.debugElement.query(By.css('header'));
      
      // Should use CSS variables for theming
      const computedStyle = window.getComputedStyle(header.nativeElement);
      expect(computedStyle.getPropertyValue('background-color')).toBeTruthy();
    });
  });

  describe('event emissions', () => {
    it('should emit userMenuClicked when user button is clicked', () => {
      spyOn(component.userMenuClicked, 'emit');
      
      const userButton = fixture.debugElement.query(By.css('[data-testid="user-button"]'));
      userButton.nativeElement.click();
      
      expect(component.userMenuClicked.emit).toHaveBeenCalled();
    });

    it('should emit sidebarToggled when toggle button is clicked', () => {
      spyOn(component.sidebarToggled, 'emit');
      
      const toggleButton = fixture.debugElement.query(By.css('[data-testid="sidebar-toggle"]'));
      toggleButton.nativeElement.click();
      
      expect(component.sidebarToggled.emit).toHaveBeenCalled();
    });
  });
});
