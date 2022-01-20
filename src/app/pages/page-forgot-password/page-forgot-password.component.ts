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
public errorForm: boolean;
  constructor(private authService: AuthService, private router: Router) {
     this.errorForm = false;
  }

  ngOnInit(): void {}
  public onSubmit(submittedForm: any): void {
    console.log(submittedForm.form.value);
    const email = submittedForm.form.value['email'];
    if (email !== '') {
      this.authService.forgotPassword(email).subscribe((resp) => {
        console.log('Component : PageForgotPassword ', resp);
        this.router.navigate(['reinitialisation-password']);
      });
    } else {
      // afficher une erreur à l'utilisateur
      this.errorForm = true;
    }
  }


}
