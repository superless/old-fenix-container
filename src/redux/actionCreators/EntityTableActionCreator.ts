import * as action from "../actionTypes/EntityTableActionTypes";
import { IResult } from "tf-search-model";
import { EntityActionAzureInput } from "../actionTypes/EntityTableActionTypes";





export function GetSearchEntity(input : EntityActionAzureInput
  ): action.GetSearchEntityAction{


    
    return {
        type : action.GET_SEARCH_ENTITY,
        ...input
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


