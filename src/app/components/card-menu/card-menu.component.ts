import { Component, OnInit } from '@angular/core';
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

  constructor(
    private menusService: MenusService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.listMenus=[];
    this.menuId=0;
    this.menuForm = new FormGroup({});
   }



//ajout d'un menu
saveMenu(): void {

    const dateValue = this.menuForm.value['dateMenuFc'];
    const libelleValue = this.menuForm.value['libelleFc'];

    const menu: Menu = {
      dateMenu: dateValue,
      libelle: libelleValue,
    };

    // if (menu.dateMenu != undefined && menu.libelle != '') {

    console.log(dateValue);
      this.menusService.addMenu(menu)?.subscribe((resp) => {
        this.router.navigate(['menu']);
      });
    // } else {
    //   this.router.navigate(['menu']);
    // }
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



//modif d'un menu
// this.menuId=this.route.snapshot.paramMap.get('id');
// this.menusService.getMenuById(this.menuId)
// .subscribe((this.listMenus:any)=>)

//delete d'un menu


