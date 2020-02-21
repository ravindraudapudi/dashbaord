import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidLocalSponsoredMembershipComponent } from './paid-local-sponsored-membership.component';

describe('PaidLocalSponsoredMembershipComponent', () => {
  let component: PaidLocalSponsoredMembershipComponent;
  let fixture: ComponentFixture<PaidLocalSponsoredMembershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidLocalSponsoredMembershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidLocalSponsoredMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
