import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private tokenService: TokenService,
    private router: Router) {
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

    /***Gestion des limatations en fonction du role (parent ou enfant) */
    const roleUser = this.tokenService.getRole();
    if(roleUser == "ROLE_PARENT"){
      this.parent = true;
    }
  }

  /** Méthode qui au click va supprimer un contact en faisant appel au service dédié dans Membre Service **/
  onClickDelete(membreId: number){
    this.membreService.deleteMembre(membreId).subscribe((resp) => {
      if(membreId) {
        this.listMembres.forEach(membreId => console.log(membreId))
      }else{
        window.alert("Le profil ne peut pas être supprimé!")
      }
      this.router.navigate(['compte/']);
    });
    window.location.reload();
  }
}
