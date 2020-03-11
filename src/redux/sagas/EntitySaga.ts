import { put, call, takeEvery, all, fork } from "redux-saga/effects";
import * as actionCreators from "./../actionCreators/EntityActionCreator";
import * as actionTypes from "./../actionTypes/EntityActionTypes";
import {EntitySearch} from "./../../search/EntitySearch";
import { IResult } from "../../model/IResult";



function* onLoadEntitys({url, page, search, ElementsInPage, entity, index, key }:actionTypes.GetSearchEntityAction) {
  
  try {
    yield put(actionCreators.GetSearchEntityRequest());

    
    
    const result : IResult = yield call(EntitySearch,url, key,index,page, ElementsInPage,`EntityIndex eq ${entity}`,search);

   
    
    
    yield put(actionCreators.GetSearchEntitySuccess(result, entity));


  } catch (error) {
    yield put(actionCreators.GetSearchEntityFailure(error.response.data.error));
  }
}
function* onLoadEntitysName({url, page, search, entity, ElementsInPage, index, key, ids }:actionTypes.GetSearchEntityAction) {
  
  try {
    yield put(actionCreators.GetSearchEntityRequestName());
    
    let join = `RelatedProperties/any(element: element/PropertyIndex eq 6) and (Id eq '${ids.join("' or Id eq '")}')`
    let select = 'RelatedProperties/PropertyIndex,RelatedProperties/Value, Id';
    
    const result : IResult = yield call(EntitySearch,url, key,index,page,ElementsInPage,join,search, select);
    
    
    
    
    yield put(actionCreators.GetSearchEntitySuccessName(result, entity));


  } catch (error) {
    yield put(actionCreators.GetSearchEntityFailureName(error.response.data.error));
  }
}

export function* watchOnLoadEntitys() {
  yield takeEvery(actionTypes.GET_SEARCH_ENTITY, onLoadEntitys);
}

export function* watchOnLoadEntitysName() {
  yield takeEvery(actionTypes.GET_SEARCH_ENTITY_NAME, onLoadEntitysName);
}
