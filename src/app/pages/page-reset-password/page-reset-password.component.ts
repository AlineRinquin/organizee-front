import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-page-reset-password',
  templateUrl: './page-reset-password.component.html',
  styleUrls: ['./page-reset-password.component.scss']
})
export class PageResetPasswordComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,) { }

  ngOnInit(): void { }

  public onSubmit(submittedForm: any): void {
    console.log(submittedForm.form.value);
    const password = submittedForm.form.value['password'];
    const email = submittedForm.form.value['email'];
    console.log(email);
    this.authService.resetPassword(email, password).subscribe((resp: any) => {
      window.alert("Votre mot de passe est bien ré-initialisé !")
      this.router.navigate(['accueil']);

    });
  }
}
