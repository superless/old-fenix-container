import { IEntitySearch } from "./IEntitySearch";

export interface IResult{
  total: number;    
  entities : IEntitySearch[];
  currentPage:number;
}