import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router} from '@angular/router';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';
import { Membre } from '../../models/membre';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-page-signup',
  templateUrl: './page-signup.component.html',
  styleUrls: ['./page-signup.component.scss'],
})
export class PageSignupComponent implements OnInit {
  public signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private teamService: TeamService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.signupForm = new FormGroup({});
  }

  ngOnInit(): void {
    // *********************************pensser a changer group car déprécié********************************
    this.signupForm = this.fb.group(
      {
        teamNameFc: new FormControl('', [Validators.required]),
        firstNameFc: new FormControl('', [Validators.required]),
        lastNameFc: new FormControl('', [Validators.required]),
        dateNaissanceFc: new FormControl('', [Validators.required]),
        roleFc: new FormControl(''),
        couleurFc: new FormControl('', Validators.required),
        emailFc: new FormControl('', [
          Validators.email,
          Validators.required,
          Validators.pattern(/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/gim),
        ]), // chercher une meilleure regex
        passwordFc: new FormControl('', [
          Validators.minLength(8),
          Validators.required,
        ]),
        passwordConfirmFc: new FormControl('', [
          Validators.minLength(8),
          Validators.required,
        ]),
      },
      {
        validator: this.ConfirmedValidator('passwordFc', 'passwordConfirmFc'),
      }
    );
  }

  public onSubmit(): void {
    const teamNameValue = this.signupForm.value['teamNameFc'];
    const idValue = this.signupForm.value[''];
    const prenomValue = this.signupForm.value['firstNameFc'];
    const nomValue = this.signupForm.value['lastNameFc'];
    const emailValue = this.signupForm.value['emailFc'];
    const passwordValue = this.signupForm.value['passwordFc'];
    const dateNaissanceValue = this.signupForm.value['dateNaissanceFc'];
    const passwordConfirmValue = this.signupForm.value['passwordConfirmFc'];
    const couleurValue = this.signupForm.value['couleurFc'];
    const roleValue = ['ROLE_PARENT'];

    const team: Team = {
      id : "",
      nom : teamNameValue,
    };

    if (emailValue !== '' && passwordValue !== '' && team.nom!== '') {
        //création Team
      this.teamService.addTeam(team).subscribe((respTeam) => {
        //récupération de l'id auto-généré (respTeam.id) dans l'id team (team.id)
        team.id = respTeam.id;
         //création objet membre avec l'objet team crée
        const membre: Membre = {
          id: idValue,
          nom: nomValue,
          prenom: prenomValue,
          email: emailValue,
          password: passwordValue,
          couleur: couleurValue,
          dateNaissance: dateNaissanceValue,
          passwordConfirm: passwordConfirmValue,
          team: team,
          roleList: roleValue,
        };
        //création du membre en bdd avec l'objet membre
        this.authService.signup(membre).subscribe((respMembre) => {
          this.router.navigate(['accueil']);
          return respMembre
        });

      });
    } else {
      // affichage erreur
    }
  }
  /** Méthode pour compare le mot de passe et la confirmation de mot de passe **/
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
