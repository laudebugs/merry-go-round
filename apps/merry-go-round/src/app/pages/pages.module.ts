import { NgxWheelModule } from 'ngx-wheel';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { AngularStickyThingsModule } from '@w11k/angular-sticky-things';
import { AuthService } from '../services/auth/auth.service';
import { BidService } from '../services/bid/bid.service';
import { GraphQLModule } from '../services/graphql/graphql.module';
import { ProductService } from '../services/product/product.service';
import { AdminComponent } from './admin/admin.component';
@NgModule({
  declarations: [AdminComponent],
  providers: [AuthService, ProductService, BidService],
  imports: [
    CommonModule,
    GraphQLModule,
    AngularStickyThingsModule,
    NgxWheelModule,
  ],
  exports: [GraphQLModule, NgxWheelModule],
})
export class PagesModule {}
