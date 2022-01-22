import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private repertoireService: RepertoireService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.modifContactForm = new FormGroup({});
    this.contactInfo = this.initForm();

    // this.repertoireService.getContactById()?.subscribe((contact: Contact) => {
    //   this.contactInfo = this.initForm(contact);
    // });
  }

  ngOnInit(): void {
    // *********************************pensser a changer group car déprécié********************************
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

  public onSubmit(): void {
    console.log('value : ', this.modifContactForm.value);
    console.log('form : ', this.modifContactForm);
    const firstNameValue = this.modifContactForm.value['firstNameFc'];
    const lastNameValue = this.modifContactForm.value['lastNameFc'];
    const telephoneValue = this.modifContactForm.value['telephoneFc'];
    const emailValue = this.modifContactForm.value['emailFc'];
    const dateNaissanceValue = this.modifContactForm.value['dateNaissanceFc'];
    const adresseValue = this.modifContactForm.value['adresseFc'];

    const contact: Contact = {
      nom: lastNameValue,
      prenom: firstNameValue,
      telephone: telephoneValue,
      email: emailValue,
      dateNaissance: dateNaissanceValue,
      adresse: adresseValue,
    };

    if (contact.nom !== '') {
      this.repertoireService.updateContact(contact).subscribe((resp) => {
        this.router.navigate(['repertoire/']);
      });
    } else {
      // affichage erreur
    }
  }
}
