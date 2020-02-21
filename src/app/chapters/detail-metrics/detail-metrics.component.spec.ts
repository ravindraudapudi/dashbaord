import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMetricsComponent } from './detail-metrics.component';

describe('DetailMetricsComponent', () => {
  let component: DetailMetricsComponent;
  let fixture: ComponentFixture<DetailMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
