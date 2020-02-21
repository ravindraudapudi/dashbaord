import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidSponsoredChart } from './paid-sponsored.chart';

describe('PaidSponsoredChart', () => {
  let component: PaidSponsoredChart;
  let fixture: ComponentFixture<PaidSponsoredChart>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidSponsoredChart ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidSponsoredChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
