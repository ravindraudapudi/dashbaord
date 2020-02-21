import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalSponsoredMembershipComponent } from './local-sponsored-membership.component';

describe('LocalSponsoredMembershipComponent', () => {
  let component: LocalSponsoredMembershipComponent;
  let fixture: ComponentFixture<LocalSponsoredMembershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalSponsoredMembershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalSponsoredMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
