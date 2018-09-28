// @flow
import axios from 'axios';
import getConfig from '../config';
import type { StateType } from './schema';

const config = getConfig();

export default function httpProvider(
  state: StateType,
  url: string = config.get('barterdex')
) {
  return {
    // eslint-disable-next-line flowtype/no-weak-types
    publicCall(params: Object) {
      const serverparams = Object.assign({}, params, {
        url,
        method: 'post'
      });
      return axios(serverparams);
    },
    // eslint-disable-next-line flowtype/no-weak-types
    privateCall(params: Object) {
      const userpass = this.getUserpass();
      const serverparams = Object.assign({}, params, {
        url,
        method: 'post',
        userpass
      });
      return axios(serverparams);
    }
  };
}
