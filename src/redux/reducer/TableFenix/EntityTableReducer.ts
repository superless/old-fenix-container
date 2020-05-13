
import { IResult } from "@fenix/tf-search-model";
import {TableActionTypes, GET_TABLE_SUCCESS} from "../../actionTypes/TableFenix"




export default function EntityTableReducer(state: any, action: TableActionTypes): any {
  switch (action.type) {
    case GET_TABLE_SUCCESS:
      
      
     
      
      return { ...state, Entities : {...state.Entities, [action.entity]:action.value} };
    default:
      return state;
  }
}
