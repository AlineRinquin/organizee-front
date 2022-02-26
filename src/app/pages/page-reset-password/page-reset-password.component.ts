import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Membre } from 'src/app/models/membre';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-page-reset-password',
  templateUrl: './page-reset-password.component.html',
  styleUrls: ['./page-reset-password.component.scss']
})
export class PageResetPasswordComponent implements OnInit {
  public resetForm: FormGroup;
  uuid:string;
  constructor(private authService: AuthService, private router: Router,private fb: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.resetForm = new FormGroup({});
    this.uuid = this.activatedRoute.snapshot.params['uuid'];
  }

  ngOnInit(): void {
    this.resetForm = this.fb.group(
      {
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

  // public onSubmit(submittedForm: any): void {
  //   console.log(submittedForm.form.value);
  //   const password = submittedForm.form.value['password'];
  //   console.log(email);
  //   this.authService.resetPassword(email, password).subscribe((resp: any) => {
  //     window.alert("Votre mot de passe est bien ré-initialisé !")
  //     this.router.navigate(['accueil']);

  //   });
  // }

  public onSubmit(): void {
    console.log('value : ', this.resetForm.value);
    console.log('form : ', this.resetForm);
    const passwordValue = this.resetForm.value['passwordFc'];
    const passwordConfirmValue = this.resetForm.value['passwordConfirmFc'];

    const membre: Membre = {
      nom: "",
      prenom: "",
      dateNaissance: new Date(),
      email: "",
      password: passwordValue,
      roleList: ["ROLE_PARENT"],
      couleur: "",
      passwordConfirm: ""
    };


      this.authService.resetPassword(membre,this.uuid).subscribe((resp) => {
        this.router.navigate(['accueil']);
      });
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
