import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaptersRevenueComponent } from './chapters-revenue.component';

describe('ChaptersRevenueComponent', () => {
  let component: ChaptersRevenueComponent;
  let fixture: ComponentFixture<ChaptersRevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaptersRevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaptersRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
