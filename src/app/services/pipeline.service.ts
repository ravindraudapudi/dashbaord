import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TOKEN_NAME } from '../common/auth/services/auth.constant';
import { tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PipelineService {
  private http;
  constructor(private httpclient: HttpClient) {
    this.http = this.httpclient;
  }

/**
* @get Request for all Chapters
* @returns Response Chapter Object or Errors
*/
  getOpportunitiesForChapter(selectedCode) {
    return this.http.get(`${environment.apiGetOpportunities}/${selectedCode}`, {
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
* @get Request for all Chapters
* @returns Response Chapter Object or Errors
*/
getAllOpportunities(username) {
  return this.http.get(`${environment.apiGetAllOpportunities}/${username}`, {
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
    *  Add Opportunity to system
    * @param OpportunityObj 
    */
  addOpportunity(OpportunityObj): Observable<any[]> {

    return this.http.post(environment.apiAddOpportunity, OpportunityObj,
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
   * 
   */
  deleteOpportunity(id): Observable<any> {
    return this.http.delete(`${environment.apideleteOpportunity}/${id}`,
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
   * 
   * @param id Update stage
   * @param 
   */
  addNotesToOpportunity(id: number, notesObj): Observable<any[]> {
    return this.http.put(`${environment.apiAddNotesToOpportunity}/${id}`, notesObj, {
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
    *  Add Opportunity to system
    * @param OpportunityObj 
    */
   updateOpportunity(OpportunityObj): Observable<any[]> {

    return this.http.put(environment.apiupdateOpportunity, OpportunityObj,
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
}
