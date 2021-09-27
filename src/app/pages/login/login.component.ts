import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any = {};
  public formLogin: FormGroup;


  constructor(private auth: AuthService, private FB: FormBuilder, private router: Router, private alertSVC: AlertService) {

  }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      'email': new FormControl(''),
      'password': new FormControl('')
    });

    this.formLogin = this.FB.group({

      'email': ['', Validators.required],
      'password': ['', Validators.required]
    })
  }





  async onLogin() {
    this.user = this.formLogin.value;
    try {
      const user = await this.auth.onLogin(this.user);
      if (user) {
        this.router.navigate(['/panel']);
      }
    } catch (error) {
      console.log(error);
    }
  }




}
