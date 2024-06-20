import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { port, server } from 'src/app/app.constants';
import { ApiMsg, Articoli } from 'src/app/articoli/articoli.component';

@Injectable({
  providedIn: 'root'
})
export class ArticoliDataService {

  constructor(private httpClient : HttpClient) { }


  getArticoliByDesc(descrizione : string) {
    return this.httpClient.get<Articoli[]>(`http://${server}:${port}/api/articoli/cerca/descrizione/${descrizione}`);
   }

   getArticoliByCodArt(codArt : string){ 
    return this.httpClient.get<Articoli>(`http://${server}:${port}/api/articoli/cerca/codice/${codArt}`);
   }

   getArticoliByEan(barcode : string) { 
    return this.httpClient.get<Articoli>(`http://${server}:${port}/api/articoli/cerca/ean/${barcode}`);
   }

   delArticoloByCodArt(codArt : string){
    return this.httpClient.delete<ApiMsg>(`http://${server}:${port}/api/articoli/elimina/${codArt}`);
   }

   updateArticolo(articolo : Articoli){
    return this.httpClient.put<ApiMsg>(`http://${server}:${port}/api/articoli/modifica`,articolo);
   }

   insArticolo(articolo : Articoli){
    return this.httpClient.post<ApiMsg>(`http://${server}:${port}/api/articoli/inserisci`,articolo);
   }
} 
