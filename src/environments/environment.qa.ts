// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// export const BASE_URL = 'http://13.127.94.252:9090/'; //  UAT for Service
export const BASE_URL = 'http://13.232.41.205:9090/'; //  QA for Service
export const environment = {
  production: false,
  apiBaseEndPoint: `${BASE_URL}`,
  AUTH_TOKEN: `${BASE_URL}oauth/token`,
   // User Services

   apiUsersEndPoint: `${BASE_URL}api/getUsers`,
   apiAddUserEndPoint: `${BASE_URL}api/addUser`,
   apiUpdateUserEndPoint: `${BASE_URL}api/updateUser`,
   apiUsersStatusEndPoint: `${BASE_URL}api/updateUserStatus`,

   // Roles and Privileges Services

   apiAddRole: `${BASE_URL}api/addRole`,
   apiUpdateRole: `${BASE_URL}api/updateRole`,
   apiGetUserRole: `${BASE_URL}api/getUserRole`,
   apiAddPrivilege: `${BASE_URL}api/addPrevilage`,
   apigetPrivileges: `${BASE_URL}api/getPrevilages`,
   apigetPrivilegesForRole: `${BASE_URL}api/getPrivilagesforRole`,
   apiRolesEndPoint: `${BASE_URL}api/getRoles`,
   apiUpdatePrevilage: `${BASE_URL}api/updatePrivilages`,

   // Forgot and reset password Services

   apiForgotPaswordEmail: `${BASE_URL}recoverPassword/`,
   apivalidateCredentials: `${BASE_URL}validateCredentials`,
   apiResetPassword: `${BASE_URL}api/users/reset_password`,

   // Configuration Services

   apiAddChapter: `${BASE_URL}api/saveChapter`,
   apieditChapter: `${BASE_URL}api/editChapter`,
   apideleteChapter: `${BASE_URL}api/deleteChapter`,
   apiChaptersEndPoint: `${BASE_URL}api/getChapters`,
   apiChaptersForUser: `${BASE_URL}api/getChaptersForUser`,
   apiFiscalYears: `${BASE_URL}api/getFiscalYears`,
   apiUpdateFiscalYearGoal: `${BASE_URL}api/updateFiscalYearGoal`,
   apiUpdateFiscalYear: `${BASE_URL}api/updateFiscalYear`,
   apisaveFiscalYear: `${BASE_URL}api/saveFiscalYear`,
   apigetFiscalYear: `${BASE_URL}api/getFiscalYears`,
   apigetAllFiscalYear: `${BASE_URL}api/getAllFiscalYears`,

   // Chapter Level Report Services

   apigetBoardMembers: `${BASE_URL}api/getBoardMembers`,
   apisaveBoardMember: `${BASE_URL}api/saveBoardMember`,
   apiUpdateBoardMember: `${BASE_URL}api/updateBoardMember`,
   apideleteBoardMembers: `${BASE_URL}api/deleteBoardMember`,
   apigetFiscalOverviewForChapter: `${BASE_URL}api/getOverviewDetails`,
   apiGetTotalRevenueForChapter: `${BASE_URL}api/getTotalRevenueChart`,
   apigetpaidExpMembers: `${BASE_URL}api/getPaidExpiredMembers`,
   apigetpaidSponsered: `${BASE_URL}api/getpaidSponseredChart`,
   apigetMonthlyRevenueForChapter: `${BASE_URL}api/getMonthyMembershipRevenue`,
   apiGetSocialMedia: `${BASE_URL}api/getSocialMedia`,
   apiGetDetailedMatrics: `${BASE_URL}api/getDetailedMetrics`,

   // Upload Module Services

   apiProcessMembers: `${BASE_URL}api/saveMembers`,
   apiProcessSponsers: `${BASE_URL}api/saveSponsers`,
   apiProcessTransaction: `${BASE_URL}api/saveTransactions`,
   apiProcessProfitAndLoss: `${BASE_URL}api/processProfitAndLoss`,
   apigetfileHistory: `${BASE_URL}api/getCsvLog`,
   apiProcessSocialMedia: `${BASE_URL}api/processSocialMedia`,

    // National Level Reports

   apigetNationalDashboard: `${BASE_URL}api/getDashboardDetails`,
   apigetTotalActiveMembers: `${BASE_URL}api/getTotalActiveMembers`,
   apiGetTotalActiveMembersDetails: `${BASE_URL}api/getTotalActiveMembersDetails`,
   apigetPaidMembers: `${BASE_URL}api/getPaidMembers`,
   apigetLocalsponsored: `${BASE_URL}api/getLocalSponsored`,
   apigetNationalponsored: `${BASE_URL}api/getNationalSponsored`,
   apigetMembershipRevenue: `${BASE_URL}api/getTotalRevenue`,
   apigetMembersForChapter: `${BASE_URL}api/getMembersByChapter`,

   // Sponsorship reports

   apigetSponsorsForChapter: `${BASE_URL}api/getSponserForChapter`,
   apiDeleteSponsor: `${BASE_URL}api/deleteSponsor`,
   apisaveSponsor: `${BASE_URL}api/saveSponsor`,
   apiupdateSponsor: `${BASE_URL}api/updateSponsor`,
   apiGetMembersForSponserhip: `${BASE_URL}api/getMembersForSponsorhip`,
   apiGetNationalSponsors : `${BASE_URL}api/getNationalSponsors`,

   // Miscelaneiuos Services

   // apiExportCSV: `${BASE_URL}api/members_csv`,
   apiSendEmailsToUser: `${BASE_URL}api/users/emailToMembers`,
   apiGetMemberDetailsForGuid: `${BASE_URL}api/getMemberDetailsForGuid`,
   apiGetReportedDate: `${BASE_URL}api/getReportedDate`,
   apiGetAllReportingDates: `${BASE_URL}api/getReportingDates`,

   // Opportunity Pipeline Set up Services

   apiGetStages : `${BASE_URL}api/getStages`,
   apisaveStage: `${BASE_URL}api/saveStage`,
   apiupdateStage: `${BASE_URL}api/updateStage`,
   apideleteStage: `${BASE_URL}api/deleteStage`,

   // Opportunity Pipleine Services

   apiGetOpportunities : `${BASE_URL}api/getOpportunities`,
   apiAddOpportunity : `${BASE_URL}api/saveOportunity`,
   apiupdateOpportunity : `${BASE_URL}api/updateOportunity`,
   apideleteOpportunity: `${BASE_URL}api/deleteOpportunity`,
   apiAddNotesToOpportunity: `${BASE_URL}api/addNotesToOpportunity`,
   apiGetAllOpportunities : `${BASE_URL}api/getAllOpportunities`,
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
