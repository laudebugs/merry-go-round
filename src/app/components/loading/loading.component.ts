import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../services/types';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ProductListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.dialogRef.disableClose;
  }

  ngOnInit(): void {
    let state = this.dialogRef.backdropClick().subscribe((data) => {});
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
