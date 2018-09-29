import listunspentFactory from '../listunspent';

describe('utils/barter-dex-api/listunspent', () => {
  it('should handle the listunspent correctly', () => {
    const state = {
      userpass: null
    };
    const coin = 'BEER';
    const outputs = [{ RL1XYoxbKaETGSqiS4po3pk1ZjRYqHBqvc: 1 }];
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          coin,
          outputs,
          method: 'listunspent'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, listunspentFactory(state));
    api.listunspent({
      coin,
      outputs
    });
  });
});
