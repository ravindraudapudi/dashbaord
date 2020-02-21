import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RoleprivilegeComponent } from './roleprivilege/roleprivilege.component';
import { UserComponent } from './users/users.component';
import { UserHomeComponent } from './user-home/user-home.component';

const userPaths = [
    { path: 'user', component: UserComponent },
    { path: 'role', component: RoleprivilegeComponent },
];

export const USER_ROUTES: ModuleWithProviders = RouterModule.forChild(userPaths);
