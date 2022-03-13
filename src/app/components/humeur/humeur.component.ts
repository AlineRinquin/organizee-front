import { Component, OnInit } from '@angular/core';
import { MembreService } from 'src/app/services/membre.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-humeur',
  templateUrl: './humeur.component.html',
  styleUrls: ['./humeur.component.scss']
})
export class HumeurComponent implements OnInit {
monHumeurLien! : string[];
monHumeurTitle! : string[] ;
isShow: boolean;
alert: any;

// tableau des humeurs, lien vers les images et titre pour meilleure accesibilité
  tabHumeur= [
      { title : "Je vais bien", lien : "assets/images/emoticon-heureux.png"},
      { title : "Je pleure", lien : "assets/images/emoticon-pleurer.png"},
      { title : "Je suis fatigué", lien : "assets/images/emoticon-fatigue.png"},
      { title : "Je suis en colère", lien : "assets/images/emoticon-insulter.png"},
      { title : "Je suis en joie", lien : "assets/images/emoticon-feter.png"}  ]


  constructor(private membreService: MembreService, private tokenService: TokenService) { 
    this.isShow= false;
    this.alert="";
     }

// récupère le getCurrentMembreId (stocké dans token.service), 
// qui est l'identifiant du membre et qui stocké dans le token
  ngOnInit(): void { 
    const userId = this.tokenService.getCurrentMembreId();
    this.membreService.getMembreId(userId).subscribe({
      next: result => {
    this.monHumeurLien= result.smiley;
      }
    })
   }

// méthode pour récupérer l'indice de l'humeur sur laquelle on a cliqué
onChoixHumeur(numero: any){
 this.monHumeurTitle= [this.tabHumeur[numero].title];
 this.monHumeurLien= [this.tabHumeur[numero].lien];



 // Permet de faire la mise à jour des caractéristiques du membre
 // Subscribe exécute l'observable, dont le rôle est de suivre le changement d'humeur
 // et en deuxième ligne de chaque paramètre, affecte l'alerte du header
 this.membreService.updateHumeur(this.tabHumeur[numero].lien)?.subscribe(
  {
    next: result => {
      this.alert={"type":"success", "content":"L'humeur a bien été modifiée"};
      this.isShow = true;
    },
    error: err => {
      this.alert={"type":"danger", "content":"Problème lors de la modification de l'humeur"};
      this.isShow = true;
    },
    complete: () => console.log('DONE!')
  }
);


console.log("humeur titre est : ", this.monHumeurTitle);
console.log("humeur lien est : ", this.monHumeurLien);
console.log("index humeur est : ", numero);
}

// méthode pur afficher
onClickCloseAlert(){
this.isShow=!this.isShow;
}

}