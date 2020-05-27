import { ITableFilterInput } from "../../../model/TableFenix/input";
import { ISearchQuery } from "../../../model/queries";
import { IFilterModel, FilterType } from "@fenix/tf-search-model";

const TableQueryFilter : (input: ITableFilterInput)=>ISearchQuery = input=>{
  
  return {
    skip : (input.page > 1 ? (input.page - 1) * input.elementsInPage : 0),
    facets : ['rel/id, count:1000'],
    select : '',
    filter : `entityIndex/any(element: element eq ${input.entity}) ${getFilter(input.filter)}`
  }
}

function getFilter(filter : IFilterModel):string {

  if (!filter.filterEntity) return "";

  var filtered  = Object.keys(filter.filterEntity);
  if (filtered.length === 0) return "";

  var strs = filtered
    .map(s=>`(rel/any(element:element/entityIndex eq ${s}) and 
        rel/any(rel: rel/entityId/any(entid : search.in(entid, '${filter.filterEntity![Number(s)].map(a=>a.value).join(",")}'))))`);
  
  return ` and ${strs.join(" and ")}`;
}




export default TableQueryFilter;