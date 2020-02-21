import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorshipPipelineComponent } from './national-sponsorship-pipeline.component';

describe('SponsorshipPipelineComponent', () => {
  let component: SponsorshipPipelineComponent;
  let fixture: ComponentFixture<SponsorshipPipelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorshipPipelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorshipPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
