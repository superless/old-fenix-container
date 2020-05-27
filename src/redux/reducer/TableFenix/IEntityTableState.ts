import { IResult } from "@fenix/tf-search-model";
export default interface IEntityTableState {
  Entities:{[pathname:string]:{[num:number]:IResult}}| undefined;
}
