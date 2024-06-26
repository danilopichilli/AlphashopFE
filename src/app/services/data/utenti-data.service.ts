import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { portUtente, registrationServerUri, server } from 'src/app/app.constants';
import { Utente } from 'src/models/utente.models';
import { AuthJWTService } from '../authJWTService';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtentiDataService {

  constructor(private httpClient : HttpClient, private authentication : AuthJWTService) { }

  registerUser(utente : Utente){
    return this.httpClient.post<any>(`${registrationServerUri}`, utente);
  }

  getUserByUsername(username : String){
    return this.httpClient.get<Utente>(`http://${server}:${portUtente}/api/utenti/cerca/username/${username}`);
  }
}
