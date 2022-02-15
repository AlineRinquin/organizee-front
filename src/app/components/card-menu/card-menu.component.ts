import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from 'src/app/models/menu';
import { MenusService } from 'src/app/services/menus.service';



@Component({
  selector: 'app-card-menu',
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.scss']
})
export class CardMenuComponent implements OnInit {
public listMenus:any[];

  constructor(
    private menusService: MenusService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.listMenus=[];
   }

  ngOnInit(): void {
//affichage des menus d'une team
this.menusService.getMenu()?.subscribe((listMenus: any[])=>{
  console.log(listMenus);
  this.listMenus=listMenus;
});

  }

}
