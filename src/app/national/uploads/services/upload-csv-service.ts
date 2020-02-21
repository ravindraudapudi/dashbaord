import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TOKEN_NAME } from 'src/app/common/auth/services/auth.constant';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UploadService {

  private http;
  constructor(private httpclient: HttpClient) {
    this.http = this.httpclient;
  }
  /**
   * @param chapters contains newly added Chapter detailes
   * @returns Response or Errors
   */
  uploadCsv(requestpaylod, enviApi): Observable<any[]> {
    return this.http.post(enviApi, requestpaylod,
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
* @get Request for all Chapters
* @returns Response Chapter Object or Errors
*/
  getReportedDate() {
    return this.http.get(environment.apiGetReportedDate, {
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
}