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
  alert : any;
  isShow : boolean;
  constructor(private authService: AuthService, private router: Router) {
    this.isShow = false;
  }

  ngOnInit(): void {}

  public onSubmit(submittedForm: any): void {
    console.log(submittedForm.form.value);
    const email = submittedForm.form.value['email'];
    const password = submittedForm.form.value['password'];
    if (email !== '' && password !== '') {
      this.authService.signin(email, password).subscribe(
        {
          next: resp => {
            this.router.navigate(['tableau-de-bord']);
          },
          error: err => {
            this.alert={"type":"danger", "content":"Le login ou paswword est invalide"};
            this.isShow = true;
          },
          complete: () => console.log('DONE!')
        });
    } else {
      // afficher une erreur à l'utilisateur
      this.alert={"type":"danger", "content":"Le login ou password est invalide"};
      this.isShow = true;
    }
  }

  onClickCloseAlert(){
    console.log('fermeture');
    this.isShow = ! this.isShow;
  }
}
