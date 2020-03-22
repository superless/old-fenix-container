import * as actions from "../actionTypes/EntityFilterActionTypes";
import { FilterOptionsContainer } from "../../model/CategoryEntity";




export interface IEntityState {
  Indexes: Map<number, FilterOptionsContainer>;
  Main? : FilterOptionsContainer;

}

const initialState: IEntityState = {
  Indexes: new Map<number, FilterOptionsContainer>()
  
}

export function FilterReducer(
  state: IEntityState = initialState,
  action: actions.EntityFilterAction

): IEntityState {
  switch (action.type) {
    case actions.GET_SEARCH_TYPES_SUCCESS:
      if(action.entity){
        state.Indexes.set(action.entity, action.value);
      } else {
        state.Main = action.value;
      }
      return state;
      
    default:
      return state;

  }
}
