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

      switch (error.code) {
        case "auth/user-not-found":
          this.alertSVC.alertBottom('error', "Usuario inexistente");
          break;
        case "auth/wrong-password":
          this.alertSVC.alertBottom('error', "Usuario inexistente");
          break;
        case "auth/too-many-requests":
          this.alertSVC.alertBottom('error', "Se ha intentado ingresar sin exito varias veces, espere unos minutos y vuelva a intentarlo")
      }
    }
  }


  isValidField(field: string): string {
    const validateField = this.formLogin.get(field);
    return !validateField.valid && validateField.touched
      ? 'is-invalid'
      : validateField.touched
        ? 'is-valid'
        : '';
  }



}
