import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  public aux:boolean = false;

  constructor(private authSvc:AuthService, private router: Router) { }



  canActivate(): boolean {

    this.authSvc.isLoggedIn() ?  this.aux = true: this.router.navigateByUrl('/');

    return this.aux;
  }

}
