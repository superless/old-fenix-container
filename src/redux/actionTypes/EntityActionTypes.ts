import { IResult } from "tf-search-model";




export const GET_SEARCH_ENTITY = "searchActionTypes/GET_SEARCH_ENTITY";

export interface GetSearchEntityAction {
  type: typeof GET_SEARCH_ENTITY;
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

export interface GetSearchEntityRequestAction {
  type: typeof GET_SEARCH_ENTITY_REQUEST;
}

export const GET_SEARCH_ENTITY_SUCCESS = "searchActionTypes/GET_SEARCH_ENTITY_SUCCESS";

export interface GetSearchEntitySuccessAction {
  type: typeof GET_SEARCH_ENTITY_SUCCESS;
  value: IResult;
  entity:number;
}



export const GET_SEARCH_ENTITY_FAILURE = "searchActionTypes/GET_SEARCH_ENTITY_FAILURE";

export interface GetSearchEntityFailureAction {
  type: typeof GET_SEARCH_ENTITY_FAILURE;
  error: string;
}



export type EntityAction =
  | GetSearchEntityAction
  | GetSearchEntityRequestAction
  | GetSearchEntitySuccessAction
  | GetSearchEntityFailureAction