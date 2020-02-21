import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeyFilterModule } from 'primeng/keyfilter';

import { AuthService } from './services/auth.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ResetComponent } from './reset/reset.component';
import { UsersMgmtModule } from '../users-mgmt/users-mgmt.module';
import { UtilsModule } from '../../utils/utils.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    KeyFilterModule,
    UsersMgmtModule,
    NgxSpinnerModule,
    UtilsModule
  ],
  declarations: [
    SignInComponent,
    ResetComponent
  ],
  exports: [
    SignInComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
providers: [
  NotificationsService,
],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [AuthService]
    };
  }
}
export { SignInComponent } from './sign-in/sign-in.component';
