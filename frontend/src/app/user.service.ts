import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public options = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') };

  constructor(private _http: HttpClient) {}

  getUsers() {
    let request = this._http.get("http://localhost:8000/api/users");
    return request;
  }

  getUser(id) {
    let request = this._http.get("http://localhost:8000/api/users/"+id);
    return request;
  }

  getGroupByUser(userId) {
    let request = this._http.get("http://localhost:8000/api/users/"+userId+"/group");
    return request;
  }

  createUser(user) {
    let body = new URLSearchParams();
    body.set('first_name', user.first_name)
    body.set('last_name', user.last_name)
    body.set('email', user.email)
    body.set('last_name', user.last_name)
    body.set('password', user.password)
    body.set('gender', user.gender)
    body.set('phone', user.phone)
    body.set('avatar', user.avatar)
    body.set('active', user.active)
    body.set('group_id', user.group_id)
    let request = this._http.post("http://localhost:8000/api/users", body.toString(),this.options);
    return request;
  }

  updateUser(user,userId) {
    let body = new URLSearchParams();
    body.set('first_name', user.first_name)
    body.set('last_name', user.last_name)
    body.set('email', user.email)
    body.set('last_name', user.last_name)
    body.set('password', user.password)
    body.set('gender', user.gender)
    body.set('phone', user.phone)
    body.set('avatar', user.avatar)
    body.set('active', user.active)
    body.set('group_id', user.group_id)
    let request = this._http.post("http://localhost:8000/api/users/"+userId, body.toString(),this.options);
    return request;
  }

  deleteUser(userId) {
    let request = this._http.delete("http://localhost:8000/api/users/"+userId)
      .pipe(catchError(this.handleError));
    return request;
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
