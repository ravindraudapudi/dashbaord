import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyRevenueChart } from "./MonthlyRevenueChart";

describe('MonthlyRevenueChart', () => {
  let component: MonthlyRevenueChart;
  let fixture: ComponentFixture<MonthlyRevenueChart>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyRevenueChart ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyRevenueChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
