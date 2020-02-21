import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidMembershipComponent } from './paid-membership.component';

describe('PaidMembershipComponent', () => {
  let component: PaidMembershipComponent;
  let fixture: ComponentFixture<PaidMembershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidMembershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
