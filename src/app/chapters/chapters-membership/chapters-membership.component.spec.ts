import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaptersMembershipComponent } from './chapters-membership.component';

describe('ChaptersMembershipComponent', () => {
  let component: ChaptersMembershipComponent;
  let fixture: ComponentFixture<ChaptersMembershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaptersMembershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaptersMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
