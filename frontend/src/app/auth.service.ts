import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from "rxjs";
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  public options: any = {};
  public authUser = null;
  constructor(private _http: HttpClient) { }

  public setHeaders(key, value) {
    this.headers.set(key, value);
    this.options.headers = this.headers;

  }

  login(email: string, password: string) {
    let body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);
    this.setHeaders('Content-Type', 'application/x-www-form-urlencoded')
    console.log(this.options);
    console.log(this.headers);
    let request = this._http.post("http://localhost:8000/api/login", body.toString(), this.options).pipe(
      catchError(this.handleError)
    );
    return request;

    /*const param = new HttpParams();
    param.set('email', email);
    param.set('password', password);
    console.log(email, password);
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded')
    headers.set('Accept', 'application/json')
    headers.set('Access-Control-Allow-Origin', '*')
    return this._http.post("http://localhost:8000/api/login", body.toString(), {headers} ).toPromise().then(response => 
    console.log(response))*/
  }

  public setAuthUser(user) {
    this.authUser = user;
  }

  public isAuthenticated() {
    const token = sessionStorage.getItem('token');
    const userString = sessionStorage.getItem('user');
    const user = JSON.parse(userString);
    this.setAuthUser(user);
    if (token !== null && token !== undefined && token !== '' && this.authUser !== null && this.authUser !== undefined) {
      return true;
    } else {
      return false;
    }
  
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.log('Client side error', errorResponse.error.message);
    } else {
      console.log('Server side error', errorResponse);
    }
    return throwError('There is a problem with a service');
  }

}
