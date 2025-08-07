
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { SidebarComponent } from './sidebar.component';
import { LayoutService } from '../../../../shared/services/layout.service';
import { NavigationService } from './navigation.service';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { NavigationConfig } from './navigation.interface';
import { Theme } from '../../../../shared/services/theme.service';

// Mock Services
class MockLayoutService {
  isSidebarExpanded: WritableSignal<boolean> = signal(true);
  toggleSidebar = jasmine.createSpy('toggleSidebar');
}

class MockNavigationService {
  navigationConfig: WritableSignal<NavigationConfig> = signal({
    sections: [
      {
        id: 'main',
        label: 'Main Section',
        items: [{ id: 'home', label: 'Home', icon: 'home', route: '/dashboard' }],
      },
    ],
  });
  currentRoute = signal('/dashboard');
  navigateTo = jasmine.createSpy('navigateTo');
  toggleItemExpanded = jasmine.createSpy('toggleItemExpanded');
  toggleSectionCollapsed = jasmine.createSpy('toggleSectionCollapsed');
}

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let layoutService: MockLayoutService;
  let navigationService: MockNavigationService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, NoopAnimationsModule, ThemeToggleComponent],
      providers: [
        { provide: LayoutService, useClass: MockLayoutService },
        { provide: NavigationService, useClass: MockNavigationService },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    layoutService = TestBed.inject(LayoutService) as unknown as MockLayoutService;
    navigationService = TestBed.inject(NavigationService) as unknown as MockNavigationService;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidebar when toggleSidebar is called', () => {
    component.toggleSidebar();
    expect(layoutService.toggleSidebar).toHaveBeenCalled();
  });

  it('should call navigateTo on item click if it has no children', () => {
    const item = { id: 'home', label: 'Home', icon: 'home', route: '/dashboard' };
    component.onNavigationItemClick(item);
    expect(navigationService.navigateTo).toHaveBeenCalledWith('/dashboard');
  });

  it('should call toggleItemExpanded on item click if it has children', () => {
    const item = { id: 'parent', label: 'Parent', icon: 'folder', route: '#', children: [{ id: 'child', label: 'Child', icon: 'file', route: '/child' }] };
    component.onNavigationItemClick(item);
    expect(navigationService.toggleItemExpanded).toHaveBeenCalledWith('parent');
  });

  it('should call toggleSectionCollapsed on section toggle', () => {
    const section = { id: 'main', label: 'Main', isCollapsible: true, items: [] };
    component.onSectionToggle(section);
    expect(navigationService.toggleSectionCollapsed).toHaveBeenCalledWith('main');
  });

  it('should not call toggleSectionCollapsed if section is not collapsible', () => {
    const section = { id: 'main', label: 'Main', isCollapsible: false, items: [] };
    component.onSectionToggle(section);
    expect(navigationService.toggleSectionCollapsed).not.toHaveBeenCalled();
  });

  it('should handle theme changes from ThemeToggleComponent', () => {
    spyOn(console, 'log');
    const themeToggle = fixture.debugElement.nativeElement.querySelector('app-theme-toggle');
    themeToggle.dispatchEvent(new CustomEvent('themeChanged', { detail: 'dark' }));
    fixture.detectChanges();
    
    component.onThemeChanged('dark' as Theme);
    expect(console.log).toHaveBeenCalledWith('Theme changed to:', 'dark');
  });

  it('should correctly determine if an item is active', () => {
    const activeItem = { id: 'active', label: 'Active', icon: 'check', route: '/active', isActive: true };
    const inactiveItem = { id: 'inactive', label: 'Inactive', icon: 'cross', route: '/inactive', isActive: false };
    expect(component.isItemActive(activeItem)).toBe(true);
    expect(component.isItemActive(inactiveItem)).toBe(false);
  });

  it('should correctly determine if children should be shown', () => {
    const expandedItem = { id: 'p1', label: 'Parent 1', icon: 'folder', route: '#', children: [{ id: 'c1', label: 'Child 1', icon: 'file', route: '/child1' }], isExpanded: true };
    const collapsedItem = { id: 'p2', label: 'Parent 2', icon: 'folder', route: '#', children: [{ id: 'c2', label: 'Child 2', icon: 'file', route: '/child2' }], isExpanded: false };
    const noChildrenItem = { id: 'p3', label: 'Parent 3', icon: 'single', route: '/parent3' };
    
    expect(component.shouldShowChildren(expandedItem)).toBe(true);
    expect(component.shouldShowChildren(collapsedItem)).toBe(false);
    expect(component.shouldShowChildren(noChildrenItem)).toBe(false);
  });

});

