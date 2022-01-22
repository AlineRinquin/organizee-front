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

  getContactById(contact: Contact): Observable<any> {
    return this.http.get(`${this.apiUrl}/contacts/{id}`);
  }

  addContact(contact: Contact): Observable<any> {
    console.log(contact);

    return this.http.post(`${this.apiUrl}/contacts/add`, contact);
  }

  deleteContact() {
    return this.http.delete(`${this.apiUrl}/contacts/delete`);
  }

  updateContact(contact: Contact): Observable<any> {
    return this.http.put(`${this.apiUrl}/contacts/update/1`, contact);
  }
}
