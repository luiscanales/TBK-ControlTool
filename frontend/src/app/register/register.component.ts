import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {}

  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
  }

  registerUser(){
    // console.log(this.registerUserData)
    this._auth.registerUser(this.registerUserData)
      .subscribe(
        res => {
          console.log(res),
          localStorage.setItem('token', res.token)
          this._router.navigate(['/successfully'])
        },
        err => {
          if (err instanceof HttpErrorResponse){
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
  }
}