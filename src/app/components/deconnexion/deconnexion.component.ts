import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-deconnexion',
  templateUrl: './deconnexion.component.html',
  styleUrls: ['./deconnexion.component.scss']
})
export class DeconnexionComponent implements OnInit {

  constructor(private tokenService: TokenService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }


  onClickDeco(){
    this.tokenService.eraseToken();
    this.router.navigate(['accueil']);

  }

}
