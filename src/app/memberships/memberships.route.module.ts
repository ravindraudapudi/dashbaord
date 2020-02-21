import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Route, Routes } from '@angular/router';

import { ManageAllComponent } from '../memberships/manage-all/manage-all.component';

export const membershipPaths: Routes = [
    { path: '', component: ManageAllComponent }
];

export const MEMBERSHIP_ROUTES: ModuleWithProviders =
                            RouterModule.forChild(membershipPaths);
