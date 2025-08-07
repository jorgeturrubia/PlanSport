import { 
  Component, 
  input, 
  output, 
  signal, 
  computed, 
  effect,
  ElementRef,
  OnDestroy,
  ChangeDetectionStrategy 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  Overlay, 
  OverlayRef, 
  OverlayPositionBuilder,
  ConnectedPosition 
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ViewContainerRef, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-user-profile-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile-dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileDropdownComponent implements OnDestroy {
  // Input signals
  isOpen = input<boolean>(false);
  triggerElement = input<any>(null); // Accept template reference variable
  userName = input<string>('Usuario');
  userEmail = input<string>('');

  // Output events
  closed = output<void>();
  portalClicked = output<void>();
  logoutClicked = output<void>();

  // Template reference for the dropdown content
  @ViewChild('dropdownTemplate', { static: true }) 
  private dropdownTemplate!: TemplateRef<any>;

  // Overlay reference
  private overlayRef: OverlayRef | null = null;
  private portal: TemplatePortal | null = null;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private viewContainerRef: ViewContainerRef,
    private elementRef: ElementRef
  ) {
    // Effect to handle dropdown open/close based on isOpen input
    effect(() => {
      if (this.isOpen()) {
        this.openDropdown();
      } else {
        this.closeDropdown();
      }
    });
  }

  ngOnDestroy(): void {
    this.closeDropdown();
  }

  /**
   * Computed signal for user initials
   */
  userInitials = computed(() => {
    const name = this.userName();
    if (!name || name === 'Usuario') {
      return 'US';
    }
    
    const words = name.split(' ').filter(word => word.length > 0);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    } else if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return 'US';
  });

  /**
   * Open the dropdown overlay
   */
  private openDropdown(): void {
    if (this.overlayRef) {
      return; // Already open
    }

    const trigger = this.triggerElement();
    if (!trigger) {
      console.warn('UserProfileDropdown: No trigger element provided');
      return;
    }

    // Create overlay
    this.overlayRef = this.overlay.create({
      positionStrategy: this.getPositionStrategy(trigger),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      panelClass: 'user-dropdown-panel'
    });

    // Create portal from template
    this.portal = new TemplatePortal(
      this.dropdownTemplate,
      this.viewContainerRef
    );

    // Attach portal to overlay
    this.overlayRef.attach(this.portal);

    // Subscribe to backdrop clicks
    this.overlayRef.backdropClick().subscribe(() => {
      this.onBackdropClick();
    });

    // Subscribe to escape key
    this.overlayRef.keydownEvents().subscribe(event => {
      if (event.key === 'Escape') {
        this.onEscapeKey();
      }
    });
  }

  /**
   * Close the dropdown overlay
   */
  private closeDropdown(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
      this.portal = null;
    }
  }

  /**
   * Get position strategy for dropdown
   */
  private getPositionStrategy(triggerElement: any) {
    const positions: ConnectedPosition[] = [
      {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
        offsetY: 8
      },
      {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top',
        offsetY: 8
      },
      {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom',
        offsetY: -8
      },
      {
        originX: 'end',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom',
        offsetY: -8
      }
    ];

    return this.overlayPositionBuilder
      .flexibleConnectedTo(triggerElement)
      .withPositions(positions)
      .withPush(true)
      .withFlexibleDimensions(false)
      .withViewportMargin(8);
  }

  /**
   * Handle backdrop click (clicking outside dropdown)
   */
  private onBackdropClick(): void {
    this.closed.emit();
  }

  /**
   * Handle escape key press
   */
  onEscapeKey(): void {
    this.closed.emit();
  }

  /**
   * Handle Portal de Usuario click
   */
  onPortalClick(): void {
    this.portalClicked.emit();
    this.closed.emit(); // Close dropdown after action
  }

  /**
   * Handle Logout click
   */
  onLogoutClick(): void {
    this.logoutClicked.emit();
    this.closed.emit(); // Close dropdown after action
  }

  /**
   * Handle keyboard navigation within dropdown
   */
  onKeyDown(event: KeyboardEvent, action: 'portal' | 'logout'): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      
      if (action === 'portal') {
        this.onPortalClick();
      } else if (action === 'logout') {
        this.onLogoutClick();
      }
    }
  }

  /**
   * Get CSS classes for dropdown content
   */
  getDropdownClasses(): string {
    return [
      'bg-popover',
      'text-popover-foreground',
      'border',
      'border-border',
      'rounded-md',
      'shadow-lg',
      'min-w-48',
      'py-2',
      'animate-in',
      'fade-in-0',
      'zoom-in-95',
      'slide-in-from-top-2'
    ].join(' ');
  }

  /**
   * Get CSS classes for user info section
   */
  getUserInfoClasses(): string {
    return [
      'flex',
      'items-center',
      'space-x-3',
      'px-3',
      'py-2',
      'border-b',
      'border-border',
      'mb-2'
    ].join(' ');
  }

  /**
   * Get CSS classes for dropdown menu items
   */
  getMenuItemClasses(): string {
    return [
      'flex',
      'items-center',
      'space-x-3',
      'px-3',
      'py-2',
      'text-sm',
      'hover:bg-accent',
      'hover:text-accent-foreground',
      'focus:bg-accent',
      'focus:text-accent-foreground',
      'focus:outline-none',
      'cursor-pointer',
      'transition-colors',
      'duration-200'
    ].join(' ');
  }

  /**
   * Get CSS classes for user avatar
   */
  getAvatarClasses(): string {
    return [
      'h-10',
      'w-10',
      'bg-primary',
      'rounded-full',
      'flex',
      'items-center',
      'justify-center',
      'flex-shrink-0'
    ].join(' ');
  }

  /**
   * Get CSS classes for user details
   */
  getUserDetailsClasses(): string {
    return [
      'min-w-0',
      'flex-1'
    ].join(' ');
  }

  /**
   * Get CSS classes for menu item icons
   */
  getIconClasses(): string {
    return [
      'h-4',
      'w-4',
      'text-muted-foreground'
    ].join(' ');
  }
}
