import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css'
})
export class Reviews {

  /**
   * Handles starting free trial
   */
  onStartFree(): void {
    console.log('Iniciando prueba gratuita...');
    
    // TODO: Implement free trial registration
    // This could include:
    // - Navigate to registration page
    // - Open registration modal
    // - Start onboarding flow
    // - Track conversion event
    
    alert('Redirigiendo al registro gratuito...');
  }

  /**
   * Handles viewing more reviews
   */
  onViewMoreReviews(): void {
    console.log('Mostrando más reseñas...');
    
    // TODO: Implement more reviews functionality
    // This could include:
    // - Navigate to reviews page
    // - Load more reviews dynamically
    // - Open reviews modal
    // - Filter reviews by category
    
    alert('Cargando más reseñas...');
  }
}
