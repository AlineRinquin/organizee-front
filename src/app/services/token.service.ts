import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
tokenKey = environment.tokenKey;

  constructor() { }

  public getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    if(token) {
      return token;
    } else {
      return null;
    }
  }

  public getCurrentMembreId(): number | null {
    const token = this.getToken();
    if(token) {
      const decodedToken = jwt_decode<any>(token);
      const userId = decodedToken.sub;
      return userId;
    } else {
      return null;
    }
  }

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
}
