import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscriptions.html',
  styleUrl: './subscriptions.css'
})
export class Subscriptions {

  /**
   * Handles plan selection
   * @param planType - The selected plan type ('basic', 'pro', 'elite')
   */
  onSelectPlan(planType: string): void {
    console.log(`Plan seleccionado: ${planType}`);
    
    // TODO: Implement plan selection logic
    // This could include:
    // - Redirect to registration/payment flow
    // - Open modal with plan details
    // - Track analytics event
    // - Show confirmation dialog
    
    switch (planType) {
      case 'basic':
        // Handle basic plan selection
        this.handleBasicPlan();
        break;
      case 'pro':
        // Handle pro plan selection
        this.handleProPlan();
        break;
      case 'elite':
        // Handle elite plan selection
        this.handleElitePlan();
        break;
      default:
        console.warn('Plan type not recognized:', planType);
    }
  }

  private handleBasicPlan(): void {
    // TODO: Implement basic plan flow
    alert('Redirigiendo al registro del Plan Básico...');
  }

  private handleProPlan(): void {
    // TODO: Implement pro plan flow
    alert('Redirigiendo al registro del Plan Pro...');
  }

  private handleElitePlan(): void {
    // TODO: Implement elite plan flow
    alert('Contactando con el equipo de ventas...');
  }
}
