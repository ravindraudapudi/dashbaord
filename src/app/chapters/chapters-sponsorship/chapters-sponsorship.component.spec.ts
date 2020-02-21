import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaptersSponsorshipComponent } from './chapters-sponsorship.component';

describe('ChaptersSponsorshipComponent', () => {
  let component: ChaptersSponsorshipComponent;
  let fixture: ComponentFixture<ChaptersSponsorshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaptersSponsorshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaptersSponsorshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
