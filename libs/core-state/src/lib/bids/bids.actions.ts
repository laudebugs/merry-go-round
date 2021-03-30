import { createAction, props } from '@ngrx/store';
import { BidsEntity } from './bids.models';

export const init = createAction('[Bids Page] Init');

export const loadBidsSuccess = createAction(
  '[Bids/API] Load Bids Success',
  props<{ bids: BidsEntity[] }>()
);

export const loadBidsFailure = createAction(
  '[Bids/API] Load Bids Failure',
  props<{ error: any }>()
);
