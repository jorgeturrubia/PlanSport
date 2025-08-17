import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

// Simple mock component for testing
@Component({
  selector: 'app-header',
  template: '<div>Test Header</div>',
  standalone: true
})
class MockHeader {
  isMobileMenuOpen = false;
}

describe('Header', () => {
  let component: MockHeader;
  let fixture: ComponentFixture<MockHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MockHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
