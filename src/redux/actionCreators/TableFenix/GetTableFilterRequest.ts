import { ITableReduxFilterRequest, GET_FILTER_TABLE_REQUEST } from "../../actionTypes/TableFenix";

export function GetTableFilterRequest(): ITableReduxFilterRequest {
  return {
    type: GET_FILTER_TABLE_REQUEST
  };
}
