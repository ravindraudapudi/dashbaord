import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueGoalWidget } from './revenue-goal.widget';

describe('RevenueGoalWidget', () => {
  let component: RevenueGoalWidget;
  let fixture: ComponentFixture<RevenueGoalWidget>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenueGoalWidget ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueGoalWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
