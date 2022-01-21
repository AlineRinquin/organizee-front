import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fiche-contact',
  templateUrl: './fiche-contact.component.html',
  styleUrls: ['./fiche-contact.component.scss'],
})
export class FicheContactComponent implements OnInit {
  @Input() personne: any;

  constructor() {}

  ngOnInit(): void {}
}
