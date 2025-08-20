import { Component, Input, Output, EventEmitter, signal, computed, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { SportIconComponent } from '../sport-icon/sport-icon.component';

export interface StatisticsCardData {
  title: string;
  value: string | number;
  subtitle?: string;
  progress?: number;
  sport?: string;
  colorTheme?: string;
  sportIcon?: string;
  isLoading?: boolean;
  disabled?: boolean;
  formatValue?: boolean;
  animateProgress?: boolean;
}

@Component({
  selector: 'app-statistics-card',
  standalone: true,
  imports: [CommonModule, NgIcon, SportIconComponent],
  templateUrl: './statistics-card.component.html',
  styleUrls: ['./statistics-card.component.css']
})
export class StatisticsCardComponent implements OnChanges {
  @Input() title: string = '';
  @Input() value: string | number = '';
  @Input() subtitle: string = '';
  @Input() progress: number = 0;
  @Input() sport: string = 'default';
  @Input() colorTheme: 'green' | 'blue' | 'purple' | 'amber' | 'red' | 'indigo' | 'gray' = 'green';
  @Input() sportIcon: string = '';
  @Input() isLoading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() formatValue: boolean = false;
  @Input() animateProgress: boolean = true;
  @Input() clickable: boolean = true;

  @Output() cardClick = new EventEmitter<void>();

  // Signal-based state management
  private _isHovered = signal(false);
  private _currentProgress = signal(0);

  // Computed properties
  isHovered = computed(() => this._isHovered());
  currentProgress = computed(() => this._currentProgress());

  formattedValue = computed(() => {
    if (!this.formatValue || typeof this.value !== 'number') {
      return this.value.toString();
    }
    return this.formatNumber(this.value);
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['progress'] && this.animateProgress) {
      this.animateProgressBar();
    } else if (changes['progress']) {
      this._currentProgress.set(this.progress);
    }
  }

  onMouseEnter(): void {
    this._isHovered.set(true);
  }

  onMouseLeave(): void {
    this._isHovered.set(false);
  }

  onCardClick(): void {
    if (!this.disabled && this.clickable) {
      this.cardClick.emit();
    }
  }

  private formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  private animateProgressBar(): void {
    const startProgress = this._currentProgress();
    const endProgress = this.progress;
    const duration = 500; // milliseconds
    const stepTime = 16; // ~60fps
    const steps = duration / stepTime;
    const progressDiff = endProgress - startProgress;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const easedProgress = this.easeOutCubic(currentStep / steps);
      const newProgress = startProgress + (progressDiff * easedProgress);
      
      this._currentProgress.set(Math.round(newProgress));

      if (currentStep >= steps) {
        clearInterval(timer);
        this._currentProgress.set(endProgress);
      }
    }, stepTime);
  }

  private easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }

  getCardClasses(): string {
    const baseClasses = [
      'statistics-card',
      `theme-${this.colorTheme}`,
      'group',
      'relative',
      'overflow-hidden',
      'backdrop-blur-sm',
      'border',
      'rounded-xl',
      'p-6',
      'transition-all',
      'duration-300'
    ];

    if (this.clickable && !this.disabled) {
      baseClasses.push('cursor-pointer', 'hover:shadow-lg');
    }

    if (this.disabled) {
      baseClasses.push('disabled', 'opacity-50', 'cursor-not-allowed');
    }

    if (this.isHovered() && !this.disabled) {
      baseClasses.push('scale-105');
    }

    return baseClasses.join(' ');
  }

  getProgressBarClasses(): string {
    return [
      'h-full',
      'rounded-full',
      'transition-all',
      'duration-500',
      'ease-out',
      `bg-gradient-to-r`,
      `from-${this.colorTheme}-500`,
      `to-${this.colorTheme}-600`
    ].join(' ');
  }
}