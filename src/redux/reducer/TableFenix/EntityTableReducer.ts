import {TableActionTypes, GET_TABLE_SUCCESS, GET_FILTER_TABLE_SUCCESS} from "../../actionTypes/TableFenix"
import IEntityTableState from "./IEntityTableState";


export default function EntityTableReducer(state: IEntityTableState = {Entities : {}}, action: TableActionTypes): IEntityTableState {
  switch (action.type) {
    case GET_TABLE_SUCCESS:
      if  (!state.Entities) return state;
      
      return { ...state, Entities : {...state.Entities, [action.pathname]:{...(state.Entities[action.pathname] || []),[action.entity]: action.value}} };
    case GET_FILTER_TABLE_SUCCESS:
      if  (!state.Entities) return state;
      const localState = { ...state, Entities : {...state.Entities, [action.pathname]:{...(state.Entities[action.pathname] || []),[action.entity]: action.result}} };
      return localState;
    default:
      return state;
  }
}
