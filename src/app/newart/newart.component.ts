import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiMsg, Articoli, FamAss, Iva } from '../articoli/articoli.component';
import { ArticoliDataService } from '../services/data/articoli-data.service';

@Component({
  selector: 'app-newart',
  templateUrl: './newart.component.html',
  styleUrls: ['./newart.component.css']
})
export class NewartComponent implements OnInit {

  codArt : string = '';
  articolo!: Articoli;
  conferma : string = '';
  apiMsg!: ApiMsg;
  errore : string = '';
  isModifica : boolean = false;
  Iva = [
    {id: 22,
      descrizione: "Iva 22%",
      aliquota: 22},
    {id: 10,
      descrizione: "Iva 10%",
      aliquota: 10},
    {id: 4,
      descrizione: "Iva 4%",
      aliquota: 4},
    {id: 0,
      descrizione: "Iva Esente",
      aliquota: 0}
  ];
  FamAssort = [
    {id: -1,
      descrizione: "NON DISPONIBILE"
    },
    {id: 1,
      descrizione: "DROGHERIA ALIMENTARE"
    },
    {id: 10,
      descrizione: "DROGHERIA CHIMICA"
    },
    {id: 15,
      descrizione: "BANCO TAGLIO"
    },
    {id: 16,
      descrizione: "GASTRONOMIA"
    },
    {id: 17,
      descrizione: "PASTICCERIA"
    },
    {id: 20,
      descrizione: "LIBERO SERVIZIO"
    },
    {id: 25,
      descrizione: "PANE"
    },
    {id: 40,
      descrizione: "SURGELATI"
    },
    {id: 50,
      descrizione: "ORTOFRUTTA"
    },
    {id: 60,
      descrizione: "MACELLERIA"
    },
    {id: 70,
      descrizione: "PESCHERIA"
    },
    {id: 90,
      descrizione: "EXTRA ALIMENTARI"
    },
  ];

  constructor(
    private route : ActivatedRoute, 
    private articoliService : ArticoliDataService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.codArt = this.route.snapshot.params['codArt'];

    this.articolo = new Articoli("","","",0,0,0,"1",new Date(),new Iva(22,"",22),new FamAss(1, ""));

    if(this.codArt != "-1"){

      this.isModifica = true;

      this.articoliService.getArticoliByCodArt(this.codArt).subscribe(
        response => {
          this.articolo = response;
          console.log(this.articolo);
        },
        error => {
          console.log(error.error.messaggio);
        }
      );
    } else {
      this.isModifica = false;
    }

  }

  abort(){
    this.router.navigate(['articoli']);
  }

  salva(){
    this.conferma = '';
    this.errore = '';
    if(this.codArt === '-1'){
      this.articoliService.insArticolo(this.articolo).subscribe(
        response => {
          this.apiMsg = response;
          this.conferma = this.apiMsg.message;
          console.log(this.conferma);

          this.router.navigate(['newart', this.articolo.codArt]);
        },
        error => {
          this.errore = error.error.messaggio;
          console.log(this.errore);
        }
      )

    } else {
      this.articoliService.updateArticolo(this.articolo).subscribe(
        response => {
          this.apiMsg = response;
          this.conferma = this.apiMsg.message;
          console.log(this.conferma);
        },
        error => {
          this.errore = error.error.messaggio;
          console.log(this.errore);
        }
      )
    }
  }
}
