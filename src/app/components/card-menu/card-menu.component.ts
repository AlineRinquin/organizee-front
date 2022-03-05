import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from 'src/app/models/menu';
import { MenusService } from 'src/app/services/menus.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';



@Component({
  selector: 'app-card-menu',
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.scss']
})
export class CardMenuComponent implements OnInit {
closeResult = '';
alert : any;
isShow : boolean;
public listMenus:any[];
public menuId : any;
public menuForm : FormGroup;
public upMenuForm : FormGroup;


  constructor(
    private menusService: MenusService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.listMenus=[];
    this.menuForm = new FormGroup({});
    this.upMenuForm = new FormGroup({});
    this.isShow = false;
  }


  //delete d'un menu - fait appel au service dédié MenuService qui gère les observables
  deleteMenu(id_menu : number): void {
    this.alert={"type":"danger", "content":"Le menu a bien été supprimé"};
    this.isShow = true;
    this.menusService.deleteMenu(id_menu)?.subscribe((resp) => {
    window.location.reload();
});

}

//updateMenu - fait appel au service dédié MenuService qui gère les observables
updateMenu(id_menu : number): void {

    const dateValue = this.upMenuForm.value['dateMenuFc'];
    const repasMidiValue = this.upMenuForm.value['repasMidiFc'];
    const repasSoirValue = this.upMenuForm.value['repasSoirFc'];


    const menu: Menu = {
      dateMenu: dateValue,
      repasMidi: repasMidiValue,
      repasSoir: repasSoirValue,
      id: 0
    };

    console.log(id_menu);

    this.menusService.updateMenu(menu, id_menu)?.subscribe((resp) => {
      console.log(menu, id_menu);
      window.location.reload();
      });
  }



//ajout d'un menu - fait appel au service dédié MenuService qui gère les observables
saveMenu(): void {

    const dateValue = this.menuForm.value['dateMenuFc'];
    const repasMidiValue = this.menuForm.value['repasMidiFc'];
    const repasSoirValue = this.menuForm.value['repasSoirFc'];

//permet de construire l'objet à passer en base
    const menu: Menu = {
      dateMenu: dateValue,
      repasMidi: repasMidiValue,
      repasSoir: repasSoirValue,
      id: 0
    };

  if (menu.dateMenu !=='') {

    console.log(menu.dateMenu);
      this.menusService.addMenu(menu)?.subscribe((resp) => {
        window.location.reload(); //rechargement de la page pour affichage des modifications

      });
    } else {
      this.router.navigate(['accueil']);
    }
}



  ngOnInit(): void {
//affichage des menus d'une team - fait appel au service dédié MenuService qui gère les observables
this.menusService.getMenu()?.subscribe((listMenus: any[])=>{
  console.log(listMenus);
  this.listMenus=listMenus; //socke les objets récupérés de la base

});


  this.menuForm = this.fb.group(
  {
    dateMenuFc: new FormControl('',[Validators.required]),
    repasMidiFc: new FormControl('',[Validators.required]),
    repasSoirFc: new FormControl('',[Validators.required]),
  }
);

  this.upMenuForm = this.fb.group(
  {
    dateMenuFc: new FormControl('',[Validators.required]),
    repasMidiFc: new FormControl('',[Validators.required]),
    repasSoirFc: new FormControl('',[Validators.required]),
  }
);



  }
//gestion de la fenêtre modale, open au click
open(content: any) {
    this.modalService.open(content,
{ariaLabelledBy: 'menu'}).result.then((result)=> {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult =
`Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  //gestion de la fenêtre modale, mode de fermeture
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  //fermeture du message d'alerte quand un menu est supprimé
    onClickCloseAlert(){
    this.isShow = ! this.isShow;
  }
}



