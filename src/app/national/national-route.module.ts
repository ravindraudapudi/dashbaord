import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UploadsComponent } from './uploads/uploads.component';
import { NationalDashboardComponent } from './national-dashboard/national-dashboard.component';
import { NationalChaptersComponent } from './national-chome/national-chome.component';
import { ConfigHomeComponent } from '../configs/config-home/config-home.component';
import { ChaptersComponent } from '../configs/chapters/chapters.component';

export const nationalPaths: Routes = [
    { path: 'dashboard', component: NationalDashboardComponent },
    {
        path: 'chapters', component: NationalChaptersComponent
        , loadChildren: '../national/national-chome/national-chome.module#NationalChomeModule'
    },
    {
        path: 'configs', component: ConfigHomeComponent
        , loadChildren: '../configs/configs.module#ConfigsModule'
    },
    {
        path: 'uploads', component: UploadsComponent
    },
];

export const NATIONAL_ROUTES: ModuleWithProviders =
    RouterModule.forChild(nationalPaths);
