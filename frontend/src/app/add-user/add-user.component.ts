import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { UserService } from '../user.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  public name = "";
  public description = "";
  public groups = null;
  public users = null;
  
  first_name = "";
  email = "";
  last_name = "";
  phone = "";
  gender = "";
  group_id = null;
  password = "";
  active = 1;
  avatar=null;

  constructor(private groupService:GroupService, private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.getGroups();
  }

  getGroups(): void {
    this.groupService.getGroups().subscribe(result => {
      this.groups = result;
    })
  }
  ajouter() {
    if (this.first_name === "" || this.email === "") return;
    let newUser = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone: this.phone,
      gender: this.gender,
      group_id: this.group_id.id,
      password: this.password,
      active: this.active,
      avatar: this.avatar
    }
    this.userService.createUser(newUser).subscribe(result => {
      console.log(result);
      this.router.navigate(["/users"])

    })
  }

}
