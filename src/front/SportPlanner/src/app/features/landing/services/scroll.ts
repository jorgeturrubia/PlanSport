import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private readonly document = inject(DOCUMENT);
  private readonly activeSectionSubject = new BehaviorSubject<string>('hero');
  
  // Observable público para la sección activa
  readonly activeSection$ = this.activeSectionSubject.asObservable();
  
  // Configuración del observador
  private observer: IntersectionObserver | null = null;
  private readonly headerOffset = 64; // Altura del header sticky
  
  /**
   * Navega suavemente a una sección específica
   * @param sectionId ID de la sección a la que navegar
   */
  scrollToSection(sectionId: string): void {
    const element = this.document.getElementById(sectionId);
    if (element) {
      const yOffset = -this.headerOffset;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ 
        top: y, 
        behavior: 'smooth' 
      });
    }
  }
  
  /**
   * Inicializa el IntersectionObserver para detectar la sección visible
   */
  initSectionObserver(): void {
    // Limpiar observer anterior si existe
    this.destroyObserver();
    
    // Opciones del observer
    const options = {
      root: null,
      rootMargin: `-${this.headerOffset}px 0px -70% 0px`,
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };
    
    // Crear el observer
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
          const sectionId = entry.target.id;
          if (sectionId) {
            this.activeSectionSubject.next(sectionId);
          }
        }
      });
    }, options);
    
    // Observar todas las secciones
    const sections = this.document.querySelectorAll('section[id]');
    sections.forEach(section => {
      this.observer?.observe(section);
    });
  }
  
  /**
   * Limpia el observer
   */
  destroyObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
  
  /**
   * Observable para detectar el estado de scroll
   */
  getScrollPosition(): Observable<number> {
    return fromEvent(window, 'scroll').pipe(
      debounceTime(10),
      map(() => window.pageYOffset || this.document.documentElement.scrollTop),
      distinctUntilChanged()
    );
  }
  
  /**
   * Verifica si el usuario ha scrolleado más allá del hero
   */
  hasScrolledPastHero(): Observable<boolean> {
    return this.getScrollPosition().pipe(
      map(position => position > 100)
    );
  }
}
