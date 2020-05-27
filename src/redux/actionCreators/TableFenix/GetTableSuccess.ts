import { IResult } from "@fenix/tf-search-model";
import {ITableReduxSuccess, GET_TABLE_SUCCESS} from "./../../actionTypes/TableFenix"
/**
 *
 * @param value resultado de la consulta
 * @param entity entidad a la que se hizo la consulta.
 */
export default function GetTableSuccess(value: IResult, entity: number, pathname:string): ITableReduxSuccess{
  return {
    type: GET_TABLE_SUCCESS,
    entity,
    pathname,
    value
  };
}
