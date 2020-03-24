import * as EntitieSaga from './EntitySaga'
import * as FilterSaga from './FilterSaga'
import { all,fork } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([EntitieSaga.watchOnLoadEntitys, FilterSaga.watchOnSearchTypes
  ].map(fork));
}