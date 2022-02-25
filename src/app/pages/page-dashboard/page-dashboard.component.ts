import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MembreService } from 'src/app/services/membre.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-page-dashboard',
  templateUrl: './page-dashboard.component.html',
  styleUrls: ['./page-dashboard.component.scss']
})
export class PageDashboardComponent implements OnInit {

  conectedUser: any;
  listMembres: any[];

  constructor(private membreService: MembreService,
    private http: HttpClient, 
    private router: Router,  
    private tokenService: TokenService) { 
      this.listMembres = [];
}

  ngOnInit(): void {
    this.membreService.getMembreId(this.tokenService.getCurrentMembreId()).subscribe((result) => {
      this.conectedUser = result ;
      console.log(result);
    })

    this.membreService.getMembresByTeamId()?.subscribe((membres: any[]) => {
      console.log(membres);
      this.listMembres = membres;
  });
  }




  // récuperer l id du membre s=qui est connecté
  //recuperer l id dans le token grace au user id du getCurrentMembreId
  // placer ce userId dans la methode getMembreId a la place de l id
//********************************************************************
}
