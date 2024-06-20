import { Component, OnInit } from '@angular/core';
import { ArticoliDataService } from '../services/data/articoli-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export class Articoli {

  constructor (
    public codArt : string,
    public descrizione : string,
    public um : string,
    public pzCart : number,
    public pesoNetto : number,
    public prezzo : number,
    public idStatoArt : string,
    public dataCreaz : Date,
    public iva : Iva,
    public famAssort : FamAss
  ) {}
}

export class Iva{

  constructor(
    public idIva : number,
    public descrizione : string,
    public aliquota : number
  ){}
}

export class FamAss{

  constructor(
    public id : number,
    public descrizione : string
  ){}
}
@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrls: ['./articoli.component.css']
})

export class ArticoliComponent implements OnInit {

  numArt = 0;

  pagina = 1;
  righe = 10;

  filter : string = '';
  articolo: Articoli | undefined; 
  articoli : Articoli[] = [];

  faSearch = faSearch;

  apiMsg : ApiMsg | undefined;
  messaggio : string | undefined;

  constructor(
    private articoliService : ArticoliDataService, 
    private route : ActivatedRoute,
    private router : Router) {}

    ngOnInit(): void {
      this.filter = this.route.snapshot.params['filter'];

      if(this.filter != undefined){
        this.getArticoli(this.filter);
      }
    }

    refresh(){
      this.getArticoli(this.filter);
    }

    public getArticoli(filter : string) {
      this.articoliService.getArticoliByCodArt(filter).subscribe(
        response  =>  {

          this.articoli = [];
          console.log('Ricerchiamo articoli per codArt con filtro ' + filter);

          this.articolo = response;
          console.log(this.articolo);

          this.articoli.push(this.articolo);

          this.numArt = this.articoli.length;
          console.log(this.articoli.length); 
        },
        error  => {
          console.log(error.error.messaggio);

          console.log('Ricerchiamo articoli per descrizione con filtro ' + filter);
          this.articoliService.getArticoliByDesc(filter).subscribe(
            response => {
              this.articoli = response;
              console.log(this.articoli);

              this.numArt = this.articoli.length;
              console.log(this.articoli.length);
            }
          )
        }
      );
    }

    elimina(codArt : string) {
      console.log(`Eliminazione articolo ${codArt} `);

      this.articoliService.delArticoloByCodArt(codArt).subscribe(
        response => {
          console.log(response);
          
          this.apiMsg = response;
          this.messaggio = this.apiMsg.message;
          this.refresh();
        }
      );
    }

    modifica(codArt : string) {
      console.log(`Modifica articolo ${codArt} `);
      this.router.navigate(['newart', codArt])
    }
} 

export class ApiMsg {

  constructor( 
    public code : string,
    public message : string
  ){}
}

/*
db.createUser({
    user: "admin",
    pwd: "admin",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
})

db.createUser({
    user: "danilo",
    pwd: "password",
    roles: [ { role: "readWrite", db: "ms-users" } ]
})
*/