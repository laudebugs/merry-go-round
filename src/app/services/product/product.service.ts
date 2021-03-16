import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apollo: Apollo) {}

  getProducts() {
    return this.apollo.watchQuery({
      query: gql`
        query GetProducts {
          getProducts {
            _id
            name
            description
            photo
            owner
          }
        }
      `,
    });
  }

  award(productId: string, username: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation: Award($productId: String, $username: String){
          award(productId: $productId, username: $username){
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
}
