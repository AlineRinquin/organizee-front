import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private membreService: MembreService, private tokenService: TokenService) {
      this.parent = false;

  }

  ngOnInit(): void {
    const roleUser = this.tokenService.getRole();

    if(roleUser == "ROLE_PARENT"){
      this.parent = true;
    }

  }

  onClickDelete(membreId: any){
    window.alert("Le profil à bien été supprimé!")
    this.clickDelete.emit(membreId);
  }

}
