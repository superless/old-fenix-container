import * as action from "./../actionTypes/EntityActionTypes";
import { IResult } from "../../model/IResult";


export function GetSearchEntityName(url: string,
  key: string,
  index: string,
  entity: number,
  page: number = 1,
  ids:string[],
  ElementsInPage: number = 20,
  search: string = '',
  ): action.GetSearchEntityAction{
    return {
      type : action.GET_SEARCH_ENTITY_NAME,
      url,
      key,
      index,
      page,
      entity,
      ElementsInPage,
      search,
      ids
  };

  }

export function GetSearchEntity(url: string,
  key: string,
  index: string,
  entity: number,
  page: number = 1,
  ElementsInPage: number = 20,
  search: string = ''
  ): action.GetSearchEntityAction{
    
    return {
        type : action.GET_SEARCH_ENTITY,
        url,
        key,
        index,
        page,
        entity,
        ElementsInPage,
        search,
        ids:[]
    };
}

export function GetSearchEntityRequest():action.GetSearchEntityRequestAction{
    return {
        type : action.GET_SEARCH_ENTITY_REQUEST
    };
}

export function GetSearchEntityRequestName():action.GetSearchEntityRequestAction{
  return {
      type : action.GET_SEARCH_ENTITY_REQUEST_NAME
  };
}

export function GetSearchEntitySuccess(entityResult : IResult, entity:number ) : action.GetSearchEntitySuccessAction{
    
    return {
        type : action.GET_SEARCH_ENTITY_SUCCESS,
        value : entityResult,
        entity
    }
}

export function GetSearchEntitySuccessName(entityResult : IResult, entity:number ) : action.GetSearchEntitySuccessAction{
    
  return {
      type : action.GET_SEARCH_ENTITY_SUCCESS_NAME,
      value : entityResult,
      entity
  }
}

export function GetSearchEntityFailure(error:string) : action.GetSearchEntityFailureAction{
    return {
        type : action.GET_SEARCH_ENTITY_FAILURE,
        error
    };
}

export function GetSearchEntityFailureName(error:string) : action.GetSearchEntityFailureAction{
  return {
      type : action.GET_SEARCH_ENTITY_FAILURE_NAME,
      error
  };
}
