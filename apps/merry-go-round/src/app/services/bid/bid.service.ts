import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Apollo, gql, QueryRef, Subscription } from 'apollo-angular';
import { Bid } from '@merry-go-round/types';

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

const getEveryBidQuery = gql`
  query GetEveryBid {
    getEveryBid {
      _id
      productId
      tickets
      submitted
      user
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
  getEveryBid(): QueryRef<any> {
    return this.apollo.watchQuery({
      query: getEveryBidQuery,
    });
  }
  subToBids() {}
  makeBid(bid: Bid) {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken();
    bid.user = localStorage.getItem('username');
    return this.apollo.mutate({
      mutation: gql`
        mutation MakeBid($bid: BidInput!) {
          makeBid(bid: $bid) {
            _id
            productId
            tickets
            user
            prev_value
            submitted
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
        query GetUserBids($username: String!) {
          getUserBids(username: $username) {
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
        query GetProductBids($productId: String!) {
          getProductBids(productId: $productId) {
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
