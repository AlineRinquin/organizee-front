import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  apiUrl: string;
  tokenKey: string;

  constructor(private http: HttpClient) {
    // On se sert des variables d'environnement de notre application
    this.apiUrl = environment.apiUrl;
    this.tokenKey = environment.tokenKey;
  }

  getEvenementsByIdTeam(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/evenements/team/` + id);
  }

  addEvenements(evenement: any): Observable<any> {
    console.log(evenement);

    return this.http.post(`${this.apiUrl}/evenements/add`, evenement);
  }

  deleteEvenements(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/evenements/delete/`+id,{responseType: 'text'});
  }

  updateEvenements(evenement:any): Observable<any> {
    return this.http.put(`${this.apiUrl}/evenements/update/1`, evenement);
  }
}
