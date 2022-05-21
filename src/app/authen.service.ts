import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenService {
  constructor(public _Httpclient: HttpClient, public _Router: Router) {
    if (localStorage.getItem('userData') != null) {
      this.saveData();
    }
  }
  user = new BehaviorSubject(null);
  saveData(): void {
    let userDecode = JSON.stringify(localStorage.getItem('userData'));
    this.user.next(jwtDecode(userDecode));
  }

  postApi(registerList: object): Observable<any> {
    return this._Httpclient.post(
      'https://routeegypt.herokuapp.com/signup',
      registerList
    );
  }
  signIn(SignForm: Object): Observable<any> {
    return this._Httpclient.post(
      'https://routeegypt.herokuapp.com/signin',
      SignForm
    );
  }
  logout(): void {
    localStorage.removeItem('userData');
    this.user.next(null);
    this._Router.navigate(['/login']);
  }
}
