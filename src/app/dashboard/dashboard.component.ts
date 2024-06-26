import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtentiDataService } from '../services/data/utenti-data.service';
import { Utente } from 'src/models/utente.models';
import { Subscription } from 'rxjs';
import { AuthJWTService } from '../services/authJWTService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  username! : String;
  utente! : Utente;
  private subscription!: Subscription;
  constructor(
    private route : ActivatedRoute,
    private utenteService : UtentiDataService,
    private router : Router,
    private jwtService : AuthJWTService
  ) { }
  ngOnInit(): void {
    this.username = this.route.snapshot.params['username'];

    this.utente = new Utente("","","","","",new Date());

    this.utenteService.getUserByUsername(this.username).subscribe(
      (response) => {
        this.utente = response;
        console.log(this.utente)
      },
      (error) => {
        console.error('Errore nel recuperare l\'utente:', error);
      }
    )
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  save(){}

  abort() {
    this.router.navigate(['welcome', this.username]);
  }

}
