import { Injectable } from '@angular/core';
import { throwError, Observable, forkJoin } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TOKEN_NAME } from 'src/app/common/auth/services/auth.constant';

@Injectable({
  providedIn: 'root'
})
export class NationalService {

  private http;
  constructor(private httpclient: HttpClient) {
    this.http = this.httpclient;
  }

  public requestDataFromMultipleSources(year, rDate, username): Observable<any[]> {
    const activeMembers  = this.getTotalActiveMembers(year, rDate, username);
    const paidMembers = this. getPaidMembers(year, rDate, username);
    const localSponsoredMembers  = this.getLocalSponsoredMembership(year, rDate, username);
    const nationalSponsoredMembers = this.getNationalSponsoredMembership(year, rDate, username);
    const membershipRevenue = this.getMembershipRevenue(year, username);
    return forkJoin([activeMembers, paidMembers, localSponsoredMembers, nationalSponsoredMembers, membershipRevenue]);
  }

  /**
* @get Request for total active members
* @returns Response Role Object or Errors
*/
  getTotalActiveMembers(year, rDate, username) {
    return this.http.get(
      `${environment.apigetTotalActiveMembers}/${year}/${rDate}/${username}`,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
      }).pipe(
        tap(res => {
          return res;
        }),
        catchError(apiError => {
          return throwError(apiError);
        })
      );
  }


   /**
* @get Request for total active members
* @returns Response Role Object or Errors
*/
getTotalActiveMembersDetails(chapter,rDate) {
  return this.http.get(
    `${environment.apiGetTotalActiveMembersDetails}/${chapter}/${rDate}`,
    {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
    }).pipe(
      tap(res => {
        return res;
      }),
      catchError(apiError => {
        return throwError(apiError);
      })
    );
}

 /**
   * @post member details
   * @returns Response or Errors
   */
  saveSponsor(sponsorObj): Observable<any[]> {
    return this.http.post(environment.apisaveSponsor, sponsorObj,
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
          .set('Content-Type', 'application/json')
      }).pipe(
        tap(res => {
          return res;
        }),
        catchError(apiError => {
          return throwError(apiError);
        })
      );
  }

  /**
   * @post member details
   * @returns Response or Errors
   */
  updateSponsor(sponsorObj): Observable<any[]> {
    return this.http.post(environment.apiupdateSponsor, sponsorObj,
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
          .set('Content-Type', 'application/json')
      }).pipe(
        tap(res => {
          return res;
        }),
        catchError(apiError => {
          return throwError(apiError);
        })
      );
  }

  /**
 * @get Request for Paid memebrship
 * @returns Response Role Object or Errors
 */
  getPaidMembers(year, rDate, userName) {
    return this.http.get(
      `${environment.apigetPaidMembers}/${year}/${rDate}/${userName}`,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
      }).pipe(
        tap(res => {
          return res;
        }),
        catchError(apiError => {
          return throwError(apiError);
        })
      );
  }


  /**
 * @get Request for local sponser memebrship
 * @returns Response local sponser memebrs Object or Errors
 */
  getLocalSponsoredMembership(year, rDate,userName) {
    return this.http.get(
      `${environment.apigetLocalsponsored}/${year}/${rDate}/${userName}`,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
      }).pipe(
        tap(res => {
          return res;
        }),
        catchError(apiError => {
          return throwError(apiError);
        })
      );
  }


   /**
 * @get Request for local sponser memebrship
 * @returns Response local sponser memebrs Object or Errors
 */
getNationalSponsoredMembership(year, rDate, userName) {
  return this.http.get(
    `${environment.apigetNationalponsored}/${year}/${rDate}/${userName}`,
    {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
    }).pipe(
      tap(res => {
        return res;
      }),
      catchError(apiError => {
        return throwError(apiError);
      })
    );
}


  /**
   * @get Request for local sponser memebrship
   * @returns Response Role Object or Errors
   */
  getMembershipRevenue(year,username) {
    return this.http.get(
      `${environment.apigetMembershipRevenue}/${year}/${username}`,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
      }).pipe(
        tap(res => {
          return res;
        }),
        catchError(apiError => {
          return throwError(apiError);
        })
      );
  }

  getMembersForChpater(code) {
    return this.http.get(`${environment.apigetMembersForChapter}/${code}`, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
    })
      .pipe(
        tap(res => {
          return res;
        }),
        catchError(apiError => {
          return throwError(apiError);
        })
      );
  }

  /**
   * @get Request for sponsorship details of selected chapter
   * @param code primary Group Code of selected Chapter
   */
  getSponsorsForChapter(code) {
    return this.http.get(`${environment.apigetSponsorsForChapter}/${code}`, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
    })
      .pipe(
        tap(res => {
          return res;
        }),
        catchError(apiError => {
          return throwError(apiError);
        })
      );
  }


  /**
   * @get Request for sponsorship details of selected chapter
   * @param code primary Group Code of selected Chapter
   */
  getAllSponsors(userName, membershiType) {
    return this.http.get(`${environment.apiGetNationalSponsors}/${userName}/${membershiType}`, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
    })
      .pipe(
        tap(res => {
          return res;
        }),
        catchError(apiError => {
          return throwError(apiError);
        })
      );
  }



  /**
* @get Request for total revenue for the chapter
* @param code primary Group Code of selected Chapter
*/
  getTotalRevenueForChapter(code, year) {
    return this.http.get(`${environment.apiGetTotalRevenueForChapter}/${code}/${year}`, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
    })
      .pipe(
        tap(res => {
          return res;
        }),
        catchError(apiError => {
          return throwError(apiError);
        })
      );
  }



  /**
* @get Request for all paid expired members on basis of months
* @returns Response Chapter Object or Errors
*/
  getpaidExpiredMembers(chapterName, rDate, fiscalYear) {
    return this.http.get(`${environment.apigetpaidExpMembers}/${chapterName}/${rDate}/${fiscalYear}`, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
    }).pipe(
      tap(res => {
        return res;
      }),
      catchError(apiError => {
        return throwError(apiError);
      })
    );
  }


  /**
* @get Request for all paid expired members on basis of months
* @returns Response Chapter Object or Errors
*/
  getpaidSponseredMembers(chapterName, rDate, fiscalYear) {
    return this.http.get(`${environment.apigetpaidSponsered}/${chapterName}/${rDate}/${fiscalYear}`, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
    }).pipe(
      tap(res => {
        return res;
      }),
      catchError(apiError => {
        return throwError(apiError);
      })
    );
  }

  /**
* @get Monthly Membership Revenue
* @param code primary Group Code of selected Chapter
*/
  getMonthlyMembershipRevenue(code, rDate, fiscalYear) {
    return this.http.get(`${environment.apigetMonthlyRevenueForChapter}/${code}/${rDate}/${fiscalYear}`, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
    })
      .pipe(
        tap(res => {
          return res;
        }),
        catchError(apiError => {
          return throwError(apiError);
        })
      );
  }

  /**
 * @get Social Media details
 * @param code primary Group Code of selected Chapter
 */
  getSocialMediaDetails(code) {
    return this.http.get(`${environment.apiGetSocialMedia}/${code}`, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
    })
      .pipe(
        tap(res => {
          return res;
        }),
        catchError(apiError => {
          return throwError(apiError);
        })
      );
  }

  /**
   * get overview details of selected chapter
   * @param code primary Group Code of selected Chapter
   */
  getOverviewForChapter(code, rDate, fiscalYear) {
    return this.http.get(`${environment.apigetFiscalOverviewForChapter}/${code}/${rDate}/${fiscalYear}`, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
    })
      .pipe(
        tap(res => {
          return res;
        }),
        catchError(apiError => {
          return throwError(apiError);
        })
      );
  }

  /**
   * 
   * @param id 
   */
  deleteSponsor(id): Observable<any> {
    return this.http.delete(`${environment.apiDeleteSponsor}/${id}`,
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
          .set('Content-Type', 'application/json')
      }).pipe(
        tap(res => {
          return res;
        }),
        catchError(apiError => {
          return throwError(apiError);
        })
      );
  }

  /**
* @get reedemed members for the sponserhip code
* @param code sponserhip code of selected Chapter
*/
  getReedemedMembersForSponserhip(code) {
    return this.http.get(`${environment.apiGetMembersForSponserhip}/${code}`, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
    })
      .pipe(
        tap(res => {
          return res;
        }),
        catchError(apiError => {
          return throwError(apiError);
        })
      );
  }

  /**
* @get Request for local sponser memebrship
* @returns Response local sponser memebrs Object or Errors
*/
  getDetailedMatrics(code, rDate, fiscalYear) {
    return this.http.get(
      `${environment.apiGetDetailedMatrics}/${code}/${rDate}/${fiscalYear}`,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
      }).pipe(
        tap(res => {
          return res;
        }),
        catchError(apiError => {
          return throwError(apiError);
        })
      );
  }
}
