import { colors } from './colors';
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
import { emoojis } from './emojis';

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
  items: Item[] = [];
  idToLandOn = 0;

  selectedProduct: Product;
  products: Product[] = [];
  bids: Bid[] = [];
  tickets: Ticket[] = [];
  finalBids: BidMap[] = [];

  // list of users
  userList: string[] = [];
  awardedUsers: string[] = [];
  constructor(
    private productService: ProductService,
    private bidService: BidService
  ) {}

  ngAfterViewInit(): void {
    console.log('only after THIS EVENT "wheel" is usable!!');
    this.getAllProductsAndBids();
  }

  before() {
    console.log('b4');
    console.log(this.items);
  }

  after() {
    console.log('done');

    const winningBid = this.bids.find(
      (bid) => bid._id == this.tickets[this.idToLandOn].bidId
    );
    this.productService
      .award(winningBid.productId, winningBid.user)
      .subscribe((res: any) => {
        let awardedProduct = res.data.award;

        let product = this.products.find(
          (prod) => prod._id == awardedProduct._id
        );
        let indx = this.products.indexOf(product);
        // replace the product with the awarded product.
        this.products[indx] = awardedProduct;

        this.awardedUsers.push(winningBid.user.toLowerCase());

        this.filterAwardedUsers();
      });
  }

  filterAwardedUsers() {
    // Remove, from the list, any bids in the rest of the products of the awarded users.
    this.bids = this.bids.filter((bid) => {
      // returns only bids that are not found within the awarded users
      return this.awardedUsers.indexOf(bid.user.toLowerCase()) == -1;
    });
    console.log('bids: ', this.bids);
    this.finalBids = this.finalBids.map((finalProdBids: BidMap) => {
      return new BidMap(
        finalProdBids.productId,
        finalProdBids.bids.filter((bid) => {
          // returns only bids that are not found within the awarded users
          console.log(this.awardedUsers);
          console.log(bid.user);
          return this.awardedUsers.indexOf(bid.user.toLowerCase()) == -1;
        })
      );
    });
    console.log(this.finalBids);
  }
  checkIfAwarded() {
    if (!this.selectedProduct) return false;
    return !!this.selectedProduct && !!this.selectedProduct.awardee;
  }
  selectMe(product: Product) {
    this.selectedProduct = product;
    let thisBidMap = this.finalBids.find(
      (bidMap) => bidMap.productId === product._id
    );

    let tickets: Ticket[] = [];

    this.items = [];
    this.reset();
    thisBidMap.bids.map((bid: Bid) => {
      for (let i = 0; i < bid.tickets; i++) {
        this.items.push({
          text:
            bid.user +
            ' ' +
            emoojis[Math.floor(Math.random() * emoojis.length)],
          fillStyle: colors[tickets.length % colors.length],
          id: this.items.length,
        });
        this.reset();
        tickets.push(
          new Ticket(
            bid.user +
              ' ' +
              emoojis[Math.floor(Math.random() * emoojis.length)],
            colors[tickets.length % colors.length],
            tickets.length + 1,
            bid._id
          )
        );
        this.reset();
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
          if (!!product.awardee) {
            console.log(product.awardee);
            if (this.awardedUsers.indexOf(product.awardee) === -1) {
              this.awardedUsers.push(product.awardee);
            }
          }
          this.bidService
            .getProductBids(product._id)
            .valueChanges.subscribe((res: any) => {
              const bidMap = new BidMap(product._id, res.data.getProductBids);
              // Add the bids to the list of bids
              this.bids = [...this.bids, ...res.data.getProductBids];
              this.finalBids.push(bidMap);
              this.selectMe(this.products[0]);
              this.reset();
              this.filterAwardedUsers();
              console.log(res.data.productBids);
              this.populateStats(res.data.productBids);
            });
        });
      });
  }

  bid() {
    let randomId = Math.floor(Math.random() * this.tickets.length);
    this.spin(randomId);
  }
  populateStats(bids: Bid[]) {
    this.products = this.products.map((product) => {
      let prodBids = bids.filter((bid) => bid.productId == product._id);
      let total_tickets = 0;
      let uniqueBidders = [];
      for (let i = 0; i < prodBids.length; i++) {
        total_tickets += prodBids[i].tickets;
        if (uniqueBidders.indexOf(prodBids[i].user.toLowerCase()) == -1) {
          uniqueBidders.push(prodBids[i].user.toLowerCase());
        }
      }
      product.total_tickets = total_tickets;
      product.number_bids = uniqueBidders.length;
      return product;
    });
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
