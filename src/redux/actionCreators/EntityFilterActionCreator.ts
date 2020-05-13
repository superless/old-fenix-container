import * as actions from "../actionTypes/EntityFilterActionTypes";
import {  FilterOptionsContainer } from "../../model/CategoryEntity";
import { searchTypeAzureInput } from "../actionTypes/EntityFilterActionTypes";


export function GetFilterSearchTypes(
 input : searchTypeAzureInput

): actions.GetSearchFilterTypesAction {

  return {
    type: actions.GET_SEARCH_TYPES,
    ...input
  };
}

export function GetSearchFilterTypesRequest(): actions.GetSearchFilterTypesRequestAction {
  return {
    type: actions.GET_SEARCH_TYPES_REQUEST
  };
}

export function GetSearchFilterTypesSuccess(value: FilterOptionsContainer, entity?: number): actions.GetSearchFilterTypesSucessAction {
  return {
    type: actions.GET_SEARCH_TYPES_SUCCESS,
    value,
    entity
  };

}


export function GetSearchFilterTypesFailure(error: string): actions.GetSearchFilterTypesFailureAction {
  return {
    type: actions.GET_SEARCH_TYPES_FAILURE,
    error
  };
}