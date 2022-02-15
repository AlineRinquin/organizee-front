import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../../models/contact';
import { RepertoireService } from '../../services/repertoire.service';

@Component({
  selector: 'app-page-modifier-contact',
  templateUrl: './page-modifier-contact.component.html',
  styleUrls: ['./page-modifier-contact.component.scss'],
})
export class PageModifierContactComponent implements OnInit {
  public modifContactForm: FormGroup;
  public contactInfo: FormGroup;
  public listContactInfo: any;
  public personneid: any;

  constructor(
    private repertoireService: RepertoireService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.modifContactForm = new FormGroup({});
    this.contactInfo = this.initForm();
    this.listContactInfo = '';
  }

  ngOnInit(): void {
    this.personneid = this.route.snapshot.paramMap.get('id'); // récupère l'id du contact à modifier
    console.log(this.personneid);

    this.repertoireService
      .getContactById(this.personneid)
      .subscribe((listContactInfo: any) => {
        console.log(listContactInfo);
        this.listContactInfo = listContactInfo;
      });

    // *********************************pensser à changer group car déprécié********************************
    this.modifContactForm = this.fb.group({
      lastNameFc: new FormControl('', [Validators.required]),
      firstNameFc: new FormControl('', [Validators.required]),
      telephoneFc: new FormControl('', [Validators.required]),
      emailFc: new FormControl('', [
        Validators.email,
        Validators.required,
        Validators.pattern(/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/gim),
      ]), // chercher une meilleure regex
      dateNaissanceFc: new FormControl('', [Validators.required]),
      adresseFc: new FormControl('', [Validators.required]),
    });
  }

  //Méthode qui initialise les champs du formulaire avec les infos de la BDD
  private initForm(contact?: Contact): FormGroup {
    return this.fb.group({
      firstName: [contact ? contact.nom : ''],
      lastName: [contact ? contact.prenom : ''],
      telephone: [contact ? contact.telephone : ''],
      email: [contact ? contact.email : ''],
      dateNaissance: [contact ? contact.dateNaissance : ''],
      adresse: [contact ? contact.adresse : ''],
    });
  }

  //Méthode qui envoie les champs modifiés pour mise à jour
  public onSubmit(): void {
    const couleurValue = this.modifContactForm.value['couleurFc'];
    const firstNameValue = this.modifContactForm.value['firstNameFc'];
    const lastNameValue = this.modifContactForm.value['lastNameFc'];
    const telephoneValue = this.modifContactForm.value['telephoneFc'];
    const emailValue = this.modifContactForm.value['emailFc'];
    const dateNaissanceValue = this.modifContactForm.value['dateNaissanceFc'];
    const adresseValue = this.modifContactForm.value['adresseFc'];

    const contact: Contact = {
      id: this.personneid,
      couleur: couleurValue,
      nom: lastNameValue,
      prenom: firstNameValue,
      telephone: telephoneValue,
      email: emailValue,
      dateNaissance: dateNaissanceValue,
      adresse: adresseValue,
      team: { id: this.listContactInfo.team.id },
    };

    this.repertoireService.updateContact(contact).subscribe((resp) => {
      this.router.navigate(['repertoire/']);
    });
  }
}
