// @flow

// https://docs.komodoplatform.com/barterDEX/barterDEX-API.html?highlight=listunspent#swapstatus-requestid-quoteid-pending-0
// import type { StateType } from './schema';

type SwapstatusType = {};

// export default function swapstatus(state: StateType) {
export default function swapstatus() {
  return {
    swapstatus: (params: SwapstatusType) => {
      const serverparams = Object.assign({}, params, {
        method: 'swapstatus',
        pending: 1
      });
      return this.privateCall(serverparams);
    }
  };
}
