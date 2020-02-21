import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

import { TOKEN_AUTH_PASSWORD, TOKEN_AUTH_USERNAME, TOKEN_NAME } from './auth.constant';
import { Username } from 'src/app/models/username';

@Injectable()
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService();
  _accessToken: string;
  _isSuperAdmin: any;
  _isDataAdmin: any;
  username: string;
  _privileges: Array<string>;
  export: boolean;
  _upload: any;
  _sendEmail: any;
  _visualise: any;
  _createUser: any;
  _createChapter: any;

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password`;
    return this.http.post<any>(environment.AUTH_TOKEN, body,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .append('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD))
      }).pipe(
        tap(
          res => {
            if (res.access_token) {
              this.setUserContext(res.access_token);
              return true;
            }
            return false;
          }
          , err => {
            return err.error.error_description;
          }
        )
      );
  }

  setUserContext(accessToken: string) {
    this._accessToken = accessToken;
    const decodedToken = this.jwtHelper.decodeToken(accessToken);
    this.username = decodedToken.user_name;
    this._isSuperAdmin = decodedToken.authorities.some(el => el === 'SuperAdmin');
    this._isDataAdmin = decodedToken.authorities.some(el => el === 'DataAdmin');
    localStorage.setItem(TOKEN_NAME, accessToken);
  }


  logout(): boolean {
    this._accessToken = null;
    this._isSuperAdmin = false;
    this._isDataAdmin = false;
    localStorage.clear();
    localStorage.removeItem(TOKEN_NAME);
    return true;
  }

    // Auto logout once token key expire using HostListener Click Event and before load page
    autoLogout(): boolean {
      const ac = localStorage.getItem(TOKEN_NAME);
      const now = new Date();
      if (ac && now.valueOf() >= this.jwtHelper.getTokenExpirationDate(ac).valueOf()) {
        this.logout();
        return true;
      }
    }

  isSuperAdmin(): boolean {
      const ac = localStorage.getItem(TOKEN_NAME);
      const decodedToken = this.jwtHelper.decodeToken(ac);
      return decodedToken.authorities.some(el => el === 'SuperAdmin');
    }

  isDataAdmin(): boolean {
    const ac = localStorage.getItem(TOKEN_NAME);
      const decodedToken = this.jwtHelper.decodeToken(ac);
      return decodedToken.authorities.some(el => el === 'DataAdmin');
  }
  isUser(): boolean {
    return (this._privileges.indexOf('DataUploads') === -1 && this._privileges.indexOf('ConfigEdit') === -1);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem(TOKEN_NAME);
    return (token != null && this.jwtHelper.isTokenExpired(token) === false);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  resetPassword(data): Observable<any> {
    const username = this.jwtHelper.decodeToken(localStorage.getItem(TOKEN_NAME)).user_name;
    const passwordObj = ({
      'username': username,
      'oldPassword': data.oldPassword,
      'newPassword': data.newPassword
    });

    return this.http.post(environment.apiResetPassword, passwordObj,
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
          .set('Content-Type', 'application/json')
      }).pipe(
        tap(
          res => {
          }
          , err => {
            return err;
          }
        )
      );
  }


  /**
  * @post Request to ForgotPassword Call
  * @returns Response email Object or Errors
  */
  recoverPassword(username: string): Observable<any> {
    return this.http.post(environment.apiForgotPaswordEmail, new Username(username), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(
      tap(
        err => {
          return err;
        }
      ));
  }

    /**
  * @post Request to validate login credentials
  * @returns Response Success or Errors
  */
 validateCredentials(username): Observable<any> {
  return this.http.post(environment.apivalidateCredentials, username, {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }).pipe(
    tap(
      err => {
        return err;
      }
    ));
}

  userName(): string {
    let userEmail: string;
    const ac = localStorage.getItem(TOKEN_NAME);
    if (ac) {
      const decodedToken = this.jwtHelper.decodeToken(ac);
      userEmail = decodedToken.user_name;
    }
    return userEmail;
  }
}

