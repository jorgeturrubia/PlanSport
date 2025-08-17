import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private activeSectionSubject = new BehaviorSubject<string>('');
  public activeSection$: Observable<string> = this.activeSectionSubject.asObservable();
  
  constructor(private router: Router) {}
  
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Height of fixed header
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update URL with anchor
      this.router.navigate([], { fragment: sectionId });
    }
  }
  
  getCurrentSection(): string {
    const sections = ['caracteristicas', 'suscripciones', 'marketplace', 'resenas'];
    const scrollPosition = window.scrollY + 100;
    
    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element && scrollPosition >= element.offsetTop && 
          scrollPosition < element.offsetTop + element.offsetHeight) {
        return sectionId;
      }
    }
    return '';
  }
  
  updateActiveSection(): void {
    const currentSection = this.getCurrentSection();
    if (currentSection !== this.activeSectionSubject.value) {
      this.activeSectionSubject.next(currentSection);
    }
  }
  
  getActiveSection(): string {
    return this.activeSectionSubject.value;
  }
}