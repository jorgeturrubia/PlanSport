// auth-icons.ts - Iconos Font Awesome para el sistema de autenticación
import {
  // Navegación y tabs
  faSignInAlt,    // Tab de login
  faUserPlus,     // Tab de registro
  faArrowLeft,    // Volver (futuro)
  
  // Campos de formulario
  faUser,         // Campo nombre
  faEnvelope,     // Campo email
  faLock,         // Campo contraseña
  faEye,          // Mostrar contraseña
  faEyeSlash,     // Ocultar contraseña
  
  // Deportes para selector
  faFutbol,       // Fútbol (default)
  faBasketballBall, // Basketball
  faSwimmer,      // Natación
  faRunning,      // Atletismo
  faDumbbell,     // Gimnasio
  
  // Estados y validación
  faCheck,        // Campo válido
  faExclamationTriangle, // Error/advertencia
  faInfoCircle,   // Información/ayuda
  faSpinner,      // Loading (futuro)
} from '@fortawesome/free-solid-svg-icons';

// Exportar iconos para uso en componentes
export {
  faSignInAlt,
  faUserPlus,
  faArrowLeft,
  faUser,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faFutbol,
  faBasketballBall,
  faSwimmer,
  faRunning,
  faDumbbell,
  faCheck,
  faExclamationTriangle,
  faInfoCircle,
  faSpinner
};

// Alias para acciones específicas
export const faLoginAction = faSignInAlt;
export const faRegisterAction = faUserPlus;