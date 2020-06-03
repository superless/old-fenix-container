import { GET_FILTER_TABLE_FAILURE } from "../../actionTypes/TableFenix";

export default function GetTableFilterFailure(error: string) {
  return {
    type: GET_FILTER_TABLE_FAILURE,
    error
  };
}