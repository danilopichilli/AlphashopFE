import { Component, OnInit } from '@angular/core';
import { AuthappService } from '../services/authapp.service';
import { AuthJWTService } from '../services/authJWTService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor (private JWTService : AuthJWTService) {}

  ngOnInit(): void {
  }

  getBasicAuth(): boolean {
   return this.JWTService.isLogged(); 
  }

  getUser(): string | null {
    return this.JWTService.loggedUser();
  }

}