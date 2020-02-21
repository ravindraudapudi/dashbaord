import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipGoalWidget } from './membership-goal.widget';

describe('MembershipGoalComponent', () => {
  let component: MembershipGoalWidget;
  let fixture: ComponentFixture<MembershipGoalWidget>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipGoalWidget ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipGoalWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
