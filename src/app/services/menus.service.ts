import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menu } from '../models/menu';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

apiUrl: string;


  constructor(private http: HttpClient, private router: Router, private tokenService: TokenService) {
    // On se sert des variables d'environnement de notre application
    this.apiUrl = environment.apiUrl;
  }

    //on affiche les menus d'une team
  getMenu(): Observable<any> | void {
    const teamId = this.tokenService.getCurrentTeamId();
    if (teamId){
    return this.http.get(`${this.apiUrl}/menus/team/${teamId}`);
  }else {
      this.router.navigate(['accueil']);
    }
  }

  getMenuById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/menus/` + id);
  }

  addMenu(menu: Menu): Observable<any> | void {
    console.log(menu);
    const teamId = this.tokenService.getCurrentTeamId();
    if (teamId){
    return this.http.post(`${this.apiUrl}/menus/add/${teamId}`, menu);
    }else {
      this.router.navigate(['accueil']);
    }

  }

  deleteMenu(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/menus/delete/`+ id);
  }

  updateMenu(menu: Menu): Observable<any> {
    return this.http.put(`${this.apiUrl}/contacts/update/`, menu);
  }
}


