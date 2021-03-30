import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { BidsEntity } from './bids.models';
import { BidsEffects } from './bids.effects';
import { BidsFacade } from './bids.facade';

import * as BidsSelectors from './bids.selectors';
import * as BidsActions from './bids.actions';
import { BIDS_FEATURE_KEY, State, initialState, reducer } from './bids.reducer';

interface TestSchema {
  bids: State;
}

describe('BidsFacade', () => {
  let facade: BidsFacade;
  let store: Store<TestSchema>;
  const createBidsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as BidsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(BIDS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([BidsEffects]),
        ],
        providers: [BidsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(BidsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allBids$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allBids$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadBidsSuccess` to manually update list
     */
    it('allBids$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allBids$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          BidsActions.loadBidsSuccess({
            bids: [createBidsEntity('AAA'), createBidsEntity('BBB')],
          })
        );

        list = await readFirst(facade.allBids$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
