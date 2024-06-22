import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthappService } from '../services/authapp.service';
import { AuthJWTService } from '../services/authJWTService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  username = '';
  password = '';
  autenticato = true;
  errorMsg = 'Spiacente, la username o la password sono errati!';

  constructor(private route : Router, private JWTService : AuthJWTService) {}

  ngOnInit(): void {}

  gestAut() {
    this.JWTService.autenticaService(this.username,this.password).subscribe({
      next: (data) => {
        console.log(data);
        this.route.navigate(['welcome',this.username]);
        this.autenticato = true;
      },
      error: (err) => {
        console.log(err);
        this.autenticato = false;
      }
    });
  }

}