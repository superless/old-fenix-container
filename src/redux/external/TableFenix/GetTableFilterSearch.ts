import { ITableFilterInputConnect } from "../../../model/TableFenix/input";
import { IFacet, IResult, IEntitySearch } from "@fenix/tf-search-model";
import { TableQueryFilter } from "../../queries";
import { searchClient } from "../search";


const GetTableFilterSearch : (input : ITableFilterInputConnect)=>Promise<IResult> = input =>{
    const query = TableQueryFilter(input);
    const client = searchClient(input.url,input.key);
    
    return new Promise<IResult>((resolve, reject) =>{
      client.search(input.index, { search:'', filter: query.filter, top: input.elementsInPage, facets: query.facets, skip: query.skip, count: true, select : query.select },
        (err: any, result: IEntitySearch[], data: { '@odata.count': number, '@search.facets' : any }) => {
          
          if (err) reject(err);

          var facetsLocal = data["@search.facets"]["rel/id"] as IFacet[];
          var facetsTransform = facetsLocal.map(s=>{
            var value = split(s.value);
            return {
              ...s,
              value : value[1],
              index : Number.parseInt(value[0])
            } as IFacet

          });
          resolve({ entities: result, total: data["@odata.count"], current: input.page, facets : facetsTransform, indexPropName : input.propIndexName })
        }

      );

    })
}

function split(toSplit:string){
  const arr = toSplit.split(',');
  const result = arr.splice(0,1);
  result.push(arr.join(','));

  return result;
}

export default GetTableFilterSearch;
