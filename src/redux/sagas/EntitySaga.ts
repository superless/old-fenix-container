import { put, call, takeEvery} from "redux-saga/effects";

import * as actionCreators from "../actionCreators/EntityTableActionCreator";
import * as actionTypes from "../actionTypes/EntityTableActionTypes";


import { EntitySearch } from "./../../search/EntitySearch";
import { IResult } from "tf-search-model";










function* onLoadEntitys({ url, page, search, ElementsInPage, entity, index, key }: actionTypes.GetSearchEntityAction) {

  try {

    
    
 

    yield put(actionCreators.GetSearchEntityRequest());

    

    const result: IResult = yield call(EntitySearch, url, key, index, page, ElementsInPage, `EntityIndex eq ${entity}`, search);

    let ids: string[] = result.entities.reduce((pn: string[], u) => [...pn, ...u.RelatedIds.map(s => s.EntityId)], []);

    ids = ids.filter((n, i) => ids.indexOf(n) === i);



    let join = `RelatedProperties/any(element: element/PropertyIndex eq 6) and (Id eq '${ids.join("' or Id eq '")}')`

    let selectProps = 'RelatedProperties/PropertyIndex,RelatedProperties/Value, Id';

    const resultName: IResult = yield call(EntitySearch, url, key, index, page, ElementsInPage, join, search, selectProps);

    

    result.entities = result.entities.map(s => {
      var names = resultName.entities.map(i => ({ id: i.Id, name: i.RelatedProperties.filter(f => f.PropertyIndex === 6)[0].Value }));
      s.RelatedIds = s.RelatedIds.map(a => ({ ...a, name: names.some(s => s.id === a.EntityId) ? names.filter(s => s.id === a.EntityId)[0].name : "" }));
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

