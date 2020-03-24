import { ResultCategory } from "./ResultCategory";
import { ResultElements } from "./ResultElements";

export interface SearchEntityType {
  entityIndex: number;
  secondaryEntityIndex?:number;
  name: string;
  isSearch: boolean;
  isCategory: boolean;
  elements: ResultCategory[] | ResultElements[];
}
