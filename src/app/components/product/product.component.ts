import { ProductListComponent } from './../product-list/product-list.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../services/types';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ProductListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  ngOnInit(): void {}

  // submit a bid
  submit() {
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
