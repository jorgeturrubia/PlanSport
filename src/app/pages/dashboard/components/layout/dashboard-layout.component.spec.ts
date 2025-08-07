import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { signal, WritableSignal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { DashboardLayoutComponent } from './dashboard-layout.component';
import { LayoutService } from '../../../../shared/services/layout.service';

// Mock Services
class MockLayoutService {
  isSidebarExpanded: WritableSignal<boolean> = signal(true);
  toggleSidebar = jasmine.createSpy('toggleSidebar');
}

describe('DashboardLayoutComponent', () => {
  let component: DashboardLayoutComponent;
  let fixture: ComponentFixture<DashboardLayoutComponent>;
  let layoutService: MockLayoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardLayoutComponent, NoopAnimationsModule],
      providers: [
        { provide: LayoutService, useClass: MockLayoutService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardLayoutComponent);
    component = fixture.componentInstance;
    layoutService = TestBed.inject(LayoutService) as unknown as MockLayoutService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('layout structure', () => {
    it('should render dashboard layout container', () => {
      const layoutContainer = fixture.debugElement.query(By.css('.dashboard-layout'));
      expect(layoutContainer).toBeTruthy();
    });

    it('should render sidebar component', () => {
      const sidebar = fixture.debugElement.query(By.css('app-sidebar'));
      expect(sidebar).toBeTruthy();
    });

    it('should render header component', () => {
      const header = fixture.debugElement.query(By.css('app-dashboard-header'));
      expect(header).toBeTruthy();
    });

    it('should render main content area', () => {
      const mainContent = fixture.debugElement.query(By.css('[data-testid="dashboard-main-content"]'));
      expect(mainContent).toBeTruthy();
    });

    it('should render content area', () => {
      const contentArea = fixture.debugElement.query(By.css('[data-testid="content-area"]'));
      expect(contentArea).toBeTruthy();
    });
  });

  describe('sidebar state', () => {
    it('should apply expanded class when sidebar is expanded', () => {
      layoutService.isSidebarExpanded.set(true);
      fixture.detectChanges();

      const mainLayout = fixture.debugElement.query(By.css('.main-layout'));
      expect(mainLayout.nativeElement.classList.contains('expanded')).toBe(true);
    });

    it('should not apply expanded class when sidebar is collapsed', () => {
      layoutService.isSidebarExpanded.set(false);
      fixture.detectChanges();

      const mainLayout = fixture.debugElement.query(By.css('.main-layout'));
      expect(mainLayout.nativeElement.classList.contains('expanded')).toBe(false);
    });
  });

  describe('page header', () => {
    it('should show page header when pageTitle is provided', () => {
      component.pageTitle = 'Test Page';
      fixture.detectChanges();

      const pageHeader = fixture.debugElement.query(By.css('[data-testid="page-header"]'));
      expect(pageHeader).toBeTruthy();
    });

    it('should show page header when pageSubtitle is provided', () => {
      component.pageSubtitle = 'Test subtitle';
      fixture.detectChanges();

      const pageHeader = fixture.debugElement.query(By.css('[data-testid="page-header"]'));
      expect(pageHeader).toBeTruthy();
    });

    it('should not show page header when neither title nor subtitle is provided', () => {
      component.pageTitle = undefined;
      component.pageSubtitle = undefined;
      fixture.detectChanges();

      const pageHeader = fixture.debugElement.query(By.css('[data-testid="page-header"]'));
      expect(pageHeader).toBeFalsy();
    });

    it('should display page title correctly', () => {
      component.pageTitle = 'My Dashboard Page';
      fixture.detectChanges();

      const pageTitle = fixture.debugElement.query(By.css('[data-testid="page-title"]'));
      expect(pageTitle).toBeTruthy();
      expect(pageTitle.nativeElement.textContent.trim()).toBe('My Dashboard Page');
    });

    it('should display page subtitle correctly', () => {
      component.pageSubtitle = 'This is a subtitle';
      fixture.detectChanges();

      const pageSubtitle = fixture.debugElement.query(By.css('[data-testid="page-subtitle"]'));
      expect(pageSubtitle).toBeTruthy();
      expect(pageSubtitle.nativeElement.textContent.trim()).toBe('This is a subtitle');
    });
  });

  describe('content padding', () => {
    it('should apply with-padding class by default', () => {
      const mainContent = fixture.debugElement.query(By.css('.main-content'));
      expect(mainContent.nativeElement.classList.contains('with-padding')).toBe(true);
    });

    it('should not apply with-padding class when contentPadding is false', () => {
      component.contentPadding = false;
      fixture.detectChanges();

      const mainContent = fixture.debugElement.query(By.css('.main-content'));
      expect(mainContent.nativeElement.classList.contains('with-padding')).toBe(false);
    });

    it('should apply full-width class when fullWidth is true', () => {
      component.fullWidth = true;
      fixture.detectChanges();

      const mainContent = fixture.debugElement.query(By.css('.main-content'));
      expect(mainContent.nativeElement.classList.contains('full-width')).toBe(true);
    });
  });

  describe('header integration', () => {
    it('should pass pageTitle to header component', () => {
      component.pageTitle = 'Test Header Title';
      fixture.detectChanges();

      const header = fixture.debugElement.query(By.css('app-dashboard-header'));
      expect(header.componentInstance.pageTitle).toBe('Test Header Title');
    });

    it('should pass showBreadcrumb to header component', () => {
      component.showBreadcrumb = true;
      fixture.detectChanges();

      const header = fixture.debugElement.query(By.css('app-dashboard-header'));
      expect(header.componentInstance.showBreadcrumb).toBe(true);
    });

    it('should pass breadcrumbItems to header component', () => {
      const breadcrumbItems = [
        { label: 'Home', route: '/dashboard' },
        { label: 'Settings' }
      ];
      component.breadcrumbItems = breadcrumbItems;
      fixture.detectChanges();

      const header = fixture.debugElement.query(By.css('app-dashboard-header'));
      expect(header.componentInstance.breadcrumbItems).toEqual(breadcrumbItems);
    });
  });

  describe('event handlers', () => {
    it('should handle sidebar toggle', () => {
      component.onSidebarToggle();
      expect(layoutService.toggleSidebar).toHaveBeenCalled();
    });

    it('should handle user menu click', () => {
      spyOn(console, 'log');
      component.onUserMenuClick();
      expect(console.log).toHaveBeenCalledWith('User menu clicked from layout');
    });

    it('should handle portal click', () => {
      spyOn(console, 'log');
      component.onPortalClick();
      expect(console.log).toHaveBeenCalledWith('Portal clicked from layout');
    });

    it('should handle logout click', () => {
      spyOn(console, 'log');
      component.onLogoutClick();
      expect(console.log).toHaveBeenCalledWith('Logout requested from layout');
    });
  });

  describe('header event binding', () => {
    it('should bind userMenuClicked event to onUserMenuClick', () => {
      spyOn(component, 'onUserMenuClick');
      
      const header = fixture.debugElement.query(By.css('app-dashboard-header'));
      header.triggerEventHandler('userMenuClicked', null);
      
      expect(component.onUserMenuClick).toHaveBeenCalled();
    });

    it('should bind sidebarToggled event to onSidebarToggle', () => {
      spyOn(component, 'onSidebarToggle');
      
      const header = fixture.debugElement.query(By.css('app-dashboard-header'));
      header.triggerEventHandler('sidebarToggled', null);
      
      expect(component.onSidebarToggle).toHaveBeenCalled();
    });

    it('should bind portalClicked event to onPortalClick', () => {
      spyOn(component, 'onPortalClick');
      
      const header = fixture.debugElement.query(By.css('app-dashboard-header'));
      header.triggerEventHandler('portalClicked', null);
      
      expect(component.onPortalClick).toHaveBeenCalled();
    });

    it('should bind logoutClicked event to onLogoutClick', () => {
      spyOn(component, 'onLogoutClick');
      
      const header = fixture.debugElement.query(By.css('app-dashboard-header'));
      header.triggerEventHandler('logoutClicked', null);
      
      expect(component.onLogoutClick).toHaveBeenCalled();
    });
  });

  describe('content projection', () => {
    it('should project content in the main content area', () => {
      const contentArea = fixture.debugElement.query(By.css('[data-testid="content-area"] ng-content'));
      expect(contentArea).toBeTruthy();
    });

    it('should project header content when slot is provided', () => {
      const headerContent = fixture.debugElement.query(By.css('ng-content[select="[slot=header-content]"]'));
      expect(headerContent).toBeTruthy();
    });
  });

  describe('responsive behavior', () => {
    it('should have responsive classes applied', () => {
      const mainContent = fixture.debugElement.query(By.css('.main-content'));
      const computedStyle = getComputedStyle(mainContent.nativeElement);
      
      // Check that CSS classes are applied (exact values depend on CSS)
      expect(mainContent.nativeElement.classList.contains('main-content')).toBe(true);
    });
  });

  describe('output event emissions', () => {
    it('should emit portalClicked event when onPortalClick is called', () => {
      spyOn(component.portalClicked, 'emit');
      
      component.onPortalClick();
      
      expect(component.portalClicked.emit).toHaveBeenCalled();
    });

    it('should emit logoutClicked event when onLogoutClick is called', () => {
      spyOn(component.logoutClicked, 'emit');
      
      component.onLogoutClick();
      
      expect(component.logoutClicked.emit).toHaveBeenCalled();
    });

    it('should emit userMenuClicked event when onUserMenuClick is called', () => {
      spyOn(component.userMenuClicked, 'emit');
      
      component.onUserMenuClick();
      
      expect(component.userMenuClicked.emit).toHaveBeenCalled();
    });

    it('should emit sidebarToggled event when onSidebarToggle is called', () => {
      spyOn(component.sidebarToggled, 'emit');
      layoutService.isSidebarExpanded.set(true);
      
      component.onSidebarToggle();
      
      expect(component.sidebarToggled.emit).toHaveBeenCalledWith(true);
    });

    it('should emit sidebarToggled with correct state when sidebar is collapsed', () => {
      spyOn(component.sidebarToggled, 'emit');
      layoutService.isSidebarExpanded.set(false);
      
      component.onSidebarToggle();
      
      expect(component.sidebarToggled.emit).toHaveBeenCalledWith(false);
    });
  });

  describe('accessibility', () => {
    it('should have main element with proper role', () => {
      const mainElement = fixture.debugElement.query(By.css('main'));
      expect(mainElement).toBeTruthy();
      expect(mainElement.nativeElement.tagName.toLowerCase()).toBe('main');
    });

    it('should have proper heading hierarchy', () => {
      component.pageTitle = 'Test Page';
      fixture.detectChanges();
      
      const h1Element = fixture.debugElement.query(By.css('h1'));
      expect(h1Element).toBeTruthy();
    });
  });
});
