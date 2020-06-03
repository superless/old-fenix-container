import { IFacet, IResult } from "@fenix/tf-search-model";
import { ITableReduxFilterSuccess, GET_FILTER_TABLE_SUCCESS } from "../../actionTypes/TableFenix";

export default function GetTableFilterSuccess(result: IResult, entity: number, pathname:string): ITableReduxFilterSuccess{
  return {
    type: GET_FILTER_TABLE_SUCCESS,
    entity,
    pathname,
    result
    
  };
}