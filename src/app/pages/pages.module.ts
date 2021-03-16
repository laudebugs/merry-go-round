import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { YourItemComponent } from '../components/your-item/your-item.component';
import { AuthService } from '../services/auth/auth.service';
import { BidService } from '../services/bid/bid.service';
import { GraphQLModule } from '../services/graphql/graphql.module';
import { ProductService } from '../services/product/product.service';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';
@NgModule({
  declarations: [YourItemComponent, UsersComponent, AdminComponent],
  providers: [AuthService, ProductService, BidService],
  imports: [CommonModule, GraphQLModule],
  exports: [GraphQLModule],
})
export class PagesModule {}
