import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { BidService } from 'src/app/services/bid/bid.service';
import { ProductService } from 'src/app/services/product/product.service';
import { Bid, Product } from './../../services/types';

const getBidsQuery = gql`
  query GetAllBids {
    getAllBids {
      tickets
      productId
    }
  }
`;

const BIDS_SUBSCRIPTION = gql`
  subscription BidAdded {
    bidAdded {
      productId
      tickets
    }
  }
`;

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  bidsQuery: QueryRef<any>;

  @Output()
  products!: Product[];

  latestProduct;
  @Output()
  bids: Bid[] = [];

  allBids: Bid[] = [];
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
    private bidService: BidService,
    private apollo: Apollo
  ) {
    this.bidsQuery = apollo.watchQuery({
      query: getBidsQuery,
    });
  }

  ngOnInit(): void {
    this.productService.getProducts().valueChanges.subscribe((data: any) => {
      this.products = data.data.getProducts.map((product: Product) => {
        return new Product(
          product._id,
          product.name,
          product.description,
          product.photo,
          product.owner,
          product.bid
        );
      });
      this.productsChange.emit(this.products);
    });

    this.ticketsChange.emit(this.tickets);
    this.bidsChange.emit(
      this.bids
        .filter((bid) => bid.tickets === bid.submitted && bid.submitted > 0)
        .sort((a, b) => b.tickets - a.tickets)
    );
    this.bidsQuery.valueChanges.subscribe((data: any) => {
      let allbids: Bid | any = data.data.getAllBids;
      this.allBids = [...allbids];
      allbids.map((bid: Bid) => {
        this.addProductBid(bid);
      });
    });

    this.subscribeToNewBids();
  }
  addProductBid(bid: Bid) {
    let thisProduct = this.products.find((prod) => prod._id === bid.productId);
    let findBid = this.allBids.find((b) => b._id === bid._id);
    let bids = thisProduct.number_bids;
    let tickets = thisProduct.total_tickets;

    if (bid.tickets > 0) {
      bids += 1;
      tickets += bid.tickets;

      let ave = tickets / bids;

      thisProduct.ave_bid = ave;
      thisProduct.number_bids = bids;
      thisProduct.total_tickets = tickets;
    } else {
      bids = 0;
      let ave = 0;
      let ttl = 0;
      console.log('take away');

      this.allBids
        .filter((bid) => bid.productId === thisProduct._id && bid.tickets > 0)
        .map((bid: Bid) => {
          bids += 1;
          ttl += bid.tickets;
        });

      thisProduct.total_tickets = ttl;
      thisProduct.number_bids = bids;
      thisProduct.ave_bid = ttl / bids;
    }
  }
  subscribeToNewBids() {
    this.bidsQuery.subscribeToMore({
      document: BIDS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const newBid = subscriptionData.data.bidAdded;
        this.addProductBid(newBid[0]);
        this.allBids = [...this.allBids, ...newBid];

        return prev;
      },
    });
  }
  updateBidTickets(product: Product, choice: number) {
    let bid = this.bids.find((bid) => bid.productId === product._id);
    console.log(bid);
    switch (choice) {
      case 1:
        // If the bid was not previously made
        if (this.tickets > 0) {
          if (!bid) {
            bid = new Bid(product._id, 1, 'me');
            this.bids.push(bid);
          } else {
            bid.tickets += 1;
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
    // it's not always makeBid, if the bid already exists, change the bid
    console.log('ici: ', bid);
    this.bidService.makeBid(bid).subscribe((data) => {
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
  }
  likeProduct(product: Product) {
    product.liked = !product.liked;
  }
}
