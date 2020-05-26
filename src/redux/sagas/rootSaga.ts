import * as tableSaga from './TableFenix'

import { all,fork } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([tableSaga.watchOnLoadTable,
  ].map(fork));
}