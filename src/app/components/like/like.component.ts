import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/services/types';

const getProductLikes = gql`
  query GetNumberOfLikes($productId: String!) {
    getNumberOfLikes(productId: $productId)
  }
`;
@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss'],
})
export class LikeComponent implements OnInit {
  @Input()
  product: Product;

  @Output()
  productLikeChange = new EventEmitter<Boolean>();

  number_likes: number = 0;
  constructor(private apollo: Apollo, private productService: ProductService) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: getProductLikes,
        variables: { productId: this.product._id },
        pollInterval: 500,
      })
      .valueChanges.subscribe(({ data, loading }): any => {
        //@ts-ignore
        this.number_likes = data.getNumberOfLikes;
      });
  }

  likeProduct(product: Product) {
    product.liked = !product.liked;
    this.productLikeChange.emit(!this.product.liked);
    const username = localStorage.getItem('username');
    this.productService
      .likeProduct(username, this.product._id, this.product.liked)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
