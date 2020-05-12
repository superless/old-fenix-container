import { ITableInputConnect, ITableInput } from "../../../model/TableFenix/input";
import { IResult, IEntitySearch } from "@fenix/tf-search-model";
import { TableQuery } from "../../queries";
import { searchClient} from "./../search";

/**
 * Obtiene los elementos de la consulta de la tabla.
 * @param input entrada de la consulta de la tabla y azure search
 */
const GetTableSearch : (input : ITableInputConnect)=>Promise<IResult> = input=>{
  const query = TableQuery(input as ITableInput);
  
  const client = searchClient(input.url,input.key);

  return new Promise<IResult>((resolve, reject) =>{
    client.search(input.index, { search:'', filter: query.filter, top: input.elementsInPage, skip: query.skip, count: true, select : query.select },
      (err: any, result: IEntitySearch[], data: { '@odata.count': number }) => {
       
        if (err) reject(err);

        resolve({ entities: result, total: data["@odata.count"], current: input.page })
      }

    );

  })


}

export default GetTableSearch;
