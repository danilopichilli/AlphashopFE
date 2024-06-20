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
  userId = '';
  password = '';
  autenticato = true;
  errorMsg = 'Spiacente, la userid o la password sono errati!';

  constructor(private route : Router, private JWTService : AuthJWTService) {}

  ngOnInit(): void {}

  gestAut() {
    this.JWTService.autenticaService(this.userId,this.password).subscribe({
      next: (data) => {
        console.log(data);
        this.route.navigate(['welcome',this.userId]);
        this.autenticato = true;
      },
      error: (err) => {
        console.log(err);
        this.autenticato = false;
      }
    });
    /*
    if(this.BasicAuth.autentica(this.userId,this.password)) {
      this.route.navigate(['welcome',this.userId]);
      this.autenticato = true;
    } else {
      this.autenticato = false;
    }
  */
  }

}