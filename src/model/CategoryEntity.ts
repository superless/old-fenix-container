import { SearchType } from "@fenix/tf-search-model";
import { ISearchBaseModel } from "@fenix/fenix-components";

export interface FilterOptionsContainer {

  filterEntities: Map<number, FilterEntityContainer>;
}

export interface ValueCount {
  value : string;
  count : number;
}

export interface FacetContainer {
  facets: Facet[];
  total: number;  
}

export interface Facet {
  index: number;
  count: number,
  value: string;
}

export interface FilterEntityContainer {
  idCollection: ValueCount[];   
  PropertyCollection?: Map<number, EntityIndexNameResult[] | EntityIndexNameCategoryResult[]>
}

export interface EntityIndexNameResult {
  id: string;
  name: string;
  hits?:number
}

export interface EntityIndexNameCategoryResult extends EntityIndexNameResult {
  category: string;
  categoryId : string;
}

export type KindEntity = "Related" | "RelatedCategory";

export interface IndexEntityName {
  kind: KindEntity;
  propertyIndex: number;  
  dataDependant: boolean;
  // si no es dataDependant, irá a buscar todos los elementos.
}

export interface IndexEntityRelatedIdCategory {
  kind: KindEntity;
  propertyIndex: number;
  entityIndexCategory?:number;
  propertyIndexCategory?:number;
}


export interface ResultSelected {  
  searchType: SearchType;
  value : ISearchBaseModel;
}


