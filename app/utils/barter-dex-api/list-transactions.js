// @flow

// https://docs.komodoplatform.com/barterDEX/barterDEX-API.html?highlight=listunspent#listtransactions
// import type { StateType } from './schema';

type ListTransactionsType = {
  coin: string,
  address: string
};

// export default function listTransactionsFactory(state: StateType) {
export default function listTransactionsFactory() {
  return {
    listTransactions(params: ListTransactionsType) {
      const serverparams = Object.assign({}, params, {
        method: 'listtransactions',
        count: 10
      });
      return this.privateCall(serverparams);
    }
  };
}
