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
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  public errorForm: boolean;
  constructor(private authService: AuthService, private router: Router) {
    this.errorForm = false;
  }

  ngOnInit(): void {}

  public onSubmit(submittedForm: any): void {
    console.log(submittedForm.form.value);
    const email = submittedForm.form.value['email'];
    const password = submittedForm.form.value['password'];
    if (email !== '' && password !== '') {
      this.authService.signin(email, password).subscribe((resp) => {
        console.log('Component Signin: ', resp);
        this.router.navigate(['tableau-de-bord']);
      });
    } else {
      // afficher une erreur à l'utilisateur
      this.errorForm = true;
    }
  }
}
