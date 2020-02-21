import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FydataComponent } from './fydata.component';

describe('FydataComponent', () => {
  let component: FydataComponent;
  let fixture: ComponentFixture<FydataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FydataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FydataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
