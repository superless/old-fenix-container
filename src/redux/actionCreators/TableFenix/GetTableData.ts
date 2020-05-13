import {ITableInputConnect} from "../../../model/TableFenix/input/";
import {ITableReduxGetData, GET_TABLE_DATA} from "./../../actionTypes/TableFenix";
/**
 * Función que será llamada desde el container para envíar la petición de datos
 * de la tabla.
 *
 * @param input datos de entrada para la consulta de datos a tabla genérica.
 */
export default function GetTableData(input: ITableInputConnect): ITableReduxGetData {
  return {
    ...input,
    type: GET_TABLE_DATA
  };
}
