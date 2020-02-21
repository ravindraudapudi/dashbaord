import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorContactsComponent } from './sponsor-contacts.component';

describe('SponsorContactsComponent', () => {
  let component: SponsorContactsComponent;
  let fixture: ComponentFixture<SponsorContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
