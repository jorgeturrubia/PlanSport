import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  
  // Current year for copyright
  currentYear = new Date().getFullYear();
  
  /**
   * Handles newsletter subscription
   */
  onSubscribeNewsletter(): void {
    console.log('Suscribiendo al newsletter...');
    
    // TODO: Implement newsletter subscription
    // This could include:
    // - Validate email format
    // - Send subscription request to API
    // - Show success/error messages
    // - Track subscription event
    
    alert('¡Gracias por suscribirte! Recibirás nuestras últimas noticias.');
  }
}
