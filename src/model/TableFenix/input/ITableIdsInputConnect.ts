import AzureInput from "../../connection/AzureInput";
export default interface ITableIdsInputConnect extends AzureInput {
  entityIndex: number;
  ids: string[];
  indexPropName: number;
}
