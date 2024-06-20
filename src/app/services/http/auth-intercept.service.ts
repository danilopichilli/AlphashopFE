import {  HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthappService } from '../authapp.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptService implements HttpInterceptor{

  constructor(private BasicAuth : AuthappService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<any> | any {
    let AuthToken = this.BasicAuth.getAuthToken();
    let user = this.BasicAuth.loggedUser();
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
