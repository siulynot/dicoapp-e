// @flow
import FetchService from '../fetch-service';
import getConfig from '../config';
import type { CancelRequest } from './schema';

const config = getConfig();

const debug = require('debug')('dicoapp:utils:barter-dex-api');

class BarterDexAPI {
  constructor(
    settings = {
      url: config.get('barterdex'),
      name: ''
    }
  ) {
    debug(`url = ${settings.url}`);
    this.fetch = new FetchService({
      name: settings.name,
      options: {},
      base: settings.url
    });
    this.config = {
      paths: config.get('paths')
    };
  }

  isReady() {
    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        try {
          debug('isReady');
          await this.fetch.find({});
          clearInterval(interval);
          resolve('OK');
          // eslint-disable-next-line no-empty
        } catch (_) {}
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        reject(new Error('Giving up trying to connect to marketmaker'));
      }, 10000);
    });
  }

  // publicCall() {
  //   throw new Error('not implement yet. Return promise');
  // }

  // privateCall() {
  //   throw new Error('not implement yet. Return promise');
  // }

  post(data) {
    return this.fetch.create('', data);
  }

  create(data, ...rest) {
    return this.fetch.create('', data, ...rest);
  }

  /**
   * Status/Info
   */

  /**
   * BarterDEX Operation
   */
  cancel(params: CancelRequest) {
    const endpointParams = Object.assign({}, params, {
      method: 'cancel'
    });
    return this.create(endpointParams);
  }

  // https://docs.komodoplatform.com/barterDEX/barterDEX-API.html?highlight=listunspent#listunspent
  // eslint-disable-next-line flowtype/no-weak-types
  listUnspent(params: Object) {
    // FIXME: verify params
    const serverparams = Object.assign({}, params, {
      method: 'listunspent'
    });
    return this.create(serverparams);
  }

  // https://docs.komodoplatform.com/barterDEX/barterDEX-API.html?highlight=listunspent#pendingswaps
  // eslint-disable-next-line flowtype/no-weak-types
  pendingswaps(params: Object) {
    // FIXME: verify params
    const serverparams = Object.assign({}, params, {
      method: 'swapstatus',
      pending: 1
    });
    return this.create(serverparams);
  }

  // https://docs.komodoplatform.com/barterDEX/barterDEX-API.html?highlight=listunspent#buy
  // eslint-disable-next-line flowtype/no-weak-types
  buy(params: Object) {
    // FIXME: verify params
    const serverparams = Object.assign({}, params, {
      method: 'buy'
    });
    return this.create(serverparams);
  }
}

let api = null;

function setup() {
  if (api) return api;

  api = new BarterDexAPI();

  return api;
}

export default setup();
