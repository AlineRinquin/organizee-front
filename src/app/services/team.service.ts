import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  apiUrl: string;
  tokenKey: string;


  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.tokenKey = environment.tokenKey;
  }
  getTeams(): Observable<any> {
    return this.http.get(`${this.apiUrl}/teams/all`);
  }

  getTeamById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/teams/1` + id);
  }

  addTeam(team: Team): Observable<any> {
    console.log(team);

    return this.http.post(`${this.apiUrl}/teams/add`, team);
  }

  deleteTeam(team: Team): Observable<any> {
    return this.http.delete(`${this.apiUrl}/teams/delete/1`);
  }

  updateTeam(team: Team): Observable<any> {
    return this.http.put(`${this.apiUrl}/teams/update/1`, team);
  }

}
