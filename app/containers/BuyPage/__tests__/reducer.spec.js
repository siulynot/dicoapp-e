import { fromJS } from 'immutable';
import buyReducer, { initialState } from '../reducer';
import {
  loadPrices,
  loadBuyCoin,
  loadBuyCoinError,
  loadRecentSwapsDataFromWebsocket
  // loadRecentSwapsCoin
} from '../actions';
import {
  WEBSOCKET_STATE_ONE,
  WEBSOCKET_STATE_TWO,
  WEBSOCKET_STATE_THREE,
  WEBSOCKET_STATE_FOUR,
  WEBSOCKET_STATE_FIVE,
  WEBSOCKET_STATE_SIX,
  WEBSOCKET_STATE_SEVEN
} from './fake-data';

describe('containers/BuyPage/reducers/initial', () => {
  it('should return the initial state', () => {
    expect(buyReducer(undefined, {})).toEqual(initialState);
  });
});

describe('containers/BuyPage/reducers/loadPrices', () => {
  it('should handle the loadPrices action correctly', () => {
    const expectedResult = initialState
      .setIn(['prices', 'loading'], true)
      .setIn(['prices', 'error'], false);

    expect(buyReducer(initialState, loadPrices())).toEqual(expectedResult);
  });
});

describe('containers/BuyPage/reducers/loadBuyCoin', () => {
  it('should handle the loadBuyCoin action correctly', () => {
    const expectedResult = initialState
      .setIn(['buying', 'loading'], true)
      .setIn(['buying', 'error'], false);

    expect(
      buyReducer(
        initialState,
        loadBuyCoin({
          basecoin: 'BTC',
          paymentcoin: 'KMD',
          amount: 10.123
        })
      )
    ).toEqual(expectedResult);
  });
});

describe('containers/BuyPage/reducers/loadBuyCoinError', () => {
  it('should handle the loadBuyCoinError action correctly', () => {
    const message = 'Not enough balance!';
    const expectedResult = initialState
      .setIn(['buying', 'loading'], false)
      .setIn(['buying', 'error'], {
        message
      });

    expect(buyReducer(initialState, loadBuyCoinError(message))).toEqual(
      expectedResult
    );
  });
});

describe('containers/BuyPage/reducers/loadRecentSwapsDataFromWebsocket', () => {
  const uuid =
    '89a2cc8d5c071b2b5e28c949573cc2ecd02dc912842e46c9f3e0326ecb739ca3';
  const requestid = 3769478507;
  const quoteid = 1873669175;
  const bob = 'COQUI';
  const alice = 'BEER';

  const store = initialState
    .setIn(['swaps', 'loading'], true)
    .setIn(['swaps', 'list'], fromJS([uuid]))
    .setIn(
      ['swaps', 'entities'],
      fromJS({
        [uuid]: {
          id: 3624682363,
          uuid,
          requestid,
          quoteid,
          expiration: 1536603425,
          bob,
          alice,
          bobamount: 1.99009001,
          aliceamount: 0.96320716,
          sentflags: [],
          status: 'pending'
        }
      })
    );

  it('should handle the loadRecentSwapsDataFromWebsocket action correctly', () => {
    let entities = store.getIn(['swaps', 'entities']);
    let entity = entities.get(uuid);
    entity = entity
      .set('sentflags', fromJS(['myfee']))
      .set('expiration', WEBSOCKET_STATE_ONE.result.expiration);
    let expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    expect(
      buyReducer(
        store,
        loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_ONE.result)
      )
    ).toEqual(expectedResult);

    expect(
      buyReducer(
        store,
        loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_TWO.result)
      )
    ).toEqual(expectedResult);

    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    entity = entity
      .set(
        'sentflags',
        entity.get('sentflags').unshift(WEBSOCKET_STATE_THREE.result.update)
      )
      .set('expiration', WEBSOCKET_STATE_THREE.result.expiration);
    expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    expect(
      buyReducer(
        store,
        loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_THREE.result)
      )
    ).toEqual(expectedResult);

    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    entity = entity
      .set(
        'sentflags',
        entity.get('sentflags').unshift(WEBSOCKET_STATE_FOUR.result.update)
      )
      .set('expiration', WEBSOCKET_STATE_FOUR.result.expiration);
    expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    expect(
      buyReducer(
        store,
        loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_FOUR.result)
      )
    ).toEqual(expectedResult);

    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    entity = entity
      .set(
        'sentflags',
        entity.get('sentflags').unshift(WEBSOCKET_STATE_FIVE.result.update)
      )
      .set('expiration', WEBSOCKET_STATE_FIVE.result.expiration);
    expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    expect(
      buyReducer(
        store,
        loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_FIVE.result)
      )
    ).toEqual(expectedResult);

    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    entity = entity
      .set(
        'sentflags',
        entity.get('sentflags').unshift(WEBSOCKET_STATE_SIX.result.update)
      )
      .set('expiration', WEBSOCKET_STATE_SIX.result.expiration);
    expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    expect(
      buyReducer(
        store,
        loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_SIX.result)
      )
    ).toEqual(expectedResult);

    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    entity = entity
      .set('sentflags', fromJS(WEBSOCKET_STATE_SEVEN.result.sentflags))
      .set('expiration', WEBSOCKET_STATE_SEVEN.result.expiration)
      .set('status', 'finished');
    expectedResult = store
      .setIn(['swaps', 'entities'], entities.set(uuid, entity))
      .setIn(['swaps', 'loading'], false);
    expect(
      buyReducer(
        store,
        loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_SEVEN.result)
      )
    ).toEqual(expectedResult);
  });
});

describe('containers/BuyPage/reducers/loadRecentSwapsCoin', () => {
  it('should handle the loadRecentSwapsCoin action correctly', () => {
    expect(1).toEqual(2);
  });
});
