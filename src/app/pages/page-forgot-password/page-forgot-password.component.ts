import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
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
  isLoading : boolean;

  constructor(private authService: AuthService, private router: Router, private mailService: MailService,) {
    this.alert = "";
    this.isShow = false;
    this.isLoading = false;
  }

  ngOnInit(): void {}

    public onSubmit(submittedForm: any): void {
      const membre: Membre = {
        id: "",
        nom: "",
        prenom: "",
        dateNaissance: new Date(),
        email: submittedForm.form.value.email,
        password: "",
        roleList: ["ROLE_PARENT"],
        couleur: "",
        passwordConfirm: ""
      };

    //console.log(membre);


    this.authService.forgotPassword(membre).subscribe(
      {
        next: result => {
          const mail: Mail = {
            recipient: submittedForm.form.value.email,
            subject: "Votre mot de passe Organizee",
            message: `
            Bonjour!\n
            Vous avez fait une demande de ré-initialisation de mot de passe. \n
            Cliquez sur le lien pour définir un nouveau mot de passe: \n
            Lien  : http://localhost:4200/reinitialisation-password/${result}`
          };
          this.isLoading = true;
          this.mailService.envoiMailText(mail).subscribe(
            {
              next: respMail => {
                //console.log("Mail envoyé");
                this.alert={"type":"success", "content":"Le mail à été envoyé !"};
                this.isShow = true;  
                this.isLoading = false;            
              },
              error: err => {
                this.alert={"type":"danger", "content":"Echec lors de l'envoi de mail"};
                this.isShow = true;
                this.isLoading = false;            
              },
              complete: () => console.log('DONE!')
          })
        },
        error: err => {
          this.alert={"type":"danger", "content":"Votre email est erroné"};
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

