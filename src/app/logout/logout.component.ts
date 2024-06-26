import { Component, OnInit } from '@angular/core';
import { AuthappService } from '../services/authapp.service';
import { AuthJWTService } from '../services/authJWTService';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private jwtService : AuthJWTService){ }

  ngOnInit(): void {
    this.jwtService.clearAll();
  }

}

