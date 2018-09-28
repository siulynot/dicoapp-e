// @flow

// https://docs.komodoplatform.com/barterDEX/barterDEX-API.html#electrum
// import type { StateType } from './schema';

type AddServerType = {};

// export default function addServer(state: StateType) {
export default function addServer() {
  return {
    addServer(params?: AddServerType) {
      const serverparams = Object.assign({}, params, {
        method: 'electrum'
      });
      return this.privateCall(serverparams);
    }
  };
}
