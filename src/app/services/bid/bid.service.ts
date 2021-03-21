import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Apollo, gql, QueryRef, Subscription } from 'apollo-angular';
import { Bid } from '../types';

export class newBidSub extends Subscription {
  BIDS_SUBSCRIPTION = gql`
    subscription BidAdded($productId: String) {
      bidAdded(productId: $productId) {
        productId
        tickets
      }
    }
  `;
}

const getBidsQuery = gql`
  query GetNumberBids($productId: String) {
    getNumberBid(productId: $productId) {
      tickets
    }
  }
`;
@Injectable({
  providedIn: 'root',
})
export class BidService {
  bidsQuery: QueryRef<any>;
  constructor(private apollo: Apollo) {}

  getAllBids(productId: String): QueryRef<any> {
    return this.apollo.watchQuery({
      query: getBidsQuery,
      variables: { productId: productId },
    });
  }

  subToBids() {}
  makeBid(bid: Bid) {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem('token'));
    bid.user = decodedToken.username;
    console.log();
    return this.apollo.mutate({
      mutation: gql`
        mutation MakeBid($bid: BidInput!) {
          makeBid(bid: $bid) {
            _id
            productId
            tickets
            user
          }
        }
      `,
      variables: { bid },
    });
  }

  changeBid(bid: Bid) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ChangeBid($bid: Bid) {
          changeBid(bid: $bid) {
            _id
            productId
            tickets
            user
          }
        }
      `,
      variables: { bid },
    });
  }

  deleteBid(bid: Bid) {
    return this.apollo.mutate({
      mutation: gql`
        mutation deleteBid($bid: Bid) {
          mutation
          deleteBid(bid: $bid) {
            _id
            productId
            tickets
            user
          }
        }
      `,
      variables: { bid },
    });
  }

  getUserBids(username: string) {
    return this.apollo.watchQuery({
      query: gql`
        query GetUserBids($username: String) {
          getUserBid(username: $username) {
            _id
            productId
            tickets
            user
          }
        }
      `,
      variables: { username: username },
    });
  }

  getProductBids(productId: string) {
    return this.apollo.watchQuery({
      query: gql`
        query GetProductBids($productId: String) {
          getProductBid(productId: $productId) {
            _id
            productId
            tickets
            user
          }
        }
      `,
      variables: { productId: productId },
    });
  }

  stopBidding() {}
}
