import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpirationRateWidget } from './expiration-rate.widget';

describe('ExpirationRateWidget', () => {
  let component: ExpirationRateWidget;
  let fixture: ComponentFixture<ExpirationRateWidget>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpirationRateWidget ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpirationRateWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
