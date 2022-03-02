import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.scss']
})
export class PageAccueilComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router,  private tokenService: TokenService) {

  }

  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if(token){
      this.router.navigate(['tableau-de-bord']);
    }
  }

}
