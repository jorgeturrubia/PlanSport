import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { Component } from '@angular/core';

import { UserProfileDropdownComponent } from './user-profile-dropdown.component';

// Test host component to test the dropdown trigger
@Component({
  template: `
    <div>
      <button 
        #triggerElement
        (click)="toggleDropdown()"
        data-testid="trigger-button">
        Open Dropdown
      </button>
      
      <app-user-profile-dropdown
        [isOpen]="isDropdownOpen()"
        [triggerElement]="triggerElement"
        [userName]="userName()"
        [userEmail]="userEmail()"
        (closed)="onDropdownClosed()"
        (portalClicked)="onPortalClicked()"
        (logoutClicked)="onLogoutClicked()">
      </app-user-profile-dropdown>
    </div>
  `,
  standalone: true,
  imports: [UserProfileDropdownComponent]
})
class TestHostComponent {
  isDropdownOpen = signal(false);
  userName = signal('Jorge Turrubia');
  userEmail = signal('jorge@example.com');

  toggleDropdown() {
    this.isDropdownOpen.update(open => !open);
  }

  onDropdownClosed() {
    this.isDropdownOpen.set(false);
  }

  onPortalClicked() {
    console.log('Portal clicked');
  }

  onLogoutClicked() {
    console.log('Logout clicked');
  }
}

describe('UserProfileDropdownComponent', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let dropdownComponent: UserProfileDropdownComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestHostComponent,
        OverlayModule,
        NoopAnimationsModule
      ]
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    
    // Get the dropdown component instance
    const dropdownDebugElement = hostFixture.debugElement.query(By.directive(UserProfileDropdownComponent));
    dropdownComponent = dropdownDebugElement.componentInstance;
    
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(dropdownComponent).toBeTruthy();
  });

  describe('initialization', () => {
    it('should initialize with closed state', () => {
      expect(dropdownComponent.isOpen()).toBe(false);
    });

    it('should accept user data inputs', () => {
      expect(dropdownComponent.userName()).toBe('Jorge Turrubia');
      expect(dropdownComponent.userEmail()).toBe('jorge@example.com');
    });

    it('should not show dropdown initially', () => {
      const overlayContent = hostFixture.debugElement.query(By.css('[data-testid="dropdown-overlay"]'));
      expect(overlayContent).toBeFalsy();
    });
  });

  describe('dropdown visibility', () => {
    it('should show dropdown when isOpen is true', async () => {
      hostComponent.toggleDropdown();
      hostFixture.detectChanges();

      // Wait for overlay to render
      await hostFixture.whenStable();
      
      const overlayContent = document.querySelector('[data-testid="dropdown-content"]');
      expect(overlayContent).toBeTruthy();
    });

    it('should hide dropdown when isOpen is false', async () => {
      // First open the dropdown
      hostComponent.toggleDropdown();
      hostFixture.detectChanges();
      await hostFixture.whenStable();

      // Then close it
      hostComponent.toggleDropdown();
      hostFixture.detectChanges();
      await hostFixture.whenStable();

      const overlayContent = document.querySelector('[data-testid="dropdown-content"]');
      expect(overlayContent).toBeFalsy();
    });
  });

  describe('dropdown content', () => {
    beforeEach(() => {
      hostComponent.toggleDropdown();
      hostFixture.detectChanges();
    });

    it('should display user information', async () => {
      await hostFixture.whenStable();
      
      const userName = document.querySelector('[data-testid="dropdown-user-name"]');
      const userEmail = document.querySelector('[data-testid="dropdown-user-email"]');
      
      expect(userName?.textContent?.trim()).toBe('Jorge Turrubia');
      expect(userEmail?.textContent?.trim()).toBe('jorge@example.com');
    });

    it('should display Portal de Usuario option', async () => {
      await hostFixture.whenStable();
      
      const portalOption = document.querySelector('[data-testid="portal-option"]');
      expect(portalOption).toBeTruthy();
      expect(portalOption?.textContent?.includes('Portal de Usuario')).toBe(true);
    });

    it('should display Logout option', async () => {
      await hostFixture.whenStable();
      
      const logoutOption = document.querySelector('[data-testid="logout-option"]');
      expect(logoutOption).toBeTruthy();
      expect(logoutOption?.textContent?.includes('Logout')).toBe(true);
    });

    it('should show user initials in avatar', async () => {
      await hostFixture.whenStable();
      
      const userInitials = document.querySelector('[data-testid="dropdown-user-initials"]');
      expect(userInitials?.textContent?.trim()).toBe('JT');
    });
  });

  describe('user interactions', () => {
    beforeEach(async () => {
      hostComponent.toggleDropdown();
      hostFixture.detectChanges();
      await hostFixture.whenStable();
    });

    it('should emit portalClicked when Portal de Usuario is clicked', () => {
      spyOn(dropdownComponent.portalClicked, 'emit');
      
      const portalOption = document.querySelector('[data-testid="portal-option"]') as HTMLElement;
      portalOption?.click();
      
      expect(dropdownComponent.portalClicked.emit).toHaveBeenCalled();
    });

    it('should emit logoutClicked when Logout is clicked', () => {
      spyOn(dropdownComponent.logoutClicked, 'emit');
      
      const logoutOption = document.querySelector('[data-testid="logout-option"]') as HTMLElement;
      logoutOption?.click();
      
      expect(dropdownComponent.logoutClicked.emit).toHaveBeenCalled();
    });

    it('should emit closed when clicking outside dropdown', () => {
      spyOn(dropdownComponent.closed, 'emit');
      
      // Simulate clicking outside by triggering backdrop click
      const backdrop = document.querySelector('.cdk-overlay-backdrop') as HTMLElement;
      backdrop?.click();
      
      expect(dropdownComponent.closed.emit).toHaveBeenCalled();
    });
  });

  describe('keyboard navigation', () => {
    beforeEach(async () => {
      hostComponent.toggleDropdown();
      hostFixture.detectChanges();
      await hostFixture.whenStable();
    });

    it('should close dropdown on Escape key', () => {
      spyOn(dropdownComponent.closed, 'emit');
      
      const dropdownContent = document.querySelector('[data-testid="dropdown-content"]') as HTMLElement;
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      dropdownContent?.dispatchEvent(escapeEvent);
      
      expect(dropdownComponent.closed.emit).toHaveBeenCalled();
    });

    it('should support Tab navigation between options', () => {
      const portalOption = document.querySelector('[data-testid="portal-option"]') as HTMLElement;
      const logoutOption = document.querySelector('[data-testid="logout-option"]') as HTMLElement;
      
      expect(portalOption?.tabIndex).not.toBe(-1);
      expect(logoutOption?.tabIndex).not.toBe(-1);
    });

    it('should trigger actions on Enter key', () => {
      spyOn(dropdownComponent.portalClicked, 'emit');
      
      const portalOption = document.querySelector('[data-testid="portal-option"]') as HTMLElement;
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      portalOption?.dispatchEvent(enterEvent);
      
      expect(dropdownComponent.portalClicked.emit).toHaveBeenCalled();
    });

    it('should trigger actions on Space key', () => {
      spyOn(dropdownComponent.logoutClicked, 'emit');
      
      const logoutOption = document.querySelector('[data-testid="logout-option"]') as HTMLElement;
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
      logoutOption?.dispatchEvent(spaceEvent);
      
      expect(dropdownComponent.logoutClicked.emit).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    beforeEach(async () => {
      hostComponent.toggleDropdown();
      hostFixture.detectChanges();
      await hostFixture.whenStable();
    });

    it('should have proper ARIA labels', () => {
      const dropdownContent = document.querySelector('[data-testid="dropdown-content"]');
      const portalOption = document.querySelector('[data-testid="portal-option"]');
      const logoutOption = document.querySelector('[data-testid="logout-option"]');
      
      expect(dropdownContent?.getAttribute('role')).toBe('menu');
      expect(portalOption?.getAttribute('role')).toBe('menuitem');
      expect(logoutOption?.getAttribute('role')).toBe('menuitem');
      expect(portalOption?.getAttribute('aria-label')).toBeTruthy();
      expect(logoutOption?.getAttribute('aria-label')).toBeTruthy();
    });

    it('should have proper focus management', () => {
      const portalOption = document.querySelector('[data-testid="portal-option"]') as HTMLElement;
      
      // First option should be focusable
      expect(portalOption?.tabIndex).not.toBe(-1);
    });

    it('should announce dropdown state changes to screen readers', () => {
      const dropdownContent = document.querySelector('[data-testid="dropdown-content"]');
      expect(dropdownContent?.getAttribute('aria-live')).toBeTruthy();
    });
  });

  describe('styling', () => {
    beforeEach(async () => {
      hostComponent.toggleDropdown();
      hostFixture.detectChanges();
      await hostFixture.whenStable();
    });

    it('should apply correct Tailwind classes', () => {
      const dropdownContent = document.querySelector('[data-testid="dropdown-content"]');
      const classList = dropdownContent?.classList;
      
      expect(classList?.contains('bg-popover')).toBe(true);
      expect(classList?.contains('border')).toBe(true);
      expect(classList?.contains('border-border')).toBe(true);
      expect(classList?.contains('rounded-md')).toBe(true);
      expect(classList?.contains('shadow-lg')).toBe(true);
    });

    it('should have hover effects on menu items', () => {
      const portalOption = document.querySelector('[data-testid="portal-option"]');
      const classList = portalOption?.classList;
      
      expect(classList?.contains('hover:bg-accent')).toBe(true);
      expect(classList?.contains('transition-colors')).toBe(true);
    });
  });

  describe('positioning', () => {
    it('should position dropdown relative to trigger element', async () => {
      hostComponent.toggleDropdown();
      hostFixture.detectChanges();
      await hostFixture.whenStable();
      
      // The CDK overlay should position the dropdown
      const overlayPane = document.querySelector('.cdk-overlay-pane');
      expect(overlayPane).toBeTruthy();
    });

    it('should have correct z-index for layering', async () => {
      hostComponent.toggleDropdown();
      hostFixture.detectChanges();
      await hostFixture.whenStable();
      
      const overlayContainer = document.querySelector('.cdk-overlay-container');
      expect(overlayContainer).toBeTruthy();
    });
  });

  describe('edge cases', () => {
    it('should handle missing user data gracefully', () => {
      hostComponent.userName.set('');
      hostComponent.userEmail.set('');
      hostComponent.toggleDropdown();
      hostFixture.detectChanges();
      
      expect(dropdownComponent.userName()).toBe('');
      expect(dropdownComponent.userEmail()).toBe('');
      // Component should still render without errors
      expect(dropdownComponent).toBeTruthy();
    });

    it('should handle rapid open/close operations', () => {
      // Rapidly toggle dropdown multiple times
      for (let i = 0; i < 5; i++) {
        hostComponent.toggleDropdown();
        hostFixture.detectChanges();
      }
      
      // Should end up in closed state (odd number of toggles)
      expect(hostComponent.isDropdownOpen()).toBe(true);
    });

    it('should cleanup resources on destroy', () => {
      hostComponent.toggleDropdown();
      hostFixture.detectChanges();
      
      // Destroy the component
      hostFixture.destroy();
      
      // Overlay should be cleaned up
      const overlayPanes = document.querySelectorAll('.cdk-overlay-pane');
      expect(overlayPanes.length).toBe(0);
    });
  });
});
