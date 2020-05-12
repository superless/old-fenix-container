import IEntityState from "./IEntityTableState";
import { IResult } from "@fenix/tf-search-model";
import {TableActionTypes, GET_TABLE_SUCCESS} from "../../actionTypes/TableFenix"

const initialState: IEntityState = {
  Entities: {},
}


export default function EntityTableReducer(state: IEntityState = initialState, action: TableActionTypes): IEntityState {
  switch (action.type) {
    case GET_TABLE_SUCCESS:
      
      
     
      
      return { ...state, Entities : {...state.Entities, [action.entity]:action.value} };
    default:
      return state;
  }
}
