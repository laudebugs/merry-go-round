import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { BidsEffects } from './bids.effects';
import * as BidsActions from './bids.actions';

describe('BidsEffects', () => {
  let actions: Observable<any>;
  let effects: BidsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        BidsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(BidsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: BidsActions.init() });

      const expected = hot('-a-|', {
        a: BidsActions.loadBidsSuccess({ bids: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
