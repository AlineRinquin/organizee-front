import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  alert : any;
  isShow : boolean;
  constructor(private authService: AuthService, private router: Router) {
    this.isShow = false;
  }

  ngOnInit(): void {}

  //quand on se connecte - appel au service d'authentification
  public onSubmit(submittedForm: any): void {

    const email = submittedForm.form.value['email'];
    const password = submittedForm.form.value['password'];
    if (email !== '' && password !== '') {
      this.authService.signin(email, password).subscribe(
        {
          next: resp => {
            this.router.navigate(['tableau-de-bord']);
          },
          error: err => { //gestion des alertes si les id/pwd sont faux
            this.alert={"type":"danger", "content":"Le login ou paswword est invalide"};
            this.isShow = true;
          },
          complete: () => console.log('DONE!')
        });
    } else {
      // affiche une erreur à l'utilisateur
      this.alert={"type":"danger", "content":"Le login ou password est invalide"};
      this.isShow = true;
    }
  }

  //fermeture du message d'alerte
  onClickCloseAlert(){
    console.log('fermeture');
    this.isShow = ! this.isShow;
  }
}
