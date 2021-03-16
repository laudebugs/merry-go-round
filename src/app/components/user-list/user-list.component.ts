import { Component, Input, OnInit } from '@angular/core';
import { Bid, Product } from 'src/app/services/types';
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
    // console.log(avatars);
    // console.log(this.avatar);
    return this.avatar;
  }
}
