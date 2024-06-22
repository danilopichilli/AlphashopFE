import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { registrationServerUri } from '../app.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  constructor (private route : Router, private httpClient : HttpClient) {}

  utente! : Utente;

  ngOnInit(): void {
    this.utente = new Utente();
  }

  register(){
      return this.httpClient.post<any>(`${registrationServerUri}`, this.utente)
      .subscribe(
        response => {
          console.log('User registered successfully', response);
          this.route.navigate(['login']);
        },
        error => {
          console.log('Error registering user', error);
        });
    }

    abort() {
      this.route.navigate(['login']);
    }
}

export class Utente{

  username! : String;
  password! : String;
  email! : String;
  nome! : String;
  cognome! : String;
  dob!: Date;

}
