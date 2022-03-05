import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private tokenKey: string;
  constructor(private router: Router) {
    this.tokenKey = environment.tokenKey;
  }

  //s'il n'y a pas de token, le user ne peut pas naviguer sur les url où cette option est activée
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem(this.tokenKey);

    if (token) {
      const decodedToken = jwt_decode<any>(token);

      console.log('decodedToken : ', decodedToken);

      if (decodedToken.exp) {
        const dateExp = new Date(decodedToken.exp * 1000);
        if (new Date() >= dateExp) {
          // le token a expiré, je n'autorise pas l'accès et je redirige pour connexion
          this.router.navigate(['accueil']);
          return false;
        }
      }
      return true;
    } else {
      console.log('You shall not pass !!!!');
      this.router.navigate(['accueil']);
      return false;
    }
  }
}
