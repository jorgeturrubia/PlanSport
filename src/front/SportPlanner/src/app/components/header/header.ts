import { Component, inject, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Menu, X } from 'lucide-angular';
import { NavigationService } from '../../services/navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit, OnDestroy {
  private navigationService = inject(NavigationService);
  
  // Icon references for template
  readonly MenuIcon = Menu;
  readonly XIcon = X;
  
  isMobileMenuOpen = false;
  activeSection = '';
  private activeSection$ = new Subscription();
  
  ngOnInit(): void {
    // Subscribe to active section changes
    this.activeSection$ = this.navigationService.activeSection$.subscribe(
      section => this.activeSection = section
    );
  }
  
  ngOnDestroy(): void {
    this.activeSection$.unsubscribe();
  }
  
  menuItems = [
    { label: 'Inicio', section: 'hero' },
    { label: 'Características', section: 'caracteristicas' },
    { label: 'Precios', section: 'suscripciones' },
    { label: 'Marketplace', section: 'marketplace' },
    { label: 'Reseñas', section: 'reviews' }
  ];
  
  navigateToSection(section: string): void {
    this.navigationService.scrollToSection(section);
    this.isMobileMenuOpen = false;
  }
  
  isActiveSection(section: string): boolean {
    return this.activeSection === section;
  }
  
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  
  onLogin(): void {
    // TODO: Implement login functionality
    console.log('Login clicked');
  }
  
  onRegister(): void {
    // TODO: Implement registration functionality
    console.log('Register clicked');
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const header = target.closest('header');
    
    // Close mobile menu if clicking outside the header
    if (!header && this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
    }
  }
  
  @HostListener('window:scroll')
  onScroll(): void {
    this.navigationService.updateActiveSection();
  }
}
