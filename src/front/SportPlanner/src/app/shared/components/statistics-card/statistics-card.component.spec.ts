import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { StatisticsCardComponent } from './statistics-card.component';

describe('StatisticsCardComponent', () => {
  let component: StatisticsCardComponent;
  let fixture: ComponentFixture<StatisticsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StatisticsCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title and value correctly', () => {
    // Arrange
    component.title = 'Total Teams';
    component.value = '5';
    component.subtitle = '+2 this month';
    fixture.detectChanges();

    // Act
    const titleElement = fixture.debugElement.query(By.css('[data-testid="card-title"]'));
    const valueElement = fixture.debugElement.query(By.css('[data-testid="card-value"]'));
    const subtitleElement = fixture.debugElement.query(By.css('[data-testid="card-subtitle"]'));

    // Assert
    expect(titleElement.nativeElement.textContent).toBe('Total Teams');
    expect(valueElement.nativeElement.textContent).toBe('5');
    expect(subtitleElement.nativeElement.textContent).toBe('+2 this month');
  });

  it('should apply correct sport theme colors', () => {
    // Arrange
    component.sport = 'football';
    component.colorTheme = 'green';
    fixture.detectChanges();

    // Act
    const cardElement = fixture.debugElement.query(By.css('.statistics-card'));

    // Assert
    expect(cardElement.nativeElement.classList).toContain('theme-green');
  });

  it('should show progress bar with correct percentage', () => {
    // Arrange
    component.progress = 75;
    fixture.detectChanges();

    // Act
    const progressBar = fixture.debugElement.query(By.css('[data-testid="progress-bar"]'));

    // Assert
    expect(progressBar.nativeElement.style.width).toBe('75%');
  });

  it('should emit click event when card is clicked', () => {
    // Arrange
    spyOn(component.cardClick, 'emit');
    fixture.detectChanges();

    // Act
    const cardElement = fixture.debugElement.query(By.css('.statistics-card'));
    cardElement.triggerEventHandler('click', null);

    // Assert
    expect(component.cardClick.emit).toHaveBeenCalled();
  });

  it('should show loading state when isLoading is true', () => {
    // Arrange
    component.isLoading = true;
    fixture.detectChanges();

    // Act
    const loadingElement = fixture.debugElement.query(By.css('[data-testid="loading-skeleton"]'));

    // Assert
    expect(loadingElement).toBeTruthy();
  });

  it('should apply hover state classes on mouse events', () => {
    // Arrange
    fixture.detectChanges();

    // Act
    const cardElement = fixture.debugElement.query(By.css('.statistics-card'));
    cardElement.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();

    // Assert
    expect(component.isHovered()).toBe(true);
  });

  it('should display sport icon when provided', () => {
    // Arrange
    component.sportIcon = 'football';
    fixture.detectChanges();

    // Act
    const iconElement = fixture.debugElement.query(By.css('app-sport-icon'));

    // Assert
    expect(iconElement).toBeTruthy();
    expect(iconElement.componentInstance.sport).toBe('football');
  });

  it('should handle disabled state correctly', () => {
    // Arrange
    component.disabled = true;
    fixture.detectChanges();

    // Act
    const cardElement = fixture.debugElement.query(By.css('.statistics-card'));

    // Assert
    expect(cardElement.nativeElement.classList).toContain('disabled');
  });

  it('should format large numbers correctly', () => {
    // Arrange
    component.value = '1500';
    component.formatValue = true;
    fixture.detectChanges();

    // Act
    const valueElement = fixture.debugElement.query(By.css('[data-testid="card-value"]'));

    // Assert
    expect(valueElement.nativeElement.textContent).toBe('1.5K');
  });

  it('should animate progress bar on value changes', async () => {
    // Arrange
    component.progress = 0;
    fixture.detectChanges();

    // Act
    component.progress = 50;
    component.animateProgress = true;
    fixture.detectChanges();

    // Wait for animation
    await fixture.whenStable();

    // Assert
    expect(component.currentProgress()).toBe(50);
  });
});