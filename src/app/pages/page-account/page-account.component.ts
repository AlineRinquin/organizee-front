import { Component, OnInit } from '@angular/core';
import { MembreService } from 'src/app/services/membre.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-page-account',
  templateUrl: './page-account.component.html',
  styleUrls: ['./page-account.component.scss']
})
export class PageAccountComponent implements OnInit {
  public listMembres: any[];

  constructor(private teamService: TeamService, private membreService: MembreService) {
    this.listMembres = [];
   }

  ngOnInit(): void {
    this.membreService.getMembres().subscribe((membres: any[]) => {
      this.listMembres = membres;
    });
  }

}
