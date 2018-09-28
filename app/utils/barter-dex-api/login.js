// @flow

// import type { StateType } from './schema';

// export default function login(state: StateType) {
export default function loginFactory() {
  return {
    login(passphrase: string) {
      // const { paths } = this.config;

      const serverparams = {
        userpass:
          '1d8b27b21efabcd96571cd56f91a40fb9aa4cc623d273c63bf9223dc6f8cd81f',
        // userhome: paths.homeDir,
        method: 'passphrase',
        passphrase,
        gui: 'dICOapp-cm'
        // netid:
        // seednode:
      };
      return this.publicCall(serverparams);
    }
  };
}
