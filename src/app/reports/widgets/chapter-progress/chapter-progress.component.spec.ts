import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterProgressComponent } from './chapter-progress.component';

describe('ChapterProgressComponent', () => {
  let component: ChapterProgressComponent;
  let fixture: ComponentFixture<ChapterProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
