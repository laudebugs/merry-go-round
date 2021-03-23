import { AuthService } from 'src/app/services/auth/auth.service';
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
      prev_value
      submitted
      user
      _id
    }
  }
`;

const BIDS_SUBSCRIPTION = gql`
  subscription BidAdded {
    bidAdded {
      _id
      productId
      tickets
      user
      prev_value
      submitted
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
  userBids: Bid[] = [];

  @Output()
  allBids: Bid[] = [];

  @Output()
  allBidsChange = new EventEmitter<Bid[]>();

  @Output()
  tickets: number = 0;

  @Output()
  ticketsChange = new EventEmitter<number>();

  @Output()
  bidsChange = new EventEmitter<Bid[]>();

  @Output()
  productsChange = new EventEmitter<Product[]>();

  constructor(
    private productService: ProductService,
    private bidService: BidService,
    private authService: AuthService,
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

      // get the user's bids
      this.getUserBids();

      // get all bids
      this.getAllBids();

      // get user tickets
      this.getUserTickets();
    });

    this.ticketsChange.emit(this.tickets);
    this.bidsChange.emit(
      this.userBids
        .filter((bid) => bid.tickets === bid.submitted && bid.submitted > 0)
        .sort((a, b) => b.tickets - a.tickets)
    );

    this.subscribeToNewBids();
  }

  getUserTickets() {
    const getUserQuery = gql`
      query GetUser($email: String!) {
        getUser(email: $email) {
          username
          email
          avatar
          tickets
          totalTickets
        }
      }
    `;
    this.apollo
      .watchQuery({
        query: getUserQuery,
        variables: { email: localStorage.getItem('email') },
        pollInterval: 500,
      })
      .valueChanges.subscribe(({ data, loading }: any) => {
        let user = data.getUser;
        console.log(user);
        this.tickets = user.tickets;
        this.ticketsChange.emit(this.tickets);
      });
  }
  getUserBids() {
    const username = localStorage.getItem('username');
    this.bidService
      .getUserBids(username)
      .valueChanges.subscribe((result: any) => {
        const bids = result.data.getUserBids;
        const userBids = bids.map((bid) => {
          let thisBid = new Bid(
            bid.productId,
            bid.tickets,
            bid.user,
            bid._id,
            bid.prev_value
          );
          thisBid.submitted = bid.tickets;
          return thisBid;
        });
        this.userBids = userBids;
        this.bidsChange.emit(this.userBids);
      });
  }
  getAllBids() {
    this.bidsQuery.valueChanges.subscribe((data: any) => {
      let recentbids: Bid | any = data.data.getAllBids;
      this.allBids = [...recentbids];

      // Calculate the average and total bids for all the products
      this.allBids.map((bid: Bid) => {
        // loop through all the products:
        this.products.map((product) => {
          this.calcProdStats(product._id, 1);
        });
        this.allBidsChange.emit(this.allBids.filter((bid) => bid.tickets > 0));
      });
    });
  }
  subscribeToNewBids() {
    this.bidsQuery.subscribeToMore({
      document: BIDS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const newBid = subscriptionData.data.bidAdded;
        let oldBid = this.allBids.find((bid) => bid._id === newBid[0]._id);
        // if you find the old bid, replace it with the new bid.
        let state = 0;
        if (!!oldBid) {
          const index = this.allBids.indexOf(oldBid);
          this.allBids[index] = newBid[0];
          state = 1;
        } else {
          this.allBids = [...this.allBids, ...newBid];
        }
        console.log(this.allBids.filter((bid) => bid.tickets > 0));
        this.allBidsChange.emit(this.allBids.filter((bid) => bid.tickets > 0));
        this.calcProdStats(newBid[0].productId, state);
        return prev;
      },
    });
  }

  calcProdStats(productId: String, state: number) {
    let thisProduct = this.products.find((prod) => prod._id === productId);

    // find all the bids for this product.
    let validBids = this.allBids.filter((b: any) => b.productId == productId);
    let totalBids = 0;
    let totalTickets = 0;

    validBids.map((bid) => {
      if (bid.tickets > 0) {
        // If the bid existed before -- then dont add it to the totalBids

        totalBids += 1;
        totalTickets += bid.tickets;
      }
    });

    let ave = totalTickets / totalBids;
    thisProduct.ave_bid = ave;
    thisProduct.number_bids = totalBids;
    thisProduct.total_tickets = totalTickets;
    this.allBidsChange.emit(this.allBids.filter((bid) => bid.tickets > 0));
  }

  updateBidTickets(product: Product, choice: number) {
    let bid = this.userBids.find((bid) => bid.productId === product._id);
    switch (choice) {
      case 1:
        // If the bid was not previously made
        if (this.tickets > 0) {
          if (!bid) {
            bid = new Bid(product._id, 1, localStorage.getItem('username'));
            this.userBids.push(bid);
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
    let bid = this.userBids.find((bid) => bid.productId === _id);

    // it's not always makeBid, if the bid already exists, change the bid
    this.bidService.makeBid(bid).subscribe((data) => {
      //@ts-ignore
      let bid = data.data.makeBid;
      if (!bid) return;
      let thisBid = this.userBids.find((b) => b.productId === bid.productId);
      thisBid.submitted = bid.tickets;
      thisBid._id = bid._id;
      this.bidsChange.emit(
        this.userBids
          .filter((bid) => bid.tickets === bid.submitted && bid.submitted > 0)
          .sort((a, b) => b.tickets - a.tickets)
      );
    });
  }

  getProductBids(productId: string) {
    let bid = this.userBids.find((bid) => bid.productId === productId);
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
    let bid = this.userBids.find((bid) => bid.productId === productId);
    if (!bid) {
      return false;
    } else {
      return bid.submitted === bid.tickets && bid.tickets !== 0;
    }
  }
  getBidStatus(productId: string) {
    let bid = this.userBids.find((bid) => bid.productId === productId);
    if (!bid) {
      return false;
    } else {
      return !(bid.submitted === bid.tickets);
    }
  }
  likeProduct(product: Product) {
    product.liked = !product.liked;
  }
}
