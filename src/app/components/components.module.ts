import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularStickyThingsModule } from '@w11k/angular-sticky-things';
import { Material } from 'src/libs';
import { AvatarComponent } from './avatar/avatar.component';
import { GeneralHeaderComponent } from './general-header/general-header.component';
import { GiftAreaComponent } from './gift-area/gift-area.component';
import { PaletteComponent } from './palette/palette.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';
import { SecondaryHeaderComponent } from './secondary-header/secondary-header.component';
import { UserListComponent } from './user-list/user-list.component';
import { YourItemComponent } from './your-item/your-item.component';
import { UsersComponent } from './users/users.component';
import { DrawComponent } from './draw/draw.component';
import { LikeComponent } from './like/like.component';
import { NgxWheelModule } from 'ngx-wheel';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    YourItemComponent,
    UserListComponent,
    ProfileComponent,
    PaletteComponent,
    GeneralHeaderComponent,
    SecondaryHeaderComponent,
    GiftAreaComponent,
    AvatarComponent,
    UsersComponent,
    DrawComponent,
    LikeComponent,
  ],
  imports: [
    CommonModule,
    Material,
    ReactiveFormsModule,
    AngularStickyThingsModule,
    NgxWheelModule,
  ],
  exports: [
    ProductComponent,
    ProductListComponent,
    YourItemComponent,
    UserListComponent,
    ProfileComponent,
    PaletteComponent,
    GeneralHeaderComponent,
    SecondaryHeaderComponent,
    GiftAreaComponent,
    AvatarComponent,
    UsersComponent,
    DrawComponent,
    LikeComponent,
  ],
})
export class ComponentsModule {}
