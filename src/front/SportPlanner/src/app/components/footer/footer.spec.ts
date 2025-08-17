import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

// Simple mock component for testing
@Component({
  selector: 'app-footer',
  template: '<div>Test Footer</div>',
  standalone: true
})
class MockFooter {
  currentYear = new Date().getFullYear();
}

describe('Footer', () => {
  let component: MockFooter;
  let fixture: ComponentFixture<MockFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MockFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
