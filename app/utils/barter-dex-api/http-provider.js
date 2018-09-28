// @flow
import axios from 'axios';
import getConfig from '../config';
import type { StateType } from './schema';

function toError(error) {
  throw error;
}

function json(body) {
  return body.data;
}

const config = getConfig();

export default function httpProvider(
  state: StateType,
  url: string = config.get('barterdex')
) {
  return {
    // eslint-disable-next-line flowtype/no-weak-types
    publicCall(params: Object) {
      const serverparams = {
        data: params,
        url,
        method: 'post'
      };
      return axios(serverparams)
        .then(json)
        .catch(toError);
    },
    // eslint-disable-next-line flowtype/no-weak-types
    privateCall(params: Object) {
      const userpass = this.getUserpass();
      const data = Object.assign(
        {
          userpass
        },
        params
      );
      const serverparams = {
        data,
        url,
        method: 'post'
      };
      return axios(serverparams)
        .then(json)
        .catch(toError);
    }
  };
}
