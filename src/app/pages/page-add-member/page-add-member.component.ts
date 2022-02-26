import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mail } from 'src/app/models/mail';
import { Membre } from 'src/app/models/membre';
import { AuthService } from 'src/app/services/auth.service';
import { MailService } from 'src/app/services/mail.service';
import { MembreService } from 'src/app/services/membre.service';

@Component({
  selector: 'app-page-add-member',
  templateUrl: './page-add-member.component.html',
  styleUrls: ['./page-add-member.component.scss']
})
export class PageAddMemberComponent implements OnInit {

  public addMemberForm: FormGroup;
  constructor(
    private membreService: MembreService,
    private mailService: MailService,
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
        roleFc: new FormControl('', []),
        couleurFc: new FormControl('', []),
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
    const lastNameValue = this.addMemberForm.value['lastNameFc'];
    const firstNameValue = this.addMemberForm.value['firstNameFc'];
    const emailValue = this.addMemberForm.value['emailFc'];
    const roleValue = this.addMemberForm.value['roleFc'];
    const passwordValue = this.addMemberForm.value['passwordFc'];
    const dateNaissanceValue = this.addMemberForm.value['dateNaissanceFc'];
    const couleurValue = this.addMemberForm.value['couleurFc'];
    const passwordConfirmValue = this.addMemberForm.value['passwordConfirmFc'];


    const membre: Membre = {
      nom: lastNameValue,
      prenom: firstNameValue,
      email: emailValue,
      password: passwordValue,
      couleur: couleurValue,
      dateNaissance: dateNaissanceValue,
      passwordConfirm: passwordConfirmValue,
      roleList: [roleValue]
    };

    const mail: Mail = {
      recipient: emailValue,
      subject: "Votre mot de passe Organizee",
      //message: 'Votre mot de passe'
      message: `Bonjour ${firstNameValue}!\n Voici vos identifiants de connexion : \n
      Identifiant : ${emailValue}
      Mot de passe : ${passwordValue}`
    };


    if (membre.email !== '' && membre.password !== '') {
      this.membreService.addMembre(membre)?.subscribe((resp) => {
        this.mailService.envoiMailText(mail)?.subscribe((respMail) =>{
          console.log("Mail envoyé");
        })
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
