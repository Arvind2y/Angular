import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',

})
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register";
  private _loginUrl = "http://localhost:3000/api/login";

  constructor(private _httpClient: HttpClient, private _router: Router) { }

  // Register User
  registerUser(user) {
    return this._httpClient.post<any>(this._registerUrl, user);
  }

  //Login user
  loginUser(user) {
    return this._httpClient.post<any>(this._loginUrl, user);
  }

  loggedIn() {
    //console.log(this.getToken());
    return !!this.getToken();
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/events']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
