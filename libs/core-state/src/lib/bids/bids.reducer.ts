import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as BidsActions from './bids.actions';
import { BidsEntity } from './bids.models';

export const BIDS_FEATURE_KEY = 'bids';

export interface State extends EntityState<BidsEntity> {
  selectedId?: string | number; // which Bids record has been selected
  loaded: boolean; // has the Bids list been loaded
  error?: string | null; // last known error (if any)
}

export interface BidsPartialState {
  readonly [BIDS_FEATURE_KEY]: State;
}

export const bidsAdapter: EntityAdapter<BidsEntity> = createEntityAdapter<BidsEntity>();

export const initialState: State = bidsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const bidsReducer = createReducer(
  initialState,
  on(BidsActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(BidsActions.loadBidsSuccess, (state, { bids }) =>
    bidsAdapter.setAll(bids, { ...state, loaded: true })
  ),
  on(BidsActions.loadBidsFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return bidsReducer(state, action);
}
