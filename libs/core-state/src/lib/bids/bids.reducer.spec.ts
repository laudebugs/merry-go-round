import { BidsEntity } from './bids.models';
import * as BidsActions from './bids.actions';
import { State, initialState, reducer } from './bids.reducer';

describe('Bids Reducer', () => {
  const createBidsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as BidsEntity);

  beforeEach(() => {});

  describe('valid Bids actions', () => {
    it('loadBidsSuccess should return set the list of known Bids', () => {
      const bids = [
        createBidsEntity('PRODUCT-AAA'),
        createBidsEntity('PRODUCT-zzz'),
      ];
      const action = BidsActions.loadBidsSuccess({ bids });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
