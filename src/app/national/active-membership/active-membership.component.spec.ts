import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveMembershipComponent } from './active-membership.component';

describe('ActiveMembershipComponent', () => {
  let component: ActiveMembershipComponent;
  let fixture: ComponentFixture<ActiveMembershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveMembershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
