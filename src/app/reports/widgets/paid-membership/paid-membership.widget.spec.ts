import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidMembershipWidget } from './paid-membership.widget';

describe('PaidMembershipWidget', () => {
  let component: PaidMembershipWidget;
  let fixture: ComponentFixture<PaidMembershipWidget>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidMembershipWidget ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidMembershipWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
