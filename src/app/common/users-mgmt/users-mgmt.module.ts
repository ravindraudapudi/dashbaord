
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { DataTableModule, DropdownModule, ButtonModule, DialogModule, } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { MultiSelectModule } from 'primeng/multiselect';
import { ListboxModule } from 'primeng/listbox';
import { KeyFilterModule } from 'primeng/keyfilter';
import { UserService } from './service/users.service';
import { UtilsModule } from '../../utils/utils.module';
import { UserComponent } from './users/users.component';
import { RoleprivilegeComponent } from './roleprivilege/roleprivilege.component';
import { USER_ROUTES } from './users-mgmt.route.module';
// import { UserHomeComponent } from './user-home/user-home.component';


@NgModule({
    imports: [ CommonModule,
              ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        DropdownModule,
        DataTableModule,
        ButtonModule,
        MultiSelectModule,
        CheckboxModule,
        TooltipModule,
        ListboxModule,
        KeyFilterModule,
        TableModule,
        DialogModule,
        UtilsModule,
        RadioButtonModule,
        USER_ROUTES
    ],
    declarations: [
        UserComponent,
        RoleprivilegeComponent,
        // UserHomeComponent
    ],
    exports: [ ],
    providers: [ UserService ],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
  ],
  })
export class UsersMgmtModule { }
