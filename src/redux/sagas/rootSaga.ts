import * as EntitieSaga from './EntitySaga'
import { all,fork } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    ...Object.values(EntitieSaga)
  ].map(fork));
}