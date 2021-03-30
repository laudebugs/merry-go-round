import { Component, Input, OnInit } from '@angular/core';
import { Bid, Product, User } from '../../services/types';
import { avatars } from '../avatar/avatars';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @Input()
  bids: Bid[] = [];

  avatar: string = '';
  @Input()
  products: Product[] = [];
  constructor() {}

  ngOnInit(): void {
    this.avatar = avatars[Math.floor(Math.random() * avatars.length)];

    console.log(this.bids);
  }
  getProduct(id: string) {
    return this.products.find((product) => product._id === id);
  }

  getAvatar() {
    let avatarIndx = localStorage.getItem('avatar');

    return avatars[avatarIndx];
  }

  getUsername() {
    let username = localStorage.getItem('username');
    return username;
  }
  getValidBids() {
    return this.bids
      .filter((bid) => bid.tickets > 0 && bid.submitted == bid.tickets)
      .sort((a, b) => b.tickets - a.tickets);
  }
}
