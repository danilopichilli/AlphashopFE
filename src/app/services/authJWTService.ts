import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { authServerUri, port, server } from '../app.constants';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthJWTService {
  constructor(
    private httpClient : HttpClient
  ) {}

   CONST_UTENTE : string= 'Utente';
   CONST_AUTH_TOKEN : string = 'AuthToken';

  autenticaService(username: string, password: string){

    return this.httpClient.post<any>(`${authServerUri}`, {username, password})
    .pipe(
      map(data => {
        if(typeof sessionStorage !== 'undefined') {
          sessionStorage.setItem(this.CONST_UTENTE, username);
          sessionStorage.setItem(this.CONST_AUTH_TOKEN,`Bearer ${data.token}`);
        }
        return data;
      })
    );
  }

  loggedUser(): string | null {
    /*utilizzo l'operatore ternario per verificare se l'utente e' diverso da null
      se e' diverso da null allora restituisci l'utente con il suo nome
      altrimenti resitituisci stringa vuota
    */
    let utente =
      typeof sessionStorage !== 'undefined'
        ? sessionStorage.getItem(this.CONST_UTENTE)
        : null;

    return utente !== 'null' ? utente : '';
  }

  getAuthToken(): string | null{
    if(this.loggedUser()){
      return sessionStorage.getItem(this.CONST_AUTH_TOKEN);
    } else {
      return "";
    }
  }

  isLogged(): boolean {
    /*
      se l'utente e' loggato allora restituisco true 
      altrimenti false
    */
    return (
      typeof sessionStorage !== 'undefined' &&
      sessionStorage.getItem(this.CONST_UTENTE) !== null
    );
  }

  clearAll() {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem(this.CONST_UTENTE);
      sessionStorage.removeItem(this.CONST_AUTH_TOKEN);
    }
  }

}
