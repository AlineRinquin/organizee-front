import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../models/contact';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class RepertoireService {
  apiUrl: string;
  tokenKey: string;

  constructor(private http: HttpClient, private router: Router,  private tokenService: TokenService) {
    // On se sert des variables d'environnement de notre application
    this.apiUrl = environment.apiUrl;
    this.tokenKey = environment.tokenKey;
  }

  getContact(): Observable<any> {
    const teamId = this.tokenService.getCurrentTeamId()
    return this.http.get(`${this.apiUrl}/contacts/team/${teamId}`);
  }

  getContactById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/contacts/` + id);
  }

  addContact(contact: Contact): Observable<any> {
    const teamId = this.tokenService.getCurrentTeamId()
    return this.http.post(`${this.apiUrl}/contacts/add`, contact);
  }

  deleteContact(contactId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/contacts/delete/${contactId}`);
  }

  updateContact(contact: Contact): Observable<any> {
    return this.http.put(`${this.apiUrl}/contacts/update/`, contact);
  }
}
