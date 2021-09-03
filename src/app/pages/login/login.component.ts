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

  public email: string = '';
  public clave: string = '';

  public user: any = {};
  public formLogin: FormGroup;


  constructor(private auth: AuthService, private FB: FormBuilder, private router: Router, private alertSVC: AlertService) {
    this.email = ''
  }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      'correo': new FormControl(''),
      'clave': new FormControl('')
    });

    this.formLogin = this.FB.group({

      'correo': ['', Validators.required],
      'clave': ['', Validators.required]
    })
  }



  onLogin() {

    console.log(this.formLogin.value)
    
    this.auth.loginUser(this.formLogin.value)
      .subscribe(
        res => {
          console.log(res);
          res == "OK" ? this.router.navigateByUrl('/panel') : this.alertSVC.alertBottom('error', 'Usuario o contraseña incorrectos');
        },
        err => console.error(err));
  }



}
