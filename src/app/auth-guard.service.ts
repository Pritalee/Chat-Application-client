import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {AuthService} from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private Auth:AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.Auth.isLoggedIn; 
    if (isLoggedIn) {
      console.log('going to chat');
      this.router.navigateByUrl('/chat');
      return true;
    } else {
      console.log('going to login');
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
