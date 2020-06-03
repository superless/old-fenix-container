import ITableFilterInput from "./ITableFilterInput";
import AzureInput from "../../connection/AzureInput";
import { IFilterModel } from "@fenix/tf-search-model";

export default interface ITableFilterInputConnect extends ITableFilterInput, AzureInput {
  filter : IFilterModel
}