import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-fiche-contact',
  templateUrl: './fiche-contact.component.html',
  styleUrls: ['./fiche-contact.component.scss'],
})
export class FicheContactComponent implements OnInit {
  @Input() personne: any;
  @Output() clickDelete = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClickDelete(numPerson: number){
    window.alert("Le contact à bien été supprimé!")
    this.clickDelete.emit(numPerson);
  }
}
