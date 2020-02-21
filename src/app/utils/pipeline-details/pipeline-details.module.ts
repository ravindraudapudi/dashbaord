import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChapterContactsComponent } from './chapter-contacts/chapter-contacts.component';
import { ContractTermsComponent } from './contract-terms/contract-terms.component';
import { NationalContactsComponent } from './national-contacts/national-contacts.component';
import { DataTableModule } from 'primeng/datatable';
import { SponsorContactsComponent } from './sponsor-contacts/sponsor-contacts.component';
import { WorkflowComponent } from './workflow/workflow.component';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule
  ],
  declarations: [
    ChapterContactsComponent,
    ContractTermsComponent,
    NationalContactsComponent,
    SponsorContactsComponent,
    WorkflowComponent
  ],
  exports:[
    ChapterContactsComponent,
    ContractTermsComponent,
    NationalContactsComponent,
    SponsorContactsComponent,
    WorkflowComponent
  ]
})
export class PipelineDetailsModule { }
