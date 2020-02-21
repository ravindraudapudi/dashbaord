import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardmembersComponent } from './boardmembers.component';

describe('BoardmembersComponent', () => {
  let component: BoardmembersComponent;
  let fixture: ComponentFixture<BoardmembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardmembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardmembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
