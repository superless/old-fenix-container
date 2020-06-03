


/**
 * SearchQuery Base 
 */
export default interface ISearchQuery{

  /**
   * campos que regresará desde el search
   */
  select?:string;

  /**
   * facets del search
   */
  facets?:string[];

  /**
   * filtro del search
   */
  filter:string;
  
  /**
   * skip para calcular donde obtener los datos
   * de la página.
   */
  skip? : number,
}


