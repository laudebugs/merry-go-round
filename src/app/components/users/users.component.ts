import { Component, OnInit } from '@angular/core';
import { gql } from 'apollo-angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/services/types';

const getAllUsers = gql`
  query GetAllUsers {
    getAllUsers {
      username
      email
      avatar
      tickets
    }
  }
`;

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  constructor(private auth: AuthService) {
    auth.getAllUsers().valueChanges.subscribe((res: any) => {
      let users = res.data.getAllUsers;
      console.log(users);
    });
  }

  ngOnInit(): void {}
}
