import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipRevenueComponent } from './membership-revenue.component';

describe('MembershipRevenueComponent', () => {
  let component: MembershipRevenueComponent;
  let fixture: ComponentFixture<MembershipRevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipRevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
