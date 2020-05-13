import {ITableInputConnect} from "../../../model/TableFenix/input/";
import { GET_TABLE_DATA } from ".";

/**
 * elemento de entrada a la petición del servidor.
 */
export default interface ITableReduxGetData extends ITableInputConnect {
  type: typeof GET_TABLE_DATA;
}
