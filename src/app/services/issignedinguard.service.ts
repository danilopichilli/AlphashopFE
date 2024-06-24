import { Injectable, OnInit } from '@angular/core';
import { AuthJWTService } from './authJWTService';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssignedinguardService implements CanActivate{

  constructor(private authJWTService : AuthJWTService, private router : Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if(this.authJWTService.isLogged()) {
      this.router.navigate(['welcome', this.authJWTService.loggedUser()]);
      return false;
    } else {
      return true;
    }
  }

}
