import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mail } from '../models/mail';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  apiUrl: string;
  tokenKey: string;

  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) {
    this.apiUrl = environment.apiUrl;
    this.tokenKey = environment.tokenKey;
  }

  envoiMailText(mail: Mail): Observable<any>{
    return this.http.post(`${this.apiUrl}/sendmail/text`, mail, {
      responseType: "text"
    });
  }



}
