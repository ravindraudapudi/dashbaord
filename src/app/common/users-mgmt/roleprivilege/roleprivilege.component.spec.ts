import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleprivilegeComponent } from './roleprivilege.component';

describe('RoleprivilegeComponent', () => {
  let component: RoleprivilegeComponent;
  let fixture: ComponentFixture<RoleprivilegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleprivilegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleprivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
