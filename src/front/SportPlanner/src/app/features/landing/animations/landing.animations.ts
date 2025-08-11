import { trigger, transition, style, animate, query, stagger, state } from '@angular/animations';

/**
 * Animaciones reutilizables para la Landing Page
 */
export const landingAnimations = {
  /**
   * Fade in desde abajo
   */
  fadeInUp: trigger('fadeInUp', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ])
  ]),

  /**
   * Fade in desde la izquierda
   */
  fadeInLeft: trigger('fadeInLeft', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(-20px)' }),
      animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
    ])
  ]),

  /**
   * Fade in desde la derecha
   */
  fadeInRight: trigger('fadeInRight', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(20px)' }),
      animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
    ])
  ]),

  /**
   * Scale in para cards
   */
  scaleIn: trigger('scaleIn', [
    transition(':enter', [
      style({ opacity: 0, transform: 'scale(0.9)' }),
      animate('400ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
    ])
  ]),

  /**
   * Stagger para listas
   */
  listAnimation: trigger('listAnimation', [
    transition('* <=> *', [
      query(':enter', [
        style({ opacity: 0, transform: 'translateY(15px)' }),
        stagger('50ms', [
          animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
        ])
      ], { optional: true })
    ])
  ]),

  /**
   * Slide para menú móvil
   */
  slideMenu: trigger('slideMenu', [
    state('closed', style({
      transform: 'translateX(100%)'
    })),
    state('open', style({
      transform: 'translateX(0)'
    })),
    transition('closed <=> open', [
      animate('300ms ease-in-out')
    ])
  ]),

  /**
   * Rotación para iconos
   */
  rotate: trigger('rotate', [
    state('default', style({ transform: 'rotate(0)' })),
    state('rotated', style({ transform: 'rotate(180deg)' })),
    transition('default <=> rotated', [
      animate('200ms ease-in-out')
    ])
  ]),

  /**
   * Pulse para botones CTA
   */
  pulse: trigger('pulse', [
    transition(':enter', [
      animate('1s ease-in-out', style({ transform: 'scale(1.05)' })),
      animate('1s ease-in-out', style({ transform: 'scale(1)' }))
    ])
  ])
};

/**
 * Helper para verificar si las animaciones deben estar deshabilitadas
 * (respeta prefers-reduced-motion)
 */
export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
}
