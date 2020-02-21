import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidExpiredChart } from './paid-expired.chart';

describe('PaidExpiredChart', () => {
  let component: PaidExpiredChart;
  let fixture: ComponentFixture<PaidExpiredChart>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidExpiredChart ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidExpiredChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
