import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GroupService {
  public options = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') };

  constructor(private _http: HttpClient) {

  }
  getGroups() {
    let request = this._http.get("http://localhost:8000/api/groups");
    return request;
  }
  getGroup(id) {
    let request = this._http.get("http://localhost:8000/api/groups/"+id);
    return request;
  }
  getUsersByGroup(groupId) {
    let request = this._http.get("http://localhost:8000/api/groups/"+groupId+"/users");
    return request;
  }
  createGroup(group) {
    let body = new URLSearchParams();
    body.set('name', group.name)
    body.set('description', group.description)
    let request = this._http.post("http://localhost:8000/api/groups", body.toString(),this.options);
    return request;
  }
  updateGroup(group,groupId) {
    let body = new URLSearchParams();
    body.set('name', group.name)
    body.set('description', group.description)
    let request = this._http.post("http://localhost:8000/api/groups/"+groupId, body.toString(),this.options);
    return request;
  }
  deleteGroup(groupId) {
    let request = this._http.delete("http://localhost:8000/api/groups/"+groupId);
    return request;
  }
}
