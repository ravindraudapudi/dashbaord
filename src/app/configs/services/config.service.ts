import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { Chapter1 } from '../../models/chapter';
import { TOKEN_NAME } from '../../common/auth/services/auth.constant';
import { FiscalYearData } from '../../models/fiscal-year-data';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  private http;
  public iSChaptersServiceInvoked = false;

  public chaptersList;
  public chaptersForUsers;


  constructor(private httpclient: HttpClient) {
    this.http = this.httpclient;
    this.chaptersList = new BehaviorSubject<any>(null);
    this.chaptersForUsers = new BehaviorSubject<any>(null);
  }

  reset(){
    this.iSChaptersServiceInvoked = false;
  }

  /**
   * @param chapters contains newly added Chapter detailes
   * @returns Response or Errors
   */
  saveChapter(chapterObj): Observable<any[]> {

    const body = chapterObj;
    return this.http.post(environment.apiAddChapter, body,
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
          .set('Content-Type', 'application/json')
      }).pipe(
        tap(
          res => {
            this.iSChaptersServiceInvoked = false;
            return res;
          }),
        catchError(
          apiError => {
            return throwError(apiError);
          })
      );
  }

  setChapters(chapters) {
    this.chaptersList.next(chapters);
  }

  setChaptersForUser(chapters) {
    this.chaptersForUsers.next(chapters);
  }

  /**
* @get Request for all Chapters
* @returns Response Chapter Object or Errors
*/
  getChapters() {
    if (this.iSChaptersServiceInvoked) {
      return this.chaptersList.asObservable();
    } else {
      return this.http.get(environment.apiChaptersEndPoint, {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
      }).pipe(
        tap(res => {
          this.iSChaptersServiceInvoked = true;
          this.setChapters(res);
          return res;
        }),
        catchError(apiError => {
          return throwError(apiError);
        })
      );
    }
  }

  /**
* @get Request for Chapters for the user
* @returns Response Chapter Object or Errors
*/
  getChaptersForUser(userId) {
      return this.http.get(`${environment.apiChaptersForUser}/${userId}`, {
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
  addBoardMembers(boardMemberObj): Observable<any[]> {
    return this.http.post(environment.apisaveBoardMember, boardMemberObj,
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
  updateBoardMembers(boardMemberObj): Observable<any[]> {
    return this.http.post(environment.apiUpdateBoardMember, boardMemberObj,
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
   * @get all board-member details
   * @returns Response or Errors
   * 
   **/
  getAllBoardMembers(code) {
    return this.http.get(`${environment.apigetBoardMembers}/${code}`, {
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
  * @get all chapter goal Details
  * @returns Response or Errors
  */
  getAllGoals(userId) {
    return this.http.get(`${environment.apiChaptersEndPoint}/${userId}`, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
    }).pipe(
      tap(res => {
        return res;
      }),
      catchError(apiError => {
        return apiError;
      })
    );
  }

  /**
  * @get all chapter goal Details getfiscal
  * @returns Response or Errors
  */
  getFiscalYearData(year: string, username: string) {
    return this.http.get(`${environment.apigetFiscalYear}/${year}/${username}`,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer '
          + localStorage.getItem(TOKEN_NAME))
      })
      .pipe(
        tap(res => {
          return res;
        }),
        catchError(apiError => {
          return apiError;
        })
      );
  }


  /**
 * @get all chapter goal Details getfiscal
 * @returns Response or Errors
 */
  getAllFiscalYearData(year: string) {
    return this.http.get(`${environment.apigetAllFiscalYear}/${year}`,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer '
          + localStorage.getItem(TOKEN_NAME))
      })
      .pipe(
        tap(res => {
          return res;
        }),
        catchError(apiError => {
          return apiError;
        })
      );
  }


  /**
    * @param userEditObj and id
    * @returns Response or Errors
    */
  updateChapter(obj): Observable<any[]> {
    return this.http.put(`${environment.apieditChapter}/${obj.id}`, obj, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
        .set('Content-Type', 'application/json')
    }).pipe(
      tap(res => {
        this.iSChaptersServiceInvoked = false;
        return res;
      }),
      catchError(apiError => {
        return throwError(apiError);
      })
    );
  }


  deleteBoardMember(id): Observable<any> {
    return this.http.delete(`${environment.apideleteBoardMembers}/${id}`,
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
   *  Delete chapter
   * @param id Dee
   */
  deleteChapter(id): Observable<any> {
    return this.http.delete(`${environment.apideleteChapter}/${id}`,
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
          .set('Content-Type', 'application/json')
      }).pipe(
        tap(res => {
          this.iSChaptersServiceInvoked = false;
          return res;
        }),
        catchError(apiError => {
          return throwError(apiError);
        })
      );
  }
  //apiUpdateFiscalYearGoal
  /**
 * @param userEditObj and id
 * @returns Response or Errors
 */
  updateFiscalyear(id: number, fyEditObj): Observable<any[]> {
    const body = fyEditObj;
    return this.http.put(`${environment.apiUpdateFiscalYear}/${id}`, body, {
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
 * @param userEditObj and id
 * @returns Response or Errors
 */
  updateFiscalYearGoal(id: number, fyEditObj): Observable<any[]> {
    const body = fyEditObj;
    return this.http.put(`${environment.apiUpdateFiscalYearGoal}/${id}`, body, {
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
   * 
   * @param code 
   * @param username 
   */
  fiscalYearCode(code: string, username: string): Observable<FiscalYearData[]> {
    return this.http.get(`${environment.apigetFiscalYear}/${code}/${username}`, {
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
  * @get Get Member details for api guid
  * @returns Response or Errors
  */
  getMemberDetailsForApiGuid(apiGuid: string) {
    return this.http.get(`${environment.apiGetMemberDetailsForGuid}/${apiGuid}`,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer '
          + localStorage.getItem(TOKEN_NAME))
      })
      .pipe(
        tap(res => {
          return res;
        }),
        catchError(apiError => {
          return apiError;
        })
      );
  }


  /**
   *  Add chapter object
   * @param stageObject 
   */
  saveStage(stageObject): Observable<any[]> {

    const body = stageObject;
    return this.http.post(environment.apisaveStage, body,
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
          .set('Content-Type', 'application/json')
      }).pipe(
        tap(
          res => {
            return res;
          }),
        catchError(
          apiError => {
            return throwError(apiError);
          })
      );
  }

  /**
  * @get all chapter goal Details getfiscal
  * @returns Response or Errors
  */
  getStages(): Observable<any> {
    return this.http.get(`${environment.apiGetStages}`,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer '
          + localStorage.getItem(TOKEN_NAME))
      })
      .pipe(
        tap(res => {
          return res;
        }),
        catchError(apiError => {
          return apiError;
        })
      );
  }


  /**
   * 
   * @param id Update stage
   * @param 
   */
  updateStage(id: number, stageObject): Observable<any[]> {
    const body = stageObject;
    return this.http.put(`${environment.apiupdateStage}/${id}`, body, {
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
 *  Delete chapter
 * @param id Dee
 */
  deleteStage(id): Observable<any> {
    return this.http.delete(`${environment.apideleteStage}/${id}`,
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
          .set('Content-Type', 'application/json')
      }).pipe(
        tap(res => {
          this.iSChaptersServiceInvoked = false;
          return res;
        }),
        catchError(apiError => {
          return throwError(apiError);
        })
      );
  }
}
