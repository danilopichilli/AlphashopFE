import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { SalutiDataService } from '../services/data/saluti-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  saluti = 'Benvenuti nel sito Alphashop';
  titolo2 = 'Seleziona gli articoli da acquistare';
  messaggio: string | Object | undefined;

  utente = '';

  constructor(private route : ActivatedRoute, private salutiSrv : SalutiDataService) {}

  ngOnInit(): void {

    this.utente = this.route.snapshot.params['username'];
  }

  getSaluti() {
    console.log(this.salutiSrv.getSaluti(this.utente));

    /*le richieste svolte da Angular ai servizi non sono sincrone,
     sono asincrone e quindi si deve modificare il codice aggiungendo il metodo .subscribe()
     che invia la richiesta al web service e ottiene in maniera asincrona il risultato della sottoscrizione
     inserendo nei parametri del subscribe una response
     */
    this.salutiSrv.getSaluti(this.utente).subscribe(
      response => this.handleResponse(response),
      error => this.handleError(error)
    );
  }

  handleResponse(response: string | Object) {
    this.messaggio = response;
    console.log(this.messaggio);
  }

  handleError(error: { error: { message: string | Object | undefined; }; }) {
    this.messaggio = error.error.message;
    
  }
}
