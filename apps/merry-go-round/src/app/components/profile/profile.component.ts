import { Component, OnInit } from '@angular/core';
import { avatars } from '../avatar/avatars';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  imageUrl: string =
    'https://i1.wp.com/www.vimmagazinemsu.com/wp-content/uploads/2019/11/Shuri-and-Afrofuturism-Featured.jpg?w=750&ssl=1';
  constructor() {}

  ngOnInit(): void {}

  getAvatar() {
    let avatarIndx = localStorage.getItem('avatar');

    return avatars[avatarIndx];
  }

  getUsername() {
    let username = localStorage.getItem('username');
    return username;
  }

  getEmail() {
    let email = localStorage.getItem('email');
    return email;
  }
}
