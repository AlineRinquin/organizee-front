import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Membre } from 'src/app/models/membre';
import { MembreService } from 'src/app/services/membre.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-page-delete-member',
  templateUrl: './page-delete-member.component.html',
  styleUrls: ['./page-delete-member.component.scss']
})
export class PageDeleteMemberComponent implements OnInit {
  @Output() clickDelete = new EventEmitter();
  parent: boolean;
  public membreId: any;
  public membreInfos: any;


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

    const roleUser = this.tokenService.getRole();

    if(roleUser == "ROLE_PARENT"){
      this.parent = true;
    }

  }

  /** Suppresion d'un membre au clik */
  onClickDelete(): void {
    console.log(this.membreInfos);
    this.membreService.deleteMembre(this.membreInfos.id).subscribe((resp) => {
      return resp
    });
  }
}
