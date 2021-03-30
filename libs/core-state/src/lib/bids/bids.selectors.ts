import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  BIDS_FEATURE_KEY,
  State,
  BidsPartialState,
  bidsAdapter,
} from './bids.reducer';

// Lookup the 'Bids' feature state managed by NgRx
export const getBidsState = createFeatureSelector<BidsPartialState, State>(
  BIDS_FEATURE_KEY
);

const { selectAll, selectEntities } = bidsAdapter.getSelectors();

export const getBidsLoaded = createSelector(
  getBidsState,
  (state: State) => state.loaded
);

export const getBidsError = createSelector(
  getBidsState,
  (state: State) => state.error
);

export const getAllBids = createSelector(getBidsState, (state: State) =>
  selectAll(state)
);

export const getBidsEntities = createSelector(getBidsState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getBidsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getBidsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
