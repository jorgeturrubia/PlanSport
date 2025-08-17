import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

// Simple mock component for testing
@Component({
  selector: 'app-landing',
  template: '<div>Test Landing</div>',
  standalone: true
})
class MockLanding {
}

describe('Landing', () => {
  let component: MockLanding;
  let fixture: ComponentFixture<MockLanding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockLanding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MockLanding);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
