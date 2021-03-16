import { Component, Input, OnInit } from '@angular/core';
import { Bid, Product } from 'src/app/services/types';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @Input()
  bids: Bid[] = [];

  @Input()
  products: Product[] = [];
  constructor() {}

  ngOnInit(): void {
    console.log(this.bids);
  }
  getProduct(id: string) {
    return this.products.find((product) => product._id === id);
  }
}
