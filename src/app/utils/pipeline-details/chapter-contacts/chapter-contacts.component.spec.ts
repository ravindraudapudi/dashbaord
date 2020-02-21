import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterContactsComponent } from './chapter-contacts.component';

describe('ChapterContactsComponent', () => {
  let component: ChapterContactsComponent;
  let fixture: ComponentFixture<ChapterContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
