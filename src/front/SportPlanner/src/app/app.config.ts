import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { authInterceptor } from './features/auth/services/auth.interceptor';
import { LUCIDE_ICONS, LucideIconProvider } from 'lucide-angular';
import { Users, Menu, Target, Calendar, TrendingUp, Search, X, Bell, Home, ChevronDown, LogOut, Sun, Moon, Monitor, Plus, Edit, Trash2 } from 'lucide-angular';

const lucideIcons = { 
  Users, 
  Menu, 
  Target, 
  Calendar, 
  TrendingUp,
  Search,
  X,
  Bell,
  Home,
  ChevronDown,
  LogOut,
  Sun,
  Moon,
  Monitor,
  Plus,
  Edit,
  Trash2
};

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
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider(lucideIcons),
      multi: true
    }
  ]
};
