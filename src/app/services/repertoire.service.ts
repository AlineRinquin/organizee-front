import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class RepertoireService {
  apiUrl: string;
  tokenKey: string;

  constructor(private http: HttpClient) {
    // On se sert des variables d'environnement de notre application
    this.apiUrl = environment.apiUrl;
    this.tokenKey = environment.tokenKey;
  }

  getContact(): Observable<any> {
    return this.http.get(`${this.apiUrl}/contacts/team/1`);
  }

  //sur le component fiche contact de la page repertoire
  // sur clic de btn modifier ou supproimer ca renvois vers page modifier contact
  //page modifier contact faire un get by id du contact en question
  // appeler methode/ update /delette/ add et contact by id
}
