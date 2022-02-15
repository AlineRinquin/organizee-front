import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-page-creation-team',
  templateUrl: './page-creation-team.component.html',
  styleUrls: ['./page-creation-team.component.scss'],
})
export class PageCreationTeamComponent implements OnInit {
  public teamForm: FormGroup;
  constructor(
    private teamService: TeamService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.teamForm = new FormGroup({});
  }

  ngOnInit(): void {
    // *********************************penser a changer group car déprécié********************************
    this.teamForm = new FormGroup({
      nameFc : new FormControl('', [Validators.required])
    });
  }

  public onSubmit(): void {
    console.log('value : ', this.teamForm.value);
    console.log('form : ', this.teamForm);
    const nameValue = this.teamForm.value['nameFc'];

    const team: Team = {
      nom : nameValue,
    };



    if (team.nom !== '' ) {
      this.teamService.addTeam(team).subscribe((resp) => {
        this.router.navigate(['compte']);
      });
    } else {
      // affichage erreur
    }
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}

