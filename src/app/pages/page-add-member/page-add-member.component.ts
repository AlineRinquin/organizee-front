import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Membre } from 'src/app/models/membre';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-page-add-member',
  templateUrl: './page-add-member.component.html',
  styleUrls: ['./page-add-member.component.scss']
})
export class PageAddMemberComponent implements OnInit {

  public addMemberForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.addMemberForm = new FormGroup({});
  }

  ngOnInit(): void {
    // *********************************pensser a changer group car déprécié********************************
    this.addMemberForm = this.fb.group(
      {
        firstNameFc: new FormControl('', [Validators.required]),
        lastNameFc: new FormControl('', [Validators.required]),
        dateNaissanceFc: new FormControl('', [Validators.required]),
        profilFc: new FormControl('', [Validators.required]),
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
    console.log('value : ', this.addMemberForm.value);
    console.log('form : ', this.addMemberForm);
    const firstNameValue = this.addMemberForm.value['firstNameFc'];
    const lastNameValue = this.addMemberForm.value['lastNameFc'];
    const emailValue = this.addMemberForm.value['emailFc'];
    const passwordValue = this.addMemberForm.value['passwordFc'];
    const dateNaissanceValue = this.addMemberForm.value['dateNaissanceFc'];
    const teamNameValue = this.addMemberForm.value['teamNameFc'];
    const profilValue = this.addMemberForm.value['profilFc'];
    const passwordConfirmValue = this.addMemberForm.value['passwordConfirmFc'];
    const teamValue = [''];

    const membre: Membre = {
      nom: firstNameValue,
      prenom: lastNameValue,
      email: emailValue,
      password: passwordValue,
      dateNaissance: dateNaissanceValue,
      passwordConfirm: passwordConfirmValue,
      roleList: ["ROLE_PARENT"]
    };


    if (membre.email !== '' && membre.password !== '') {
      this.authService.signup(membre).subscribe((resp) => {
        this.router.navigate(['account/signin']);
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
