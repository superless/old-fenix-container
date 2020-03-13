import { IEntitySearch, IResult } from "tf-search-model";


var AzureSearch = require('azure-search');

export function ClientSearch(url: string, key: string) {
  return AzureSearch({
    url,
    key,
    version: "2019-05-06"
  });
}



export function EntitySearch(
  url: string,
  key: string,
  index: string,
  page: number = 1,
  ElementsInPage: number = 20,
  filter : string,
  search: string = '',
  select :string = ''
  ): Promise<IResult> {

  var client = ClientSearch(url, key);
  const query = filter;
  const skip_data = (page > 1 ? (page - 1) * ElementsInPage : 0);
  
  return new Promise<IResult>((resolve, reject) => {
     
    client.search(index, { search, filter: query, top: ElementsInPage, skip: skip_data, count: true, select},
      (err: any, result: IEntitySearch[], data: { '@odata.count': number }) => {
        
        if (err) reject(err);
        
        resolve({ entities: result, total: data["@odata.count"] , currentPage : page })
      }

    );

  })


}
