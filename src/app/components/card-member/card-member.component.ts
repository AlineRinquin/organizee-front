import { Component, Input, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-card-member',
  templateUrl: './card-member.component.html',
  styleUrls: ['./card-member.component.scss']
})
export class CardMemberComponent implements OnInit {
  @Input() membre: any;
  parent: boolean;

  constructor(private tokenService: TokenService) {
    this.parent = false;
   }

  ngOnInit(): void {
    /** Récupérer le rôle de l'uilisateur connecté pour lui imposer des limitations s'il a un ROLE_ENFANT **/
    /** Il s'agit de cacher les boutons qui permettent de modifier et supprimer les profils (html)**/
    const userRole = this.tokenService.getRole();
    if(userRole == "ROLE_PARENT"){
      this.parent = true;
      console.log('Rôle : ' + userRole);
    }
    else if(userRole== "ROLE_ENFANT"){
      this.parent = false;
      console.log('Rôle : ' + userRole);
    }
  }


}
