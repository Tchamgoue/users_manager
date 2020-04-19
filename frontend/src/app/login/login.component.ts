import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email = "";
  public password = "";

  constructor(private authService: AuthService,  private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if (this.email.trim() === "" && this.password === "") return;
    this.authService.login(this.email, this.password).subscribe((result: any) => {
      const user = result.user;
      const token = result.token;
      this.authService.setAuthUser(user);
      sessionStorage.setItem("token", JSON.stringify(token));
      sessionStorage.setItem("user", JSON.stringify(user));
      this.router.navigate(['']); // redirection si l'utilisateur est authentifié
    });
  }

}
