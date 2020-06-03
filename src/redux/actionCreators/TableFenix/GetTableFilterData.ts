import { ITableFilterInputConnect } from "../../../model/TableFenix/input";
import { ITableReduxFilterGetData, GET_FILTER_TABLE } from "../../actionTypes/TableFenix";

/**
 * Función que será llamada desde el container para envíar la petición de datos
 * de la tabla.
 *
 * @param input datos de entrada para la consulta de datos a tabla genérica.
 */
export default function GetTableFilterData(input: ITableFilterInputConnect): ITableReduxFilterGetData {
  return {
    ...input,
    type: GET_FILTER_TABLE
  };
}
