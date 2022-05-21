import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenService } from '../authen.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  errors: string = '';
  constructor(public _Router: Router, public __authenservice: AuthenService) {}

  registerForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    last_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    age: new FormControl(null, [
      Validators.required,
      Validators.min(15),
      Validators.max(80),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{2,16}$/),
    ]),
  });

  registeration(registerForm: FormGroup) {
    if (registerForm.valid == true) {
      this.__authenservice.postApi(registerForm.value).subscribe((response) => {
        if (response.message == 'success') {
          this._Router.navigate(['login']);
        } else {
          this.errors = response.errors.email.message;
        }
      });
    }
  }

  ngOnInit() {}
}
