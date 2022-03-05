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
      startDateFc : new FormControl(''),
      startHourFc : new FormControl(''),
      endDateFc : new FormControl(''),
      endHourFc : new FormControl(''),
      textFc : new FormControl('', [ Validators.required])
    })
  }

  public onSubmit(): void {
    const startDateValue = this.eventForm.value['startDateFc'];
    const startHourValue = this.eventForm.value['startHourFc'];
    const endDateValue = this.eventForm.value['endDateFc'];
    const endHourValue = this.eventForm.value['endHourFc'];
    const textValue = this.eventForm.value['textFc'];

    const event = {
      start: startDateValue+'T'+startHourValue+':00',
      end: endDateValue+'T'+endHourValue+':00',
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
