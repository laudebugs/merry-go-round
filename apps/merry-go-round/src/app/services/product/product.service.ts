import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

export const GET_PRODUCTS_QUERY = gql`
  query GetProducts {
    getProducts {
      _id
      name
      description
      photo
      owner
      likes
      awardee
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apollo: Apollo) {}

  getProducts() {
    return this.apollo.watchQuery({
      query: GET_PRODUCTS_QUERY,
    });
  }

  award(productId: string, username: string) {
    console.log(productId);
    return this.apollo.mutate({
      mutation: gql`
        mutation Award($productId: String!, $username: String!) {
          award(productId: $productId, username: $username) {
            _id
            name
            awardee
            photo
            owner
          }
        }
      `,
      variables: { productId: productId, username: username },
    });
  }

  likeProduct(username: string, productId: string, liked: boolean) {
    return this.apollo.mutate({
      mutation: gql`
        mutation LikeProduct(
          $username: String!
          $productId: String!
          $liked: Boolean!
        ) {
          likeProduct(username: $username, productId: $productId, liked: $liked)
        }
      `,
      variables: { username: username, productId: productId, liked: liked },
    });
  }
}
