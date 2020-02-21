import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalRevenueChart } from './total-revenue.chart';

describe('TotalRevenueChart', () => {
  let component: TotalRevenueChart;
  let fixture: ComponentFixture<TotalRevenueChart>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalRevenueChart ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalRevenueChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
