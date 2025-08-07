import { TestBed } from '@angular/core/testing';
import { LayoutService } from './layout.service';

describe('LayoutService', () => {
  let service: LayoutService;
  let originalInnerWidth: number;
  
  beforeEach(() => {
    // Save original window width
    originalInnerWidth = window.innerWidth;
    
    // Mock window.innerWidth to simulate desktop (>= 1024px)
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200, // desktop width
    });
    
    TestBed.configureTestingModule({
      providers: [LayoutService]
    });
    service = TestBed.inject(LayoutService);
  });
  
  afterEach(() => {
    // Restore original window width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initialization', () => {
    it('should initialize with sidebar expanded by default on desktop', () => {
      // Mock window.innerWidth for desktop before creating the service
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1200, // desktop width
      });
      
      const newService = new LayoutService();
      expect(newService.isSidebarExpanded()).toBe(true);
    });
    
    it('should initialize with sidebar collapsed by default on mobile', () => {
      // Mock window.innerWidth for mobile before creating the service
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 600, // mobile width
      });
      
      const newService = new LayoutService();
      expect(newService.isSidebarExpanded()).toBe(false);
    });
  });

  describe('sidebar state management', () => {
    it('should have sidebar expanded initially', () => {
      expect(service.isSidebarExpanded()).toBe(true);
    });

    it('should toggle sidebar from expanded to collapsed', () => {
      expect(service.isSidebarExpanded()).toBe(true);
      
      service.toggleSidebar();
      
      expect(service.isSidebarExpanded()).toBe(false);
    });

    it('should toggle sidebar from collapsed to expanded', () => {
      // First collapse the sidebar
      service.toggleSidebar();
      expect(service.isSidebarExpanded()).toBe(false);
      
      // Then expand it again
      service.toggleSidebar();
      
      expect(service.isSidebarExpanded()).toBe(true);
    });

    it('should expand sidebar when calling expandSidebar', () => {
      // First collapse the sidebar
      service.collapseSidebar();
      expect(service.isSidebarExpanded()).toBe(false);
      
      service.expandSidebar();
      
      expect(service.isSidebarExpanded()).toBe(true);
    });

    it('should collapse sidebar when calling collapseSidebar', () => {
      expect(service.isSidebarExpanded()).toBe(true);
      
      service.collapseSidebar();
      
      expect(service.isSidebarExpanded()).toBe(false);
    });

    it('should remain expanded when expandSidebar is called on already expanded sidebar', () => {
      expect(service.isSidebarExpanded()).toBe(true);
      
      service.expandSidebar();
      
      expect(service.isSidebarExpanded()).toBe(true);
    });

    it('should remain collapsed when collapseSidebar is called on already collapsed sidebar', () => {
      service.collapseSidebar();
      expect(service.isSidebarExpanded()).toBe(false);
      
      service.collapseSidebar();
      
      expect(service.isSidebarExpanded()).toBe(false);
    });
  });

  describe('isSidebarExpanded signal', () => {
    it('should return readonly signal', () => {
      const sidebarSignal = service.isSidebarExpanded;
      expect(typeof sidebarSignal).toBe('function');
      expect(sidebarSignal()).toBe(true);
    });

    it('should update when sidebar state changes', () => {
      expect(service.isSidebarExpanded()).toBe(true);
      
      service.toggleSidebar();
      expect(service.isSidebarExpanded()).toBe(false);
      
      service.toggleSidebar();
      expect(service.isSidebarExpanded()).toBe(true);
    });

    it('should update when using expandSidebar method', () => {
      service.collapseSidebar();
      expect(service.isSidebarExpanded()).toBe(false);
      
      service.expandSidebar();
      expect(service.isSidebarExpanded()).toBe(true);
    });

    it('should update when using collapseSidebar method', () => {
      expect(service.isSidebarExpanded()).toBe(true);
      
      service.collapseSidebar();
      expect(service.isSidebarExpanded()).toBe(false);
    });
  });

  describe('mobile overlay detection', () => {
    it('should provide isMobileView method', () => {
      expect(typeof service.isMobileView).toBe('function');
    });

    it('should return boolean for mobile view detection', () => {
      const isMobile = service.isMobileView();
      expect(typeof isMobile).toBe('boolean');
    });
  });

  describe('responsive behavior', () => {
    it('should auto-collapse sidebar on mobile when expanded', () => {
      // Mock window.innerWidth to simulate mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 600, // mobile width
      });

      service.handleResponsiveLayout();
      
      // On mobile, sidebar should be collapsed by default for better UX
      expect(service.isSidebarExpanded()).toBe(false);
    });

    it('should keep sidebar expanded on desktop', () => {
      // Mock window.innerWidth to simulate desktop
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1200, // desktop width
      });

      service.handleResponsiveLayout();
      
      // On desktop, sidebar should remain expanded
      expect(service.isSidebarExpanded()).toBe(true);
    });
    
    it('should detect mobile view correctly', () => {
      // Mock mobile width
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 600, // mobile width (< 768px)
      });
      
      expect(service.isMobileView()).toBe(true);
      expect(service.isTabletView()).toBe(false);
      expect(service.isDesktopView()).toBe(false);
    });
    
    it('should detect tablet view correctly', () => {
      // Mock tablet width
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 900, // tablet width (768px <= width < 1024px)
      });
      
      expect(service.isMobileView()).toBe(false);
      expect(service.isTabletView()).toBe(true);
      expect(service.isDesktopView()).toBe(false);
    });
    
    it('should detect desktop view correctly', () => {
      // Mock desktop width
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1200, // desktop width (>= 1024px)
      });
      
      expect(service.isMobileView()).toBe(false);
      expect(service.isTabletView()).toBe(false);
      expect(service.isDesktopView()).toBe(true);
    });
    
    it('should keep current state on tablet resize', () => {
      // First expand sidebar
      service.expandSidebar();
      expect(service.isSidebarExpanded()).toBe(true);
      
      // Mock tablet width
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 900, // tablet width
      });
      
      service.handleResponsiveLayout();
      
      // On tablet, sidebar state should remain unchanged
      expect(service.isSidebarExpanded()).toBe(true);
      
      // Now collapse and test again
      service.collapseSidebar();
      service.handleResponsiveLayout();
      
      // Should still be collapsed
      expect(service.isSidebarExpanded()).toBe(false);
    });
  });
  
  describe('utility methods', () => {
    it('should return correct sidebar width for expanded state', () => {
      service.expandSidebar();
      
      // Mock desktop width
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1200,
      });
      
      expect(service.getSidebarWidth()).toBe(256); // BREAKPOINTS.sidebarExpanded
    });
    
    it('should return correct sidebar width for collapsed state', () => {
      service.collapseSidebar();
      
      expect(service.getSidebarWidth()).toBe(64); // BREAKPOINTS.sidebarCollapsed
    });
    
    it('should return mobile sidebar width on mobile when expanded', () => {
      service.expandSidebar();
      
      // Mock mobile width
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 600,
      });
      
      expect(service.getSidebarWidth()).toBe(256); // BREAKPOINTS.sidebarMobile
    });
    
    it('should detect when sidebar should overlay content', () => {
      // Mock mobile width
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 600,
      });
      
      service.expandSidebar();
      expect(service.shouldSidebarOverlay()).toBe(true);
      
      service.collapseSidebar();
      expect(service.shouldSidebarOverlay()).toBe(false);
    });
    
    it('should not overlay on desktop', () => {
      // Mock desktop width
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1200,
      });
      
      service.expandSidebar();
      expect(service.shouldSidebarOverlay()).toBe(false);
      
      service.collapseSidebar();
      expect(service.shouldSidebarOverlay()).toBe(false);
    });
    
    it('should generate correct main content CSS classes', () => {
      // Desktop expanded
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1200,
      });
      
      service.expandSidebar();
      const classes = service.getMainContentClasses();
      expect(classes).toContain('ml-64');
      expect(classes).toContain('transition-all');
      
      // Desktop collapsed
      service.collapseSidebar();
      const collapsedClasses = service.getMainContentClasses();
      expect(collapsedClasses).toContain('ml-16');
    });
    
    it('should generate correct sidebar CSS classes', () => {
      // Desktop expanded
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1200,
      });
      
      service.expandSidebar();
      const classes = service.getSidebarClasses();
      expect(classes).toContain('w-64');
      expect(classes).toContain('bg-sidebar');
      expect(classes).toContain('transition-all');
      
      // Desktop collapsed
      service.collapseSidebar();
      const collapsedClasses = service.getSidebarClasses();
      expect(collapsedClasses).toContain('w-16');
    });
  });
});
