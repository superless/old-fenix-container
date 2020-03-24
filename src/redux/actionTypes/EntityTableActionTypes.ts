import { IResult } from "tf-search-model";
import { AzureInput } from "./AzureInput";

export const GET_SEARCH_ENTITY = "searchTableActionTypes/GET_SEARCH_ENTITY";




export interface EntityActionInput {
  entity: number,
  page: number,
  ElementsInPage: number,
  search: string
}

export interface EntityActionAzureInput extends AzureInput, EntityActionInput {
  
}

export interface GetSearchEntityAction extends EntityActionAzureInput {
  type: typeof GET_SEARCH_ENTITY;
  
}

export const GET_SEARCH_ENTITY_REQUEST = "searchTableActionTypes/GET_SEARCH_ENTITY_REQUEST";

export interface GetSearchEntityRequestAction {
  type: typeof GET_SEARCH_ENTITY_REQUEST;
}

export const GET_SEARCH_ENTITY_SUCCESS = "searchTableActionTypes/GET_SEARCH_ENTITY_SUCCESS";

export interface GetSearchEntitySuccessAction {
  type: typeof GET_SEARCH_ENTITY_SUCCESS;
  value: IResult;
  entity:number;
}

export const GET_SEARCH_ENTITY_FAILURE = "searchTableActionTypes/GET_SEARCH_ENTITY_FAILURE";

export interface GetSearchEntityFailureAction {
  type: typeof GET_SEARCH_ENTITY_FAILURE;
  error: string;
}



export type EntityTableAction =
  | GetSearchEntityAction
  | GetSearchEntityRequestAction
  | GetSearchEntitySuccessAction
  | GetSearchEntityFailureAction