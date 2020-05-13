import * as EntitieSaga from './TableFenix'
import * as FilterSaga from './FilterSaga'
import { all,fork } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([EntitieSaga.watchOnLoadTable, FilterSaga.watchOnSearchTypes
  ].map(fork));
}