import { IResult } from "@fenix/tf-search-model";
import { GET_TABLE_SUCCESS } from ".";

/**
 * Tabla que retorna el resultado
 */
export default interface ITableReduxSuccess {
  type: typeof GET_TABLE_SUCCESS;
  value: IResult;
  entity: number;
}
