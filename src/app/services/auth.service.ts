import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Membre } from '../models/membre';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string;
  private tokenKey: string;

  constructor(private http: HttpClient) {

    this.apiUrl = environment.apiUrl;
    this.tokenKey = environment.tokenKey;
  }

  signup(membre: Membre): Observable<any> {
    console.log(membre);

    return this.http.post(`${this.apiUrl}/membres/sign-up`, membre);

  }


  signin(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password,
    };

    console.log('Mon body : ', body);
    return this.http.post(`${this.apiUrl}/membres/sign-in`, body).pipe(
      map((x: any) => {
        console.log('Service : ', x.token);
        localStorage.setItem(this.tokenKey, x.token);
        return x; // permet de renvoyer la réponse à l'initiateur (page Signin) après le traitement du map
      })
    );

  }

  forgotPassword(membre: Membre): Observable<any> {
     return this.http.post(`${this.apiUrl}/membres/forgot-password`, membre, {responseType: "text"});
  }

  resetPassword(membre: Membre, uuid:string): Observable<any> {
    console.log('--'+uuid+' / '+membre);
   return this.http.put(`${this.apiUrl}/membres/reset-password/${uuid}`, membre);
  }

  creationTeam(team: Team): Observable<any> {
    console.log(team);

    return this.http.post(`${this.apiUrl}/teams/add`, team);
  }



  addMember(membre: Membre): Observable<any> {
    console.log(membre);

    return this.http.post(`${this.apiUrl}/tableau-de-bord`, membre);
  }

}
