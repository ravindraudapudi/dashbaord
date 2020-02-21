import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewCustomersWidget } from './new-customers.widget';

describe('NewCustomersWidget', () => {
  let component: NewCustomersWidget;
  let fixture: ComponentFixture<NewCustomersWidget>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCustomersWidget ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCustomersWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
