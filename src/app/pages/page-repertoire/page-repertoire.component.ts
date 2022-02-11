import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { RepertoireService } from 'src/app/services/repertoire.service';

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

  constructor(
    private repertoireService: RepertoireService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.listContact = [];
    this.listFull = [];
    this.listContactInfo = '';
  }

  ngOnInit(): void {
    //récupère tout les contact et leurs info
    this.repertoireService.getContact().subscribe((listContact: any[]) => {
      console.log(listContact);
      this.listContact = listContact;
      this.listFull = listContact;
    });

    this.personneid = this.route.snapshot.paramMap.get('id');
    console.log(this.personneid);

    this.repertoireService
      .getContactById(this.personneid)
      .subscribe((listContactInfo: any) => {
        console.log(listContactInfo);
        this.listContactInfo = listContactInfo;
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

  // Méthode qui au click va ouvrir les détails d'un contat
  onClick(personne: any) {
    console.log(personne);
    this.openDetails = personne;
  }

  // this.repertoireService.deleteContact(contact).subscribe((resp) => {
  //   this.router.navigate(['repertoire/']);
  // });
}
