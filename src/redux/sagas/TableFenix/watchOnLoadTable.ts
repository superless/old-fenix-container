import { onLoadTable } from "./onLoadTable";
import { onLoadTableFilter } from "./onLoadTableFilter";
import * as Eff from 'redux-saga/effects'  
import * as tableTypes from "./../../actionTypes/TableFenix";


/**
 * truco por error en redux saga
 * https://stackoverflow.com/questions/58502778/how-to-repair-a-ts2769-no-overload-matches-this-call
 */
export const takeEvery: any = Eff.takeEvery

export function* watchOnLoadTable() {
  // toma todas las llamadas, puede usar TakeLatest, que cancela las llamadas que se están procesando
  yield takeEvery(tableTypes.GET_TABLE_DATA, onLoadTable);
}

export function* watchOnLoadTableFilter() {
  // toma todas las llamadas, puede usar TakeLatest, que cancela las llamadas que se están procesando
  yield takeEvery(tableTypes.GET_FILTER_TABLE, onLoadTableFilter);
}
