import IBaseInput from "./IBaseInput";
import { IFilterModel } from "@fenix/tf-search-model";
import AzureInput from "../../connection/AzureInput";
import { ITableInput } from ".";

export default interface ITableFilterInput extends ITableInput {
  filter : IFilterModel
}


