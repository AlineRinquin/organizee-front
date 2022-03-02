import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Membre } from 'src/app/models/membre';
import { MailService } from 'src/app/services/mail.service';
import { Mail } from 'src/app/models/mail';

@Component({
  selector: 'app-page-forgot-password',
  templateUrl: './page-forgot-password.component.html',
  styleUrls: ['./page-forgot-password.component.scss']
})
export class PageForgotPasswordComponent implements OnInit {

  alert : any;
  isShow : boolean;

  constructor(private authService: AuthService, private router: Router, private mailService: MailService,) {
    this.alert = "";
    this.isShow = false;
  }

  ngOnInit(): void {}

    public onSubmit(submittedForm: any): void {
      const membre: Membre = {
        nom: "",
        prenom: "",
        dateNaissance: new Date(),
        email: submittedForm.form.value.email,
        password: "",
        roleList: ["ROLE_PARENT"],
        couleur: "",
        passwordConfirm: ""
      };

    console.log(membre);


    this.authService.forgotPassword(membre).subscribe(
      {
        next: result => {
          this.alert={"type":"success", "content":"Un mail à été envoyé !"};
          this.isShow = true;
          const mail: Mail = {
            recipient: submittedForm.form.value.email,
            subject: "Votre mot de passe Organizee",
            //message: 'Votre mot de passe'
            message: `
            Bonjour!\n
            Vous avez fait une demande de ré-initialisation de mot de passe. \n
            Cliquez sur le lien pour définir un nouveau mot de passe: \n
            Lien  : http://192.168.1.16:4200/reinitialisation-password/${result}`
          };
          this.mailService.envoiMailText(mail)?.subscribe((respMail) =>{
            console.log("Mail envoyé");
          })
        },
        error: err => {
          this.alert={"type":"danger", "content":"Le mail a merdé, ou il n'y a personne ds la bdd !"};
          this.isShow = true;
        },
        complete: () => console.log('DONE!')
      }
    );





    // service resetpassword
    // creer un random et le mettre dans password
    //service envoi de mail // envoyer un lien avec ce random
    // nouveau formulaire de reset password
    // update du password



    // const email = submittedForm.form.value['email'];
    // console.log(email);
      //window.alert("Vous allez recevoir un email pour re-initialiser votre mot de passe !")
      // this.router.navigate(['reinitialisation-password']);

  }
  }

