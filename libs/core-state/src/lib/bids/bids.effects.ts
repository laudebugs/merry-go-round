import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as BidsFeature from './bids.reducer';
import * as BidsActions from './bids.actions';

@Injectable()
export class BidsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BidsActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return BidsActions.loadBidsSuccess({ bids: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return BidsActions.loadBidsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
