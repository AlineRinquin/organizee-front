import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Membre } from '../models/membre';

@Injectable({
  providedIn: 'root'
})
export class MembreService {
  apiUrl: string;
  tokenKey: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.tokenKey = environment.tokenKey;
   }

   getMembres(): Observable<any> {
    return this.http.get(`${this.apiUrl}/membres/all`);
  }

  getMembreId(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/membres/` + id);
  }

  addMembre(membre: Membre): Observable<any> {
    console.log(membre);
    return this.http.post(`${this.apiUrl}/membres/sign-up`, membre);
  }

  deleteMembre(membre: Membre): Observable<any> {
    return this.http.delete(`${this.apiUrl}/membres/delete/1`);
  }

  updateMembre(membre: Membre): Observable<any> {
    return this.http.put(`${this.apiUrl}/membres/update/1`, membre);
  }
}
