import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OverviewComponent } from '../../chapters/overview/overview.component';
import { DetailMetricsComponent } from '../../chapters/detail-metrics/detail-metrics.component';
import { ChaptersMembershipComponent } from '../../chapters/chapters-membership/chapters-membership.component';
import { ChaptersRevenueComponent } from '../../chapters/chapters-revenue/chapters-revenue.component';
import { ChaptersSponsorshipComponent } from '../../chapters/chapters-sponsorship/chapters-sponsorship.component';
import { SocialMediaComponent } from '../../chapters/social-media/social-media.component';
import { BoardmembersComponent } from 'src/app/chapters/boardmembers/boardmembers.component';
import { SponsorshipPipelineComponent } from '../../chapters/sponsorship-pipeline/sponsorship-pipeline.component';


const nationalChaptersPaths = [
            { path: 'overview/:selectedCode', component: OverviewComponent },
            { path: 'metrics/:selectedCode', component: DetailMetricsComponent },
            { path: 'membership/:selectedCode', component: ChaptersMembershipComponent },
            { path: 'social/:selectedCode', component: SocialMediaComponent },
            { path: 'revenue/:selectedCode', component: ChaptersRevenueComponent },
            { path: 'sponsorship/:selectedCode', component: ChaptersSponsorshipComponent },
            { path: 'boardMembers/:selectedCode', component: BoardmembersComponent },
            { path: 'pipeline/:selectedCode', component: SponsorshipPipelineComponent },
         //   { path: 'allMembers/:selectedCode', component: NationalManageAllComponent }
];

export const NATIONAL_CHAPTERS_ROUTES: ModuleWithProviders =
                            RouterModule.forChild(nationalChaptersPaths);



