import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalSponsoredMembershipComponent } from './national-sponsored-membership.component';

describe('NationalSponsoredMembershipComponent', () => {
  let component: NationalSponsoredMembershipComponent;
  let fixture: ComponentFixture<NationalSponsoredMembershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NationalSponsoredMembershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalSponsoredMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
