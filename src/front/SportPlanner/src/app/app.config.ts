import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { authInterceptor } from './features/auth/services/auth.interceptor';
import { provideIcons } from '@ng-icons/core';
import { 
  heroUsers, 
  heroBars3, 
  heroViewfinderCircle, 
  heroCalendarDays, 
  heroArrowTrendingUp,
  heroMagnifyingGlass,
  heroXMark,
  heroBell,
  heroHome,
  heroChevronDown,
  heroPower,
  heroSun,
  heroMoon,
  heroComputerDesktop,
  heroPlus,
  heroPencil,
  heroTrash,
  heroBolt,
  heroStop,
  heroSpeakerWave,
  heroHandRaised,
  heroShieldCheck,
  heroMinus,
  heroFire
} from '@ng-icons/heroicons/outline';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withInterceptors([authInterceptor]),
      withFetch()
    ),
    provideIcons({
      heroUsers, 
      heroBars3, 
      heroViewfinderCircle, 
      heroCalendarDays, 
      heroArrowTrendingUp,
      heroMagnifyingGlass,
      heroXMark,
      heroBell,
      heroHome,
      heroChevronDown,
      heroPower,
      heroSun,
      heroMoon,
      heroComputerDesktop,
      heroPlus,
      heroPencil,
      heroTrash,
      heroBolt,
      heroStop,
      heroSpeakerWave,
      heroHandRaised,
      heroShieldCheck,
      heroMinus,
      heroFire
    })
  ]
};
