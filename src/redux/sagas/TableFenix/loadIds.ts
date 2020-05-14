import { GetTableNameSearch } from "../../external";
import AzureInput from "../../../model/connection/AzureInput";
import { IIdName } from "./IIdName";
export async function loadIds(input: {
  [key: number]: string[];
}, connect: AzureInput, indexPropName: number): Promise<{
  [key: number]: IIdName[];
}> {
  //init empty
  var result: {
    [key: number]: IIdName[];
  } = {};
  //asigna el nombre a cada id.
  for (const key of Object.keys(input)) {
    var numkey = Number.parseInt(key);
    var resultIds = await GetTableNameSearch({
      entityIndex: numkey,
      ids: input[numkey],
      index: connect.index,
      indexPropName: indexPropName,
      key: connect.key,
      url: connect.url
    });
    var idNames = resultIds.map(s => ({
      id: s.id,
      name: s.str.filter(a => a.propertyIndex === indexPropName)[0].value
    } as IIdName));
    result = { ...result, [numkey]: idNames };
  }
  return result;
}
