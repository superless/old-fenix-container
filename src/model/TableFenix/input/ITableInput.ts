
// stages

import IBaseInput from "./IBaseInput";
import { IFilterModel } from "@fenix/tf-search-model"

/**
 * Evento de carga de datos de la tabla
 */
export default interface ITableInput extends IBaseInput {
  
  /**
   * página a cargar
   */
  page: number;

  /**
   * número de páginas
   */
  elementsInPage: number;


  pathname:string;
}


