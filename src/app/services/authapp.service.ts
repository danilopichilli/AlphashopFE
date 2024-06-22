import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { port, server } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthappService {
  constructor(private httpClient : HttpClient) {}

  autenticaService(username: string, password: string){

    let authString = 'Basic ' + window.btoa(username + ':' + password);

    let headers = new HttpHeaders(
      {Authorization : authString}
    )
    

    return this.httpClient.get<AuthData>(`http://${server}:${port}/api/articoli/test`, {headers})
    .pipe(
      map(data => {
        if(typeof sessionStorage !== 'undefined') {
          sessionStorage.setItem('Utente', username);
          sessionStorage.setItem('AuthToken', authString);
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
        ? sessionStorage.getItem('Utente')
        : null;

    return utente !== 'null' ? utente : '';
  }

  getAuthToken(){
    if(this.loggedUser()){
      return sessionStorage.getItem('AuthToken');
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
      sessionStorage.getItem('Utente') !== null
    );
  }

  clearAll() {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('Utente');
      sessionStorage.removeItem('AuthToken');
    }
  }
}


export class AuthData {

  constructor (
    public codice : String,
    public messaggio : String
  ) {}
}