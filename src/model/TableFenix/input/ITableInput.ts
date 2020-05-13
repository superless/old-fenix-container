import { ISearchType } from "@fenix/tf-search-model";
// stages
/**
 * Evento de carga de datos de la tabla
 */
export default interface ITableInput {
  /**
   * Entidad de la tabla.
   *
   */
  entity: number;
  /**
   * página a cargar
   */
  page: number;

  /**
   * número de páginas
   */
  elementsInPage: number;

  /**
   * busqueda en la tabla
   */
  searchType?: ISearchType;

  /**
   * índice del nombre en las entidades relacionadas
   */
  propIndexName: number;
}
