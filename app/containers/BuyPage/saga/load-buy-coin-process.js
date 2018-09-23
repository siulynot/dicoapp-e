import { call, cancelled } from 'redux-saga/effects';
import { delay } from 'redux-saga';

const debug = require('debug')(
  'dicoapp:containers:BuyPage:saga:load-buy-coin-process'
);

export default function* loadBuyCoinProcess({ payload }) {
  try {
    while (true) {
      console.log('hello', payload);
      yield call(delay, 5000);
    }
  } finally {
    if (yield cancelled()) {
      debug('load buy coin process cancelled');
    }
  }
}
