import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableModule } from 'primeng/datatable';
import {CheckboxModule} from 'primeng/checkbox';
import {DialogModule} from 'primeng/dialog';
import {ChipsModule} from 'primeng/chips';


import { SnapshotComponent } from './snapshot/snapshot.component';
import { ManageAllComponent } from './manage-all/manage-all.component';
import { MEMBERSHIP_ROUTES } from './memberships.route.module';
import { MemberViewComponent } from './member-view/member-view.component';
import { MembersDataSnapshot } from '../utils/pipes/trasformations.pipes';
import { FormsModule } from '@angular/forms';
import { UtilsModule } from '../utils/utils.module';
import {EditorModule} from 'primeng/editor';
import { SharedModule } from 'primeng/primeng';


@NgModule({
  imports: [
     CommonModule
   , FormsModule
   , DataTableModule
   , CheckboxModule
   , DialogModule
   , UtilsModule
   , ChipsModule
   , EditorModule
   , MEMBERSHIP_ROUTES,
   SharedModule 
  ],
  declarations: [
    SnapshotComponent
    , ManageAllComponent
    , MemberViewComponent
    , MembersDataSnapshot

  ],
  exports: [
    SnapshotComponent
    , ManageAllComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MembershipsModule { }
