import { put, call, takeEvery} from "redux-saga/effects";

import * as actionCreators from "../actionCreators/EntityTableActionCreator";
import * as actionTypes from "../actionTypes/EntityTableActionTypes";


import { EntitySearch } from "./../../search/EntitySearch";
import { IResult } from "tf-search-model";










function* onLoadEntitys({ url, page, search, ElementsInPage, entity, index, key }: actionTypes.GetSearchEntityAction) {

  try {
    
    yield put(actionCreators.GetSearchEntityRequest());

    

    const result: IResult = yield call(EntitySearch, url, key, index, page, ElementsInPage, `entityIndex/any(element: element eq ${entity}) `, search);

    let ids: string[] = result.entities.reduce((pn: string[], u) => [...pn, ...u.rel.map(s => s.entityId)], []);
    
    
    
    ids = ids.filter((n, i) => ids.indexOf(n) === i);
    

     



    let join = `str/any(element: element/propertyIndex eq 1) and (id eq '${ids.join("' or id eq '")}')`

    let selectProps = 'str/propertyIndex,str/value, id';

    const resultName: IResult = yield call(EntitySearch, url, key, index, page, ElementsInPage, join, search, selectProps);

    

    result.entities = result.entities.map(s => {
      var names = resultName.entities.map(i => ({ id: i.id, name: i.str.filter(f => f.propertyIndex === 1)[0].value }));
      s.rel = s.rel.map(a => ({ ...a, name: names.some(s => s.id === a.entityId) ? names.filter(s => s.id === a.entityId)[0].name : "" }));
      return s;
    });

    

    
    
    yield put(actionCreators.GetSearchEntitySuccess(result, entity));
  } catch (error) {
    
    yield put(actionCreators.GetSearchEntityFailure(error.response.data.error));
  }
}


export function* watchOnLoadEntitys() {
  // toma todas las llamadas, puede usar TakeLatest, que cancela las llamadas que se están procesando
  yield takeEvery(actionTypes.GET_SEARCH_ENTITY, onLoadEntitys);
}

