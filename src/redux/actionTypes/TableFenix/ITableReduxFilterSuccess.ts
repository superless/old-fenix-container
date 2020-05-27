import { IResult, IFacet } from "@fenix/tf-search-model";
import { GET_FILTER_TABLE_SUCCESS } from ".";

/**
 * Tabla que retorna el resultado
 */
export default interface ITableReduxFilterSuccess {
  type: typeof GET_FILTER_TABLE_SUCCESS;
  result: IResult;
  entity: number;
  pathname:string;
}
