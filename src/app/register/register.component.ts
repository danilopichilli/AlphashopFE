import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { registrationServerUri } from '../app.constants';
import { Router } from '@angular/router';
import { Utente } from 'src/models/utente.models';
import { UtentiDataService } from '../services/data/utenti-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  constructor (private route : Router, private utenteService : UtentiDataService) {}

  utente! : Utente;

  ngOnInit(): void {
    this.utente = new Utente("","","","","",new Date());
  }

  register(){
      return this.utenteService.registerUser(this.utente).
      subscribe(
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

