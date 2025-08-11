import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionsSection } from './subscriptions-section';

describe('SubscriptionsSection', () => {
  let component: SubscriptionsSection;
  let fixture: ComponentFixture<SubscriptionsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionsSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionsSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
