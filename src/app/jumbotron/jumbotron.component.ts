import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css']
})
export class JumbotronComponent implements OnInit {

  @Input() Titolo: string|undefined;  //@Input si usa quando il dato mi deve arrivare da un'altra parte
  @Input() SottoTitolo: string|undefined;
  @Input() Show: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}