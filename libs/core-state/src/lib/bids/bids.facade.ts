import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as BidsActions from './bids.actions';
import * as BidsFeature from './bids.reducer';
import * as BidsSelectors from './bids.selectors';

@Injectable()
export class BidsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(BidsSelectors.getBidsLoaded));
  allBids$ = this.store.pipe(select(BidsSelectors.getAllBids));
  selectedBids$ = this.store.pipe(select(BidsSelectors.getSelected));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(BidsActions.init());
  }
}
