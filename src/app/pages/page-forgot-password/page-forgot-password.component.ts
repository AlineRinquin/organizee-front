import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-page-forgot-password',
  templateUrl: './page-forgot-password.component.html',
  styleUrls: ['./page-forgot-password.component.scss']
})
export class PageForgotPasswordComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {}

    public onSubmit(submittedForm: any): void {
    console.log(submittedForm.form.value);

    // const email = submittedForm.form.value['email'];
    // console.log(email);
      window.alert("Vous allez recevoir un email pour re-initialiser votre mot de passe !")
      // this.router.navigate(['reinitialisation-password']);

  }
  }

