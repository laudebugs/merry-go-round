import { Component, OnInit } from '@angular/core';
import { Bid, Product } from 'src/app/services/types';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tickets!: number;
  bids!: Bid[];
  products!: Product[];
  constructor() {}

  ngOnInit(): void {}

  update(event) {
    console.log(event);
  }
}
