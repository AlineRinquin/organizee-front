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
    // On se sert des variables d'environnement de notre application
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

    // Modifier cette partie ci-dessous :
    // - pour pouvoir stocker dans le localstorage notre accesstoken
    // - Sous la clé "TOKEN-LBP"

    return this.http.post(`${this.apiUrl}/membres/sign-in`, body).pipe(
      map((x: any) => {
        console.log('Service : ', x.accessToken);
        // Modification à faire ici
        localStorage.setItem(this.tokenKey, x.accessToken);
        return x; // permet de renvoyer la réponse à l'initiateur (page Signin) après le traitement du map
      })
    );
  }

  forgotPassword(email: string): Observable<any> {
    const body = {
      email: email,
    };
    return this.http.post(`${this.apiUrl}/membres/forgot-password`, body);
  }

    resetPassword(email: string, password: string): Observable<any> {
    const body = password;
     console.log(password);
   return this.http.post(`${this.apiUrl}/membres/reset-password/${email}`, body);
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
