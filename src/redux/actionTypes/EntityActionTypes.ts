import { IResult } from "../../model/IResult";




export const GET_SEARCH_ENTITY = "searchActionTypes/GET_SEARCH_ENTITY";
export const GET_SEARCH_ENTITY_NAME = "searchActionTypes/GET_SEARCH_ENTITY_NAME";
export interface GetSearchEntityAction {
  type: typeof GET_SEARCH_ENTITY | typeof GET_SEARCH_ENTITY_NAME;
  url: string,
  key: string,
  index: string,
  entity: number,
  page: number,
  ElementsInPage: number,
  search: string,
  ids:string[]
}

export const GET_SEARCH_ENTITY_REQUEST = "searchActionTypes/GET_SEARCH_ENTITY_REQUEST";
export const GET_SEARCH_ENTITY_REQUEST_NAME = "searchActionTypes/GET_SEARCH_ENTITY_REQUEST_NAME";
export interface GetSearchEntityRequestAction {
  type: typeof GET_SEARCH_ENTITY_REQUEST | typeof GET_SEARCH_ENTITY_REQUEST_NAME;
}

export const GET_SEARCH_ENTITY_SUCCESS = "searchActionTypes/GET_SEARCH_ENTITY_SUCCESS";
export const GET_SEARCH_ENTITY_SUCCESS_NAME = "searchActionTypes/GET_SEARCH_ENTITY_SUCCESS_NAME";
export interface GetSearchEntitySuccessAction {
  type: typeof GET_SEARCH_ENTITY_SUCCESS | typeof GET_SEARCH_ENTITY_SUCCESS_NAME;
  value: IResult;
  entity:number;
}



export const GET_SEARCH_ENTITY_FAILURE = "searchActionTypes/GET_SEARCH_ENTITY_FAILURE";
export const GET_SEARCH_ENTITY_FAILURE_NAME = "searchActionTypes/GET_SEARCH_ENTITY_FAILURE_NAME";
export interface GetSearchEntityFailureAction {
  type: typeof GET_SEARCH_ENTITY_FAILURE | typeof GET_SEARCH_ENTITY_FAILURE_NAME;
  error: string;
}



export type EntityAction =
  | GetSearchEntityAction
  | GetSearchEntityRequestAction
  | GetSearchEntitySuccessAction
  | GetSearchEntityFailureAction