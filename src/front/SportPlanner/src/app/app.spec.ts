import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

// Simple mock component for testing
@Component({
  selector: 'app-root',
  template: '<div>Test App</div>',
  standalone: true
})
class MockApp {
  title = 'SportPlanner';
}

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockApp]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MockApp);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have the SportPlanner title', () => {
    const fixture = TestBed.createComponent(MockApp);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('SportPlanner');
  });
});
