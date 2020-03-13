import * as action from "./../actionTypes/EntityActionTypes";
import { IResult } from "tf-search-model";





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



export function GetSearchEntitySuccess(entityResult : IResult, entity:number ) : action.GetSearchEntitySuccessAction{
    
    return {
        type : action.GET_SEARCH_ENTITY_SUCCESS,
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


