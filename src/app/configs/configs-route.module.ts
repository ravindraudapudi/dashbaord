import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChaptersComponent } from './chapters/chapters.component';
import { FydataComponent } from './fydata/fydata.component';
import { GoalsComponent } from './goals/goals.component';
import { UserHomeComponent } from '../common/users-mgmt/user-home/user-home.component';
import { PipelineComponent } from './pipeline/pipeline.component';

const configPaths = [
    { path: 'chapters', component: ChaptersComponent },
    { path: 'goals', component: GoalsComponent },
    { path: 'pipeline', component:  PipelineComponent},
    { path: 'fydata', component: FydataComponent },
    { path: 'usermanagement', component: UserHomeComponent
    , loadChildren: '../common/users-mgmt/users-mgmt.module#UsersMgmtModule' },
];

export const CONFIG_ROUTES: ModuleWithProviders =
                            RouterModule.forChild(configPaths);
