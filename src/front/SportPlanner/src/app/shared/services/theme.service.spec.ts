import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    
    // Clear dark class from document
    document.documentElement.classList.remove('dark');
    
    TestBed.configureTestingModule({
      providers: [ThemeService]
    });
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    // Clean up after each test
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initialization', () => {
    it('should initialize with light mode by default', () => {
      // Create a new service instance to test initialization
      const newService = new ThemeService();
      expect(newService.isDarkMode()).toBe(false);
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('should initialize with dark mode if saved preference is dark', () => {
      // Set dark mode preference in localStorage
      localStorage.setItem('theme-preference', 'dark');
      
      // Create a new service instance to test initialization
      const newService = new ThemeService();
      expect(newService.isDarkMode()).toBe(true);
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should initialize with light mode if saved preference is light', () => {
      localStorage.setItem('theme-preference', 'light');
      
      const newService = new ThemeService();
      expect(newService.isDarkMode()).toBe(false);
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });

  describe('toggleTheme', () => {
    it('should toggle from light to dark mode', () => {
      expect(service.isDarkMode()).toBe(false);
      
      service.toggleTheme();
      
      expect(service.isDarkMode()).toBe(true);
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(localStorage.getItem('theme-preference')).toBe('dark');
    });

    it('should toggle from dark to light mode', () => {
      // First set to dark mode
      service.toggleTheme();
      expect(service.isDarkMode()).toBe(true);
      
      // Then toggle back to light
      service.toggleTheme();
      
      expect(service.isDarkMode()).toBe(false);
      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(localStorage.getItem('theme-preference')).toBe('light');
    });

    it('should save preference to localStorage when toggling', () => {
      service.toggleTheme();
      expect(localStorage.getItem('theme-preference')).toBe('dark');
      
      service.toggleTheme();
      expect(localStorage.getItem('theme-preference')).toBe('light');
    });
  });

  describe('setTheme', () => {
    it('should set dark mode', () => {
      service.setTheme('dark');
      
      expect(service.isDarkMode()).toBe(true);
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(localStorage.getItem('theme-preference')).toBe('dark');
    });

    it('should set light mode', () => {
      // First set to dark
      service.setTheme('dark');
      
      // Then set to light
      service.setTheme('light');
      
      expect(service.isDarkMode()).toBe(false);
      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(localStorage.getItem('theme-preference')).toBe('light');
    });
  });

  describe('isDarkMode signal', () => {
    it('should return readonly signal', () => {
      const darkModeSignal = service.isDarkMode;
      expect(typeof darkModeSignal).toBe('function');
      expect(darkModeSignal()).toBe(false);
    });

    it('should update when theme changes', () => {
      expect(service.isDarkMode()).toBe(false);
      
      service.toggleTheme();
      expect(service.isDarkMode()).toBe(true);
      
      service.toggleTheme();
      expect(service.isDarkMode()).toBe(false);
    });
  });

  describe('localStorage persistence', () => {
    it('should persist dark theme preference', () => {
      service.setTheme('dark');
      expect(localStorage.getItem('theme-preference')).toBe('dark');
    });

    it('should persist light theme preference', () => {
      service.setTheme('light');
      expect(localStorage.getItem('theme-preference')).toBe('light');
    });

    it('should load persisted preference on service creation', () => {
      localStorage.setItem('theme-preference', 'dark');
      
      const newService = new ThemeService();
      expect(newService.isDarkMode()).toBe(true);
    });
  });

  describe('DOM manipulation', () => {
    it('should add dark class to document element when dark mode is enabled', () => {
      service.setTheme('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should remove dark class from document element when light mode is enabled', () => {
      service.setTheme('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      
      service.setTheme('light');
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });
});
