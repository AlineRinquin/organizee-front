import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MembreService } from 'src/app/services/membre.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-page-delete-member',
  templateUrl: './page-delete-member.component.html',
  styleUrls: ['./page-delete-member.component.scss']
})
export class PageDeleteMemberComponent implements OnInit {
  public membreId: any;
  public membreInfos: any;
  parent: boolean;


  constructor(private membreService: MembreService,
    private tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute) {
      this.membreInfos = '';
      this.parent = false;

  }

  ngOnInit(): void {
    /** Pour récuperer l'id du membre à modifier **/
    this.membreId = this.route.snapshot.paramMap.get('id');

     /** Appel Api **/
     this.membreService
     .getMembreId(this.membreId)
     .subscribe((membreInfos: any) => {
       this.membreInfos = membreInfos;
       console.log(membreInfos.id);
     });

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

  /********************** Suppresion d'un membre au click ********************/
  onClickDelete(): void {
    console.log(this.membreInfos);
    this.membreService.deleteMembre(this.membreInfos.id).subscribe((resp) => {
      return resp
    });
  }
}
