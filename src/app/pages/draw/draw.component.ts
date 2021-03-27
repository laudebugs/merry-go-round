import { Apollo, QueryRef } from 'apollo-angular';
import { AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import {
  Item,
  NgxWheelComponent,
  TextAlignment,
  TextOrientation,
} from 'ngx-wheel';
import { BidService } from 'src/app/services/bid/bid.service';
import { ProductService } from 'src/app/services/product/product.service';
import { Product, Bid } from 'src/app/services/types';

@Component({
  selector: 'draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss'],
})
export class DrawComponent {
  @ViewChild(NgxWheelComponent, { static: false }) wheel;
  textAlignment: TextAlignment;
  textOrientation: TextOrientation;

  spinDuration: number = 8;
  items: Item[] = [{ text: 'Join', id: 0, fillStyle: '#D4C1EC' }];
  idToLandOn = 0;

  selectedProduct: Product;
  products: Product[] = [];
  bids: Bid[] = [];
  tickets: Ticket[] = [];
  finalBids: BidMap[] = [];
  constructor(
    private productService: ProductService,
    private bidService: BidService
  ) {}

  ngAfterViewInit(): void {
    this.getAllProductsAndBids();
    console.log('only after THIS EVENT "wheel" is usable!!');
    // Call the spin function whenever and wherever you want after the AfterViewInit Event
    // this.wheel.spin();
  }

  before() {
    console.log('b4');
    console.log(this.items);
  }

  after() {
    console.log('done');
  }

  selectMe(product: Product) {
    this.reset();

    this.selectedProduct = product;
    let thisBidMap = this.finalBids.find(
      (bidMap) => bidMap.productId === product._id
    );

    let tickets: Ticket[] = [];

    this.items = [];
    thisBidMap.bids.map((bid: Bid) => {
      for (let i = 0; i < bid.tickets; i++) {
        this.items.push({
          text: bid.user,
          fillStyle: '#EEABC4',
          id: this.items.length,
        });
        tickets.push(
          new Ticket(bid.user, '#690375', tickets.length + 1, bid._id)
        );
      }
    });

    this.tickets = tickets;
    this.reset();
  }
  reset() {
    // Reset allows you to redraw the wheel
    // Use it after any change to wheel configurations or to allow re-spinning
    this.wheel.reset();
  }
  async spin(prize) {
    this.idToLandOn = prize;
    await new Promise((resolve) => setTimeout(resolve, 0)); // Wait here for one tick
    this.wheel.spin();
  }
  getAllProductsAndBids() {
    this.productService
      .getProducts()
      .valueChanges.subscribe(({ data, loading }: any) => {
        this.products = data.getProducts;
        this.products.map((product) => {
          console.log(product);
          this.bidService
            .getProductBids(product._id)
            .valueChanges.subscribe((res: any) => {
              console.log(res);
              const bidMap = new BidMap(product._id, res.data.getProductBids);
              console.log(bidMap);
              this.finalBids.push(bidMap);
              this.items = this.tickets;
            });
        });
      });
  }

  bid() {
    let randomId = Math.floor(Math.random() * this.tickets.length);
    this.spin(randomId);
  }
}

class BidMap {
  constructor(public productId: String, public bids: Bid[]) {}
}

class Ticket implements Item {
  constructor(
    public text: string,
    public fillStyle: string,
    public id: number,
    public bidId: string
  ) {}
}
