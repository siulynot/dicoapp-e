import { put, call, select, cancel, cancelled } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import api from '../../../utils/barter-dex-api';
import { makeSelectCurrentUser } from '../../App/selectors';
import { loadBuyCoinError } from '../actions';

const debug = require('debug')(
  'dicoapp:containers:BuyPage:saga:load-buy-coin-process'
);

export default function* loadBuyCoinProcess({ payload }) {
  try {
    const startTime = Date.now();

    while (true) {
      // load user data
      const durationTime = Date.now() - startTime;
      if (durationTime > 20 * 1000) {
        debug('cancel');
        yield cancel();
      }

      const user = yield select(makeSelectCurrentUser());
      if (!user) {
        throw new Error('not found user');
      }
      // const { basecoin, paymentcoin, amount } = payload;
      const { paymentcoin } = payload;

      const userpass = user.get('userpass');
      const coins = user.get('coins');
      const smartaddress = coins.find(c => c.get('coin') === paymentcoin);

      // step one: get listUnspent data
      const unspent = yield call([api, 'listUnspent'], {
        userpass,
        coin: paymentcoin,
        address: smartaddress.get('smartaddress')
      });

      if (unspent.length < 2) {
        // splitting utxos
        debug('splitting utxos');
      } else {
        debug('ready to buy');
      }
      yield call(delay, 5000);
    }
  } catch (err) {
    return yield put(loadBuyCoinError(err.message));
  } finally {
    if (yield cancelled()) {
      debug('load buy coin process cancelled');
    }
  }
}
