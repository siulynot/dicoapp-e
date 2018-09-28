// @flow
// import getConfig from '../config';
// import type { EndpointType, CancelRequest } from './schema';
import swapstatus from './swapstatus';
import httpprovider from './http-provider';

// const config = getConfig();

// const debug = require('debug')('dicoapp:utils:barter-dex-api');

// eslint-disable-next-line flowtype/no-weak-types
function BarterDexAPI(): Object {
  const state = {
    userpass: null
  };

  return Object.assign(
    {
      setUserpass(userpass: string) {
        state.userpass = userpass;
      },
      getUserpass() {
        return state.userpass;
      },
      resetUserpass() {
        state.userpass = null;
      }
    },
    httpprovider(state),
    swapstatus(state)
  );
}

let api = null;

function setup() {
  if (api) return api;

  api = BarterDexAPI();

  return api;
}

export default setup();
