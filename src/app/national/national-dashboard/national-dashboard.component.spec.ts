import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalDashboardComponent } from './national-dashboard.component';

describe('NationalDashboardComponent', () => {
  let component: NationalDashboardComponent;
  let fixture: ComponentFixture<NationalDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NationalDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
