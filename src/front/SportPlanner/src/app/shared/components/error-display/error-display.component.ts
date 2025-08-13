import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faExclamationTriangle, faInfoCircle, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-error-display',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <div [class]="getContainerClass()" role="alert">
      <div class="flex items-center">
        <fa-icon [icon]="getIcon()" class="mr-2"></fa-icon>
        <span>{{ message }}</span>
      </div>
    </div>
  `,
  styles: [`
    @import "tailwindcss" reference;
    
    .error-container {
      @apply p-4 rounded-lg mb-4;
    }
    .error {
      @apply bg-red-100 text-red-800 border border-red-200;
    }
    .success {
      @apply bg-green-100 text-green-800 border border-green-200;
    }
    .info {
      @apply bg-blue-100 text-blue-800 border border-blue-200;
    }
    .warning {
      @apply bg-yellow-100 text-yellow-800 border border-yellow-200;
    }
  `]
})
export class ErrorDisplayComponent {
  @Input() message: string = '';
  @Input() type: 'error' | 'success' | 'info' | 'warning' = 'error';
  @Input() dismissible: boolean = false;

  // Icons
  faExclamationTriangle = faExclamationTriangle;
  faInfoCircle = faInfoCircle;
  faCheck = faCheck;

  getContainerClass(): string {
    let baseClass = 'error-container ';
    
    switch (this.type) {
      case 'error':
        baseClass += 'error';
        break;
      case 'success':
        baseClass += 'success';
        break;
      case 'info':
        baseClass += 'info';
        break;
      case 'warning':
        baseClass += 'warning';
        break;
      default:
        baseClass += 'error';
    }
    
    if (this.dismissible) {
      baseClass += ' pr-10 relative';
    }
    
    return baseClass;
  }

  getIcon() {
    switch (this.type) {
      case 'error':
      case 'warning':
        return faExclamationTriangle;
      case 'info':
        return faInfoCircle;
      case 'success':
        return faCheck;
      default:
        return faExclamationTriangle;
    }
  }
}