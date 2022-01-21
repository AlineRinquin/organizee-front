import { Component, OnInit } from '@angular/core';
import { RepertoireService } from 'src/app/services/repertoire.service';

@Component({
  selector: 'app-page-repertoire',
  templateUrl: './page-repertoire.component.html',
  styleUrls: ['./page-repertoire.component.scss'],
})
export class PageRepertoireComponent implements OnInit {
  public listContact: any[];
  public listFull: any[];
  keyword: any;
  openDetails: any;

  constructor(private repertoireService: RepertoireService) {
    this.listContact = [];
    this.listFull = [];
  }

  ngOnInit(): void {
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

  onClick(personne: any) {
    console.log(personne);
    this.openDetails = personne;
  }
}
