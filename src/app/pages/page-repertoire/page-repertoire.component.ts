import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { RepertoireService } from 'src/app/services/repertoire.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-page-repertoire',
  templateUrl: './page-repertoire.component.html',
  styleUrls: ['./page-repertoire.component.scss'],
})
export class PageRepertoireComponent implements OnInit {
  public listContact: any[];
  public listFull: any[];
  public listContactInfo: any;
  public personneid: any;
  keyword: any;
  openDetails: any;
  parent: boolean;

  constructor(
    private repertoireService: RepertoireService,
    private router: Router,
    private route: ActivatedRoute,
    private tokenService: TokenService
  ) {
    this.listContact = [];
    this.listFull = [];
    this.listContactInfo = '';
    this.parent = false;
  }

  ngOnInit(): void {
    const roleUser = this.tokenService.getRole();

    //gestion du role parent ou non pour mettre en "disable" les boutons pour les roles enfants
    if(roleUser == "ROLE_PARENT"){
      this.parent = true;
    }

    //récupère tout les contact et leurs info
    this.repertoireService.getContact().subscribe((listContact: any[]) => {
      console.log(listContact);
      this.listContact = listContact;
      this.listFull = listContact;
    });
  }

  // Méthode pour récuper ce qui est saisi dans l'input
  onSearchChange(prenom: string): void {
    this.keyword = prenom;
    if (prenom == '') {
      this.listContact = this.listFull;
    } else {
      this.applyFilter(prenom);
    }
  }

  // Méthode qui applique un filtre sur ce qui est récupéré de l'input sur le prénom
  applyFilter(filter: any) {
    let prenom = this.listFull.filter((contact) =>
      contact.prenom.toLowerCase().includes(filter.toLowerCase())
    );
    this.listContact = prenom;
  }

  // Méthode qui au click va ouvrir les détails d'un contact
  onClick(personne: any) {
    console.log(personne);
    this.openDetails = personne;
  }

  // Méthode qui au click va supprimer un contact
  onClickDelete(contactId: number){
    this.repertoireService.deleteContact(contactId).subscribe((resp) => {
      if(contactId) {
        this.listContact.forEach(contactId => console.log(contactId))
      }else{
        window.alert("Le contact ne peut pas être supprimé!")
      }
      this.router.navigate(['repertoire/']);
    });
    window.location.reload();
  }
}
