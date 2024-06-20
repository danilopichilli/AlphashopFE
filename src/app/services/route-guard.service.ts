import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthappService } from './authapp.service';
import { Router } from '@angular/router';
import { AuthJWTService } from './authJWTService';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  token : any = '';
  ruoli : string[] = [];

  constructor(private JWTService : AuthJWTService, private route : Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean{ 

    this.token = this.JWTService.getAuthToken();

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.token);
    this.ruoli = decodedToken['authorities'];

    if(!this.JWTService.isLogged()) {
      this.route.navigate(["login"]);
      return false;
     } else {
      if ( route.data['roles'] == null || route.data['roles'].length === 0)
        return true;
      else if (this.ruoli.some(r => route.data['roles'].includes(r))) 
        return true;
       else {
        this.route.navigate(["forbidden"]);
        return false;
      }
      
     }
  }

}
