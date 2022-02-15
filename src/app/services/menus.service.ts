import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menu } from '../models/menu';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

apiUrl: string;
tokenKey: string;


  constructor(private http: HttpClient, private router: Router) {
    // On se sert des variables d'environnement de notre application
    this.apiUrl = environment.apiUrl;
    this.tokenKey = environment.tokenKey;
  }

    //on affiche les menus d'une team
  getMenu(): Observable<any> | void {
     //on récupère l'id de la team grâce au token du membre :
    const token = localStorage.getItem(this.tokenKey);
    if(token){ //s'il y a un token tu le decode
      const decodedToken = jwt_decode<any>(token);
      const teamId = decodedToken.teamId;//tu vas chercher le teamId
      console.log(teamId);               //dans le json du token
    return this.http.get(`${this.apiUrl}/menus/team/${teamId}`);
      //on reconstruit alors l'url pour afficher les menus via le team_id
  }else {
      this.router.navigate(['accueil']);
    }
  }

  getMenuById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/menus/` + id);
  }

  addMenu(menu: Menu): Observable<any> {
    console.log(menu);

    return this.http.post(`${this.apiUrl}/menus/add`, menu);
  }

  deleteMenu(menu: Menu): Observable<any> {
    return this.http.delete(`${this.apiUrl}/menus/delete/1`);
  }

  updateMenu(menu: Menu): Observable<any> {
    return this.http.put(`${this.apiUrl}/contacts/update/1`, menu);
  }
}


