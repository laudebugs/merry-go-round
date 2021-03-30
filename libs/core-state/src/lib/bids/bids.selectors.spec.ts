import { BidsEntity } from './bids.models';
import { State, bidsAdapter, initialState } from './bids.reducer';
import * as BidsSelectors from './bids.selectors';

describe('Bids Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getBidsId = (it) => it['id'];
  const createBidsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as BidsEntity);

  let state;

  beforeEach(() => {
    state = {
      bids: bidsAdapter.setAll(
        [
          createBidsEntity('PRODUCT-AAA'),
          createBidsEntity('PRODUCT-BBB'),
          createBidsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Bids Selectors', () => {
    it('getAllBids() should return the list of Bids', () => {
      const results = BidsSelectors.getAllBids(state);
      const selId = getBidsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = BidsSelectors.getSelected(state);
      const selId = getBidsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getBidsLoaded() should return the current 'loaded' status", () => {
      const result = BidsSelectors.getBidsLoaded(state);

      expect(result).toBe(true);
    });

    it("getBidsError() should return the current 'error' state", () => {
      const result = BidsSelectors.getBidsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
