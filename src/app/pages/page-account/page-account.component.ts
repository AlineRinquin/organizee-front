import { Component, OnInit } from '@angular/core';
import { MembreService } from 'src/app/services/membre.service';
import { TeamService } from 'src/app/services/team.service';
import { TokenService } from 'src/app/services/token.service';



@Component({
  selector: 'app-page-account',
  templateUrl: './page-account.component.html',
  styleUrls: ['./page-account.component.scss']
})
export class PageAccountComponent implements OnInit {
  public listMembres: any[];
  currentUser: any;
  currentTeam: any;
  parent: boolean;

  constructor(private membreService: MembreService,
    private teamService: TeamService,
    private tokenService: TokenService) {
    this.listMembres = [];
    this.parent = false;
   }

  ngOnInit(): void {
    /** Récuperer la team du membre connecté **/
    this.teamService.getTeamById()?.subscribe((team) => {
      this.currentTeam = team;
    });
    /** Récuperer le membre connecté **/
    this.membreService.getMembreId(this.tokenService.getCurrentMembreId()).subscribe((user) => {
      this.currentUser = user;
    });
    /** Récuperer la liste des membres de la team **/
    this.membreService.getMembresByTeamId()?.subscribe((membres: any[]) => {
      this.listMembres = membres;
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

}
