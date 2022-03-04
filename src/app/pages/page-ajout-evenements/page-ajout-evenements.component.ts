import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EvenementService } from 'src/app/services/evenement.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-page-ajout-evenements',
  templateUrl: './page-ajout-evenements.component.html',
  styleUrls: ['./page-ajout-evenements.component.scss']
})
export class PageAjoutEvenementsComponent implements OnInit {
  public eventForm: FormGroup;
  public userId : any;
  public teamId : any;
  public isShow: boolean;
  public alert:any;

  constructor(private evenementService:EvenementService, private tokenService: TokenService, private router: Router,) {
    this.eventForm = new FormGroup({});
    this.isShow = false;
    this.alert = "";
  }

  ngOnInit(): void {
    this.userId = this.tokenService.getCurrentMembreId();
    this.teamId = this.tokenService.getCurrentTeamId();
    
    this.eventForm = new FormGroup({
      startFc : new FormControl(''),
      endFc : new FormControl(''),
      textFc : new FormControl('', [ Validators.required])
    })
  }

  public onSubmit(): void {
    const startValue = this.eventForm.value['startFc'];
    const endValue = this.eventForm.value['endFc'];
    const textValue = this.eventForm.value['textFc'];

    const event = {
      start: startValue,
      end: endValue,
      text: textValue,
      id:"",
      membre: {id:this.userId},
      team: {id:this.teamId}
    }

    this.evenementService.addEvenements(event).subscribe({
      next: result => {
        this.alert={"type":"success", "content":"L'évènement à été correctement ajouté au calendrier"};
        this.isShow = true;
      },
      error: err => {
        this.alert={"type":"danger", "content":"Problème lors de l'ajout de l'évenment"};
        this.isShow = true;
      },
      complete: () => {
        console.log('DONE!');
        this.router.navigate(['agenda']);
      }
    });

  }

}
