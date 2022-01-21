import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-reset-password',
  templateUrl: './page-reset-password.component.html',
  styleUrls: ['./page-reset-password.component.scss']
})
export class PageResetPasswordComponent implements OnInit {
  authService: any;
  router: any;

  constructor() { }

  ngOnInit(): void {}

  public onSubmit(submittedForm: any): void {
    console.log(submittedForm.form.value);
  const password = submittedForm.form.value['password'];
  const email = submittedForm.form.value['email'];
  console.log(email);
      this.authService.resetPassword(email, password).subscribe((resp: any) => {
        this.router.navigate(['tableau-de-bord']);

      });
}
}
