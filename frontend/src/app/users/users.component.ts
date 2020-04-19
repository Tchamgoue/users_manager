import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { GroupService } from '../group.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users = null;
  public groups = null;

  public loadingGroups = false;
  public loadingUsers = false;

  public viewUser = false;
  public editUser = false;

  public selectedUser = null;


  constructor(private userService: UserService, private groupService: GroupService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated())
      this.router.navigate(['login']); // redirection si l'utilisateur n'est pas authentifié
    else {
      this.getGroups();
      this.getUsers();
    }
  }

  getGroups(): void {
    this.loadingGroups = true;
    this.groupService.getGroups().subscribe(result => {
      this.groups = result;
      this.loadingGroups = false;
    })
  }

  getUsers() {
    this.loadingUsers = true;
    this.userService.getUsers().subscribe(result => {
      this.users = result;
      this.loadingUsers = false;
    })
  }

  getUserGroup = (groupId): any => {
    return this.groups.find((group: any) => group.id == groupId);
  }

  afficherUser(user) {
    this.viewUser = true;
    this.editUser = false;
    this.selectedUser = user;
  }

}
