import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromBids from './bids/bids.reducer';
import { BidsEffects } from './bids/bids.effects';
import { BidsFacade } from './bids/bids.facade';
import * as fromUser from './user/user.reducer';
import { UserEffects } from './user/user.effects';
import { UserFacade } from './user/user.facade';
import * as fromProducts from './products/products.reducer';
import { ProductsEffects } from './products/products.effects';
import { ProductsFacade } from './products/products.facade';
import * as fromStatus from './status/status.reducer';
import { StatusEffects } from './status/status.effects';
import { StatusFacade } from './status/status.facade';

export const coreStateRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(fromBids.BIDS_FEATURE_KEY, fromBids.reducer),
    EffectsModule.forFeature([BidsEffects]),
    StoreModule.forFeature(fromUser.USER_FEATURE_KEY, fromUser.reducer),
    EffectsModule.forFeature([UserEffects]),
    StoreModule.forFeature(
      fromProducts.PRODUCTS_FEATURE_KEY,
      fromProducts.reducer
    ),
    EffectsModule.forFeature([ProductsEffects]),
    StoreModule.forFeature(fromStatus.STATUS_FEATURE_KEY, fromStatus.reducer),
    EffectsModule.forFeature([StatusEffects]),
  ],
  providers: [BidsFacade, UserFacade, ProductsFacade, StatusFacade],
})
export class CoreStateModule {}
