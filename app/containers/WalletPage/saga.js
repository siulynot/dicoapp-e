import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_TRANSACTIONS } from './constants';
import { makeSelectCurrentUser } from '../App/selectors';
// import api from '../../utils/barter-dex-api';
import api from '../../utils/barter-dex-api/index2';
import {
  // loadTransactionsSuccess,
  loadTransactionsError
} from './actions';

const debug = require('debug')('dicoapp:containers:WalletPage:saga');

export function* loadCoinTransactionsProcess(coin, address) {
  try {
    debug(`loadCoinTransactionsProcess running${coin}`);
    // https://github.com/chainmakers/dicoapp/blob/glxt/.desktop/modules/marketmaker/index.js#L1144
    const params = {
      coin,
      address
    };
    let data = yield call([api, 'listTransactions'], params);

    // sort
    data = data.sort((a, b) => b.height - a.height);

    // only take 10 records
    data = data.slice(0, 10);

    // add coin symbol
    data = data.map(e => {
      e.coin = coin;
      return e;
    });
    return data;
  } catch (err) {
    debug(`loadCoinTransactionsProcess fail ${coin}: ${err.message}`);
    return [];
  }
}

export function* loadTransactionsProcess() {
  try {
    // load user data
    debug('load transactions process start');
    const user = yield select(makeSelectCurrentUser());
    if (!user) {
      throw new Error('not found user');
    }
    const coins = user.get('coins');

    // const requests = [];
    const requests2 = [];
    for (let i = 0; i < coins.size; i += 1) {
      const e = coins.get(i);
      const coin = e.get('coin');
      const address = e.get('smartaddress');
      // requests.push(call(loadCoinTransactionsProcess, coin, address));
      requests2.push(
        api.listTransactions({
          coin,
          address
        })
      );
    }
    console.log(requests2, 'requests2');
    let data = yield all(requests2);
    console.log(data, 'data');
    data = data.reduce((a, b) => a.concat(b), []);

    // return yield put(loadTransactionsSuccess(data));
  } catch (err) {
    return yield put(loadTransactionsError(err.message));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* walletData() {
  yield takeLatest(LOAD_TRANSACTIONS, loadTransactionsProcess);
}
