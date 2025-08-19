import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SportIconComponent } from './sport-icon.component';

describe('SportIconComponent', () => {
  let component: SportIconComponent;
  let fixture: ComponentFixture<SportIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportIconComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SportIconComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct icon for football sport', () => {
    // Arrange
    component.sport = 'football';
    fixture.detectChanges();

    // Act
    const iconElement = fixture.debugElement.query(By.css('lucide-icon'));

    // Assert
    expect(iconElement.componentInstance.name).toBe('users'); // Football uses users icon
  });

  it('should display correct icon for basketball sport', () => {
    // Arrange
    component.sport = 'basketball';
    fixture.detectChanges();

    // Act
    const iconElement = fixture.debugElement.query(By.css('lucide-icon'));

    // Assert
    expect(iconElement.componentInstance.name).toBe('target');
  });

  it('should apply correct size class', () => {
    // Arrange
    component.size = 'large';
    fixture.detectChanges();

    // Act
    const containerElement = fixture.debugElement.query(By.css('.sport-icon'));

    // Assert
    expect(containerElement.nativeElement.classList).toContain('size-large');
  });

  it('should apply correct color theme', () => {
    // Arrange
    component.color = 'green';
    fixture.detectChanges();

    // Act
    const containerElement = fixture.debugElement.query(By.css('.sport-icon'));

    // Assert
    expect(containerElement.nativeElement.classList).toContain('color-green');
  });

  it('should handle unknown sport with default icon', () => {
    // Arrange
    component.sport = 'unknown-sport';
    fixture.detectChanges();

    // Act
    const iconElement = fixture.debugElement.query(By.css('lucide-icon'));

    // Assert
    expect(iconElement.componentInstance.name).toBe('activity');
  });

  it('should apply active state correctly', () => {
    // Arrange
    component.active = true;
    fixture.detectChanges();

    // Act
    const containerElement = fixture.debugElement.query(By.css('.sport-icon'));

    // Assert
    expect(containerElement.nativeElement.classList).toContain('active');
  });

  it('should handle hover state changes', () => {
    // Arrange
    fixture.detectChanges();

    // Act
    const containerElement = fixture.debugElement.query(By.css('.sport-icon'));
    containerElement.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();

    // Assert
    expect(component.isHovered()).toBe(true);
  });

  it('should emit click events', () => {
    // Arrange
    spyOn(component.iconClick, 'emit');
    fixture.detectChanges();

    // Act
    const containerElement = fixture.debugElement.query(By.css('.sport-icon'));
    containerElement.triggerEventHandler('click', null);

    // Assert
    expect(component.iconClick.emit).toHaveBeenCalledWith('default');
  });

  it('should support custom icon names', () => {
    // Arrange
    component.customIcon = 'star';
    fixture.detectChanges();

    // Act
    const iconElement = fixture.debugElement.query(By.css('lucide-icon'));

    // Assert
    expect(iconElement.componentInstance.name).toBe('star');
  });

  it('should handle disabled state', () => {
    // Arrange
    component.disabled = true;
    fixture.detectChanges();

    // Act
    const containerElement = fixture.debugElement.query(By.css('.sport-icon'));

    // Assert
    expect(containerElement.nativeElement.classList).toContain('disabled');
  });

  it('should return correct icon name for all supported sports', () => {
    const sportIconMappings = [
      { sport: 'football', expectedIcon: 'users' },
      { sport: 'basketball', expectedIcon: 'target' },
      { sport: 'volleyball', expectedIcon: 'zap' },
      { sport: 'tennis', expectedIcon: 'circle' },
      { sport: 'swimming', expectedIcon: 'waves' },
      { sport: 'athletics', expectedIcon: 'trending-up' },
      { sport: 'handball', expectedIcon: 'hand' },
      { sport: 'rugby', expectedIcon: 'shield' },
      { sport: 'hockey', expectedIcon: 'minimize-2' }
    ];

    sportIconMappings.forEach(({ sport, expectedIcon }) => {
      // Arrange
      component.sport = sport;
      fixture.detectChanges();

      // Act
      const iconName = component.getIconName();

      // Assert
      expect(iconName).toBe(expectedIcon);
    });
  });
});