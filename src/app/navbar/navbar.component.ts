import { Component, OnInit } from '@angular/core';
import { AuthappService } from '../services/authapp.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor (private BasicAuth : AuthappService) {}

  ngOnInit(): void {
  }

  getBasicAuth(): boolean {
   return this.BasicAuth.isLogged(); 
  }

  getUser(): string | null {
    return this.BasicAuth.loggedUser();
  }

}