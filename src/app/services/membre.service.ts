import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Membre } from '../models/membre';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class MembreService {
  apiUrl: string;
  tokenKey: string;

  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) {
    this.apiUrl = environment.apiUrl;
    this.tokenKey = environment.tokenKey;
   }

   getMembres(): Observable<any> {
    return this.http.get(`${this.apiUrl}/membres/all`);
  }

  getMembresByTeamId(): Observable<any> | void{
    const teamId = this.tokenService.getCurrentTeamId();
    if (teamId){
    return this.http.get(`${this.apiUrl}/membres/team/${teamId}`);
    }else {
      this.router.navigate(['accueil']);
    }

  }

  getMembreId(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/membres/` + id);
  }

  addMembre(membre: Membre): Observable<any> | void{
    const teamId = this.tokenService.getCurrentTeamId();
    if (teamId){
    return this.http.post(`${this.apiUrl}/membres/add/${teamId}`, membre);
    }else {
      this.router.navigate(['accueil']);
    }
  }

  deleteMembre(membre: Membre): Observable<any>{
    return this.http.delete(`${this.apiUrl}/membres/delete/${membre.id}`);
  }

  updateMembre(membre: Membre): Observable<any> | void {
    const teamId = this.tokenService.getCurrentTeamId();
    if (teamId){
    return this.http.put(`${this.apiUrl}/membres/update/${teamId}/${membre.id}`, membre);
  }else {
      this.router.navigate(['accueil']);
    }
}
}
