import { fork, take, call } from 'redux-saga/effects';

export default function* takeFirst(pattern, saga, ...args) {
  // eslint-disable-next-line func-names
  const task = yield fork(function*() {
    while (true) {
      const action = yield take(pattern);
      yield call(saga, ...args.concat(action));
    }
  });
  return task;
}
