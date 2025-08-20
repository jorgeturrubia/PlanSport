import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';

export type SportType = 
  | 'football' 
  | 'basketball' 
  | 'volleyball' 
  | 'tennis' 
  | 'swimming' 
  | 'athletics' 
  | 'handball' 
  | 'rugby' 
  | 'hockey' 
  | 'other'
  | 'default';

export type IconSize = 'small' | 'medium' | 'large' | 'xlarge';
export type IconColor = 'green' | 'blue' | 'purple' | 'amber' | 'red' | 'indigo' | 'gray';

export interface SportIconMapping {
  [key: string]: string;
}

@Component({
  selector: 'app-sport-icon',
  standalone: true,
  imports: [CommonModule, NgIcon],
  templateUrl: './sport-icon.component.html',
  styleUrls: ['./sport-icon.component.css']
})
export class SportIconComponent {
  @Input() sport: SportType | string = 'default';
  @Input() size: IconSize = 'medium';
  @Input() color: IconColor = 'green';
  @Input() active: boolean = false;
  @Input() disabled: boolean = false;
  @Input() customIcon: string = '';
  @Input() clickable: boolean = false;

  @Output() iconClick = new EventEmitter<SportType | string>();

  // Signal-based state management
  private _isHovered = signal(false);

  // Computed properties
  isHovered = computed(() => this._isHovered());

  // Sport to icon mapping
  private sportIconMap: SportIconMapping = {
    'football': 'heroUsers',
    'basketball': 'heroViewfinderCircle',
    'volleyball': 'heroBolt',
    'tennis': 'heroStop',
    'swimming': 'heroSpeakerWave',
    'athletics': 'heroArrowTrendingUp',
    'handball': 'heroHandRaised',
    'rugby': 'heroShieldCheck',
    'hockey': 'heroMinus',
    'other': 'heroFire',
    'default': 'heroFire'
  };

  // Size classes mapping
  private sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
    xlarge: 'w-12 h-12'
  };

  getIconName(): string {
    if (this.customIcon) {
      return this.customIcon;
    }
    return this.sportIconMap[this.sport] || this.sportIconMap['default'];
  }

  getSizeClass(): string {
    return this.sizeClasses[this.size] || this.sizeClasses.medium;
  }

  getContainerClasses(): string {
    const baseClasses = [
      'sport-icon',
      `size-${this.size}`,
      `color-${this.color}`,
      'inline-flex',
      'items-center',
      'justify-center',
      'transition-all',
      'duration-200'
    ];

    if (this.active) {
      baseClasses.push('active');
    }

    if (this.disabled) {
      baseClasses.push('disabled', 'opacity-50', 'cursor-not-allowed');
    } else if (this.clickable) {
      baseClasses.push('cursor-pointer', 'hover:scale-110');
    }

    if (this.isHovered() && !this.disabled) {
      baseClasses.push('hovered');
    }

    return baseClasses.join(' ');
  }

  getIconClasses(): string {
    const baseClasses = [
      this.getSizeClass(),
      'transition-all',
      'duration-200'
    ];

    // Color classes
    switch (this.color) {
      case 'green':
        baseClasses.push('text-green-600', 'dark:text-green-400');
        break;
      case 'blue':
        baseClasses.push('text-blue-600', 'dark:text-blue-400');
        break;
      case 'purple':
        baseClasses.push('text-purple-600', 'dark:text-purple-400');
        break;
      case 'amber':
        baseClasses.push('text-amber-600', 'dark:text-amber-400');
        break;
      case 'red':
        baseClasses.push('text-red-600', 'dark:text-red-400');
        break;
      case 'indigo':
        baseClasses.push('text-indigo-600', 'dark:text-indigo-400');
        break;
      case 'gray':
        baseClasses.push('text-gray-600', 'dark:text-gray-400');
        break;
      default:
        baseClasses.push('text-gray-600', 'dark:text-gray-400');
    }

    return baseClasses.join(' ');
  }

  onMouseEnter(): void {
    if (!this.disabled) {
      this._isHovered.set(true);
    }
  }

  onMouseLeave(): void {
    this._isHovered.set(false);
  }

  onClick(): void {
    if (!this.disabled && this.clickable) {
      this.iconClick.emit(this.sport);
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (!this.disabled && this.clickable && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.onClick();
    }
  }

  // Utility methods for external use
  static getSportIcon(sport: SportType | string): string {
    const defaultMap: SportIconMapping = {
      'football': 'heroUsers',
      'basketball': 'heroViewfinderCircle',
      'volleyball': 'heroBolt',
      'tennis': 'heroStop',
      'swimming': 'heroSpeakerWave',
      'athletics': 'heroArrowTrendingUp',
      'handball': 'heroHandRaised',
      'rugby': 'heroShieldCheck',
      'hockey': 'heroMinus',
      'other': 'heroFire',
      'default': 'heroFire'
    };
    return defaultMap[sport] || defaultMap['default'];
  }

  static getAllSupportedSports(): SportType[] {
    return [
      'football',
      'basketball', 
      'volleyball',
      'tennis',
      'swimming',
      'athletics',
      'handball',
      'rugby',
      'hockey',
      'other'
    ];
  }
}