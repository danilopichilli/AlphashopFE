import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  utente! : Utente;
  constructor(
    private route : ActivatedRoute
  ) { }
  ngOnInit(): void {
    
  }

  save(){}

  abort(){}

}

export class Utente{

  username! : String;
  password! : String;
  email! : String;
  nome! : String;
  cognome! : String;
  dob!: Date;

}
