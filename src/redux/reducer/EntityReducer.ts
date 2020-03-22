import * as actions from "../actionTypes/EntityTableActionTypes";
import { IResult } from "tf-search-model";



export interface IEntityState {
  Entities: Map<number, IResult>

}

const initialState: IEntityState = {
  Entities: new Map<number, IResult>(),
}

export function EntityReducer(
  state: IEntityState = initialState,
  action: actions.EntityTableAction

): IEntityState {
  switch (action.type) {
    case actions.GET_SEARCH_ENTITY_SUCCESS:
      state.Entities.set(action.entity, action.value);      
      return state;
      
    default:
      return state;

  }
}
