import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './models/user.model';
import { UserslistService } from './userslist.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerURL = "http://localhost:3000/users/register";
  private _loginURL = "http://localhost:3000/auth";

  constructor(private http: HttpClient,
              private _router: Router,
              private userListService: UserslistService) { }

  registerUser(user){
    return this.http.post<any>(this._registerURL, user)
  }

  loginUser(user){
    return this.http.post<any>(this._loginURL, user)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  // getAdmin() {
  //   let subject = localStorage.getItem('token').getSubject()
  //   var _id = this.userListService.getUser(subject)
  //   var cargo = _id.position
  //   return ("Administrador" === cargo)
  // }

  getToken(){
    return localStorage.getItem('token')
  }

  logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }
}
