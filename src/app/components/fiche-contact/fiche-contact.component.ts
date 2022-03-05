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
  isShow: boolean;
  alert:any;


  constructor(private tokenService: TokenService) {
    this.parent = false;
    this.isShow = false;
    this.alert = "";
  }

  ngOnInit(): void {
    const roleUser = this.tokenService.getRole();

    if(roleUser == "ROLE_PARENT"){
      this.parent = true;
    }
  }

  // supprime le contact
  onClickDelete(numPerson: number){
    this.alert={"type":"succes", "content":"le contact a été supprimé mother fucker!!!!!!!!!"};
    this.isShow = true;
    this.clickDelete.emit(numPerson);
  }
}
