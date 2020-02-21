import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalRevenueWidget } from './total-revenue.widget';

describe('TotalRevenueWidget', () => {
  let component: TotalRevenueWidget;
  let fixture: ComponentFixture<TotalRevenueWidget>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalRevenueWidget ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalRevenueWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
