import {ITableReduxRequest, GET_TABLE_REQUEST} from "./../../actionTypes/TableFenix";
/**
 * envía a redux el estado request.
 */
export function GetTableRequest(): ITableReduxRequest {
  return {
    type: GET_TABLE_REQUEST
  };
}
