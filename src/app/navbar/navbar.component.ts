import { Component, OnInit } from '@angular/core';
import { AuthenService } from '../authen.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  userName: any;
  constructor(private _AuthenServices: AuthenService) {}
  ngOnInit(): void {
    this._AuthenServices.user.subscribe(() => {
      if (this._AuthenServices.user.getValue() != null) {
        this.isLogin = true;
        this.userName = this._AuthenServices.user.getValue();
      } else {
        this.isLogin = false;
      }
    });
  }
  logout(): void {
    this._AuthenServices.logout();
  }
}
