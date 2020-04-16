import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { GroupService } from '../group.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public message = "";
  public user = null;

  public loadingUsers = false;
  public loadingGroups = false;
  public loadingAddUser = false;
  public loadingAddGroup = false;
  public loadingDeleteUser = false;
  public loadingDeleteGroup = false;
  public loadingUpdateUser = false;
  public loadingUpdateGroup = false;

  public name = "";
  public description = "";
  public groups = null;
  public users = null;
  
  first_name = "";
  email = "";
  last_name = "";
  phone = "";
  gender = "";
  group_id = 0;
  password = "";
  active = 1;

  public authUser = null;

  constructor(private userService: UserService, private groupService: GroupService, 
              private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated())
      this.router.navigate(['login']); // redirection si l'utilisateur n'est pas authentifié
    else this.authUser = this.authService.authUser;
  }

  getGroups() {
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

  ajouter() {
    if (this.first_name === "" || this.email === "") return;
    this.loadingUsers = true;
    let newUser = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone: this.phone,
      gender: this.gender,
      group_id: this.group_id,
      password: this.password,
      active: this.active 
    }
    this.userService.createUser(newUser).subscribe(result => {
      console.log(result);
      this.loadingUsers = false;
    })
  }

  supprimerUser(user) {
    // const tabFiltre = this.users.filter(element => element.id !== user.id);
    // this.users = tabFiltre;
    this.loadingDeleteUser = true;
    this.userService.deleteUser(user.id).subscribe(result => {
      this.users = result;
      this.loadingDeleteUser = false;
    })
  }
  modifierUser(user) {
    this.first_name = user.first_name;
    this.email = user.email;
  }

  validerModif(user) {
    const indice = this.users.findIndex(element => element.id === user.id);
    let newUser = this.users[indice];
    newUser.email = this.email;
    newUser.first_name = this.first_name;
    this.users[indice] = user;
    this.first_name = "";
    this.email = "";
  }


  ajouterGroup() {
    let newGroup = {
      name: this.name,
      description: this.description
    }
    this.loadingAddGroup = true;
    this.groupService.createGroup(newGroup).subscribe(result => {
      console.log(result);
      this.loadingAddGroup = false;
    });
  }

  supprimerGroupe(groupId) {
    this.loadingDeleteGroup = true;
    this.groupService.deleteGroup(groupId).subscribe(result => {
      console.log(result);
      this.loadingDeleteGroup = false;
    });
  }

}
