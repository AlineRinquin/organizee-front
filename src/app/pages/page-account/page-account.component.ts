import { Component, OnInit } from '@angular/core';
import { MembreService } from 'src/app/services/membre.service';


@Component({
  selector: 'app-page-account',
  templateUrl: './page-account.component.html',
  styleUrls: ['./page-account.component.scss']
})
export class PageAccountComponent implements OnInit {
  public listMembres: any[];

  constructor(private membreService: MembreService) {
    this.listMembres = [];
   }

  ngOnInit(): void {
    this.membreService.getMembresByTeamId()?.subscribe((membres: any[]) => {
      console.log(membres);
      this.listMembres = membres;

  });
  }
}
