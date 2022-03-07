import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mail } from 'src/app/models/mail';
import { Membre } from 'src/app/models/membre';
import { MailService } from 'src/app/services/mail.service';
import { MembreService } from 'src/app/services/membre.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-page-add-member',
  templateUrl: './page-add-member.component.html',
  styleUrls: ['./page-add-member.component.scss']
})
export class PageAddMemberComponent implements OnInit {
  public addMemberForm: FormGroup;
  alert: any;
  isShow!: boolean;
  currentTeam: any;



  constructor(
    private membreService: MembreService,
    private teamService: TeamService,
    private mailService: MailService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.addMemberForm = new FormGroup({});
  }

  ngOnInit(): void {
    /** Récuperer la team du membre connecté **/
    this.teamService.getTeamById()?.subscribe((team) => {
      this.currentTeam = team;
    });
    /** group est déprécié mais pas d'autres solutions sinon revoir la fonction confirmeValidator **/
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
        ]),
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
    const idValue = this.addMemberForm.value[''];
    const lastNameValue = this.addMemberForm.value['lastNameFc'];
    const firstNameValue = this.addMemberForm.value['firstNameFc'];
    const emailValue = this.addMemberForm.value['emailFc'];
    const roleValue = this.addMemberForm.value['roleFc'];
    const passwordValue = this.addMemberForm.value['passwordFc'];
    const dateNaissanceValue = this.addMemberForm.value['dateNaissanceFc'];
    const couleurValue = this.addMemberForm.value['couleurFc'];
    const passwordConfirmValue = this.addMemberForm.value['passwordConfirmFc'];


    const membre: Membre = {
      id: idValue,
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
      Mot de passe : ${passwordValue}
      Veuillez modifier votre mot de passe à la première connexion :
      http://localhost:4200/password-oublie
      `
    };


    if (membre.email !== '' && membre.password !== '') {
      this.membreService.addMembre(membre)?.subscribe((_resp) => {
        this.mailService.envoiMailText(mail)?.subscribe((respMail) =>{
          return respMail
        })
        this.router.navigate(['compte']);
      });
    } else {
      this.alert={"type":"danger", "content":"Le membre n'a pas été rajouté"};
      this.isShow = true;
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
