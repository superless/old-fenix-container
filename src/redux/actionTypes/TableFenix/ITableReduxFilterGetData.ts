import { ITableFilterInputConnect } from "../../../model/TableFenix/input";
import { GET_FILTER_TABLE } from ".";

export default interface ITableReduxFilterGetData extends ITableFilterInputConnect {
  type : typeof GET_FILTER_TABLE
}