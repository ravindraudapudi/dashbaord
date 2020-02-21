import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalContactsComponent } from './national-contacts.component';

describe('NationalContactsComponent', () => {
  let component: NationalContactsComponent;
  let fixture: ComponentFixture<NationalContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NationalContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
