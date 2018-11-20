import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserslistService {

  selectedUser: User;
  users: User[];
  readonly URL_API = 'http://localhost:3000/users/';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('http://localhost:3000/users/list');
  }

  editUser(user: User) {
    return this.http.put(this.URL_API + `${user._id}`, user);
  }

  deleteUser(_id: string) {
    return this.http.delete(this.URL_API + `delete/${_id}`);
  }
}
