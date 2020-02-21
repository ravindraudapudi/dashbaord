import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { TOKEN_NAME } from '../../auth/services/auth.constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public iSPrivilegesInvoked = false;
  public privilegeList;

  private http;
  constructor(private httpclient: HttpClient) {
    this.http = this.httpclient;
    this.privilegeList = new BehaviorSubject<any>(null);
  }

  /**
   * @param userInfo contains all User Details
   * @returns Response or Errors
   */
  saveUser(userInfo): Observable<any[]> {
    const body = userInfo;
    return this.http.post(environment.apiAddUserEndPoint, body,
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
  * @param userEditObj and id
  * @returns Response or Errors
  */
  editUser(id: number, userEditObj): Observable<any[]> {
    const body = userEditObj;
    return this.http.put(`${environment.apiUpdateUserEndPoint}/${id}`, body, {
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
  * @param userStatus Boolean Value and id
  * @returns Response or Errors
  */
  userStatus(id, userStatus): Observable<any> {
    const body = userStatus;
    return this.http.put(`${environment.apiUsersStatusEndPoint}/${id}`, body,
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
  * @get Request for all Roles
  * @returns Response Role Object or Errors
  */
  getRoles() {
    return this.http.get(
      environment.apiRolesEndPoint,
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
  * @get Request for all Chapters
  * @returns Response Chapter Object or Errors
  */
  getChapters() {
    return this.http.get(
      environment.apiChaptersEndPoint,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
      }
    ).pipe(
      tap(res => {
        return res;
      }),
      catchError(apiError => {
        return throwError(apiError);
      })
    );
  }

  /**
  * @get Request for all Users
  * @returns Response or Errors
  */
  getUsers() {
    return this.http.get(
      environment.apiUsersEndPoint, { headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME)) }
    ).pipe(
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
 * @param role  Addn new role
 */
  saveRole(role): Observable<any[]> {
    const requestObj = { 'role': role };
    return this.http.post(environment.apiAddRole, requestObj,
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
 * @param role  Addn new role
 */
updateRole(roleName : string, id : any): Observable<any[]> {
  let body = '';
  return this.http.put(`${environment.apiUpdateRole}/${roleName}/${id}`,body,
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

  /*
* @get Request for all Chapters
* @returns Response Chapter Object or Errors
*/
  getRole() {
    return this.http.get(environment.apiRolesEndPoint, {
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

  savePrivilege(privilege): Observable<any[]> {
    const body = privilege;
    return this.http.post(environment.apiAddPrivilege, body,
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
          .set('Content-Type', 'application/json')
      }).pipe(
        tap(res => {
          return res;
        }),
        catchError(apiError => {
          return apiError;
        })
      );
  }

  getPrivilege() {
    return this.http.get(environment.apigetPrivileges, {
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

  getPrivilegeForRole(role) {
    return this.http.get(`${environment.apigetPrivilegesForRole}/${role}`, {
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

  updatePrevilage(role: string, isNational, previlageList): Observable<any[]> {
    const requestObject = {
      'role': role,
      'isNational': isNational,
      'privileges': previlageList
    };
    return this.http.post(`${environment.apiUpdatePrevilage}`, requestObject, {
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

  sendMailToMembers(requestObj): Observable<any[]> {
    return this.http.post(environment.apiSendEmailsToUser, requestObj,
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
   * To Retrieve assigned role for the user
  * @param id username/email
  * @returns Response or Errors
  */
  getUserRole(id) {
    if (this.iSPrivilegesInvoked) {
      return this.privilegeList.asObservable();
    } else {
    // const body = userRole;
    return this.http.get(`${environment.apiGetUserRole}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
    })
      .pipe(
        tap(res => {
          this.iSPrivilegesInvoked =  true;
          this.privilegeList.next(res);
          return res;
        }),
        catchError(apiError => {
          return throwError(apiError);
        })
      );
    }
  }
}
