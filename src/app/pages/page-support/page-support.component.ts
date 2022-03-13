import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Membre } from 'src/app/models/membre';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MembreService } from 'src/app/services/membre.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


//DRIVEN FORM
@Component({
  selector: 'app-page-support',
  templateUrl: './page-support.component.html',
  styleUrls: ['./page-support.component.scss']
})
export class PageSupportComponent implements OnInit {

memberName: any;


constructor(private membreService: MembreService,
  private http: HttpClient, 
  private router: Router,  
  private tokenService: TokenService) { 

}

ngOnInit(): void {
  this.membreService.getMembreId(this.tokenService.getCurrentMembreId()).subscribe((result) => {
    this.memberName = result ; }) }




  onSendMail(){    }

  onDeleteMail(){      }

}