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
  selector: 'app-page-ajout-contact',
  templateUrl: './page-ajout-contact.component.html',
  styleUrls: ['./page-ajout-contact.component.scss'],
})
export class PageAjoutContactComponent implements OnInit {
  public ajoutContactForm: FormGroup;

  constructor(
    private repertoireService: RepertoireService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.ajoutContactForm = new FormGroup({});
  }

  ngOnInit(): void {
    // *********************************pensser à changer group car déprécié********************************
    this.ajoutContactForm = this.fb.group({
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

  public onSubmit(): void {
    console.log('value : ', this.ajoutContactForm.value);
    console.log('form : ', this.ajoutContactForm);
    const firstNameValue = this.ajoutContactForm.value['firstNameFc'];
    const lastNameValue = this.ajoutContactForm.value['lastNameFc'];
    const telephoneValue = this.ajoutContactForm.value['telephoneFc'];
    const emailValue = this.ajoutContactForm.value['emailFc'];
    const dateNaissanceValue = this.ajoutContactForm.value['dateNaissanceFc'];
    const adresseValue = this.ajoutContactForm.value['adresseFc'];

    const contact: Contact = {
      id: '',
      nom: lastNameValue,
      prenom: firstNameValue,
      telephone: telephoneValue,
      email: emailValue,
      dateNaissance: dateNaissanceValue,
      adresse: adresseValue,
      team: { id: '1' }, // changer l'id quand la personne est logé => recuperer l'id de la team du membre
    };

    if (contact.nom !== '') {
      this.repertoireService.addContact(contact).subscribe((resp) => {
        this.router.navigate(['repertoire/']);
      });
    } else {
      // affichage erreur
    }
  }
}
