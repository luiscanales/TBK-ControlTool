import { Component, OnInit } from '@angular/core';
import { UserslistService } from '../userslist.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css'],
  providers: [UserslistComponent]
})
export class UserslistComponent implements OnInit {

  constructor(private userListService: UserslistService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userListService.getUsers()
      .subscribe(res => {
        this.userListService.users = res as User[];
        console.log(res);
      });
  }

  editUser(user: User) {
    this.userListService.selectedUser = user;
  }

  deleteUser(_id: string){
    this.userListService.deleteUser(_id)
      .subscribe(res => {
        this.getUsers();
      });
  }

}
