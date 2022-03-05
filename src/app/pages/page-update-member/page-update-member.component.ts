import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Membre } from 'src/app/models/membre';
import { MembreService } from 'src/app/services/membre.service';

@Component({
  selector: 'app-page-update-member',
  templateUrl: './page-update-member.component.html',
  styleUrls: ['./page-update-member.component.scss']
})
export class PageUpdateMemberComponent implements OnInit {
  public updateMembreForm: FormGroup;
  public membreData: FormGroup;
  public membreInfos: any;
  public membreId: any;


  constructor(private membreService: MembreService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute) {
    this.updateMembreForm = new FormGroup({});
    this.membreData = this.initForm();
    this.membreInfos = '';
   }

  ngOnInit(): void {
    /** Pour récuperer l'id du membre à modifier **/
    this.membreId = this.route.snapshot.paramMap.get('id');

    /** Appel Api **/
    this.membreService
      .getMembreId(this.membreId)
      .subscribe((membreInfos: any) => {
        this.membreInfos = membreInfos;
      });

    /** group est déprécié mais pas d'autres solutions sinon revoir la fonction confirmeValidator **/
    this.updateMembreForm = this.fb.group(
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
        ]),
        passwordConfirmFc: new FormControl('', [
          Validators.minLength(8),
        ]),
      },
      {
        validator: this.ConfirmedValidator('passwordFc', 'passwordConfirmFc'),
      }
    )};

  /** Méthode qui initialise les champs du formulaire avec les infos de la BDD **/
  private initForm(membre?: Membre): FormGroup {

    return this.fb.group({
      nom:[membre ? membre.nom : ''],
      prenom: [membre ? membre.prenom : ''],
      email: [membre ? membre.email : ''],
      password: [membre ? membre.password : ''],
      couleur: [membre ? membre.couleur : ''],
      dateNaissance: [membre ? membre.dateNaissance : ''],
      passwordConfirm: [membre ? membre.passwordConfirm : ''],
      roleList: [membre ? membre.roleList : ['']],
    });
  }


  /** Méthode qui envoie les champs modifiés pour mise à jour **/
  public onSubmit(): void {
    const firstNameValue = this.updateMembreForm.value['firstNameFc'];
    const lastNameValue = this.updateMembreForm.value['lastNameFc'];
    const emailValue = this.updateMembreForm.value['emailFc'];
    const passwordValue = this.updateMembreForm.value['passwordFc'];
    const dateNaissanceValue = this.updateMembreForm.value['dateNaissanceFc'];
    const couleurValue = this.updateMembreForm.value['couleurFc'];
    const passwordConfirmValue = this.updateMembreForm.value['passwordConfirmFc'];
    const roleValue = this.updateMembreForm.value['roleFc'];

    const membre: Membre = {
      id: this.membreId,
      nom: lastNameValue,
      prenom: firstNameValue,
      email: emailValue,
      password: passwordValue,
      dateNaissance: dateNaissanceValue,
      couleur: couleurValue,
      passwordConfirm: passwordConfirmValue,
      roleList: [roleValue]
    };

    console.log(membre);

    this.membreService.updateMembre(membre)?.subscribe((resp) => {
      //this.router.navigate(['compte']);
    });
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
