import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DetailMetricsComponent } from './detail-metrics/detail-metrics.component';
import { OverviewComponent } from './overview/overview.component';
import { ChaptersMembershipComponent } from './chapters-membership/chapters-membership.component';
import { ChaptersRevenueComponent } from './chapters-revenue/chapters-revenue.component';
import { ChaptersSponsorshipComponent } from './chapters-sponsorship/chapters-sponsorship.component';
import { ManageAllComponent } from '../memberships/manage-all/manage-all.component';
import { BoardmembersComponent } from './boardmembers/boardmembers.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { SponsorshipPipelineComponent } from './sponsorship-pipeline/sponsorship-pipeline.component';

const chaptersPaths = [
    { path: 'overview/:selectedCode', component: OverviewComponent },
    { path: 'metrics/:selectedCode', component: DetailMetricsComponent },
    { path: 'membership/:selectedCode', component: ChaptersMembershipComponent },
    { path: 'revenue/:selectedCode', component: ChaptersRevenueComponent },
    { path: 'sponsorship/:selectedCode', component: ChaptersSponsorshipComponent },
    { path: 'allMembers/:selectedCode', component: ManageAllComponent},
    { path: 'boardMembers/:selectedCode', component: BoardmembersComponent},
    { path: 'social/:selectedCode', component: SocialMediaComponent},
    { path: 'pipeline/:selectedCode', component: SponsorshipPipelineComponent},
];

export const CHAPTERS_ROUTES: ModuleWithProviders =
                            RouterModule.forChild(chaptersPaths);
