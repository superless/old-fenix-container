import { IEntitySearch } from "@fenix/tf-search-model";
import { TableQueryNames } from "../../queries";

import { searchClient } from "../search";
import ITableIdsInputConnect from "../../../model/TableFenix/input/ITableIdsInputConnect";



const GetTableNameSearch : (input : ITableIdsInputConnect)=>Promise<IEntitySearch[]> = input=>{
    const query = TableQueryNames(input.entityIndex, input.ids, input.indexPropName);
    const client = searchClient(input.url,input.key);

    return new Promise<IEntitySearch[]>((resolve, reject) =>{
      client.search(input.index, { search:'', filter: query.filter, select : query.select },
        (err: any, result: IEntitySearch[]) => {
         
          if (err) reject(err);
  
          resolve(result);
        }
  
      );
  
    });
}

export default GetTableNameSearch;
