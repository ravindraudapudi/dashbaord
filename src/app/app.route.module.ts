import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SignInComponent } from './common/auth/sign-in/sign-in.component';
import { NhomeComponent } from './national/nhome/nhome.component';
import { ChomeComponent } from './chapters/chome/chome.component';
import { AuthGuard } from './common/auth/services/auth.gaurd';
import { ResetComponent } from './common/auth/reset/reset.component';

const appPaths = [
        {
                path: 'login', component: SignInComponent
        },
        {
                path: 'reset', component: ResetComponent
                , canActivate: [AuthGuard]
        },
        {
                path: 'national', component: NhomeComponent
                , loadChildren: './national/national.module#NationalModule'
                , canActivate: [AuthGuard]

        },
        {
                path: 'chapters', component: ChomeComponent,
                loadChildren: './chapters/chapters.module#ChaptersModule',
                canActivate: [AuthGuard]

        },
        { path: '', pathMatch: 'full', redirectTo: 'login' },
];

export const APP_ROUTES: ModuleWithProviders =
        RouterModule.forRoot(appPaths);
