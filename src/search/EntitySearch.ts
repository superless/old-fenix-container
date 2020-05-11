import { IEntitySearch, IResult } from "@fenix/tf-search-model";
import { Facet, FacetContainer } from "../model/CategoryEntity";


var AzureSearch = require('azure-search');

export function ClientSearch(url: string, key: string) {
  return AzureSearch({
    url,
    key,
    version: "2019-05-06"
  });
}


export function FacetWithProperty(
  url: string,
  key: string,
  index: string,
  entity: number,
  indexPropery : number,
  defaultMaxFacets : number,
  extraFilter : string

): Promise<FacetContainer> {

  var client = ClientSearch(url, key);

  const filter = extraFilter ===""? `entityIndex/any(element : element eq ${entity})  `:  `entityIndex/any(element : element eq ${entity}) and ${extraFilter}`;
  
  const facets = `str/id, count:${defaultMaxFacets}`;

  return new Promise<FacetContainer>((resolve, reject) => {

    client.search(index, { search: "", filter: filter, facets: [facets], top: 0, select:"", count: false },
      (err: any, results: [], data: { '@odata.count': number, '@search.facets': any }) => {

  
        if (!results || results) {
          var facetsLocal = data["@search.facets"]["str/id"] as Facet[];
          var facetsTransform = facetsLocal.map(s => {
            
            var value =split( s.value)
            return {
              count: s.count,
              value: value[1],
              index: Number.parseInt(value[0])
            } as Facet;
          });

          facetsTransform = facetsTransform.filter(s=>s.index === indexPropery);


          
          if (err) reject(err);

          resolve({ total : 0, facets : facetsTransform} as FacetContainer);

        }
       



      }

    );
  })


}

function split( toSplit: string){
 
  const arr = toSplit.split(',');
  const result = arr.splice(0,1);
  result.push(arr.join(','));

  return result;

}

export function FacetEntitySearch(
  url: string,
  key: string,
  index: string,
  
  indices: number[],
  defaultMaxFacets: number,
  property : "rel" | "str" | "enum",
  filter: string,
  entity?: number
): Promise<FacetContainer> {
  var client = ClientSearch(url, key);

  var filterLocal:String = filter;
  var facetsQuery = `${property}/id, count:${defaultMaxFacets}`;
  if(indices.length>0){
    
    var indexString = indices.map(s => (s.toString()));
    var filterIndex = `elementId/entityIndex eq ${indexString.join(" or  elementId/entityIndex eq ")}`;
    var entityIndex = entity?` and entityIndex/any(element: element eq ${entity})`:"";
    filterLocal = `${filter}  rel/any(elementId: ${filterIndex} ) ${entityIndex}`;

  }
 

  return new Promise<FacetContainer>((resolve, reject) => {

    client.search(index, { search: "", filter: filterLocal, facets: [facetsQuery], top: 0, count: true },
      (err: any, results: [], data: { '@odata.count': number, '@search.facets': any }) => {

        
        if (!results || results) {
          var facetsLocal = data["@search.facets"]["rel/id"] as Facet[];
          var facetsTransform = facetsLocal.map(s => {
            
            var value = split(s.value);
            return {
              count: s.count,
              value: value[1],
              index: Number.parseInt(value[0])
            } as Facet;
          });

          
          
          if (err) reject(err);

          resolve({ total : data["@odata.count"], facets : facetsTransform} as FacetContainer);

        }
       



      }

    );
  })







}

// export function FacetSearch(
//   url: string,
//   key: string,
//   index: string,
//   entity: number,
//   isEntityFacets:boolean,
//   Indexes:number[],
//   filterIndexAutoComplete : number,
//   filterAutoCompleteEntity : IndexEntityName | IndexEntityRelatedIdCategory | IndexEnumValues


// ): Promise<FilterContainer>{
//   var client = ClientSearch(url, key);


//   switch ( filterAutoCompleteEntity.kind){
//      case "Related":
//        var filter = filterAutoCompleteEntity as IndexEntityName;
//        if (filter.dataDependant){


//        }

//        break;
//      case "RelatedCategory":
//        break;

//      case "Enum":
//       break;

//   }

// }


export function EntitySearch(
  url: string,
  key: string,
  index: string,
  page: number = 1,
  ElementsInPage: number = 20,
  filter: string,
  search: string = '',
  select: string = ''
): Promise<IResult> {

  var client = ClientSearch(url, key);

  const query = filter;


  const skip_data = (page > 1 ? (page - 1) * ElementsInPage : 0);


  return new Promise<IResult>((resolve, reject) => {

    client.search(index, { search, filter: query, top: ElementsInPage, skip: skip_data, count: true, select },
      (err: any, result: IEntitySearch[], data: { '@odata.count': number }) => {
       
        if (err) reject(err);

        resolve({ entities: result, total: data["@odata.count"], current: page })
      }

    );

  })


}
