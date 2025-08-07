import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent {
  // Input signals for component configuration
  title = input<string>('SportAgentoos');
  subtitle = input<string>(
    'La plataforma multi-tenant de planificación deportiva que ayuda a coaches y clubs deportivos ' +
    'a gestionar programas de entrenamiento completos con generación automática de entrenamientos ' +
    'y un marketplace colaborativo para compartir conocimiento deportivo.'
  );
  ctaText = input<string>('Descubre las Características');
  ctaTarget = input<string>('features');
  showCta = input<boolean>(true);

  // Output events
  navigate = output<string>();

  /**
   * Handles call-to-action button click
   * Emits navigation event to parent component
   */
  onCtaClick(): void {
    this.navigate.emit(this.ctaTarget());
  }
}