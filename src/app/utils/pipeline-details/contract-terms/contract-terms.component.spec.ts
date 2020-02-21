import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractTermsComponent } from './contract-terms.component';

describe('ContractTermsComponent', () => {
  let component: ContractTermsComponent;
  let fixture: ComponentFixture<ContractTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
