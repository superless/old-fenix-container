import { CategoryEntity } from "../../model/CategoryEntity";
import { SearchEntityType } from "../../model/SearchEntityType";

export const GET_SEARCH_TYPES  = "searchFilterActionTypes/GET_SEARCH_TYPES";

export interface GetSearchFilterTypesAction {
  type: typeof GET_SEARCH_TYPES;
  url: string,
  key: string,
  index: string,
  entity: number,
  categoryEntities?:CategoryEntity[];
}

export const GET_SEARCH_TYPES_REQUEST = "searchFilterActionTypes/GET_SEARCH_TYPES_REQUEST";

export interface GetSearchFilterTypesRequestAction {
  type: typeof GET_SEARCH_TYPES_REQUEST;
}

export const  GET_SEARCH_TYPES_SUCCESS = "searchFilterActionTypes/GET_SEARCH_TYPES_SUCCESS";
export interface GetSearchFilterTypesSucessAction {
  type: typeof GET_SEARCH_TYPES_SUCCESS;
  value : SearchEntityType[];
  entity : number;
}

export const GET_SEARCH_TYPES_FAILURE = "searchFilterActionTypes/GET_SEARCH_TYPES_FAILURE";

export interface GetSearchFilterTypesFailureAction {
  type: typeof GET_SEARCH_TYPES_FAILURE;
  error: string;
}




