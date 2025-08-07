import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.css'
})
export class CtaComponent {
  @Output() getStarted = new EventEmitter<void>();
  @Output() viewPlans = new EventEmitter<void>();

  benefits = [
    {
      icon: '✨',
      text: 'Planificación inteligente de entrenamientos'
    },
    {
      icon: '📊',
      text: 'Seguimiento completo de progreso'
    },
    {
      icon: '🎯',
      text: 'Objetivos personalizados y alcanzables'
    },
    {
      icon: '🤝',
      text: 'Comunidad deportiva activa'
    }
  ];

  stats = [
    {
      value: '10,000+',
      label: 'Usuarios Activos'
    },
    {
      value: '95%',
      label: 'Satisfacción'
    },
    {
      value: '24/7',
      label: 'Soporte'
    }
  ];

  trustIndicators = [
    '✅ Sin compromiso a largo plazo',
    '✅ Prueba gratuita de 30 días',
    '✅ Cancela cuando quieras',
    '✅ Datos seguros y privados'
  ];

  onGetStarted(): void {
    this.getStarted.emit();
  }

  onViewPlans(): void {
    this.viewPlans.emit();
  }
}
