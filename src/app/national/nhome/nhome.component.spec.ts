import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhomeComponent } from './nhome.component';

describe('NhomeComponent', () => {
  let component: NhomeComponent;
  let fixture: ComponentFixture<NhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
