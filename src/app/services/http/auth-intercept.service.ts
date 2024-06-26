import {  HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthappService } from '../authapp.service';
import { Observable } from 'rxjs';
import { AuthJWTService } from '../authJWTService';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptService implements HttpInterceptor{

  constructor(private jwtService : AuthJWTService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<any> | any {
    let AuthToken = this.jwtService.getAuthToken();
    let user = this.jwtService.loggedUser();
    if(AuthToken && user) {
      req = req.clone({ 
        setHeaders: {
          Authorization: AuthToken
        }
      });
      
    }
    return next.handle(req);
  }
}
