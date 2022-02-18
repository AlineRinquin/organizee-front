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
    this.upMenuForm = this.initForm();
   }

     //Méthode qui initialise les champs du formulaire avec les infos de la BDD
  private initForm(menu?: Menu): FormGroup {
    return this.fb.group({
      dateMenu: [menu ? menu.dateMenu : ''],
      libelle: [menu ? menu.libelle : ''],
      repas: [menu ? menu.repas : ''],

    });
  }

  //delete d'un menu
  deleteMenu(id_menu : number): void {
  window.alert("Le menu a bien été supprimé!")
this.menusService.deleteMenu(id_menu)?.subscribe((resp) => {
  this.router.navigate(['menu']);
});

  }

//updateMenu
updateMenu(id_menu : number): void {
    const dateValue = this.menuForm.value['dateMenuFc'];
    const libelleValue = this.menuForm.value['libelleFc'];
    const repasValue = this.menuForm.value['repasFc'];

    const menu: Menu = {
      dateMenu: dateValue,
      libelle: libelleValue,
      repas: repasValue,
      id: id_menu
    };

    console.log(id_menu);

    this.menusService.updateMenu(menu, id_menu)?.subscribe((resp) => {
      console.log("ok");
        this.router.navigate(['menu']);
      });
  }


//ajout d'un menu
saveMenu(): void {

    const dateValue = this.menuForm.value['dateMenuFc'];
    const libelleValue = this.menuForm.value['libelleFc'];
    const repasValue = this.menuForm.value['repasFc'];

    const menu: Menu = {
      dateMenu: dateValue,
      libelle: libelleValue,
      repas: repasValue,
      id: 0
    };

   if (menu.dateMenu !=='' && menu.libelle !== '') {

    console.log(menu.dateMenu);
      this.menusService.addMenu(menu)?.subscribe((resp) => {
        this.router.navigate(['menu']);
      });
    } else {
      this.router.navigate(['accueil']);
    }
}



  ngOnInit(): void {
//affichage des menus d'une team
this.menusService.getMenu()?.subscribe((listMenus: any[])=>{
  console.log(listMenus);
  this.listMenus=listMenus;
});

  this.menuForm = this.fb.group(
  {
    dateMenuFc: new FormControl('',[Validators.required]),
    libelleFc: new FormControl('',[Validators.required]),
    repasFc: new FormControl('',[Validators.required]),
  }
);
  }

open(content: any) {
    this.modalService.open(content,
{ariaLabelledBy: 'menu'}).result.then((result)=> {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult =
`Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}



