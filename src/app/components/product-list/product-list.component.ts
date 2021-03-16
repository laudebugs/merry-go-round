import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BidService } from 'src/app/services/bid/bid.service';
import { ProductService } from 'src/app/services/product/product.service';
import { Bid, Product } from './../../services/types';
@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Output()
  products!: Product[];

  latestProduct;
  @Output()
  bids: Bid[] = [];

  @Output()
  tickets: number = 5;

  @Output()
  ticketsChange = new EventEmitter<number>();

  @Output()
  bidsChange = new EventEmitter<Bid[]>();

  @Output()
  productsChange = new EventEmitter<Product[]>();

  constructor(
    private productService: ProductService,
    private bidService: BidService
  ) {}

  ngOnInit(): void {
    console.log('here');
    this.productService.getProducts().valueChanges.subscribe((data: any) => {
      this.products = data.data.getProducts;
      this.productsChange.emit(this.products);
    });

    this.ticketsChange.emit(this.tickets);
    this.bidsChange.emit(
      this.bids
        .filter((bid) => bid.tickets === bid.submitted && bid.submitted > 0)
        .sort((a, b) => b.tickets - a.tickets)
    );
  }

  updateBidTickets(product: Product, choice: number) {
    let bid = this.bids.find((bid) => bid.productId === product._id);
    switch (choice) {
      case 1:
        // If the bid was not previously made
        if (this.tickets > 0) {
          if (!bid) {
            bid = new Bid(product._id, 1, 'me');
            this.bids.push(bid);
          } else {
            bid.tickets += 1;
            console.log(this.bids);
          }
          this.tickets -= 1;
        }

        break;
      case 0:
        // if (this.tickets > 0) {
        if (bid && bid.tickets > 0) {
          this.tickets += 1;
          bid.tickets -= 1;
        }
        // }

        break;

      default:
        break;
    }
    this.ticketsChange.emit(this.tickets);
  }
  removeTicket(product: Product) {}

  placeBid(_id: string) {
    let bid = this.bids.find((bid) => bid.productId === _id);
    console.log(bid);
    this.bidService.makeBid(bid).subscribe((data) => {
      console.log(data);
      //@ts-ignore
      let bid = data.data.makeBid;
      let thisBid = this.bids.find((b) => b.productId === bid.productId);
      thisBid.submitted = bid.tickets;
      this.bidsChange.emit(
        this.bids
          .filter((bid) => bid.tickets === bid.submitted && bid.submitted > 0)
          .sort((a, b) => b.tickets - a.tickets)
      );
    });
  }

  getProductBids(productId: string) {
    let bid = this.bids.find((bid) => bid.productId === productId);
    if (!bid) {
      return 0;
    } else {
      return bid.tickets;
    }
  }
  updateTickets() {
    this.ticketsChange.emit(this.tickets);
  }

  getStatus(productId: string) {
    let bid = this.bids.find((bid) => bid.productId === productId);
    if (!bid) {
      return false;
    } else {
      return bid.submitted === bid.tickets && bid.tickets !== 0;
    }
    //
  }
}
