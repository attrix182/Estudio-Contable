import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: any = {}

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }


  onLogin() {

    this.auth.loginUser(this.user)
      .subscribe(
        res => {
          console.log(res);
          //this.router.navigate(['/games']);
        },
        err => console.error(err));
  }

}
