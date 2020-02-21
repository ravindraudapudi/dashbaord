import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleProgressChartComponent } from './circle-progress-chart.component';

describe('CircleProgressChartComponent', () => {
  let component: CircleProgressChartComponent;
  let fixture: ComponentFixture<CircleProgressChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircleProgressChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleProgressChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
