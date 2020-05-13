import {GET_TABLE_FAILURE} from "../../actionTypes/TableFenix";

export default function GetTableFailure(error: string) {
  return {
    type: GET_TABLE_FAILURE,
    error
  };
}
