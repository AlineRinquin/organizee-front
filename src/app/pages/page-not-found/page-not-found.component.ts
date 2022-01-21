import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {


  constructor() {
  }


  ngOnInit(): void {
    
  }
}


/* version alternative pour mettre une redirection automatique
---------------
---------------
import { Router } from '@angular/router';
----------------
constructor(private routeur: Router) {   }
----------------
  ngOnInit(): void {
    setTimeout(
      () => {
    this.routeur.navigate(["accueil"]);
      }, 3000
    );
  } } */
