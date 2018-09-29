// https://github.com/react-boilerplate/react-boilerplate/issues/1277#issuecomment-263267639
import { put, select, call, all } from 'redux-saga/effects';
import api from '../../../utils/barter-dex-api';
import { makeSelectCurrentUser } from '../selectors';
import {
  loadBalanceSuccess,
  loadCoinBalanceSuccess,
  loadBalanceError
} from '../actions';

const debug = require('debug')(
  'dicoapp:containers:App:saga:load-balance-process'
);

export function* loadCoinBalanceProcess(coin, address, userpass) {
  try {
    debug(`load coin balance process running ${coin}`);
    const params = {
      userpass,
      coin,
      address
    };
    const data = yield call([api, 'getBalance'], params);
    data.address = address;
    // const utxo = yield call([api, 'listUnspent'], params);
    yield put(
      loadCoinBalanceSuccess({
        coin,
        address,
        balance: Number(data.balance)
        // utxo
      })
    );

    debug(`load balance done ${coin}`);

    return {
      address: data.address,
      balance: data.balance,
      coin: data.coin
    };
  } catch (err) {
    debug(`load coin balance process fail ${coin}: ${err.message}`);
    return false;
  }
}

export default function* loadBalanceProcess() {
  try {
    // load user data
    const user = yield select(makeSelectCurrentUser());
    if (!user) {
      throw new Error('not found user');
    }
    const userpass = user.get('userpass');
    const coins = user.get('coins');
    const requests = [];
    for (let i = 0; i < coins.size; i += 1) {
      const e = coins.get(i);
      const coin = e.get('coin');
      const address = e.get('smartaddress');
      requests.push(call(loadCoinBalanceProcess, coin, address, userpass));
    }
    yield all(requests);
    return yield put(loadBalanceSuccess());
  } catch (err) {
    return yield put(loadBalanceError(err.message));
  }
}
