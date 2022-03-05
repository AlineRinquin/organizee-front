import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-fiche-contact',
  templateUrl: './fiche-contact.component.html',
  styleUrls: ['./fiche-contact.component.scss'],
})
export class FicheContactComponent implements OnInit {
  @Input() personne: any;
  @Output() clickDelete = new EventEmitter();
  parent: boolean;


  constructor(private tokenService: TokenService) {
    this.parent = false;
  }

  ngOnInit(): void {
    const roleUser = this.tokenService.getRole();

    if(roleUser == "ROLE_PARENT"){
      this.parent = true;
    }
  }

  // supprime le contact
  onClickDelete(numPerson: number){
    window.alert("Le contact à bien été supprimé!")
    this.clickDelete.emit(numPerson);
  }
}
