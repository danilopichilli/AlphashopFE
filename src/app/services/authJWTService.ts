import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { authServerUri } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthJWTService {
  constructor(
    private httpClient : HttpClient
  ) {}

   private readonly CONST_UTENTE : string= 'Utente';
   private readonly CONST_BEARER_TOKEN : string = 'BearerToken';

      
  autenticaService(username: string, password: string){

    const authString = 'Basic ' + window.btoa(`${username}:${password}`);
    const headers = new HttpHeaders({ Authorization: authString }) ;

    
    const body = { username: username, password: password };
    return this.httpClient.post<any>(`${authServerUri}`,body, {headers})
    .pipe(
      map(data => {
        if(typeof sessionStorage !== 'undefined') {
          sessionStorage.setItem(this.CONST_UTENTE, username);
          sessionStorage.setItem(this.CONST_BEARER_TOKEN,`Bearer ${data.token}`);
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
      return sessionStorage.getItem(this.CONST_BEARER_TOKEN);
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
      sessionStorage.removeItem(this.CONST_BEARER_TOKEN);
    }
  }



}
