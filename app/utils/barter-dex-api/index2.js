// @flow
// import getConfig from '../config';
// import type { EndpointType, CancelRequest } from './schema';
import httpprovider from './http-provider';
import addServer from './add-server';
import login from './login';
import swapstatus from './swapstatus';

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
    addServer(state),
    login(state),
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
