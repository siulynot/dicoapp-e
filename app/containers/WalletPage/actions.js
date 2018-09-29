// @flow

import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTION_SUCCESS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR
} from './constants';
import type { TransactionPayload } from './schema';

export function loadTransactions() {
  return {
    type: LOAD_TRANSACTIONS
  };
}

export function loadTransactionsSuccess(transactions) {
  return {
    type: LOAD_TRANSACTIONS_SUCCESS,
    payload: {
      transactions
    }
  };
}

export function loadTransactionSuccess(transaction: TransactionPayload) {
  return {
    type: LOAD_TRANSACTION_SUCCESS,
    payload: {
      transaction
    }
  };
}

export function loadTransactionsError(message: string) {
  return {
    type: LOAD_TRANSACTIONS_ERROR,
    error: {
      message
    }
  };
}
