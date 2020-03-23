import { IndexEntityName, IndexEntityRelatedIdCategory, FilterOptionsContainer } from "../../model/CategoryEntity";
import { AzureInput } from "./AzureInput";


export const GET_SEARCH_TYPES  = "searchFilterActionTypes/GET_SEARCH_TYPES";

export interface searchTypeInput {
  indexMainEntity?: number,  
  indexFilters:number[]; // los indices que se irán a buscar en el facet.
  indexEntitySearchType? : number; // cual es la entidad que irá a buscar, el indice de la busqueda
  searchTypeData : IndexEntityName | IndexEntityRelatedIdCategory;
  maxFacets: number;
}

export interface searchTypeAzureInput extends searchTypeInput, AzureInput {

}

export interface GetSearchFilterTypesAction extends searchTypeAzureInput {
  type: typeof GET_SEARCH_TYPES;
}

export const GET_SEARCH_TYPES_REQUEST = "searchFilterActionTypes/GET_SEARCH_TYPES_REQUEST";

export interface GetSearchFilterTypesRequestAction {
  type: typeof GET_SEARCH_TYPES_REQUEST;
}

export const  GET_SEARCH_TYPES_SUCCESS = "searchFilterActionTypes/GET_SEARCH_TYPES_SUCCESS";
export interface GetSearchFilterTypesSucessAction {
  type: typeof GET_SEARCH_TYPES_SUCCESS;
  value : FilterOptionsContainer;
  entity? : number;
}

export const GET_SEARCH_TYPES_FAILURE = "searchFilterActionTypes/GET_SEARCH_TYPES_FAILURE";

export interface GetSearchFilterTypesFailureAction {
  type: typeof GET_SEARCH_TYPES_FAILURE;
  error: string;
}

export type EntityFilterAction = 
  | GetSearchFilterTypesAction
  | GetSearchFilterTypesRequestAction
  | GetSearchFilterTypesSucessAction
  | GetSearchFilterTypesFailureAction


