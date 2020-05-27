import ITableReduxGetData from "./ITableReduxGetData";
import ITableReduxRequest from "./ITableReduxRequest";
import  ITableReduxSuccess  from "./ITableReduxSuccess";
import  ITableReduxFailure  from "./ITableReduxFailure";
import ITableReduxFilterFailure from "./ITableReduxFilterFailure";
import ITableReduxFilterGetData from "./ITableReduxFilterGetData";
import ITableReduxFilterRequest from "./ITableReduxFilterRequest";
import ITableReduxFilterSuccess from "./ITableReduxFilterSuccess";


/**
 * Nombre de la acción en Redux para actualizar los datos de la tabla
 */
export const GET_TABLE_DATA = "@table-fenix/GET_TABLE_DATA";

/**
 * nombre de la acción que inicia la petición.
 * usado por isLoading
 */
export const GET_TABLE_REQUEST = "@table-fenix/GET_TABLE_REQUEST";


/**
 * nombre de la acción que da por concluida la carga de datos
 */
export const GET_TABLE_SUCCESS = "@table-fenix/GET_TABLE_SUCCESS";

/**
 * nombre de la acción que llamará en caso de falla en el llamado.
 */
export const GET_TABLE_FAILURE = "@table-fenix/GET_TABLE_FAILURE";


export const GET_FILTER_TABLE = "@table-fenix/GET_FILTER_TABLE";


export const GET_FILTER_TABLE_SUCCESS = "@table-fenix/GET_FILTER_TABLE_SUCCESS";

export const GET_FILTER_TABLE_REQUEST = "@table-fenix/GET_FILTER_TABLE_REQUEST";

export const GET_FILTER_TABLE_FAILURE = "@table-fenix/GET_FILTER_TABLE_FAILURE";



/**
 * Action Types de la tabla
 */
export type TableActionTypes = 
   |  ITableReduxGetData
   |  ITableReduxRequest
   |  ITableReduxSuccess
   | ITableReduxFailure
   | ITableReduxFilterFailure
   | ITableReduxFilterGetData
   | ITableReduxFilterRequest
   | ITableReduxFilterSuccess

/**
 * Tipos de datos.
 */
export {
  ITableReduxGetData,
  ITableReduxRequest,
  ITableReduxSuccess,
  ITableReduxFailure,
  ITableReduxFilterFailure,
  ITableReduxFilterGetData,
  ITableReduxFilterRequest,
  ITableReduxFilterSuccess
  
}
