import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
isLogged=false;


  constructor(public tokenService : TokenService){

  }

  ngOnInit(): void {

    if(this.tokenService.getToken()){
      this.isLogged=true;
    }

  }

  }

