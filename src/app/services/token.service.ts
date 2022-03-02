import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class TokenService {
tokenKey = environment.tokenKey;

  constructor() { }

  //récupère le token
  public getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    if(token) {
      return token;
    } else {
      return null;
    }
  }

  //supprime le token
    public eraseToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    if(token) {
      localStorage.removeItem(this.tokenKey); //.clear() supprime tous les token du localStorage !
        return token;                         //utiliser remove()
      }else {
      return null;
    }
      }

//recupère l'id du membre stocké dans le token
  public getCurrentMembreId(): number | null {
    const token = this.getToken();
    if(token) {
      const decodedToken = jwt_decode<any>(token);
      const userId = decodedToken.userId;
      return userId;
    } else {
      return null;
    }
  }

  //recupère l'id de la team stocké dans le token
  public getCurrentTeamId(): number | null {
    const token = this.getToken();
    if(token){
      const decodedToken = jwt_decode<any>(token);
      const teamId = decodedToken.teamId;
      return teamId ;

  }else {
return null;
  }

  }

  //recupère le role du membre stocké dans le token
public getRole(): string | null {
const token = this.getToken();
if(token){
  const decodedToken = jwt_decode<any>(token);
  const role= decodedToken.auth[0].authority;
  return role;
}else{
  return null;
}

  }

}
