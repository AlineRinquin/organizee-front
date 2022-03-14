import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MembreService } from 'src/app/services/membre.service';
import { TokenService } from 'src/app/services/token.service';
import { MailService } from 'src/app/services/mail.service';
import { Component, OnInit } from '@angular/core';
import { Mail } from 'src/app/models/mail';

@Component({
  selector: 'app-page-support',
  templateUrl: './page-support.component.html',
  styleUrls: ['./page-support.component.scss']
})
export class PageSupportComponent implements OnInit {
  public contactForm: FormGroup;
  memberName: any;
  alert: any;
  isShow: boolean;
expName: any;
expMail: any;


  constructor(private membreService: MembreService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private mailService: MailService,
  ) {
    this.contactForm = new FormGroup({});
    this.alert = "";
    this.isShow = false;
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group(
      {
        lastNameFc: new FormControl('', [Validators.required]),
        emailFc: new FormControl('', [Validators.required]),
        messageFc: new FormControl('', [Validators.required]),
      }
    );
    this.membreService.getMembreId(this.tokenService.getCurrentMembreId()).subscribe((result) => {
      this.memberName = result;
      this.expName = this.memberName.nom;
      this.expMail = this.memberName.email;
    })
  }

  public onSubmit(): void {
    const nomValue = this.contactForm.value['lastNameFc'];
    const emailValue = this.contactForm.value['emailFc'];
    const messageValue = this.contactForm.value['messageFc'];
    console.log(this.contactForm);


    const mail: Mail = {
      recipient: "organizee.contact@gmail.com",
      subject: "Demande de support",
      message: `
      Bonjour!\n
      Nouveau message d'un utilisateur du site\n
      Nom : ${nomValue} \n
      Email : ${emailValue} \n
      Message : ${messageValue} \n `
    };
    this.mailService.envoiMailText(mail)?.subscribe((respMail) => {
      console.log("Mail envoyé");
      this.alert = { "type": "success", "content": "Votre message a été envoyé" };
      this.isShow = true;
    })
  }

  onDeleteMail() {
    console.log("Formulaire effacé");
    location.reload();
    this.alert = { "type": "danger", "content": "Réinitialisation en cours" };
    this.isShow = true;
  }

  onClickCloseAlert() {
    this.isShow = !this.isShow;
  }


}