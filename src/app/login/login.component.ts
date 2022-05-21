import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenService } from '../authen.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public _AuthenService: AuthenService, public _Router: Router) {
    if (localStorage.getItem('userData') != null) {
      this._Router.navigate(['/home']);
    }
  }

  error: string = '';
  loginForms: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{2,16}/),
    ]),
  });

  loginforms(loginForms: FormGroup) {
    if (loginForms.valid == true) {
      this._AuthenService.signIn(loginForms.value).subscribe((response) => {
        if (response.message == 'success') {
          localStorage.setItem('userData', response.token);
          this._AuthenService.saveData();
          this._Router.navigate(['home']);
        } else {
          this.error = response.message;
        }
      });
    }
  }

  ngOnInit(): void {}
}
