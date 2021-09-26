import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  public aux: boolean = false;

  constructor(private authSvc: AuthService, private router: Router) { }



  async canActivate() {

    let flag = false;

    let userLog = localStorage.getItem('token');

    let log = await this.authSvc.GetCurrentUser()

    log.uid == userLog ? flag = true : this.router.navigateByUrl('/login');


    return flag
  }
}
