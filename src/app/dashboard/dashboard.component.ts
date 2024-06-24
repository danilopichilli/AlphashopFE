import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtentiDataService } from '../services/data/utenti-data.service';
import { Utente } from 'src/models/utente.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  utente! : Utente;
  private subscription!: Subscription;
  constructor(
    private route : ActivatedRoute,
    private utenteService : UtentiDataService
  ) { }
  ngOnInit(): void {
    console.log(this.utente)
    this.route.params.subscribe(params => {
      const username = params['username'];
      if (username) {
        this.subscription = this.utenteService.getUserByUsername(username).subscribe(
          (utente: Utente) => {
            this.utente = utente;
          },
          (error) => {
            console.error('Errore nel recuperare l\'utente:', error);
          }
        );
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  save(){}

  abort(){}

}
