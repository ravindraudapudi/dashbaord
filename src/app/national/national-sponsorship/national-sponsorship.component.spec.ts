import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalSponsorshipComponent } from './national-sponsorship.component';

describe('NationalSponsorshipComponent', () => {
  let component: NationalSponsorshipComponent;
  let fixture: ComponentFixture<NationalSponsorshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NationalSponsorshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalSponsorshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
