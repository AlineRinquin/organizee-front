import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-humeur',
  templateUrl: './page-humeur.component.html',
  styleUrls: ['./page-humeur.component.scss']
})

export class PageHumeurComponent implements OnInit {
  
 monHumeurLien! : string[];
 monHumeurTitle! : string[] ;


  tabHumeur= [
      { title : "Je vais bien", lien : "assets/images/emoticon-heureux.png"},
      { title : "Je pleure", lien : "assets/images/emoticon-pleurer.png"},
      { title : "Je suis fatigué", lien : "assets/images/emoticon-fatigue.png"},
      { title : "Je suis en colère", lien : "assets/images/emoticon-insulter.png"},
      { title : "Je suis malade", lien : "assets/images/emoticon-vomir.png"}  ]

  constructor() {    }

  ngOnInit(): void { }

onChoixHumeur(numero: number){
 this.monHumeurTitle= [this.tabHumeur[numero].title];
 this.monHumeurLien= [this.tabHumeur[numero].lien];

console.log("humeur titre est : ", this.monHumeurTitle);
console.log("humeur lien est : ", this.monHumeurLien);
console.log("index humeur est : ", numero );

}



}

