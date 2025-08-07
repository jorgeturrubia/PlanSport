/**
 * Responsive breakpoints matching TailwindCSS breakpoints
 * These values should match the ones defined in tailwind.config.ts
 */
export const BREAKPOINTS = {
  // Screen width breakpoints (in pixels)
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  
  // Sidebar specific widths (in pixels)
  sidebarExpanded: 256,      // w-64 (16rem)
  sidebarCollapsed: 64,      // w-16 (4rem)
  sidebarMobile: 256,        // w-64 full width on mobile when expanded
  
  // Header height
  headerHeight: 64,          // h-16 (4rem)
  
  // Z-index values
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    sidebar: 40,
    sidebarMobile: 50,
  },
  
  // Animation durations (in milliseconds)
  animation: {
    fast: 150,
    base: 300,
    slow: 500,
  },
  
  // Common spacing values (in pixels)
  spacing: {
    xs: 4,    // 1rem
    sm: 8,    // 2rem
    md: 16,   // 4rem
    lg: 24,   // 6rem
    xl: 32,   // 8rem
    '2xl': 48, // 12rem
  }
} as const;

/**
 * Breakpoint utility functions
 */
export const BreakpointUtils = {
  /**
   * Check if window width is at or above a breakpoint
   * @param breakpoint - Breakpoint name or pixel value
   * @returns true if window width >= breakpoint
   */
  isAbove: (breakpoint: keyof typeof BREAKPOINTS | number): boolean => {
    if (typeof window === 'undefined') return false;
    
    const value = typeof breakpoint === 'number' ? breakpoint : BREAKPOINTS[breakpoint] as number;
    return window.innerWidth >= value;
  },
  
  /**
   * Check if window width is below a breakpoint
   * @param breakpoint - Breakpoint name or pixel value
   * @returns true if window width < breakpoint
   */
  isBelow: (breakpoint: keyof typeof BREAKPOINTS | number): boolean => {
    if (typeof window === 'undefined') return false;
    
    const value = typeof breakpoint === 'number' ? breakpoint : BREAKPOINTS[breakpoint] as number;
    return window.innerWidth < value;
  },
  
  /**
   * Check if window width is between two breakpoints
   * @param min - Minimum breakpoint
   * @param max - Maximum breakpoint
   * @returns true if min <= window width < max
   */
  isBetween: (
    min: keyof typeof BREAKPOINTS | number, 
    max: keyof typeof BREAKPOINTS | number
  ): boolean => {
    if (typeof window === 'undefined') return false;
    
    const minValue = typeof min === 'number' ? min : BREAKPOINTS[min] as number;
    const maxValue = typeof max === 'number' ? max : BREAKPOINTS[max] as number;
    
    return window.innerWidth >= minValue && window.innerWidth < maxValue;
  },
  
  /**
   * Get current screen size category
   * @returns Screen size category
   */
  getCurrentScreenSize: (): 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' => {
    if (typeof window === 'undefined') return 'lg';
    
    const width = window.innerWidth;
    
    if (width >= BREAKPOINTS['2xl']) return '2xl';
    if (width >= BREAKPOINTS.xl) return 'xl';
    if (width >= BREAKPOINTS.lg) return 'lg';
    if (width >= BREAKPOINTS.md) return 'md';
    if (width >= BREAKPOINTS.sm) return 'sm';
    return 'xs';
  },
  
  /**
   * Check if current screen is mobile (below md breakpoint)
   * @returns true if mobile screen
   */
  isMobile: (): boolean => {
    return BreakpointUtils.isBelow('md');
  },
  
  /**
   * Check if current screen is tablet (between md and lg breakpoints)
   * @returns true if tablet screen
   */
  isTablet: (): boolean => {
    return BreakpointUtils.isBetween('md', 'lg');
  },
  
  /**
   * Check if current screen is desktop (lg and above)
   * @returns true if desktop screen
   */
  isDesktop: (): boolean => {
    return BreakpointUtils.isAbove('lg');
  }
};

/**
 * CSS classes for common responsive patterns
 */
export const ResponsiveClasses = {
  // Container patterns
  container: 'container mx-auto px-4 sm:px-6 lg:px-8',
  containerFluid: 'w-full px-4 sm:px-6 lg:px-8',
  
  // Grid patterns
  gridResponsive: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
  gridCards: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
  
  // Flexbox patterns
  flexResponsive: 'flex flex-col lg:flex-row gap-6',
  flexCenter: 'flex items-center justify-center',
  
  // Text responsive
  headingResponsive: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold',
  textResponsive: 'text-sm sm:text-base lg:text-lg',
  
  // Spacing responsive
  paddingResponsive: 'p-4 sm:p-6 md:p-8 lg:p-12',
  marginResponsive: 'm-4 sm:m-6 md:m-8 lg:m-12',
  
  // Visibility patterns
  showOnMobile: 'block md:hidden',
  hideOnMobile: 'hidden md:block',
  showOnTablet: 'hidden md:block lg:hidden',
  showOnDesktop: 'hidden lg:block',
  
} as const;
